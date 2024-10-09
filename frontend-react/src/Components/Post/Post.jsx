import styles from './post.module.css';
import test from '../../assets/test.png';
import nature from '../../assets/nature.png';
import video from '../../assets/large.mp4';
import heartB from '../../assets/heartB.png';
import comment from '../../assets/comments.png';
import share from '../../assets/share.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPaperPlane, faStar, faShare, faCircleExclamation, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons'
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ro } from 'date-fns/locale';
import { useOutletContext } from 'react-router-dom';  

export default function Post(props){

	const context = useOutletContext();
	const client = context.client;

	const ref = useRef('');
	const [open, setOpen] = useState(false);
	const [openPostMenu, setOpenPostMenu] = useState(false);
	const bd = props.bd ? styles.putBorder : null;

	const formattedTime = formatDistanceToNow(new Date(props.created), {
		addSuffix: true,
		locale: ro,
	});

	function placeEmoji(emoji){
		ref.current.value = ref.current.value + emoji.emoji;
	}

	function toggleEmojies(){
		setOpen(open => !open);
	}

	function hideShowPostMenu(){
		setOpenPostMenu(open => !open);
	}

	async function deletePost(){
        try {
            const response = await client.post(`/post/delete/${props.idKey}`, {
                headers: {
                    'Action-Of-Home': 'deletePost',
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
	}


	async function handleCommentSubmit(e){
		e.preventDefault();

		const payload = {
			'content': ref.current.value
		};

		try {
            const response = await client.post(`/post/comment/${props.idKey}`,payload, {
                headers: {
                    'Action-Of-Home': 'writeComment',
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
	}

	async function handleCommentsDisplay(){
		props.set(o => !o);
		props.setCommentPostId(d => props.idKey);
	}

	return (
		<>
		<div className = {styles.post + ' ' + bd}>
			<div className = {styles.header}>
				<div className = {styles.headerInfo}>
					<img className = {styles.postProfileImg} src = {props.user_photo}/>
					<div className = {styles.postTextInfo}>
						<p>{props.fullname}</p>
						<p>{formattedTime}</p>
					</div>
				</div>
				<div onClick = {hideShowPostMenu} className = {styles.menuIcon}>
					<FontAwesomeIcon icon={faEllipsis} />
				</div>
				{openPostMenu &&
					<div className = {styles.postMenu}>
						<div className = {styles.postMenuItem}>
							<FontAwesomeIcon icon={faStar} />
							<p>Adaugă la favorite</p>
						</div>
						<div className = {styles.postMenuItem}>
							<FontAwesomeIcon icon={faShare} />
							<p>Trimite</p>
						</div>
						<div onClick = {() => {props.func('edit');props.setId(id => props.idKey)}} className = {styles.postMenuItem}>
							<FontAwesomeIcon icon={faPen} />
							<p>Editează</p>
						</div>
						<div onClick = {() => deletePost()} className = {styles.postMenuItem+" "+styles.redColor}>
							<FontAwesomeIcon icon={faTrashCan} />
							<p>Șterge</p>
						</div>
						<div className = {styles.postMenuItem+" "+styles.redColor}>
							<FontAwesomeIcon icon={faCircleExclamation} />
							<p>Raportează</p>
						</div>
					</div>
				}
			</div>
			<div className = {styles.body}>
				<div className = {styles.bodyText} dangerouslySetInnerHTML={{ __html: props.body }}>
				</div>
				{props.file &&
					<div className = {styles.bodyPhoto}>
						{props.file.endsWith('.mp4') &&
							<video controls>
								<source src={props.file} type="video/mp4"/>
							</video>
						}

						{!props.file.endsWith('.mp4') &&
							<img src = {props.file}/>
						}
					</div>
				}
			</div>
			<div className = {styles.footer}>
				<div className = {styles.options}>
					<div className = {styles.option}>
						<img src = {heartB}/>
						<p styles = {{cursor: 'pointer'}} onClick = {() => props.setLike(o => !o)}>334543</p>
					</div>
					<div onClick = {() => handleCommentsDisplay()} className = {styles.option}>
						<img src = {comment}/>
						<p>1</p>
					</div>
					<div className = {styles.option}>
						<img src = {share}/>
						<p>1</p>
					</div>
				</div>
				<div className = {styles.comment}>
					<div className = {styles.center}>
						<div className = {styles.inputAlign}>
							<form method="POST" onSubmit = {(e) => handleCommentSubmit(e)}>
								<input ref = {ref} className = {styles.inputText} placeholder = "Scrie un comentariu" type = "text"/>
								<div onClick = {toggleEmojies} className = {styles.emojiBtn}>
									☺
								</div>
								<button type = "submit" className = {styles.sendBtn}>
									<FontAwesomeIcon icon={faPaperPlane} />
								</button>
							</form>
						</div>
						<EmojiPicker style = {{position:"absolute",zIndex: '33', bottom: "50px", right: "10px"}} open = {open} width = {280} height = {400} onEmojiClick = {placeEmoji}/>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};