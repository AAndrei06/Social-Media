import styles from './friendbox.module.css';
import man from '../../assets/man.png';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function FriendBox(){

	const [follow, setFollow] = useState(true);

	return(
		<>
			<div className = {styles.box}>
				<div className = {styles.image}>
					<img src = {man}/>
				</div>
				<h4 className = {styles.name}>Mihai Arseni Mititel</h4>
				<button onClick = {() => setFollow(f => !f)} className = {styles.btn}>
					{follow &&
						<>
							<FontAwesomeIcon icon = {faUserPlus}/>
							<h2>Urmărește</h2>
						</>
					}
					{!follow &&
						<>
							<FontAwesomeIcon icon = {faUserMinus}/>
							<h2>Nu mai urmări</h2>
						</>
					}
				</button>
			</div>
		</>
	);
}