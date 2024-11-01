import styles from './comment.module.css';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';

export default function Comment(props){
	const name = props.toRight ? styles.right : styles.left;
	const context = useOutletContext();
	const date = new Date(props.message.created_at);
	const ref = useRef();

	function deleteMessageComment(){
		context.deleteMessage(props.message.id);
		ref.current.style.display = "none";
	}

	const formattedTime = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Set to false for 24-hour format
    });
	
	return(
		<div ref = {ref} id = "msg" className = {styles.commentDiv}>
			<div className = {styles.outterDiv + ' ' + name}>
			{props.toRight && <div onClick = {() => deleteMessageComment()}><FontAwesomeIcon className = {styles.trash} icon={faTrashCan}/></div>}
			<div className = {styles.actualComment}>
				<h5>{props.message.message}</h5>
				<p>{formattedTime}</p>
			</div>
			</div>
		</div>
	);
}