import styles from './postform.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import EditorFancy from '../Editor/Editor.jsx';


export default function PostForm(props){

	return(
		<>
		<div className = {styles.mainDiv}>
			<div className = {styles.actualForm}>
				<div className = {styles.head}>
					<h2>Creează o postare</h2>
					<div onClick = {() => props.setOpen(o => !o)} className = {styles.closeIcon}>
						<FontAwesomeIcon icon = {faXmark}/>
					</div>
				</div>
				<div className = {styles.body}>
					<EditorFancy/>
					<div className = {styles.hr}>
					</div>
					<input className = {styles.file} type = "file"/>
					<button className = {styles.submit}>Creează Postarea</button>
				</div>
			</div>
		</div>
		</>
	);
}