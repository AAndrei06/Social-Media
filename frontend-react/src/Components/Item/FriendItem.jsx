import styles from './leftitem.module.css';
import add from '../../assets/add.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function FriendItem(props){

	const name = props.lf ? styles.toLeft : "";
	const name2 = props.lf ? styles.contLf : "";

	return(
		<>
			<div className = {styles.item+' '+styles.deactivate}>
				<div className = {styles.container+" "+name2}>
					<div className = {styles.image+" "+name}>
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