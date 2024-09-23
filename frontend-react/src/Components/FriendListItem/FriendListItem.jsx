import styles from './friendlistitem.module.css';
import man from '../../assets/man.png';
import { faEllipsis, faUserMinus, faEnvelope, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function FriendListItem(){

	const [show, setShow] = useState(false);
	const [follow, setFollow] = useState(false);

	return(
		<>
			<div className = {styles.friendObject}>
				<div className = {styles.image}>
					<img src = {man}/>
				</div>
				<h4 className = {styles.h4}>Arseni Andrei</h4>
				<div onClick = {() => setShow(show => !show)} className = {styles.friendOptions}>
					<FontAwesomeIcon icon={faEllipsis}/>
				</div>
				{show &&
				<div className = {styles.options}>
					<div onClick = {() => setFollow(f => !f)} className = {styles.option}>
					{follow &&
						<>
							<FontAwesomeIcon icon={faUserPlus}/>
							<h5>Urmărește</h5>
						</>
					}
					{!follow &&
						<>
							<FontAwesomeIcon icon={faUserMinus}/>
							<h5>Nu mai urmări</h5>
						</>
					}
					</div>
					
					<div className = {styles.option}>
						<FontAwesomeIcon icon={faEnvelope}/>
						<h5>Scrie mesaj</h5>
					</div>
				</div>
				}
			</div>
		</>
	);
}