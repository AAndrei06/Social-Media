import styles from './imagechat.module.css';
import man from '../../assets/man.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ImageChat(props){
	return(
		<>
			{props.show &&
				<div className = {styles.mainArea}>
					<div className = {styles.mainDiv}>
						<div className = {styles.cont}>
							<a href = {props.img} download>
								<FontAwesomeIcon icon = {faFileArrowDown}/>
							</a>
							<FontAwesomeIcon onClick = {() => props.set(false)} icon = {faXmark}/>
						</div>

						<img src = {props.img}/>
					</div>
				</div>
			}
		</>
	);
}