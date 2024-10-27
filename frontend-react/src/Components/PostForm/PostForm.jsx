import styles from './postform.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import EditorFancy from '../Editor/Editor.jsx';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function PostForm(props){








const getFirstFrameFromVideo = (
    videoFile, // Expecting a File object
    options = {
        extension: "png",
    }
) => {
    return new Promise((resolve, reject) => {
        // Check if videoFile is valid
        if (!videoFile || videoFile.size === 0) {
            reject(new Error("Invalid video file"));
            return;
        }

        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const urlRef = URL.createObjectURL(videoFile);

        video.src = urlRef;
        video.crossOrigin = 'anonymous'; // Allow cross-origin access
        video.preload = 'metadata';

        video.addEventListener('loadedmetadata', () => {
            // Set canvas size to video dimensions
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            video.currentTime = 0; // Go to the first frame
        });

        video.addEventListener('loadeddata', () => {
            // Draw the first frame onto the canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert canvas to blob and resolve with File
            canvas.toBlob((blob) => {
                // Check if blob was created successfully
                if (!blob) {
                    reject(new Error('Failed to create image blob'));
                    return;
                }

                // Resolve with the new File object
                resolve(
                    new File([blob], `${videoFile.name}_first_frame.${options.extension}`, {
                        type: 'image/' + options.extension
                    })
                );

                // Clean up resources
                URL.revokeObjectURL(urlRef);
                video.remove();
                canvas.remove();
            }, 'image/' + options.extension);
        });

        // Error handling
        video.addEventListener('error', (event) => {
            reject(new Error('Error loading video: ' + event.message));
            // Clean up in case of error
            URL.revokeObjectURL(urlRef);
            video.remove();
            canvas.remove();
        });

        // Load the video
        video.load();
    });
};














	const obj = {
		'create':'Creează o postare',
		'edit':'Editează postarea',
		'story':'Creează o poveste',
		'video':'Creează un videoclip scurt'
	};

	const context = useOutletContext();
	const client = context.client;
	const tRef = useRef("");
	const fileRef = useRef();

	function updateRef(text){
		tRef.current = text;
	}

	const name = props.type == "story" ? styles.mini : "";
	const name2 = props.type == "story" ? styles.miniFile : "";
	/*
	if (props.type == "create"){

		const payload = {

		};

		client.post('/',payload).then((data) => {
			console.log(data);
		});
	}*/

	async function handleSubmit(e){
		e.preventDefault();

		if (props.type == "create"){
			const file = fileRef.current.files[0];
			console.log(file);
			const payload = {
				'content': tRef.current,
				'file':file
			};

	        try {
	            const response = await client.post('/', payload, {
	                headers: {
	                    'Content-Type': 'multipart/form-data',
	                    'Action-Of-Home': 'createPost',
	                },
	            });
	            console.log('re', response);
	            context.showSuccess('Postare creată cu success!');
	        } catch (error) {
	        	if (error){
	        		if (error.response.data.errors.content){
			        	context.showError(error.response.data.errors.content[0]);
			        }else{
			        	context.showError(error.response.data.errors);
			        }
		        }
	        }
	    }else if (props.type == 'edit'){
	    	const file = fileRef.current.files[0];

	    	const payload = {
				'content': tRef.current,
				'file':file
			};

	    	try {
	            const response = await client.post(`/post/edit/${props.idKey}`,payload, {
	                headers: {
	                    'Content-Type': 'multipart/form-data'
	                },
	            });
	            console.log(response);
	            context.showSuccess('Postare editată cu success!');
	        } catch (error) {
	            if (error){
	        		if (error.response.data.errors.content){
			        	context.showError(error.response.data.errors.content[0]);
			        }else{
			        	context.showError(error.response.data.errors);
			        }
		        }
	        }
	    }else if (props.type == 'video'){

	    	const file = fileRef.current.files[0];

	    	try {
		        const firstFrameImage = await getFirstFrameFromVideo(file);
		        console.log('First frame image:', firstFrameImage);
		        // Use the generated image file as needed
		    } catch (error) {
		        console.error('Error getting first frame:', error);
		    }
			console.log(file);
			const payload = {
				'content': tRef.current,
				'file':file
			};

	        try {
	            const response = await client.post('/video/create', payload, {
	                headers: {
	                    'Content-Type': 'multipart/form-data',
	                    'Action-Of-Home': 'createVideo',
	                },
	            });
	            console.log(response);
	            context.showSuccess('Videoclip scurt creat cu success!');
	            props.setOpen(o => !o);
	        } catch (error) {
	            if (error){
	        		if (error.response.data.errors.content){
			        	context.showError(error.response.data.errors.content[0]);
			        }else{
			        	context.showError(error.response.data.errors);
			        }
		        }
	        }
	    }else if (props.type == "story"){
	    	const file = fileRef.current.files[0];

	    	if (file.type === 'video/mp4' && file.name.endsWith('.mp4')){

		        const videoElement = document.createElement('video');

		        videoElement.preload = 'metadata';
		        videoElement.src = URL.createObjectURL(file);

		        videoElement.onloadedmetadata = async function () {
		            const duration = videoElement.duration;
		            if (duration < 30) {
		                e.preventDefault();
		                const payload = {
							'file':file
						};
						
				        try {
				            const response = await client.post('/story/create', payload, {
				                headers: {
				                    'Content-Type': 'multipart/form-data',
				                    'Action-Of-Home': 'createStory',
				                },
				            });
				            console.log(response);
				        } catch (error) {
				            console.error('Error uploading file:', error);
				        }
				        console.log("30 <");
		            } else {
		                console.log(' 30 >');
		            }
		        };
		    }else{
		    	console.log("not a video");
		    }
	    }
	}

	

	return(
		<>
		<div className = {styles.mainDiv}>
			<div className = {styles.actualForm + " " + name}>
				<div className = {styles.head}>
				<h2>{obj[props.type]}</h2>
				<div onClick = {() => props.setOpen(o => !o)} className = {styles.closeIcon}>
					<FontAwesomeIcon icon = {faXmark}/>
				</div>
					
				</div>
				<div className = {styles.body}>
					<form method = "POST" onSubmit = {(e) => handleSubmit(e)}>
						{(props.type != "story") && 
							<>

								<EditorFancy up = {updateRef}/>
								<div className = {styles.hr}>
								</div>
								
							</>
						}
						<input ref = {fileRef} className = {styles.file + " " + name2} type = "file"/>
						<button type = "submit" className = {styles.submit}>{obj[props.type]}</button>
					</form>
				</div>
			</div>
		</div>
		</>
	);
}