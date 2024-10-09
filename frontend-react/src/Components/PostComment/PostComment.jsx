import styles from './postcomment.module.css';
import man from '../../assets/man.png';
import { useOutletContext } from 'react-router-dom';

export default function PostComment(props){

	const context = useOutletContext();
	const client = context.client;

	async function deleteComment(commentId){
		try {
            const response = await client.post(`/post/delete/comment/${commentId}`, {
                headers: {
                    'Action-Of-Home': 'deleteComment',
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
	}

	return(
		<div className = {styles.comment}>
			<div className = {styles.head}>
				<div className = {styles.photo}>
					<img src = {props.comment.user.profile.profile_photo}/>
				</div>
				<h5 className = {styles.name}>
					{props.comment.user.profile.first_name + ' ' + props.comment.user.profile.last_name}
				</h5>
			</div>
			<div className = {styles.body}>
			<p>
				{props.comment.content}
			</p>
			<div className = {styles.btnDiv}>
				<h4 onClick = {() => deleteComment(props.comment.id)} className = {styles.btn}>Șterge</h4>
			</div>
			</div>
		</div>
	);
}