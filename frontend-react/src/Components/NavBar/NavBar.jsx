import styles from './navbar.module.css';
import photo from '../../assets/default.png';
import logo from '../../assets/logo.png';
import LeftItem from '../../Components/Item/LeftItem.jsx';
import Notification from '../../Components/Notifications/Notification.jsx';
import profil from '../../assets/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMessage, faBell, faBars, faFileVideo, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { Link, Navigate, useOutletContext } from 'react-router-dom';

export default function NavBar(){
	const context = useOutletContext();

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
					<input type = "text"/>
					
				</div>
				<div className = {styles.resultsSearch}>
					<div className = {styles.result}>
						<div className = {styles.infoLayout}>
							<img src = {photo}/>
							<div className = {styles.textInfo}>
								<p>Andrei Arseni</p>
								<p>Cont</p>
							</div>
						</div>
					</div>
					
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