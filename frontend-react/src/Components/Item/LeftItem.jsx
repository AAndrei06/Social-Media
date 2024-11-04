import styles from './leftitem.module.css';
import home from '../../assets/home.png';
import friends from '../../assets/friends.png';
import groups from '../../assets/group.png';
import video from '../../assets/video.png';
import message from '../../assets/message.png';
import favorite from '../../assets/star.png';
import pen from '../../assets/pen.png';
import logout from '../../assets/logout.png';

export default function LeftItem(props){

	const object = {
		'Acasă': home,
		'Prieteni': friends,
		'Grupuri': groups,
		'Videoclipuri Scurte': video,
		'Mesaje': message,
		'Favorite': favorite,
		'Creează Postare': pen,
		'Creează Videoclip': pen,
		'Deconectează-te': logout
	};

	const image = props.img ? props.img : object[props.name];

	return(
		<>
			<div className = {styles.item}>
				<div className = {styles.container}>
					<div className = {styles.image}>
						<img src = {image}/>
					</div>
					<div className = {styles.text}>
						<p>{props.name}</p>
					</div>
				</div>
			</div>
		</>
	);
}