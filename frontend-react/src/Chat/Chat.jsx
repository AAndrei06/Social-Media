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
import { useOutletContext, useLocation } from 'react-router-dom';
import Pusher from 'pusher-js';

export default function Chat(){

	const context = useOutletContext();
	const location = useLocation();
    const stateData = location.state;


	if (!context.user){
		return (<>...Loading</>)
	}
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
	const chatSearchRef = useRef();
	const chatSearchRef1 = useRef();

	if (stateData && stateData.id){
    	setCurrentId(stateData.id);
    }

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

	async function searchFriends(){
		if (chatSearchRef.current.value == ''){
			fetchFriends();
		}
		await client.get(`/chat/get/friends/${chatSearchRef.current.value}`).then(({data}) => {
		 	setFriends(data);
		 	console.log('m2: ',data);
		 }).then(() => {
		 	console.log('m: ',messages);
		 });
	}

	async function searchFriends1(){
		if (chatSearchRef1.current.value == ''){
			fetchFriends();
		}
		await client.get(`/chat/get/friends/${chatSearchRef1.current.value}`).then(({data}) => {
		 	setFriends(data);
		 	console.log('m2: ',data);
		 }).then(() => {
		 	console.log('m: ',messages);
		 });
	}


	console.log('c: ',currentId);

	async function getTheChat(){
		await client.get(`/chat/get/messages/${currentId}`).then(({data}) => {
		 	setMessages(data.messages);
		 	setFriend(data.otherUser);
		 	console.log('m2: ',data);
		 }).then(() => {
		 	console.log('m: ',messages);
		 });
	}

	useEffect(() => {
		getTheChat();
	    Pusher.logToConsole = true;
	    if (currentId && context.user.id){
	    	console.log(currentId);
		    const pusher = new Pusher("8e2186322ddf08632270", {
		        cluster: "eu"
		    });

		    // Folosește context.user.id și currentId pentru a construi numele canalului
		    const user1Id = Math.min(context.user.id, currentId);
		    const user2Id = Math.max(context.user.id, currentId);
		    const channel = pusher.subscribe(`chat.${user1Id}.${user2Id}`);
		    console.log('c ',channel);
		    channel.bind('message', function(data) {
		        console.log('ADDED NEW MESSAGE');
		        setMessages((prevMessages) => [...prevMessages, data.message]);
		    });

		    return () => {
		        channel.unbind_all();
		        channel.unsubscribe();
		    };
		}
	}, [currentId]);


	async function fetchFriends(){
		await client.get(`/chat/get`)
		.then(({ data }) => {
		 setFriends(data.mutual_followers);
		 setCurrentId(data.mutual_followers[0].id);
		 
		})
		.catch(error => {
		 console.error(error);
		});
	}
	
	useEffect(() => {  
		if (friend == null){ 

			fetchFriends();
		}
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

	function writeMsg(){
		const payload = {
			'receiver_id':currentId,
			'message': inputRef.current.value,
			'type': 'text'
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
							<input ref = {chatSearchRef} onChange = {() => searchFriends()} className = {styles.inputSearch} type = "text" placeholder = "Caută un prieten"/>
						</div>
						<br/>
						<div>

						{friends != [] && friends.map(friend => (
							<ChatFriend setCurrentId = {setCurrentId} key = {friend.idKey} friend = {friend}/>
						))}
							
						</div>
					</div>
					<div className = {styles.leftSection+' '+styles.original}>
						<div className = {styles.searchBar}>
							<FontAwesomeIcon className = {styles.searchIcon} icon={faMagnifyingGlass}/>						
							<input ref = {chatSearchRef1} onChange = {() => searchFriends1()} className = {styles.inputSearch} type = "text" placeholder = "Caută un prieten"/>
						</div>
						<br/>
						<div>
							{friends != [] && friends.map(friend => (
								<ChatFriend setCurrentId = {setCurrentId} key = {friend.idKey} friend = {friend}/>
							))}
						</div>
					</div>
					<div className = {styles.rightSection}>
						{friend != null &&
							<div className = {styles.friendInfo}>
								<img onClick = {() => context.profile(friend.idKey)} src = {friend.profile.profile_photo}/>
								<h3 onClick = {() => context.profile(friend.idKey)}>{friend.profile.first_name+' '+friend.profile.last_name}</h3>
							</div>
						}
						<div ref = {messagesContainerRef} className = {styles.messagesSection}>
							{messages.length > 0 && messages.map((msg) => {
							    switch (msg.type) {
							        case 'text':
							            return <Comment key={msg.id} toRight={msg.sender_id == context.user.id} message={msg} />;
							        case 'post':
							            return <PostShare key={msg.id} msg={msg} toRight={msg.sender_id == context.user.id} />;
							        case 'short':
							            return <ShortShare key={msg.id} msg={msg} toRight={msg.sender_id == context.user.id}/>;
							        default:
							            return null; // În caz că tipul de mesaj nu este recunoscut
							    }
							})}


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
						{/*
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
						*/}
					</div>
				</div>
			</main>
		</>
	);
}