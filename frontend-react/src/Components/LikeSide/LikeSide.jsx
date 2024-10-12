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

	const [loading, setLoading] = useState(true);
	const [likes, setLikes] = useState([]);

	useEffect(() => {
        const fetchComments = async () => {
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

        fetchComments();
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
				{likes.map((like) => (
					<div key = {like.idKey} onClick = {() => context.profile(like.idKey)}>
						<FriendItem lf img = {like.profile_photo} name = {like.first_name+' '+like.last_name}/>
					</div>
				))}
				
			</div>
			}	
		</>
	);
}