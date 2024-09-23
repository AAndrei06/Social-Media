import styles from './leftitem.module.css';

export default function GroupItem(props){
	return(
		<>
			<div className = {styles.item}>
				<div className = {styles.container}>
					<div className = {styles.image}>
						<img src = {props.img}/>
					</div>
					<div className = {styles.text}>
						<p>{props.name}</p>
					</div>
				</div>
			</div>
		</>
	);
}