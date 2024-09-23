import styles from './commentssection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronLeft, faChevronRight, faPaperclip, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef } from 'react';
import PostComment from '../PostComment/PostComment.jsx';

export default function CommentsSection(props){
	const [open, setOpen] = useState(false);
	const ref = useRef();

	function placeEmoji(emoji){
		ref.current.value = ref.current.value + emoji.emoji;
	}

	return(
		<>
		{props.open &&
			<div className = {styles.commentsSide}>
				<FontAwesomeIcon onClick = {() => props.set(o => !o)} className = {styles.mark} icon={faXmark}/>
				<h2 className = {styles.titleComments}>Comentarii</h2>
				<div className = {styles.commentsSpace}>
					<PostComment/>
					<PostComment/>
					<PostComment/>
					<PostComment/>
					<PostComment/>
					<PostComment/>
				</div>
				<div className = {styles.writeSection}>
					<input ref = {ref} type = "text" placeholder = "Scrie un comentariu"/>
					<EmojiPicker onEmojiClick = {placeEmoji}
					 style = {{position:"absolute",zIndex: '334543534',right:"10px", bottom: "55px"}} open = {open} width = {290} height = {400}/>
					
					<div className = {styles.emojiBtn} onClick = {() => setOpen(open => !open)}>
						☺
					</div>
					<button className = {styles.btnComment}>
						<FontAwesomeIcon icon={faPaperPlane}/>
					</button>
				</div>
			</div>
		}
		</>
	);
}