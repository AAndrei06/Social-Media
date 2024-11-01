import styles from './likeside.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronLeft, faChevronRight, faPaperclip, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import FriendItem from '../Item/FriendItem.jsx';
import man from '../../assets/man.png';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function LikeSide(props){
	const context = useOutletContext();
	const client = context.client;
	if (props.uuidPost){

		
		const client = context.client;

		const [loading, setLoading] = useState(true);
		const [likes, setLikes] = useState([]);
		console.log(likes);
		useEffect(() => {
	        const fetchLikes = async () => {
	            try {
	                const response = await client.get(`/post/get/likes/${props.uuidPost}/`);
	                setLikes(response.data);
	                console.log('Likes ',response.data);
	            } catch (err) {
	            	setLikes([]);
	                console.log(err);
	            } finally {
	                setLoading(false);
	            }
	        };

	        fetchLikes();
	    }, [props.uuidPost, props.open]);

	    if (loading){
	    	return (<>Loading...</>);
	    }

		return(
			<>
				{props.open &&
				<div className = {styles.likesSide}>
					<h2 className = {styles.likes}>Aprecieri</h2>
					<FontAwesomeIcon onClick = {() => props.set(o => !o)} className = {styles.mark} icon={faXmark}/>
					<br/>
					{likes != [] && likes.map((like) => (
						<div key = {like.idKey} onClick = {() => context.profile(like.idKey)}>
							<FriendItem like = {like} img = {like.profile_photo}/>
						</div>
					))}
					
				</div>
				}	
			</>
		);
	}else if (props.friends && props.idOfPost){
		console.log(props.friends);
		function writeMsg(currentId){
			const payload = {
				'receiver_id':currentId,
				'postId': props.idOfPost,
				'type': 'post'
			};
			client.post('/chat/send/message', payload, {
	            headers: {
	                'Action-Of-Chat': 'sendMsg'
	            },
	        }).then(({data}) => {
				console.log(data);
			})
		}
		return(
			<>
				{props.open &&
				<div className = {styles.likesSide}>
					<h2 className = {styles.likes}>Trimite</h2>
					<FontAwesomeIcon onClick = {() => props.set(o => !o)} className = {styles.mark} icon={faXmark}/>
					<br/>
					{props.friends != [] && props.friends.map((friend) => (
						<div onClick = {() => writeMsg(friend.id)} key = {friend.idKey}>
							<FriendItem friend = {friend} lf/>
						</div>
					))}
					
				</div>
				}	
			</>
		);
	}
	else if (props.friends && props.idOfShort){
		console.log(props.friends);
		console.log('Like SIde f');
		function writeMsg(currentId){
			const payload = {
				'receiver_id':currentId,
				'shortId': props.idOfShort,
				'type': 'short'
			};
			client.post('/chat/send/message', payload, {
	            headers: {
	                'Action-Of-Chat': 'sendMsg'
	            },
	        }).then(({data}) => {
				console.log(data);
			})
		}
		return(
			<>
				{props.open &&
				<div className = {styles.likesSide}>
					<h2 className = {styles.likes}>Trimite</h2>
					<FontAwesomeIcon onClick = {() => props.set(o => !o)} className = {styles.mark} icon={faXmark}/>
					<br/>
					{props.friends != [] && props.friends.map((friend) => (
						<div onClick = {() => writeMsg(friend.id)} key = {friend.idKey}>
							<FriendItem friend = {friend} lf/>
						</div>
					))}
					
				</div>
				}	
			</>
		);
	}
}