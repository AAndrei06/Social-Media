import styles from './chat.module.css';
import EmojiPicker from 'emoji-picker-react';
import NavBar from '../Components/NavBar/NavBar.jsx';
import Comment from '../Components/Comment/Comment.jsx';
import PostShare from '../Components/Comment/PostShare.jsx';
import ImageChat from '../Components/ImageChat/ImageChat.jsx';
import ImageComment from '../Components/Comment/ImageComment.jsx';
import ShortShare from '../Components/Comment/ShortShare.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronLeft, faChevronRight, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ChatFriend from '../Components/ChatFriend/ChatFriend.jsx';
import man from '../assets/man.png';
import ts from '../assets/test.png';
import { useRef, useState } from 'react';

export default function Chat(){


	const ref = useRef();
	const inputRef = useRef();
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [cImg, setcImg] = useState();
	console.log(cImg);

	function toggleSide(){
		if (ref.current.style.right == "0px"){
			ref.current.style.transform = "translateX(-300px)";
			ref.current.style.right = "-300px";
		}else{
			ref.current.style.transform = "translateX(0px)";
			ref.current.style.right = "0px";
		}
	}

	function placeEmoji(emoji){
		inputRef.current.value = inputRef.current.value + emoji.emoji;
	}

	function handleFile(){
		document.getElementById("file-open").click();
	}

	return(
		<>
			<main className = {styles.mainArea}>
				<NavBar/>
				<ImageChat set = {setShow} show = {show} img = {cImg}/>
				<div onClick = {() => toggleSide} className = {styles.arrowRight}>
					<FontAwesomeIcon onClick = {toggleSide} className = {styles.arrow} icon={faChevronRight}/>
				</div>
				<div className = {styles.mainDiv}>
					<div className = {styles.leftSection+' '+styles.additional} ref = {ref}>
						<FontAwesomeIcon onClick = {toggleSide} className = {styles.arrow} icon={faChevronLeft}/>	
						<div className = {styles.searchBar}>
							<FontAwesomeIcon className = {styles.searchIcon} icon={faMagnifyingGlass}/>						
							<input className = {styles.inputSearch} type = "text" placeholder = "Caută un prieten"/>
						</div>
						<br/>
						<div>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>

						</div>
					</div>
					<div className = {styles.leftSection+' '+styles.original}>
						<div className = {styles.searchBar}>
							<FontAwesomeIcon className = {styles.searchIcon} icon={faMagnifyingGlass}/>						
							<input className = {styles.inputSearch} type = "text" placeholder = "Caută un prieten"/>
						</div>
						<br/>
						<div>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
							<ChatFriend/>
						</div>
					</div>
					<div className = {styles.rightSection}>
						<div className = {styles.friendInfo}>
							<img src = {man}/>
							<h3>Mihai Arseni Mititel</h3>
						</div>
						<div className = {styles.messagesSection}>
							<Comment toRight = {true} message = "Lorem ipsullo World Welcome to my channels"/>
							<Comment toRight = {false} message = "Lorem ipsum Hello World User from USA tArseni Hello
							Lorem ipsum Hello World User from USA tArseni HelLorem ipsum Hello World User from USA tArs
							eni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channels"/>
							<Comment toRight = {true} message = "Loreeni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channelseni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channelseni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channelsm ipsumlo World Welcome to my channels"/>
							<Comment toRight = {true} message = "my channels"/>
							<Comment toRight = {true} message = "Loreeni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channelseni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channelseni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User fro
							m Hello World User from USA tArseni Hel World Welcome to my channelseni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channelseni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Helloy channelsm ipsumlo World Wel
							m Hello World User from USA tArseni Hel World Welcome to my channelseni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channelseni HelLorem ipsum Hello World User from USA tArseni HelLorem ipsu
							m Hello World User from USA tArseni Hel World Welcome to my channelsm ipsumlo World Welm USA tArseni Hel World Welcome to my channelsm ipsumlo World Welcome to my channels"/>
							<PostShare/>
							<PostShare toRight/>
							<ShortShare toRight/>
							<ImageComment set = {setShow} setImg = {setcImg} img = {ts} toRight/>
							<ImageComment set = {setShow} setImg = {setcImg} img = {man}/>
							<ImageComment set = {setShow} setImg = {setcImg} img = {ts}/>
						</div>
						<div className = {styles.writeSection}>
							<div className = {styles.div}>
								<input type = "file" className = {styles.none} id = "file-open" accept="image/png, image/jpg, image/gif, image/jpeg"/>
								<FontAwesomeIcon onClick = {handleFile} className = {styles.paper} icon={faPaperclip}/>
								<EmojiPicker style = {{position:"absolute",zIndex: '33',right:"10px", bottom: "50px"}} open = {open} width = {290} height = {400} onEmojiClick = {placeEmoji}/>
								<div className = {styles.emojiBtn} onClick = {() => setOpen(!open)}>
									☺
								</div>
								<input ref = {inputRef} className = {styles.inputWrite} type = "text" placeholder = "Scrie un mesaj"/>
								<button className = {styles.sendBtn}>
									<FontAwesomeIcon icon={faPaperPlane}/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}