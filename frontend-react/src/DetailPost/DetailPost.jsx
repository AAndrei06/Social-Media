import NavBar from '../Components/NavBar/NavBar.jsx';
import styles from './detailpost.module.css';

export default function DetailPost(){
	return(
		<>
		<NavBar/>
		<main className = {styles.mainArea}>
			
			<div className = {styles.mainDiv}>
				<div className = {styles.likes}>

				</div>
				<div className = {styles.comments}>
				</div>
			</div>
		</main>
		</>
	);
}