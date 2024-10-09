import styles from './commentssection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronLeft, faChevronRight, faPaperclip, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from 'react';
import PostComment from '../PostComment/PostComment.jsx';
import { useOutletContext } from 'react-router-dom';

export default function CommentsSection(props){
	const [open, setOpen] = useState(false);
	const ref = useRef();
	const context = useOutletContext();
	const client = context.client;
	const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);


	function placeEmoji(emoji){
		ref.current.value = ref.current.value + emoji.emoji;
	}

	useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await client.get(`/post/get/comments/${props.uuidPost}/`);
                setComments(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [props.uuidPost]);

    if (loading) {
        return <div>Loading comments...</div>;
    }

	return(
		<>
		{props.open &&
			<div className = {styles.commentsSide}>
				<FontAwesomeIcon onClick = {() => props.set(o => !o)} className = {styles.mark} icon={faXmark}/>
				<h2 className = {styles.titleComments}>Comentarii</h2>
				<div className = {styles.commentsSpace}>

				{comments.map((comment) => (
					<PostComment key = {comment.id} comment = {comment}/>
				))}
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