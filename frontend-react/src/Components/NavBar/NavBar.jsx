import styles from './navbar.module.css';
import photo from '../../assets/default.png';
import logo from '../../assets/logo.png';
import LeftItem from '../../Components/Item/LeftItem.jsx';
import Notification from '../../Components/Notifications/Notification.jsx';
import profil from '../../assets/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMessage, faBell, faBars, faFileVideo, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

export default function NavBar(){

const [show, setShow] = useState(false);
const [slide, setSlide] = useState(false);
const [showNotification,setShowNotification] = useState(false);

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


		<div id = "slider" className = {styles.menuSlide}>
			<h3>Meniu</h3>
			<div>
				<LeftItem name = "Profil" img = {profil}/>
				<LeftItem name = "Acasă"/>
				<LeftItem name = "Prieteni"/>
				<LeftItem name = "Videoclipuri Scurte"/>
				<LeftItem name = "Mesaje"/>
				<LeftItem name = "Favorite"/>
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
		<div className = {styles.logoImg}>
			<img src = {logo}/>
			<p><span style = {{color: "#012780"}}>Mol</span><span style = {{color: "#fcd20f"}}>dstr</span><span style = {{color: "#cf0921"}}>eam</span></p>
		</div>
		<div className = {styles.navOperations}>
			<div className = {styles.navIcons}>
				<div onClick = {showHide} className = {styles.optionIcon}>
					<FontAwesomeIcon className = {styles.iconInside} icon={faMagnifyingGlass} />
				</div>
				<div onClick = {showHideSlide} className = {styles.optionIcon}>
					<FontAwesomeIcon className = {styles.iconInside} icon={faBars} />
				</div>
				<div className = {styles.optionIcon}>
					<FontAwesomeIcon className = {styles.iconInside} icon={faMessage} />
				</div>
				<div onClick = {showHideNotifications} className = {styles.optionIcon}>
					<FontAwesomeIcon className = {styles.iconInside} icon={faBell} />
				</div>
				
				<div className = {styles.optionIcon}>
					<img src = {photo}/>
				</div>
			</div>
		</div>
	</div>
	);
};