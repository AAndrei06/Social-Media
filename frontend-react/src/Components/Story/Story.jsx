import styles from './story.module.css';
import nature from '../../assets/nature.png';
import profile from '../../assets/default.png';
import man from '../../assets/man.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

export default function Story(props){
	
	const context = useOutletContext();

	useEffect(() => {
		if (!context.user.profile){
			window.location.reload();
		}
		
	},[context.user]);

	if (!props.story && context.user.profile){
		if (context.user){
			return(
				<>
				{props.create &&
					<div onClick = {() => props.func("story")} className = {styles.storyCreate}>
						<img className = {styles.photo} src = {context.user.profile.profile_photo}/>
						<button className = {styles.btn}>
							<FontAwesomeIcon icon={faPlus} />
						</button>
						<h4>Creează o poveste</h4>
					</div>
				}
				</>
			);
		}
	}else if (context.user.profile){
		return(
			<>
			{!props.create &&
				<div className = {styles.story}>
					<img onClick = {() => {props.setStory(s => props.story);props.set(open => !open)}} className = {styles.storyImg} src = {props.story.image}/>
					<div onClick = {() => context.profile(props.story.user.idKey)} className = {styles.profileInfo}>
						<img className = {styles.profileImg} src = {props.story.user.profile.profile_photo}/>
						<p>{props.story.user.profile.first_name+' '+props.story.user.profile.last_name}</p>
					</div>
				</div>
			}
			{props.create &&
				<div onClick = {() => props.func("story")} className = {styles.storyCreate}>
					<img className = {styles.photo} src = {context.user.profile.profile_photo}/>
					<button className = {styles.btn}>
						<FontAwesomeIcon icon={faPlus} />
					</button>
					<h4>Creează o poveste</h4>
				</div>
			}
			</>
		);
	}

	
};