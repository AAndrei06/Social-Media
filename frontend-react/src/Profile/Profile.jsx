import styles from './profile.module.css';
import NavBar from '../Components/NavBar/NavBar.jsx';
import back from '../assets/backImg.png';
import profile from '../assets/default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faBriefcase, faLocationDot, faCalendarDays, faHeart, faGraduationCap, faUserPlus, faImage, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Post from '../Components/Post/Post.jsx';
import FriendItem from '../Components/Item/FriendItem.jsx';
import Short from '../Components/Short/Short.jsx';
import { useOutletContext, useParams } from 'react-router-dom';
import { useRef } from 'react';

export default function Profile(){

	const context = useOutletContext();
	console.log('user');
	console.log(context.user);
	const { id } = useParams();
	const client = context.client;

	const backImgRef = useRef();
	const frontImgRef = useRef();
	const nameRef = useRef();
	const followsRef = useRef();
	const followedRef = useRef();
	const occupationRef = useRef();
	const locationRef = useRef();
	const educationRef = useRef();
	const personRef = useRef();
	const registeredRef = useRef();
	const resumeRef = useRef();

	client.get(`/profile/${id}`)
    .then(({ data }) => {
        if (data.profile){
        	const profile = data.profile;
        	backImgRef.current.src = profile.back_photo;
        	frontImgRef.current.src = profile.profile_photo;
        	nameRef.current.innerText = profile.last_name+' '+profile.first_name;
        	followsRef.current.innerText = profile.follows;
        	followedRef.current.innerText = profile.is_followed;
        	occupationRef.current.innerText = profile.occupation;
        	educationRef.current.innerText = profile.education;
        	locationRef.current.innerText = profile.location;
        	resumeRef.current.innerText = profile.resume;
        	personRef.current.innerText = profile.person;
        	const date = new Date(profile.created_at);
        	registeredRef.current.innerText = `${Number(date.getDay())/10 == 0 ? date.getDay() : '0'+date.getDay()}.${(Number(date.getMonth())+1)/10 == 0 ? date.getMonth() : '0'+date.getMonth()}.${date.getFullYear()}`
        }
    })
    .catch(err => {
        console.log(err);
    });

    const handleChangeBackImg = async (event) => {
        const file = event.target.files[0];
        if (file) {
        	
            const payload = {
            	'file':file
            };

            try {
                // Replace with your actual endpoint
                const response = await client.post(`profile/${id}`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Action-Of-Profile': 'bannerPhotoChange',
                    },
                });
                backImgRef.current.src = response.data.fileLink.image_url;
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleChangeFrontImg = async (event) => {
        const file = event.target.files[0];
        if (file) {
        	
            const payload = {
            	'file':file
            };

            try {
                // Replace with your actual endpoint
                const response = await client.post(`profile/${id}`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Action-Of-Profile': 'profilePhotoChange',
                    },
                });
                frontImgRef.current.src = response.data.fileLink.image_url;
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

return(
<>
<main className = {styles.mainArea}>
	<NavBar/>
		<div className = {styles.mainDiv}>
			<div className = {styles.leftDiv}>
				<div className = {styles.upDiv}>
					<div className = {styles.backImage}>
						<img ref = {backImgRef}/>
						<input onChange = {(e) => handleChangeBackImg(e)} id = "fileInp1" type="file" style={{ display: 'none'}}/>
						<div onClick = {() => {document.getElementById('fileInp1').click()}} className = {styles.addPhoto+' '+styles.addPhotoBack}>
							
							<FontAwesomeIcon className = {styles.iconChange} icon={faImage} />
							<h5>Schimbă Fotografia</h5>
						</div>
					</div>
					<div className = {styles.profileInfo}>
						<div className = {styles.profileImage}>
							<img ref = {frontImgRef}/>
							<input onChange = {(e) => handleChangeFrontImg(e)} id = "fileInp2" type="file" style={{ display: 'none'}}/>
							<div onClick = {() => {document.getElementById('fileInp2').click()}} className = {styles.addPhoto+' '+styles.addPhotoProfile}>
								<FontAwesomeIcon className = {styles.iconChange} icon={faImage} />
								<h5>Schimbă Fotografia</h5>
							</div>
						</div>
						<div className = {styles.profileText}>
							<h2 ref = {nameRef}></h2>
							<p><span ref = {followedRef}>27</span> de urmăritori</p>
							<p><span ref = {followsRef}>56</span> urmărește</p>
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
								<h5 ref = {occupationRef}>Manager de Proiect la Amdaris</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faLocationDot} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Locuiește</h4>
								<h5 ref = {locationRef}>Leova Moldova</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faGraduationCap} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Educație</h4>
								<h5 ref = {educationRef}>La Universitatea Harvard</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faHeart} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Împreună Cu</h4>
								<h5 ref = {personRef}>Nimeni</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faCalendarDays} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Înregistrat la</h4>
								<h5 ref = {registeredRef}>14.09.2024</h5>
							</div>
						</div>
					</div>
				</div>

				
				<div className = {styles.downDiv}>
					<h3>Rezumat</h3>
					<div className = {styles.edit+' '+styles.summaryEdit}>
						<button><FontAwesomeIcon className = {styles.icon} icon={faPen} />&nbsp;&nbsp;Editează</button>
					</div>
					<div className = {styles.resumeSpace} ref = {resumeRef}>
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
								<h5 ref = {occupationRef}>Manager de Proiect la Amdaris</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faLocationDot} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Locuiește</h4>
								<h5 ref = {locationRef}>Leova Moldova</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faGraduationCap} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Educație</h4>
								<h5 ref = {educationRef}>La Universitatea Harvard</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faHeart} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Împreună Cu</h4>
								<h5 ref = {personRef}>Nimeni</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faCalendarDays} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Înregistrat la</h4>
								<h5 ref = {registeredRef}>14.09.2024</h5>
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