import styles from './comment.module.css';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';
export default function Comment(props){
	const context = useOutletContext();
	const ref = useRef();

	function deleteMessageComment(event){
		event.stopPropagation()
		context.deleteMessage(props.msg.id);
		ref.current.style.display = "none";
	}

	if (props.msg){
		const name = props.toRight ? styles.right : styles.left;
		return(

		<div ref = {ref} onClick = {() => context.goToPost(props.msg.link)} id = "msg" className = {styles.commentDiv}>
			<div className = {styles.outterDiv + ' ' + name}>
				{props.toRight && <div onClick = {(event) => deleteMessageComment(event)}><FontAwesomeIcon className = {styles.trash} icon={faTrashCan}/></div>}
				<div className = {styles.actualComment}>
					<h3>Postare</h3>
					<h5>creată de</h5>
					<h5>Mihai Arseni Mitittel</h5>
					<p>11:45</p>
				</div>
			</div>
		</div>
		);
	}
}