import styles from './comment.module.css';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';

export default function Comment(props){
	const name = props.toRight ? styles.right : styles.left;
	const context = useOutletContext();
	const ref = useRef();
	function deleteMessageComment(event){
		event.stopPropagation()
		context.deleteMessage(props.msg.id);
		ref.current.style.display = "none";
	}
	console.log("msg: ",props.msg);
	return(

		<div ref = {ref} onClick = {() => context.goToShort(props.msg.link)} id = "msg" className = {styles.commentDiv}>
			<div className = {styles.outterDiv + ' ' + name}>
				{props.toRight && <div onClick = {(event) => deleteMessageComment(event)}><FontAwesomeIcon className = {styles.trash} icon={faTrashCan}/></div>}
				<div className = {styles.actualComment}>
					<h3>Videoclip scurt</h3>
					<h5>creat de</h5>
					<h5>Mihai Arseni Mitittel</h5>
					<p>11:45</p>
				</div>
			</div>
		</div>
	);
}