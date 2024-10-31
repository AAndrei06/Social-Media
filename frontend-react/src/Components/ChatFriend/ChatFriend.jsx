import styles from './chatfriend.module.css';
import man from '../../assets/man.png';
import { useRef } from 'react';

export default function ChatFriend(props){
	if (props.friend){
		const chatRef = useRef();

		function changeId(){
			console.log("ID changed");
			props.setCurrentId(f => props.friend.id);
		}

		return(
			<>
					<div onClick = {() => changeId()} ref = {chatRef} className = {styles.item}>
						<div className = {styles.image}>
							<img src = {props.friend.profile.profile_photo}/>
						</div>
						<div className = {styles.text}>
							<h4>{props.friend.profile.first_name +' '+props.friend.profile.last_name}</h4>
							<p>Acolo sus pe raft este făină</p>
						</div>
						<div className = {styles.hour}>11:45</div>
						<div className = {styles.notification}><p>56</p></div>
					</div>
				
			</>
		);
	}
}