import styles from './storyview.module.css';
import video from '../../assets/large.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

export default function StoryView(props){
	const ref = useRef();


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

	return(
		<>
		{props.open &&
			<main className = {styles.mainArea}>
				<div className = {styles.mainDiv}>
					<div onClick = {() => props.set(open => !open)} className = {styles.close}>
						<FontAwesomeIcon icon = {faXmark}/>
					</div>
					<video onEnded={handleVideoEnd} ref = { ref } onClick = {handlePause} className = {styles.vid}>
						<source src={video} type="video/mp4"/>
					</video>
				</div>
			</main>
		}
		</>
		
	);
}