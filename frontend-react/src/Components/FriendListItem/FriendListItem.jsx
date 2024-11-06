import styles from './friendlistitem.module.css';
import man from '../../assets/man.png';
import { faEllipsis, faUserMinus, faEnvelope, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function FriendListItem(props){

	const [show, setShow] = useState(false);
	const [follow, setFollow] = useState(false);
	const context = useOutletContext();
	const user = context.user;
	const client = context.client;

	const navigate = useNavigate();

	async function handleFollow(id){

    	const payload = {
        	'followId':user.idKey
        };

        try {
            // Replace with your actual endpoint
            const response = await client.post(`profile/follow/${id}`, payload, {
                headers: {
                    'Action-Of-Profile': 'profileFollow',
                },
            });
            console.log(response.data);
            setFollow(f => !f)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

	return(
		<>
			<div className = {styles.friendObject}>
				<div className = {styles.image}>
					<img src = {props.friend.profile.profile_photo}/>
				</div>
				<h4 className = {styles.h4}>{props.friend.profile.first_name+' '+props.friend.profile.last_name}</h4>
				<div onClick = {() => setShow(show => !show)} className = {styles.friendOptions}>
					<FontAwesomeIcon icon={faEllipsis}/>
				</div>
				{show &&
				<div className = {styles.options}>
					<div onClick = {() => handleFollow(props.friend.idKey)} className = {styles.option}>
					{follow &&
						<>
							<FontAwesomeIcon icon={faUserPlus}/>
							<h5>Urmărește</h5>
						</>
					}
					{!follow &&
						<>
							<FontAwesomeIcon icon={faUserMinus}/>
							<h5>Nu mai urmări</h5>
						</>
					}
					</div>
					
					<div onClick = {() => navigate('/chat',{state:{'idOfFriend': props.friend.id}})} className = {styles.option}>
						<FontAwesomeIcon icon={faEnvelope}/>
						<h5>Scrie mesaj</h5>
					</div>
				</div>
				}
			</div>
		</>
	);
}