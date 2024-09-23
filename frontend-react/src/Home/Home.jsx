import '../general.css';
import styles from './home.module.css';
import Story from '../Components/Story/Story.jsx';
import LeftItem from '../Components/Item/LeftItem.jsx';
import GroupItem from '../Components/Item/GroupItem.jsx';
import NavBar from '../Components/NavBar/NavBar.jsx';
import FriendItem from '../Components/Item/FriendItem.jsx'
import Post from '../Components/Post/Post.jsx';
import profil from '../assets/default.png';
import PostComment from '../Components/PostComment/PostComment.jsx';
import PostForm from '../Components/PostForm/PostForm.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronLeft, faChevronRight, faPaperclip, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef } from 'react';
import CommentsSection from '../Components/CommentsSection/CommentsSection.jsx';
import LikeSide from '../Components/LikeSide/LikeSide.jsx';

function Home(){

	const [show, setShow] = useState(false);
	const [open, setOpen] = useState(false);
	const [likeOpen, setLikeOpen] = useState(false);

	function handleShow(){
		setShow(show => !show);
	}

return(
<>
<main className = {styles.mainArea}>
	<NavBar/>
		<LikeSide set = {setLikeOpen} open = {likeOpen}/>
		<CommentsSection set = {setShow} open = {show}/>
		{open &&
		<PostForm setOpen = {setOpen}/>
		}
		<div className = {styles.bodyPart}>
			<div className = {styles.leftSide}>
				<div className = {styles.menuList}>
					<LeftItem name = "Profil" img = {profil}/>
					<LeftItem name = "Acasă"/>
					<LeftItem name = "Prieteni"/>
					<LeftItem name = "Videoclipuri Scurte"/>
					<LeftItem name = "Mesaje"/>
					<LeftItem name = "Favorite"/>
					<div onClick = {() => setOpen(open => !open)}>
						<LeftItem name = "Creează Postare"/>
					</div>
				</div>
				<div className = {styles.menuList}>
					
											</div>
										</div>
										<div className = {styles.centerSide}>
											<h3 className = {styles.H3}>Povești</h3>
											<div className = {styles.storyDiv}>

												<Story create/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
												<Story/>
											</div>
											<div className = {styles.postSection}>
												<div>
													<Post set = {handleShow} show = {handleShow} like = {likeOpen} setLike = {setLikeOpen}/>
														<Post set = {handleShow} show = {handleShow} like = {likeOpen} setLike = {setLikeOpen}/>
														</div>
														<br/>
														<br/>
														<br/>
														<br/>
														<br/>
														<br/>
														<br/>
														<br/>
														<br/>
														<br/>
													</div>
												</div>
												<div className = {styles.rightSide}>
													<div className = {styles.menuList}>
														<h3 className = {styles.friendsH3}>Prieteni activi</h3>
														<div id = "active-friends">
															<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
														</div>
														<h3 className = {styles.friendsH3}>Sugestii de prietenie</h3>
														<div id = "suggestion-friends">
															<FriendItem suggestion = {true} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {true} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {true} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {true} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {true} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {true} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {true} name = "Parinti" img = "src/assets/test.png"/>
															<FriendItem suggestion = {true} name = "Parinti" img = "src/assets/test.png"/>
														</div>
														
													</div>
												</div>
											</div>
										</main>
										</>
										);
										}
										export default Home;