import styles from './short.module.css';
import like from '../../assets/heartB.png';
import comment from '../../assets/commentShort.png';
import share from '../../assets/shareShort.png';
import man from '../../assets/man.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import video from '../../assets/large.mp4';
import { useState, useRef, useEffect } from 'react';

export default function Short(props){

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

	useEffect(() => {
		if (props.play){
			ref.current.play();
		}else{
			ref.current.pause();
		}
	},[props]);

	return(
		<>
			<div className = {styles.video}>
				<div className = {styles.display}>
					<div className = {styles.info}>
						<img src = {man}/>
						<h5>Mihai Arseni Mititel</h5>
					</div>
					<div className = {styles.controls}>
						<div onClick = {handleReport} className = {styles.control}>
							<FontAwesomeIcon icon={faCircleExclamation} />
						</div>
					</div>
					<video ref = {ref} onClick = {handlePause}>
						<source src={video} type="video/mp4"/>
					</video>
					<div className = {styles.description}>
					{desc &&
						<p>Lorem Ipsum is simply dummy text of the printing and typ
						esetting industry. Lorem Ipsum has been the industry's standard
						 dummy text ever since the 1500s, when an unknown printer took a galley of 
						 type and scrambled it to make a type specimen book. It has survived not only
						  five centuries, but also the leap into electronic typesetting, r
						  emaining essentially unchanged. It was popularised in the 1960s
						   with the release of Letraset sheets containing Lorem Ipsum passages, and
						 more recently with desktop publishing software like Aldus Pa
						 geMaker including versions of Lorem Ipsum.</p>
					}
					{!desc &&
						<p>Lorem Ipsum is simply dummy text of...</p>
					}
					<div onClick = {() => setDesc(desc => !desc)} className = {styles.more}>
						Mai mult...
					</div>
					</div>
				</div>
				<div className = {styles.optionSection}>
					<div className = {styles.option}>
						<img src = {like}/>
						<p>3453453</p>
					</div>

					<div onClick = {() => props.set(o => !o)} className = {styles.option}>
						<img src = {comment}/>
						<p>333</p>
					</div>
					<div className = {styles.option}>
						<img src = {share}/>
						<p>53</p>
					</div>
				</div>
			</div>
		</>
	);
}