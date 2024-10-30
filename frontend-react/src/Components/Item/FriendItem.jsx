import styles from './leftitem.module.css';
import add from '../../assets/add.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function FriendItem(props){

	if (props.like){

		return(
			<>
				<div className = {styles.item+' '+styles.deactivate}>
					<div className = {styles.container}>
						<div onClick = {() => context.profile(props.user.idKey)} className = {styles.image}>
							<img src = {props.like.profile_photo}/>
						</div>
						<div className = {styles.text}>
							<p>{props.like.first_name+' '+props.like.last_name}</p>
						</div>
						
					</div>
				</div>
			</>
		);
	}

	if (props.user){
		const context = useOutletContext();
		const client = context.client;
		const name = props.lf ? styles.toLeft : "";
		const name2 = props.lf ? styles.contLf : "";

		const [add, setAdd] = useState(false);

		async function handleFollow(){
			setAdd(add => !add);

			const payload = {
	        	'followId':props.user.idKey
	        };

	        try {
	            const response = await client.post(`profile/follow/${props.user.idKey}`, payload, {
	                headers: {
	                    'Action-Of-Profile': 'profileFollow',
	                },
	            });
	            console.log(response.data);
	        } catch (error) {
	            console.error('Error uploading file:', error);
	        }
	    }

		return(
			<>
				<div className = {styles.item+' '+styles.deactivate}>
					<div className = {styles.container+" "+name2}>
						<div onClick = {() => context.profile(props.user.idKey)} className = {styles.image+" "+name}>
							<img src = {props.user.profile.profile_photo}/>
						</div>
						<div className = {styles.text}>
							<p>{props.user.profile.first_name+' '+props.user.profile.last_name}</p>
						</div>
						{props.suggestion &&
							<div className = {styles.add}>
								<button onClick = {() => handleFollow()} className = {styles.btn}>
									{!add && 
										<FontAwesomeIcon icon={faPlus}/>
									}
									{add &&
										<FontAwesomeIcon icon={faCheck}/>
									}
								</button>
							</div>
						}
					</div>
				</div>
			</>
		);
	}else{
		return <><p></p></>
	}
}