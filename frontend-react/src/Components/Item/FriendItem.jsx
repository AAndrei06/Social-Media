import styles from './leftitem.module.css';
import add from '../../assets/add.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function FriendItem(props){

	return(
		<>
			<div className = {styles.item+' '+styles.deactivate}>
				<div className = {styles.container}>
					<div className = {styles.image}>
						<img src = {props.img}/>
					</div>
					<div className = {styles.text}>
						<p>{props.name}</p>
					</div>
					{props.suggestion &&
						<div className = {styles.add}>
							<button className = {styles.btn}>
								<FontAwesomeIcon icon={faPlus} />
							</button>
						</div>
					}
				</div>
			</div>
		</>
	);
}