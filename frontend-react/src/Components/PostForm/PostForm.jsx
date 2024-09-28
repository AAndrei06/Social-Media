import styles from './postform.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import EditorFancy from '../Editor/Editor.jsx';


export default function PostForm(props){

	const name = props.type == "story" || props.type == "video" ? styles.mini : "";
	const name2 = props.type == "story" || props.type == "video" ? styles.miniFile : "";

	return(
		<>
		<div className = {styles.mainDiv}>
			<div className = {styles.actualForm + " " + name}>
				<div className = {styles.head}>
					{(props.type == "create") &&
					<>
						<h2>Creează o postare</h2>
						<div onClick = {() => props.setOpen(o => !o)} className = {styles.closeIcon}>
							<FontAwesomeIcon icon = {faXmark}/>
						</div>
						</>
					}
					{(props.type == "edit") &&
					<>
						<h2>Editează postarea</h2>
						<div onClick = {() => props.setOpen(o => !o)} className = {styles.closeIcon}>
							<FontAwesomeIcon icon = {faXmark}/>
						</div>
						</>
					}
					{(props.type == "story") &&
					<>
						<h2>Creează o poveste</h2>
						<div onClick = {() => props.setOpen(o => !o)} className = {styles.closeIcon}>
							<FontAwesomeIcon icon = {faXmark}/>
						</div>
						</>
					}
					{(props.type == 'video') &&
					<>
						<h2>Creează Videoclip Scurt</h2>
						<div onClick = {() => props.setOpen(o => !o)} className = {styles.closeIcon}>
							<FontAwesomeIcon icon = {faXmark}/>
						</div>
						</>
					}
				</div>
				<div className = {styles.body}>
					{(props.type != "story" && props.type != 'video') && 
						<>
							<EditorFancy/>
							<div className = {styles.hr}>
							</div>
							
						</>
					}
					<input className = {styles.file + " " + name2} type = "file"/>
					{props.type == "create" &&
						<button className = {styles.submit}>Creează Postarea</button>
					}
					{props.type == "story" &&
						<button className = {styles.submit}>Creează o Poveste</button>
					}
					{props.type == "video" &&
						<button className = {styles.submit}>Creează un videoclip scurt</button>
					}
					{props.type == "edit" &&
						<button className = {styles.submit}>Editează postarea</button>
					}
				</div>
			</div>
		</div>
		</>
	);
}