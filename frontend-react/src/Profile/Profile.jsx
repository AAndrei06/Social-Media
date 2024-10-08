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
import { useRef, useState, useEffect } from 'react';

export default function Profile(){

	const context = useOutletContext();
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

	const occupationRef2 = useRef();
	const locationRef2 = useRef();
	const educationRef2 = useRef();
	const personRef2 = useRef();
	const registeredRef2 = useRef();
	const resumeRef = useRef();

	const [editingInfoRefs, setEditingInfoRefs] = useState(false);
	const [editingInfoRefs2, setEditingInfoRefs2] = useState(false);
	const [editBio, setEditBio] = useState(false);

	const infoListRefs = [occupationRef, locationRef, educationRef, personRef];
	const infoListRefs2 = [occupationRef2, locationRef2, educationRef2, personRef2];

	for (let ref of infoListRefs){
		useEffect(() => {
		    ref.current.addEventListener('change', () => {
		    	console.log('hello'+ref.current.innerHTML);
		    });
		    return () => {
		      ref.current.removeEventListener('change',() => {
		    	console.log('hello'+ref.current.innerHTML);
		    });
		    };
		  }, []);
	}

	function checkInputLenght(ev){
		if (ev.target.innerText.length > 40){
			ev.target.innerText = ev.target.innerText.slice(0, 40);
			const range = document.createRange();
	      	const sel = window.getSelection();
	      	range.selectNodeContents(ev.target);
	      	range.collapse(false);
	     	sel.removeAllRanges();
	      	sel.addRange(range); 
			console.log('Hello');
		}
	}

	function handleEditing(){

		if (!editingInfoRefs){
			setEditingInfoRefs(true);
			for (let ref of infoListRefs){
				ref.current.contentEditable = true;
				ref.current.style.border = "1px solid gray";
				ref.current.style.borderRadius = "3px";
			}
		}else{
			sendChangesInfo({
				'occupation' : infoListRefs[0].current.innerText,
				'location' : infoListRefs[1].current.innerText,
				'education' : infoListRefs[2].current.innerText,
				'person' : infoListRefs[3].current.innerText
			});
			console.log(infoListRefs[0].current.innerHTML);
			setEditingInfoRefs(false);
			for (let ref of infoListRefs){
				ref.current.contentEditable = false;
				ref.current.style.border = "none";
			}
		}
	}

	function handleEditing2(){

		if (!editingInfoRefs2){
			setEditingInfoRefs2(true);
			for (let ref of infoListRefs2){
				ref.current.contentEditable = true;
				ref.current.style.border = "1px solid gray";
				ref.current.style.borderRadius = "3px";
			}
		}else{
			sendChangesInfo({
				'occupation' : infoListRefs2[0].current.innerText,
				'location' : infoListRefs2[1].current.innerText,
				'education' : infoListRefs2[2].current.innerText,
				'person' : infoListRefs2[3].current.innerText
			});
			console.log(infoListRefs2[0].current.innerHTML);
			setEditingInfoRefs2(false);
			for (let ref of infoListRefs2){
				ref.current.contentEditable = false;
				ref.current.style.border = "none";
			}
		}
	}


	async function sendChangesInfo(payload){
		try {
            const response = await client.post(`profile/${id}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Action-Of-Profile': 'updateInfo',
                },
            });

            console.log(response);

        } catch (error) {
            console.log('Eroare');
        }
	}


	async function handleBio(){

		if (!editBio){
			setEditBio(true);
			resumeRef.current.contentEditable = true;
			resumeRef.current.style.border = "1px solid gray";
			resumeRef.current.style.borderRadius = "3px";
			
	    }else{
	    	setEditBio(false);
	    	try {

	            const response = await client.post(`profile/${id}`, {'resume':resumeRef.current.innerText}, {
	                headers: {
	                    'Content-Type': 'multipart/form-data',
	                    'Action-Of-Profile': 'updateResume',
	                },
	            });
	            console.log(response);
	            resumeRef.current.innerText = response.data;
	        } catch (error) {
	            console.log('Eroare');
	        }

	        resumeRef.current.contentEditable = false;
	        resumeRef.current.style.border = 'none';
	    }
	}


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

        	occupationRef2.current.innerText = profile.occupation;
        	educationRef2.current.innerText = profile.education;
        	locationRef2.current.innerText = profile.location;
        	personRef2.current.innerText = profile.person;

        	const date = new Date(profile.created_at);
        	registeredRef.current.innerText = `${Number(date.getDay())/10 == 0 ? date.getDay() : '0'+date.getDay()}.${(Number(date.getMonth())+1)/10 == 0 ? date.getMonth() : '0'+date.getMonth()}.${date.getFullYear()}`;
        	registeredRef2.current.innerText = `${Number(date.getDay())/10 == 0 ? date.getDay() : '0'+date.getDay()}.${(Number(date.getMonth())+1)/10 == 0 ? date.getMonth() : '0'+date.getMonth()}.${date.getFullYear()}`;
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
						<div className = {styles.infoBtns}>
							<button>Videoclipuri scurte</button>
							<button>Videoclipuri scurte</button>
						</div>
						
					</div>
					<div className = {styles.friendsPhone}>
						<h3>Prieteni Comuni</h3>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "../assets/test.png"/>
						<FriendItem suggestion = {false} name = "Andrei Arseni" img = "./src/assets/test.png"/>
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
					<div className = {styles.btnPhoneAbout}>
						{!editingInfoRefs2 &&
							<button onClick = {() => handleEditing2()}><FontAwesomeIcon className = {styles.icon} icon={faPen} />&nbsp;&nbsp;Editează</button>
						}
						{editingInfoRefs2 &&
							<button onClick = {() => handleEditing2()}><FontAwesomeIcon className = {styles.icon} icon={faCircleCheck} />&nbsp;&nbsp;Salvează</button>
						}
					</div>
					<div className = {styles.infoGroup}>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faBriefcase} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Ocupație</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {occupationRef2}></h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faLocationDot} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Locuiește</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {locationRef2}>Leova Moldova</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faGraduationCap} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Educație</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {educationRef2}>La Universitatea Harvard</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faHeart} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Împreună Cu</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {personRef2}>Nimeni</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faCalendarDays} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Înregistrat la</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {registeredRef2}>14.09.2024</h5>
							</div>
						</div>
					</div>
				</div>

				
				<div className = {styles.downDiv}>
					<h3>Rezumat</h3>
					<div className = {styles.edit+' '+styles.summaryEdit}>
					{!editBio &&
						<button onClick = {() => handleBio()}><FontAwesomeIcon className = {styles.icon} icon={faPen} />&nbsp;&nbsp;Editează</button>
					}
					{editBio &&
						<button onClick = {() => handleBio()}><FontAwesomeIcon className = {styles.icon} icon={faCircleCheck} />&nbsp;&nbsp;Salvează</button>
					}
					</div>
					<div className = {styles.resumeSpace}>
					<p ref = {resumeRef}>
					Lorem Ipsum is simply dummy text of the printing and typesetting 
					industry. Lorem Ipsum has been the industry's standard dummy text
					 ever since the 1500s, when an unknown printer took a galley of 
					 type and scrambled it to make a type specimen book. It has survived 
					 not only five centuries, but also the leap into electronic typesetting,
					  remaining essentially unchanged. It was popularised in the 1960s with 
					  the release of Letraset sheets containing
					 Lorem Ipsum passages, and more recently with desktop publishing 
					 software like Aldus PageMaker including versions of Lorem Ipsum.
					 </p>
					</div>
				</div>
			</div>

			<div className = {styles.rightDiv}>
				<div className = {styles.aboutMe}>
					<h3>Despre Mine</h3>
					<div className = {styles.edit+' '+styles.aboutEdit+' '+styles.actualEdit}>
						{!editingInfoRefs &&
							<button onClick = {() => handleEditing()}><FontAwesomeIcon className = {styles.icon} icon={faPen} />&nbsp;&nbsp;Editează</button>
						}
						{editingInfoRefs &&
							<button onClick = {() => handleEditing()}><FontAwesomeIcon className = {styles.icon} icon={faCircleCheck} />&nbsp;&nbsp;Salvează</button>
						}
					</div>
					<div className = {styles.infoGroup}>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faBriefcase} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Ocupație</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {occupationRef}></h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faLocationDot} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Locuiește</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {locationRef}>Leova Moldova</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faGraduationCap} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Educație</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {educationRef}>La Universitatea Harvard</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faHeart} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Împreună Cu</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {personRef}>Nimeni</h5>
							</div>
						</div>
						<div className = {styles.infoItem}>
							<div className = {styles.iconInfo}>
								<FontAwesomeIcon icon={faCalendarDays} />
							</div>
							<div className = {styles.textInfo}>
								<h4>Înregistrat la</h4>
								<h5 onInput = {(e) => checkInputLenght(e)} ref = {registeredRef}>14.09.2024</h5>
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