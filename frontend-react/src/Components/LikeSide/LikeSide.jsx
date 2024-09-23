import styles from './likeside.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronLeft, faChevronRight, faPaperclip, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import FriendItem from '../Item/FriendItem.jsx';
import man from '../../assets/man.png';

export default function LikeSide(props){

	return(
		<>
			{props.open &&
			<div className = {styles.likesSide}>
				<h2 className = {styles.likes}>Aprecieri</h2>
				<FontAwesomeIcon onClick = {() => props.set(o => !o)} className = {styles.mark} icon={faXmark}/>
				<br/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
				<FriendItem lf img = {man} name = "Mihai Arseni cel Mic"/>
			</div>
			}	
		</>
	);
}