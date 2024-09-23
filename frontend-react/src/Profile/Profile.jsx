import styles from './profile.module.css';
import NavBar from '../Components/NavBar/NavBar.jsx';
import back from '../assets/backImg.png';
import profile from '../assets/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faBriefcase, faLocationDot, faCalendarDays, faHeart, faGraduationCap, faUserPlus, faImage, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Post from '../Components/Post/Post.jsx';
import FriendItem from '../Components/Item/FriendItem.jsx';
import Short from '../Components/Short/Short.jsx';

export default function Profile(){
return(
<>
<main className = {styles.mainArea}>
	<NavBar/>
		<div className = {styles.mainDiv}>
			<div className = {styles.leftDiv}>
				<div className = {styles.upDiv}>
					<div className = {styles.backImage}>
						<img src = {back}/>
						<div className = {styles.addPhoto+' '+styles.addPhotoBack}>
							<FontAwesomeIcon className = {styles.iconChange} icon={faImage} />
							<h5>Schimbă Fotografia</h5>
						</div>
					</div>
					<div className = {styles.profileInfo}>
						<div className = {styles.profileImage}>
							<img src = {profile}/>
							<div className = {styles.addPhoto+' '+styles.addPhotoProfile}>
								<FontAwesomeIcon className = {styles.iconChange} icon={faImage} />
								<h5>Schimbă Fotografia</h5>
							</div>
						</div>
						<div className = {styles.profileText}>
							<h2>Arseni Andrei</h2>
							<p>27 de urmăritori</p>
							<p>56 urmărește</p>
						</div>
						<div className = {styles.follow}>
							<button><FontAwesomeIcon className = {styles.icon} icon={faUserPlus} />&nbsp;&nbsp;Urmărește</button>
						</div>

						
					</div>
					<div className = {styles.friendsPhone}>
						<h3>Prieteni Comuni</h3>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					</div>
				</div>

				<div className = {styles.aboutMePhone}>
					<h3>Despre Mine</h3>
					<div className = {styles.edit+' '+styles.aboutEdit}>
						<button><FontAwesomeIcon className = {styles.icon} icon={faPen} />&nbsp;&nbsp;Editează</button>
					</div>
					<div className = {styles.infoGroup}>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faBriefcase} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Ocupație</h4>
								<h5>Manager de Proiect la Amdaris</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faLocationDot} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Locuiește</h4>
								<h5>Leova Moldova</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faGraduationCap} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Educație</h4>
								<h5>La Universitatea Harvard</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faHeart} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Împreună Cu</h4>
								<h5>Nimeni</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faCalendarDays} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Înregistrat la</h4>
								<h5>14.09.2024</h5>
							</div>
						</div>
					</div>
				</div>

				
				<div className = {styles.downDiv}>
					<h3>Rezumat</h3>
					<div className = {styles.edit+' '+styles.summaryEdit}>
						<button><FontAwesomeIcon className = {styles.icon} icon={faPen} />&nbsp;&nbsp;Editează</button>
					</div>
					<div>
					Lorem Ipsum is simply dummy text of the printing and typesetting 
					industry. Lorem Ipsum has been the industry's standard dummy text
					 ever since the 1500s, when an unknown printer took a galley of 
					 type and scrambled it to make a type specimen book. It has survived 
					 not only five centuries, but also the leap into electronic typesetting,
					  remaining essentially unchanged. It was popularised in the 1960s with 
					  the release of Letraset sheets containing
					 Lorem Ipsum passages, and more recently with desktop publishing 
					 software like Aldus PageMaker including versions of Lorem Ipsum.
					</div>
				</div>
				
				<div>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
					<Post bd/>
				</div>

				<br/>
				<br/>
				
			</div>

			<div className = {styles.rightDiv}>
				<div className = {styles.aboutMe}>
					<h3>Despre Mine</h3>
					<div className = {styles.edit+' '+styles.aboutEdit+' '+styles.actualEdit}>
						<button><FontAwesomeIcon className = {styles.icon} icon={faPen} />&nbsp;&nbsp;Editează</button>
					</div>
					<div className = {styles.infoGroup}>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faBriefcase} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Ocupație</h4>
								<h5>Manager de Proiect la Amdaris</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faLocationDot} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Locuiește</h4>
								<h5>Leova Moldova</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faGraduationCap} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Educație</h4>
								<h5>La Universitatea Harvard</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faHeart} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Împreună Cu</h4>
								<h5>Nimeni</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faCalendarDays} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Înregistrat la</h4>
								<h5>14.09.2024</h5>
							</div>
						</div>
					</div>
				</div>
				<div className = {styles.friends}>
					<h3>Prieteni Comuni</h3>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
					<FriendItem suggestion = {false} name = "Andrei Arseni" img = "src/assets/test.png"/>
				</div>
			</div>
		</div>
	</main>
	</>
	);
	}