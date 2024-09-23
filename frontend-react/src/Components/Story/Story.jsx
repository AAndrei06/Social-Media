import styles from './story.module.css';
import nature from '../../assets/nature.png';
import profile from '../../assets/default.png';

export default function Story(){
	return(
		<div className = {styles.story}>
			<img className = {styles.storyImg} src = {nature}/>
			<div className = {styles.profileInfo}>
				<img className = {styles.profileImg} src = {profile}/>
				<p>Andrei Arseni</p>
			</div>
		</div>
	);
};