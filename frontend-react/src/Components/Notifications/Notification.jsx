import styles from './notification.module.css';
import test from '../../assets/nature.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

export default function Notification(){
	return(
		<div className = {styles.notification}>
			<div className = {styles.notificationPhoto}>
				<img src = {test}/>
			</div>
			<div className = {styles.notificationText}>
				<p>Andrei Arseni</p>
				<p>Tia scris un mesaj</p>
			</div>
			<FontAwesomeIcon className = {styles.open} icon={faEnvelopeOpen} />
		</div>
	);
}