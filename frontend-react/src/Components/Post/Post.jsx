import styles from './post.module.css';
import test from '../../assets/test.png';
import nature from '../../assets/nature.png';
import heartB from '../../assets/heartB.png';
import comment from '../../assets/comments.png';
import share from '../../assets/share.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPaperPlane, faStar, faShare, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef } from 'react';

export default function Post(props){

	const ref = useRef('');
	const [open, setOpen] = useState(false);
	const [openPostMenu, setOpenPostMenu] = useState(false);
	const bd = props.bd ? styles.putBorder : null;

	function placeEmoji(emoji){
		ref.current.value = ref.current.value + emoji.emoji;
	}

	function toggleEmojies(){
		setOpen(open => !open);
	}

	function hideShowPostMenu(){
		setOpenPostMenu(open => !open);
	}
	return (
		<>
		<div className = {styles.post + ' ' + bd}>
			<div className = {styles.header}>
				<div className = {styles.headerInfo}>
					<img className = {styles.postProfileImg} src = {test}/>
					<div className = {styles.postTextInfo}>
						<p>Andrei Arseni</p>
						<p>4 ore in urma</p>
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
							<p>Distribuie</p>
						</div>
						<div className = {styles.postMenuItem}>
							<FontAwesomeIcon icon={faCircleExclamation} />
							<p>Raportează</p>
						</div>
					</div>
				}
			</div>
			<div className = {styles.body}>
				<div className = {styles.bodyText}>
					<p>
						Iniţial, începând cu anul 1500, textul Lorem Ipsum era
						 utilizat numai în tipografii, de către culegători.
						  În prezent, datorită apariţiei şi utilizării globale
						   <strong>a computerelor, textul Lorem ipsum este utilizat pentru</strong>
						   a simula orice text cu aspect neutru, atât pentru lucrări
						    tipografice cât şi pentru orice alte lucrări care presupun text
						     - în web design, design pentru logo-uri corporative, ştampile etc.
						     Iniţial, începând cu anul 1500, textul Lorem Ipsum era
						 utilizat numai în tipografii, de către culegători.
						  În prezent, datorită apariţiei şi utilizării globale
						   a computerelor, textul Lorem ipsum este utilizat pentru 
						   a simula orice text cu aspect neutru, atât pentru lucrări
						    tipografice cât şi pentru orice alte lucrări care presupun text
						     - în web design, design pentru logo-uri corporative, ştampile etc.
					</p>
				</div>
				<div className = {styles.bodyPhoto}>
					<img src = {nature}/>
				</div>
			</div>
			<div className = {styles.footer}>
				<div className = {styles.options}>
					<div className = {styles.option}>
						<img src = {heartB}/>
						<p styles = {{cursor: 'pointer'}} onClick = {() => props.setLike(o => !o)}>334543</p>
					</div>
					<div onClick = {() => props.set(o => !o)} className = {styles.option}>
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
							<input ref = {ref} className = {styles.inputText} placeholder = "Scrie un comentariu" type = "text"/>
							<div onClick = {toggleEmojies} className = {styles.emojiBtn}>
								☺
							</div>
							<button className = {styles.sendBtn}>
								<FontAwesomeIcon icon={faPaperPlane} />
							</button>
						</div>
						<EmojiPicker style = {{position:"absolute",zIndex: '33', bottom: "50px", right: "10px"}} open = {open} width = {280} height = {400} onEmojiClick = {placeEmoji}/>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};