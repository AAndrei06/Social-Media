import styles from './navbar.module.css';
import photo from '../../assets/default.png';
import logo from '../../assets/logo.png';
import blank from '../../assets/blank_post.png';
import LeftItem from '../../Components/Item/LeftItem.jsx';
import Notification from '../../Components/Notifications/Notification.jsx';
import profil from '../../assets/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMessage, faBell, faBars, faFileVideo, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useOutletContext } from 'react-router-dom';


export default function NavBar(props){
	const context = useOutletContext();
	const client = context.client;
	const searchRef = useRef();
	const [results, setResults] = useState([]);
	const [show, setShow] = useState(false);
	const [slide, setSlide] = useState(false);
	const [showNotification,setShowNotification] = useState(false);
	const err = context.err ? styles.err : '';
	console.log(context.err);

	useEffect(() => {
		if (context.showAlert == true){
			setTimeout(() => {
				context.setShowAlert(o => !o);
				context.setErr(o => false);
				context.setMessage(e => '');
			},3000);
		}
	},[context.message]);

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



	function handleOpen(typeF){
		props.setType(type => typeF);
		props.setOpen(open => !open);
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
	    const tempElement = document.createElement('div'); // Create a temporary element
	    tempElement.innerHTML = html; // Set the innerHTML to the HTML string
	    return tempElement.innerText || tempElement.textContent; // Return the text content
	}

	return(
		<div className = {styles.navBar}>
			{context.showAlert &&
				<div className = {styles.alert+' '+err}>
					<p>{context.message || "Bine ai venit!!!"}</p>
				</div>
			}
			<div id = "slider" className = {styles.menuSlide}>
				<h3>Meniu</h3>
				<div>
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
			</div>
			{showNotification &&
				<div id = "notifications" className = {styles.notifications}>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
					<Notification/>
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
					    <div key={result.data.id} className={styles.result}>
					        {result.type === 'profile' && (
					            <div className={styles.infoLayout}>
					                <img src={result.data.profile_photo}/>
					                <div className={styles.textInfo}>
					                    <p>{result.data.first_name + ' ' + result.data.last_name}</p>
					                    <p>Utilizator</p>
					                </div>
					            </div>
					        )}
					        {result.type === 'post' && (
					            <div className={styles.infoLayout}>
					                <img src={result.data.file ? result.data.file : blank}/>
					                <div className={styles.textInfo}>
					                    <p>{extractText(result.data.body).substring(0,20) + ((result.data.body.length > 20) ? '...' : '')}</p>
					                    <p>Postare</p>
					                </div>
					            </div>
					        )}
					        {result.type === 'video' && (
					            <div className={styles.infoLayout}>
					                <img src={result.data.profile_photo}/>
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
					<div onClick = {() => context.chat()} className = {styles.optionIcon}>
						<FontAwesomeIcon className = {styles.iconInside} icon={faMessage} />
					</div>
					<div onClick = {showHideNotifications} className = {styles.optionIcon}>
						<FontAwesomeIcon className = {styles.iconInside} icon={faBell} />
					</div>
					
					<div onClick = {() => context.profile(context.user.idKey)} className = {styles.optionIcon}>
						<img src = {photo}/>
					</div>
					
				</div>
			</div>
		</div>
		);
};