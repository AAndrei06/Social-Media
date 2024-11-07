import styles from './postcomment.module.css';
import man from '../../assets/man.png';
import { useOutletContext } from 'react-router-dom';
import { useRef } from 'react';

export default function PostComment(props){

	const context = useOutletContext();
	const client = context.client;
	const nrOfComments = useRef();
	const thisRef = useRef();

	async function deleteComment(commentId){

		const url = props.type == 'homePost' ? `/post/delete/comment/${commentId}` : `/video/delete/comment/${commentId}`;

		try {
            const response = await client.post(url, {
                headers: {
                    'Action-Of-Home': 'deleteComment',
                },
            });
            console.log(response.data);

            if (response.data == 'success'+commentId){
            	thisRef.current.style.display = "none";
            	context.showSuccess('Comentariu șters cu succes!');
            }
        } catch (error) {
            console.log(error);
        }
	}

	return(
		<div ref = {thisRef} className = {styles.comment}>
			<div onClick = {() => context.profile(props.comment.user.idKey)} className = {styles.head}>
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