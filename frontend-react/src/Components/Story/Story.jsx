import styles from './story.module.css';
import nature from '../../assets/nature.png';
import profile from '../../assets/default.png';
import man from '../../assets/man.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Story(props){
	return(
		<>
		{!props.create &&
			<div onClick = {() => props.set(open => !open)} className = {styles.story}>
				<img className = {styles.storyImg} src = {nature}/>
				<div className = {styles.profileInfo}>
					<img className = {styles.profileImg} src = {profile}/>
					<p>Andrei Arseni</p>
				</div>
			</div>
		}
		{props.create &&
			<div className = {styles.storyCreate}>
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