import styles from './storyview.module.css';
import video from '../../assets/large.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function StoryView(props){
	const context = useOutletContext();
	const client = context.client;
	if (context.user){
		
		const ref = useRef();

		console.log(context.user.idKey === props.story.user.idKey);

		function handlePause(){
			if (ref.current.paused){
				ref.current.play();
			}else{
				ref.current.pause();
			}
		}

		function handleVideoEnd(){
			props.set(open => !open);
		}

		async function handleDelete(){
			try {
	            const response = await client.post(`/story/delete/${props.story.uuid}`, {
	                headers: {
	                    'Action-Of-Home': 'deleteStory',
	                },
	            });
	            console.log(response);
	        } catch (error) {
	            console.log(error);
	        }
		}

		return(
			<>
			{props.open &&
				<main className = {styles.mainArea}>
					<div className = {styles.mainDiv}>
						{(context.user.idKey === props.story.user.idKey) &&
							<div onClick = {() => handleDelete()} className = {styles.trash}>
								<FontAwesomeIcon icon = {faTrashCan}/>
							</div>
						}
						<div onClick = {() => props.set(open => !open)} className = {styles.close}>
							<FontAwesomeIcon icon = {faXmark}/>
						</div>
						<video onEnded={handleVideoEnd} ref = { ref } onClick = {handlePause} className = {styles.vid}>
							<source src={props.story.file} type="video/mp4"/>
						</video>
					</div>
				</main>
			}
			</>
			
		);
	}
}