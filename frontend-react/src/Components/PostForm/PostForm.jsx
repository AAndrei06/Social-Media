import styles from './postform.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import EditorFancy from '../Editor/Editor.jsx';
import { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function PostForm(props){

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

	if (props.type == "create"){

		const payload = {

		};

		client.post('/',payload).then((data) => {
			console.log(data);
		});
	}

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
	            console.log(response);
	        } catch (error) {
	            console.error('Error uploading file:', error);
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
	        } catch (error) {
	            console.error('Error uploading file:', error);
	        }
	    }else if (props.type == 'video'){
	    	const file = fileRef.current.files[0];
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
	        } catch (error) {
	            console.error('Error uploading file:', error);
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