import styles from './comment.module.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import man from '../../assets/man.png';

export default function Comment(props){

	const name = props.toRight ? styles.right : styles.left;

	return(
		<div id = "msg" className = {styles.commentDiv}>
			<div className = {styles.outterDiv + ' ' + name}>
			{props.toRight && <FontAwesomeIcon className = {styles.trash} icon={faTrashCan}/>}
				<img src = {man}/>
			</div>
		</div>
	);
}