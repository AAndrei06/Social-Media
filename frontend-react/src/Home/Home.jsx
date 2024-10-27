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
import { useState, useRef, useEffect } from 'react';
import CommentsSection from '../Components/CommentsSection/CommentsSection.jsx';
import LikeSide from '../Components/LikeSide/LikeSide.jsx';
import StoryView from '../Components/StoryView/StoryView.jsx';

import { useOutletContext, useParams } from 'react-router-dom';

function Home(){

	const context = useOutletContext();
	const client = context.client;

	const [posts, setPosts] = useState([]);
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [commentPostId, setCommentPostId] = useState('1');
	const [likePostId, setLikePostId] = useState('1');
	const [story, setStory] = useState({});
	const [show, setShow] = useState(false);
	const [open, setOpen] = useState(false);
	const [likeOpen, setLikeOpen] = useState(false);
	const [storyOpen, setStoryOpen] = useState(false);
	const [type, setType] = useState("create");
	const [id, setId] = useState('nothing');
	const [suggestions, setSuggestions] = useState([]);
	const [post, setPost] = useState(null);
	const { uuid } = useParams();

	console.log(uuid);
	useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await client.get(`post/get/${uuid}`);
            console.log(response.data);
            setPost(response.data);
        }catch(err){
        	console.log(err);
        }
    };

    fetchPost();
        
    }, []);

	useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await client.get('/');
            setPosts(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStories = async () => {
        try {
            const response = await client.get('/story/get');
            setStories(response.data);
            console.log("stories");
            console.log(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    async function getAll(){
		client.get('/friends/get').then(({data}) => {
			console.log(data);
			setSuggestions(data.suggestions);
		});
	}

	getAll();
    fetchStories();
    fetchPosts();
        
    }, []);
	if (loading) return <p>Loading...</p>;
	

	function handleOpen(typeF){
		setType(type => typeF);
		setOpen(open => !open);
	}

	function handleShow(){
		setShow(show => !show);
	}


return(
<>
<main className = {styles.mainArea}>
	<NavBar/>
		<LikeSide uuidPost = {likePostId} set = {setLikeOpen} open = {likeOpen}/>
		<CommentsSection type = {"homePost"} uuidPost = {commentPostId} set = {setShow} open = {show}/>
		{open &&
		<PostForm setOpen = {setOpen} type = {type} idKey = {id}/>
		}
		{storyOpen &&
		<StoryView story = {story} set = {setStoryOpen} open = {storyOpen}/>
		}
		<div className = {styles.bodyPart}>
			<div className = {styles.leftSide}>
				<div className = {styles.menuList}>
					<div onClick = {() => context.profile(context.user.idKey)}>
						<LeftItem name = "Profil" img = {profil}/>
					</div>
					<div onClick = {() => context.home()}>
						<LeftItem name = "Acasă"/>
					</div>
					<div onClick = {() => context.friends()}>
						<LeftItem name = "Prieteni"/>
					</div>
					<div onClick = {() => context.videos()}>
						<LeftItem name = "Videoclipuri Scurte"/>
					</div>
					<div onClick = {() => context.chat()}>
						<LeftItem name = "Mesaje"/>
					</div>
					<div onClick = {() => handleOpen("create")}>
						<LeftItem name = "Creează Postare"/>
					</div>
					<div onClick = {() => handleOpen("video")}>
						<LeftItem name = "Creează Videoclip"/>
					</div>
				</div>
				<div className = {styles.menuList}>
					
											</div>
										</div>
										<div className = {styles.centerSide}>
											<h3 className = {styles.H3}>Povești</h3>
											<div className = {styles.storyDiv}>

												<Story func = {handleOpen} create/>
												{stories != [] && stories.map(story => (
													<Story setStory = {setStory} key = {story.uuid} set = {setStoryOpen} story = {story} open = {storyOpen}/>
												))}
												
												
											</div>
											<div className = {styles.postSection}>
												<div>
													{post != null &&
														<Post 
															fullname = {post.user.profile.first_name+' '+post.user.profile.last_name}
															body = {post.body}
															nrComments = {post.nr_of_comments}
															created = {post.created_at}
															user_photo = {post.user.profile.profile_photo}
															file = {post.file} 
															key = {post.uuid} 
															func = {handleOpen} 
															set = {handleShow}
															setId = {setId} 
															show = {handleShow} 
															like = {likeOpen} 
															setLike = {setLikeOpen}
															idKey = {post.uuid}
															setCommentPostId = {setCommentPostId}
															setLikePostId = {setLikePostId}
															liked = {post.liked_by_user}
															nrLikes = {post.like_count}
															/>

													}
													{post == null && posts.map(post => (
														<Post 
															fullname = {post.user.profile.first_name+' '+post.user.profile.last_name}
															body = {post.body}
															nrComments = {post.nr_of_comments}
															created = {post.created_at}
															user_photo = {post.user.profile.profile_photo}
															file = {post.file} 
															key = {post.uuid} 
															func = {handleOpen} 
															set = {handleShow}
															setId = {setId} 
															show = {handleShow} 
															like = {likeOpen} 
															setLike = {setLikeOpen}
															idKey = {post.uuid}
															setCommentPostId = {setCommentPostId}
															setLikePostId = {setLikePostId}
															liked = {post.liked_by_user}
															nrLikes = {post.like_count}
															/>

														))}
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
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
															<div onClick = {() => context.profile(3)}>
																<FriendItem suggestion = {false} name = "Parinti" img = "src/assets/test.png"/>
															</div>
														</div>
														<h3 className = {styles.friendsH3}>Sugestii de prietenie</h3>
														<div id = "suggestion-friends">
														{suggestions != [] && suggestions.map(suggestion => (
															<FriendItem suggestion = {true} user = {suggestion}/>
														))}
															
														
															
														</div>
														
													</div>
												</div>
											</div>
										</main>
										</>
										);
										}
										export default Home;