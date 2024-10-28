import styles from './postform.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import EditorFancy from '../Editor/Editor.jsx';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function PostForm(props){






const getFrame = async (videoFile) => {
    return new Promise((resolve, reject) => {
        if (!videoFile || videoFile.size === 0) {
            return reject(new Error("Invalid video file"));
        }

        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const urlRef = URL.createObjectURL(videoFile);

        video.src = urlRef;
        video.crossOrigin = 'anonymous'; // Allow cross-origin access
        video.preload = 'metadata';

        // Set the time to capture the frame (you can adjust this)
        const captureTime = 0.5; // Capture at 0.5 seconds (adjust as needed)

        video.addEventListener('loadedmetadata', () => {
            // Set canvas size to video dimensions
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Ensure the video duration is enough
            if (video.duration < captureTime) {
                return reject(new Error('Video is too short for the specified capture time.'));
            }

            // Set the current time to capture the frame
            video.currentTime = captureTime;
        });

        // Listen for the `seeked` event to ensure the video is ready
        video.addEventListener('seeked', () => {
            // Draw the frame onto the canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert canvas to blob and resolve with a File
            canvas.toBlob((blob) => {
                if (!blob) {
                    return reject(new Error('Failed to create image blob'));
                }

                // Create a File object from the blob
                const file = new File([blob], `${videoFile.name}_frame.png`, {
                    type: 'image/png'
                });

                resolve(file); // Return the File object
            }, 'image/png'); // Specify the image format
        });

        // Error handling
        video.addEventListener('error', (event) => {
            reject(new Error('Error loading video: ' + event.message));
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
	    }else if (props.type == 'video'){

	    	const file = fileRef.current.files[0];

	    	try {
		        
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
	    	if (!file){
	    		context.showError("Alegeți un video!");
	    	}


	    	if (file.type === 'video/mp4' && file.name.endsWith('.mp4')){

		        const videoElement = document.createElement('video');

		        videoElement.preload = 'metadata';
		        videoElement.src = URL.createObjectURL(file);

		        videoElement.onloadedmetadata = async function () {
		            const duration = videoElement.duration;
		            if (duration < 30) {
		                e.preventDefault();
		                const firstFrameImage = await getFrame(file);
		                console.log(firstFrameImage);
		                
		                const payload = {
							'file':file,
							'image':firstFrameImage
						};
						
				        try {
				            const response = await client.post('/story/create', payload, {
				                headers: {
				                    'Content-Type': 'multipart/form-data',
				                    'Action-Of-Home': 'createStory',
				                },
				            });
				            console.log(response.data);

				            if (response.data == "Exists"){
				            	context.showError("Deja ai o poveste!");
				            }else{
				            	context.showSuccess('Povestea creată cu success!');
				       			props.setOpen(o => !o);
				            }
				        } catch (error) {
				            console.error('Error uploading file:', error);
				        }
				        
		            } else {
		                context.showError("Video-ul are peste 30 de secunde!");
		            }
		        };
		    }else{
		    	context.showError("Fișierul nu este un video!");
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