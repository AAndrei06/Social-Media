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
import { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
//import Pusher from 'pusher-js';

export default function Chat(){

	const context = useOutletContext();
	const [currentId, setCurrentId] = useState(null);
	const [friend, setFriend] = useState(null);
	const messagesContainerRef = useRef();
	const [messages, setMessages] = useState([]);
	const client = context.client;
	const [friends, setFriends] = useState([]);
	const ref = useRef();
	const inputRef = useRef();
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [cImg, setcImg] = useState();
	console.log('c: ', currentId);
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

	console.log('c: ',currentId);
	/*
	useEffect(() => {
		Pusher.logToConsole = true;

	    const pusher = new Pusher('8e2186322ddf08632270', {
	      cluster: 'eu'
	    });

	    const channel = pusher.subscribe('chat');
	    channel.bind('message', function(data) {
	    	console.log('ADDED NEW MESSAGE');
	    	setMessages((prevMessages) => [...prevMessages, data.message]);

	    });
	},[]);
	*/
	useEffect(() => {   
		const fetchFriends = async () => {
		client.get(`/chat/get`)
		.then(({ data }) => {
		 setFriends(data.mutual_followers);
		 setCurrentId(data.mutual_followers[0].id);
		 
		})
		.catch(error => {
		 console.error(error);
		});
		};

		fetchFriends();
	}, [currentId]);

	useEffect(() => {   
		const fetchFriends = async () => {
		client.get(`/chat/get`)
		.then(({ data }) => {
		 setFriends(data.mutual_followers);
		 setCurrentId(data.mutual_followers[0].id);
		 
		})
		.catch(error => {
		 console.error(error);
		});
		};

		fetchFriends();
	}, []);


	useEffect(() => {
	    if (messagesContainerRef.current) {
	        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
	    }
	}, [messages]);


	useEffect(() => {   
		client.get(`/chat/get/messages/${currentId}`).then(({data}) => {
		 	setMessages(data.messages);
		 	setFriend(data.otherUser);
		 	console.log('m2: ',data);
		 }).then(() => {
		 	console.log('m: ',messages);
		 });
	}, [currentId]);


	function writeMsg(){
		const payload = {
			'receiver_id':currentId,
			'message': inputRef.current.value
		};
		client.post('/chat/send/message', payload, {
            headers: {
                'Action-Of-Chat': 'sendMsg'
            },
        }).then(({data}) => {
			console.log(data);
			inputRef.current.value = '';
		})
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

						{friends != [] && friends.map(friend => (
							<ChatFriend key = {friend.idKey} friend = {friend}/>
						))}
							
						</div>
					</div>
					<div className = {styles.leftSection+' '+styles.original}>
						<div className = {styles.searchBar}>
							<FontAwesomeIcon className = {styles.searchIcon} icon={faMagnifyingGlass}/>						
							<input className = {styles.inputSearch} type = "text" placeholder = "Caută un prieten"/>
						</div>
						<br/>
						<div>
							{friends != [] && friends.map(friend => (
								<ChatFriend key = {friend.idKey} friend = {friend}/>
							))}
						</div>
					</div>
					<div className = {styles.rightSection}>
						{friend != null &&
							<div className = {styles.friendInfo}>
								<img src = {friend.profile.profile_photo}/>
								<h3>{friend.profile.first_name+' '+friend.profile.last_name}</h3>
							</div>
						}
						<div ref = {messagesContainerRef} className = {styles.messagesSection}>
							{messages != [] && messages.map((msg) => (
								<Comment key = {msg.id} toRight = {msg.sender_id == context.user.id} message = {msg}/>
							))}

							{/*
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
							*/}
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
								<button onClick = {() => writeMsg()} className = {styles.sendBtn}>
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