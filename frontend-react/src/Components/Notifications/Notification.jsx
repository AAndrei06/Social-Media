import styles from './notification.module.css';
import test from '../../assets/nature.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function Notification(props){
	if (props.notification){
		const navigate = useNavigate();
		const ref = useRef();
		const context = useOutletContext();
		const client = context.client;

		async function deleteNotification(){
			await client.post(`/notification/delete/${props.notification.id}`).then((data) => {
				console.log(data);
				ref.current.style.display = "none";
			}).catch((e) => {
				console.log(e);
			});
		}

	
		return(
			<>
				{props.notification.type == 'message' && 
					<div ref = {ref} className = {styles.notification}>
						<div className = {styles.notificationPhoto}>
							<img src = {props.notification.photo}/>
						</div>
						<div className = {styles.notificationText}>
							<p>{props.notification.title}</p>
							<p>{props.notification.desc}</p>
						</div>
						<div onClick = {() => deleteNotification()}>
							<FontAwesomeIcon className = {styles.open} icon={faEnvelopeOpen} />
						</div>
					</div>
				}
				{props.notification.type == 'follow' && 
					<div ref = {ref} onClick = {() => navigate(props.notification.link)} className = {styles.notification}>
						<div className = {styles.notificationPhoto}>
							<img src = {props.notification.photo}/>
						</div>
						<div className = {styles.notificationText}>
							<p>{props.notification.title}</p>
							<p>{props.notification.desc}</p>
						</div>
						<div onClick = {() => deleteNotification()}>
							<FontAwesomeIcon className = {styles.open} icon={faEnvelopeOpen} />
						</div>
					</div>
				}

			</>
		);
	}
}