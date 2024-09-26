import styles from './imagechat.module.css';
import man from '../../assets/man.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ImageChat(){
	return(
		<>
			<div className = {styles.mainArea}>
				<div className = {styles.mainDiv}>
					<div className = {styles.cont}>
						<FontAwesomeIcon icon = {faFileArrowDown}/>
						<FontAwesomeIcon icon = {faXmark}/>
					</div>
					<img src = {man}/>
				</div>
			</div>
		</>
	);
}