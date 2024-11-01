import styles from './short.module.css';
import like from '../../assets/heartB.png';
import comment from '../../assets/commentShort.png';
import share from '../../assets/shareShort.png';
import man from '../../assets/man.png';
import heartB from '../../assets/heartB.png';
import heartA from '../../assets/heartA.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import video from '../../assets/large.mp4';
import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Short(props){

	const context = useOutletContext();
	const client = context.client;
	const user = context.user;
	if (user){
	const imgRef = useRef();
	const nrOfLikes = useRef();

	const [pause, setPause] = useState(false);
	const [desc, setDesc] = useState(false);
	const ref = useRef();

	function handlePause(){
		if (ref.current.paused){
			ref.current.play();
		}else{
			ref.current.pause();
		}
	}

	function handleReport(){
		console.log("Report");
	}

	async function handleLikeVideo(){
		try {
            const response = await client.post(`/video/like/${props.video.uuid}`, {
                headers: {
                    'Action-Of-Home': 'likeVideo',
                },
            });
            if (response.data.msg == "Liked"){
            	imgRef.current.src = heartA;
            	nrOfLikes.current.innerText = response.data.nr;
            }else{
            	imgRef.current.src = heartB;
            	nrOfLikes.current.innerText = response.data.nr;
            }
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
	}

	async function handleDeleteShort(){
		try {
            const response = await client.post(`/video/delete/${props.video.uuid}`, {
                headers: {
                    'Action-Of-Home': 'deleteVideo',
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
	}

	useEffect(() => {
		if (props.play){
			ref.current.play();
		}else{
			ref.current.pause();
		}
	},[props]);

	function prepareForSend(){
		props.setSendOpen(true);
		props.setIdOfSend(props.video.uuid);
	}

	return(
		<>
			<div className = {styles.video}>
				<div className = {styles.display}>
					<div className = {styles.info} onClick = {() => context.profile(props.video.user.idKey)}>
						<img src = {props.video.user.profile.profile_photo}/>
						<h5>{props.video.user.profile.first_name + ' ' + props.video.user.profile.last_name}</h5>
					</div>
					<div className = {styles.controls}>
						{props.video.user.idKey == user.idKey &&
							<div onClick = {() => handleDeleteShort()} className = {styles.control}>
								<FontAwesomeIcon icon={faTrashCan} />
							</div>
						}
						{!props.video.user.idKey == user.idKey &&
							<div onClick = {handleReport} className = {styles.control}>
								<FontAwesomeIcon icon={faCircleExclamation} />
							</div>
						}
					</div>
					<video ref = {ref} onClick = {handlePause}>
						<source src={props.video.file} type="video/mp4"/>
					</video>
					<div className = {styles.description}>
					{desc &&
						<>
							<p dangerouslySetInnerHTML={{ __html: props.video.body }}></p>
							<div onClick = {() => setDesc(desc => !desc)} className = {styles.more}>
								Mai puțin...
							</div>
						</>
					}
					{!desc &&
						<>
							<p dangerouslySetInnerHTML={{ __html: props.video.body.slice(0,30) }}></p>
							<div onClick = {() => setDesc(desc => !desc)} className = {styles.more}>
								Mai mult...
							</div>
						</>
					}
					
					</div>
				</div>
				<div className = {styles.optionSection}>
					<div className = {styles.option}>
						<img onClick = {() => handleLikeVideo()} ref = {imgRef} src = {props.video.liked_by_user ? heartA : heartB}/>
						<p ref = {nrOfLikes}>{props.video.like_count}</p>
					</div>

					<div onClick = {() => {props.set(o => !o);props.setId(id => props.video.uuid)}} className = {styles.option}>
						<img src = {comment}/>
						<p>{props.video.nr_of_comments}</p>
					</div>
					<div onClick = {() => prepareForSend()} className = {styles.option}>
						<img src = {share}/>
						<p>53</p>
					</div>
				</div>
			</div>
		</>
	);
}
}