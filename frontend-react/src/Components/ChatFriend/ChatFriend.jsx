import styles from './chatfriend.module.css';
import man from '../../assets/man.png';

export default function ChatFriend(props){
	return(
		<div className = {styles.item}>
			<div className = {styles.image}>
				<img src = {man}/>
			</div>
			<div className = {styles.text}>
				<h4>Mihai Arseni</h4>
				<p>Acolo sus pe raft este făină</p>
			</div>
			<div className = {styles.hour}>11:45</div>
			<div className = {styles.notification}><p>56</p></div>
		</div>
	);
}