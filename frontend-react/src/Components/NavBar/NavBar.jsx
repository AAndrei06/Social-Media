import styles from './navbar.module.css';
import photo from '../../assets/default.png';
import logo from '../../assets/logo.png';
import blank from '../../assets/blank_post.png';
import video from '../../assets/shortVideo.png';
import LeftItem from '../../Components/Item/LeftItem.jsx';
import Notification from '../../Components/Notifications/Notification.jsx';
import PostForm from '../PostForm/PostForm.jsx';
import profil from '../../assets/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMessage, faBell, faBars, faFileVideo, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useOutletContext } from 'react-router-dom';


export default function NavBar(props){
	const context = useOutletContext();
	const currentUser = context.user;
	const client = context.client;
	const searchRef = useRef();
	const [results, setResults] = useState([]);
	const [show, setShow] = useState(false);
	const [slide, setSlide] = useState(false);
	const [showNotification,setShowNotification] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState();
	const [type, setType] = useState('create');

	const err = context.err ? styles.err : '';

	useEffect(() => {
		if (context.user){
			console.log("ENTER!!!!!!!!!!!!!");
	        const pusher = new Pusher('8e2186322ddf08632270', {
	            cluster: 'eu',
	            encrypted: true,
	        });

	        const channel = pusher.subscribe(`notification-${context.user.id}`);

	        channel.bind('notification', (data) => {
	            console.log('New notification:', data);
	            setNotifications((prevNotifications) => [data.notification,...prevNotifications]);
	        });

	        return () => {
	            channel.unbind_all(); // Unbind all events
	            pusher.unsubscribe(`notification-${context.user.id}`); // Unsubscribe from the channel
	        };
	    }
    }, [context]);

	useEffect(() => {
		if (context.showAlert == true){
			setTimeout(() => {
				context.setShowAlert(o => false);
				context.setErr(o => false);
				context.setMessage(e => '');
			},3000);
		}
	},[context.message]);

	useEffect(() => {
		if (currentUser){
			const fetchNotifications = async () => {
				await client.get(`/notifications`).then(({data}) => {
				console.log(data);
			 	setNotifications(n => data);
			 	
			 });
			}
			fetchNotifications();
		}
	},[])

	async function search() {
	    try {
	        const query = searchRef.current.value;

	        if (!query || query.length < 1) {
	            console.error("Search query is required.");
	            return;
	        }

	        const response = await client.get('/search', {
	            params: { query: query },
	            headers: {
	                'Action-Of-Home': 'search',
	                'Content-Type': 'application/json'
	            },
	        });

	        setResults(r => response.data);

	        console.log('Search results:', response.data);
	    } catch (error) {
	        console.error('Error during search:', error);
	    }
	}

	function sendToSignup(){
		if (!currentUser){
			context.signup();
		}
	}

	

	function handleOpen(typeF){
		setType(type => typeF);
		setOpen(open => !open);
	}
	

	function showHide(){
		setSlide(s => false);
		setShowNotification(s => false);
		setShow(show => !show);
		document.getElementById("slider").style.transform = "translateX(0px)";
	}

	function showHideSlide(){
		setShow(s => false);
		setShowNotification(s => false);
		
		if (slide){
			setSlide(slide => false);
			document.getElementById("slider").style.transform = "translateX(0px)";
		}else{
			setSlide(slide => true);
			document.getElementById("slider").style.transform = "translateX(-300px)";
		}
	}

	function showHideNotifications(){
		setSlide(s => false);
		setShow(s => false);
		setShowNotification(s => !s);
		document.getElementById("slider").style.transform = "translateX(0px)";
	}

	function truncateHtml(html, length) {
	    const tempDiv = document.createElement('div');
	    tempDiv.innerHTML = html;
	    const textContent = tempDiv.textContent || tempDiv.innerText || '';
	    const truncatedText = textContent.length > length ? textContent.slice(0, length) + '...' : textContent;
	    return truncatedText;
	}

	function extractText(html) {
	    const tempElement = document.createElement('div');
	    tempElement.innerHTML = html;
	    return tempElement.innerText || tempElement.textContent;
	}

	return(
		<div className = {styles.navBar}>
			{open &&
				<PostForm setOpen = {setOpen} type = {type} idKey = {id}/>
			}
			
			{context.showAlert &&
				<div className = {styles.alert+' '+err}>
					<p>{context.message || "Bine ai venit!!!"}</p>
				</div>
			}
			<div id = "slider" className = {styles.menuSlide}>
				<h3>Meniu</h3>
				<div>
					{currentUser &&
						<div onClick = {() => context.profile(context.user.idKey)}>
							<LeftItem name = "Profil" img = {currentUser.profile.profile_photo}/>
						</div>
					}
					<div onClick = {() => context.home()}>
						<LeftItem name = "Acasă"/>
					</div>
					{currentUser &&
						<div onClick = {() => {sendToSignup();context.friends()}}>
							<LeftItem name = "Prieteni"/>
						</div>
					}
					<div onClick = {() => context.videos()}>
						<LeftItem name = "Videoclipuri Scurte"/>
					</div>
					{currentUser &&
						<>
							<div onClick = {() => {sendToSignup();context.chat()}}>
								<LeftItem name = "Mesaje"/>
							</div>
							<div onClick = {() => {sendToSignup();handleOpen("create")}}>
								<LeftItem name = "Creează Postare"/>
							</div>
							<div onClick = {() => {sendToSignup();handleOpen("video")}}>
								<LeftItem name = "Creează Videoclip"/>
							</div>
							<div onClick = {() => {sendToSignup();context.logout()}}>
								<LeftItem name = "Deconectează-te"/>
							</div>
						</>
					}
				</div>
			</div>
			{showNotification &&
				<div id = "notifications" className = {styles.notifications}>
					{notifications != [] && notifications.map(notification => (
						<Notification key = {notification.id} notification = {notification}/>
					))}
					
				</div>
			}


			{show &&
			<div className = {styles.searchSection}>
				<div className = {styles.inputSearch}>
					<FontAwesomeIcon className = {styles.glassIconSearch} icon={faMagnifyingGlass} />
					<input ref = {searchRef} onChange = {() => search()} type = "text"/>
					
				</div>
				<div className = {styles.resultsSearch}>
					{results.length > 0 && results.map(result => (
					    <div key={Math.floor(Math.random() * 100000000) + 1} className={styles.result}>
					        {result.type == 'profile' && (
					            <div onClick = {() => context.profile(result.data.user.idKey)} className={styles.infoLayout}>
					                <img src={result.data.profile_photo}/>
					                <div className={styles.textInfo}>
					                    <p>{result.data.first_name + ' ' + result.data.last_name}</p>
					                    <p>Utilizator</p>
					                </div>
					            </div>
					        )}
					        {result.type == 'post' && (
					            <div onClick = {() => context.goToPost(result.data.uuid)} className={styles.infoLayout}>
					                <img src={result.data.file ? (!result.data.file.endsWith('.mp4') ? result.data.file : blank) : blank}/>
					                <div className={styles.textInfo}>
					                    <p>{extractText(result.data.body).substring(0,20) + ((result.data.body.length > 20) ? '...' : '')}</p>
					                    <p>Postare</p>
					                </div>
					            </div>
					        )}
					        {result.type == 'video' && (
					            <div onClick = {() => context.goToShort(result.data.uuid)} className={styles.infoLayout}>
					                <img src={video}/>
					                <div className={styles.textInfo}>
					                    <p>{extractText(result.data.body).substring(0,20) + ((result.data.body.length > 20) ? '...' : '')}</p>
					                    <p>Video</p>
					                </div>
					            </div>
					        )}
					    </div>
					))}

				</div>
				<FontAwesomeIcon className = {styles.xMark} icon={faXmark} onClick = {showHide}/>
			</div>
			}
			<Link reloadDocument to="/">
				<div className = {styles.logoImg}>
					<img src = {logo}/>
					<p><span style = {{color: "#012780"}}>Mol</span><span style = {{color: "#fcd20f"}}>dstr</span><span style = {{color: "#cf0921"}}>eam</span></p>
				</div>
			</Link>
			<div className = {styles.navOperations}>
				<div className = {styles.navIcons}>
					<div onClick = {showHide} className = {styles.optionIcon}>
						<FontAwesomeIcon className = {styles.iconInside} icon={faMagnifyingGlass} />
					</div>
					<div onClick = {showHideSlide} className = {styles.optionIcon}>
						<FontAwesomeIcon className = {styles.iconInside} icon={faBars} />
					</div>

					{currentUser &&
						<>
							<div onClick = {() => context.chat()} className = {styles.optionIcon}>
								<FontAwesomeIcon className = {styles.iconInside} icon={faMessage} />
							</div>
							<div onClick = {showHideNotifications} className = {styles.optionIcon}>
								<FontAwesomeIcon className = {styles.iconInside} icon={faBell} />
							</div>
						
							<div onClick = {() => context.profile(context.user.idKey)} className = {styles.optionIcon}>
								<img src = {currentUser.profile.profile_photo}/>
							</div>
						</>
					}
					
					
				</div>
			</div>
		</div>
		);
};