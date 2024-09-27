import styles from './comment.module.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import man from '../../assets/man.png';
import { useState } from 'react';
import ImageChat from '../ImageChat/ImageChat.jsx';

export default function Comment(props){

	const name = props.toRight ? styles.right : styles.left;

	function handleShow(){
		props.setImg(img => props.img);
		props.set(s => true);
	}

	return(
		<>

			<div id = "msg" className = {styles.commentDiv}>
				<div onClick = {handleShow} className = {styles.outterDiv + ' ' + name}>
				{props.toRight && <FontAwesomeIcon className = {styles.trash} icon={faTrashCan}/>}
					<img src = {props.img}/>
				</div>
			</div>
		</>
	);
}