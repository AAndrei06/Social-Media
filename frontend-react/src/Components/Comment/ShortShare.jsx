import styles from './comment.module.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
export default function Comment(props){
const name = props.toRight ? styles.right : styles.left;
return(

<div id = "msg" className = {styles.commentDiv}>
	<a href = "#">
		<div className = {styles.outterDiv + ' ' + name}>
			{props.toRight && <FontAwesomeIcon className = {styles.trash} icon={faTrashCan}/>}
			<div className = {styles.actualComment}>
				<h3>Videoclip scurt</h3>
				<h5>creat de</h5>
				<h5>Mihai Arseni Mitittel</h5>
				<p>11:45</p>
			</div>
		</div>
	</a>
</div>
);
}