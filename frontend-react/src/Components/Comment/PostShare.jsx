import styles from './comment.module.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';
export default function Comment(props){
	const context = useOutletContext();
	if (props.msg){
		const name = props.toRight ? styles.right : styles.left;
		return(

		<div onClick = {() => context.goToPost(props.msg.link)} id = "msg" className = {styles.commentDiv}>
			<a href = "#">
				<div className = {styles.outterDiv + ' ' + name}>
					{props.toRight && <FontAwesomeIcon className = {styles.trash} icon={faTrashCan}/>}
					<div className = {styles.actualComment}>
						<h3>Postare</h3>
						<h5>creată de</h5>
						<h5>Mihai Arseni Mitittel</h5>
						<p>11:45</p>
					</div>
				</div>
			</a>
		</div>
		);
	}
}