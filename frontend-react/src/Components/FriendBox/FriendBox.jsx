import styles from './friendbox.module.css';
import man from '../../assets/man.png';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function FriendBox(props){

	const [follow, setFollow] = useState(true);
	const context = useOutletContext();
	const client = context.client;

	if (props.user){

		async function handleFollow(){
			setFollow(f => !f);
	    	const payload = {
	        	'followId':props.user.idKey
	        };

	        try {
	            // Replace with your actual endpoint
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
				<div className = {styles.box}>
					<div className = {styles.image}>
						<img onClick = {() => context.profile(props.user.idKey)} src = {props.user.profile.profile_photo}/>
					</div>
					<h4 className = {styles.name}>{props.user.profile.first_name+' '+props.user.profile.last_name}</h4>
					
						{follow &&
							<button onClick = {() => handleFollow()} className = {styles.btn}>
								<FontAwesomeIcon icon = {faUserPlus}/>
								<h2>Urmărește</h2>
							</button>
						}
						{!follow &&
							<button onClick = {() => handleFollow()} className = {styles.btn}>
								<FontAwesomeIcon icon = {faUserMinus}/>
								<h2>Nu mai urmări</h2>
							</button>
						}
					
				</div>
			</>
		);
	}else{
		return (<><p></p></>);
	}
}