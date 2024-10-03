import styles from './story.module.css';
import nature from '../../assets/nature.png';
import profile from '../../assets/default.png';
import man from '../../assets/man.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';

export default function Story(props){
	const context = useOutletContext();

	return(
		<>
		{!props.create &&
			<div className = {styles.story}>
				<img onClick = {() => props.set(open => !open)} className = {styles.storyImg} src = {nature}/>
				<div onClick = {() => context.profile(3453)} className = {styles.profileInfo}>
					<img className = {styles.profileImg} src = {profile}/>
					<p>Andrei Arseni</p>
				</div>
			</div>
		}
		{props.create &&
			<div onClick = {() => props.func("story")} className = {styles.storyCreate}>
				<img className = {styles.photo} src = {man}/>
				<button className = {styles.btn}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
				<h4>Creează o poveste</h4>
			</div>
		}
		</>
	);
};