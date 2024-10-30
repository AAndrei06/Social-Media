import styles from './comment.module.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function Comment(props){
	const name = props.toRight ? styles.right : styles.left;


	const date = new Date(props.message.created_at);

	const formattedTime = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Set to false for 24-hour format
    });
	
	return(
		<div id = "msg" className = {styles.commentDiv}>
			<div className = {styles.outterDiv + ' ' + name}>
			{props.toRight && <FontAwesomeIcon className = {styles.trash} icon={faTrashCan}/>}
			<div className = {styles.actualComment}>
				<h5>{props.message.message}</h5>
				<p>{formattedTime}</p>
			</div>
			</div>
		</div>
	);
}