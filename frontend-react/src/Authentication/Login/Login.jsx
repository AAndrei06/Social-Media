import '../../general.css';
import styles from '../auth.module.css';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import moldova from '../../assets/moldova.png';
import logo from '../../assets/logo.png';

function Login(){
return(
<>
<main>
	<div className = {styles.logoImg}>
		<img src = {logo}/>
	</div>
	<div className = {styles.formContainer}>
		
		<div className={styles.formLayout}>
			<div>
				<h1>Conectează-te</h1>
			</div>
			<div>
				<div className={styles.inputAlign}>
					<label className = {styles.labelInput} for="email">Email</label>
					<input className = {styles.inputInput} id="email" type="text" name="email-input-signup" placeholder = "Email"/>
					
				</div>
				<div className={styles.inputAlign} style={{ marginTop: "10px" }}>
					<label className = {styles.labelInput} for="password">Parola</label>
					<input className = {styles.inputInput} id="password" type="password" name="password" placeholder = "Parola"/>
				</div>
				
				<div className = {`${styles.btnSubmit} ${styles.loginBug}`}>
					<button type="submit">Conectează-te</button>
				</div>
			</div>
			<div>
				<div className = {styles.line}>
					<span className = {styles.or}>
						sau
					</span>
				</div>
			</div>
			<div>
				<div className = {styles.socialNetBox}>
					<div>
						&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
						<img height = "26" src = {google}/>&nbsp;&nbsp;
						<p>Conectează-te cu Google</p>
					</div>
				</div>
				<div className = {styles.socialNetBox}>
					<div>
						&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
						<img height = "26" src = {facebook}/>&nbsp;&nbsp;
						<p>Conectează-te cu Facebook</p>
					</div>
				</div>
			</div>
			<p className = "dont-have">Nu ai un cont? <a href="#">Înregistrează-te</a></p>
		</div>
	</div>
</main>
</>
);
};
export default Login;