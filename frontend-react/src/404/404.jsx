import styles from './404.module.css';
import {useNavigate } from 'react-router-dom';

export default function Chat(){
	const navigate = useNavigate();

	return(
		<>
			<main className = {styles.mainArea}>
				<div className = {styles.centerDiv}>
					<h1 className = {styles.number}>404</h1>
					<h1 className = {styles.info}>Pagina nu a fost găsită</h1>
					<button className = {styles.btn} onClick = {() => navigate('',{replace: true})}>Acasă</button>
				</div>
			</main>
		</>
	);
}