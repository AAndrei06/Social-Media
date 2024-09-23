import '../../general.css';
import styles from '../auth.module.css';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import moldova from '../../assets/moldova.png';
import logo from '../../assets/logo.png';
function SignUp(){
return(
<>
<main>
	<div className = {styles.logoImg}>
		<img src = {logo}/>
	</div>
	<div className = {styles.formContainer}>
		
		<div className = {styles.formLayout}>
			<div>
				<h1>Înregistrează-te</h1>
			</div>
			<div>
				<div className={styles.nameLayout}>
					<div className={styles.alignNames}>
						<label className = {styles.labelInput} for="name1">Numele</label>
						<input className = {styles.inputInput} type="text" name="name-1-input" id="name1" placeholder = "Numele"/>
						<p className = {styles.errorMessage}>Nume prea scurt</p>
					</div>
					<div className={styles.alignNames}>
						<label className = {styles.labelInput} for="name2">Prenumele</label>
						<input className = {styles.inputInput} type="text" name="name-2-input" id="name2" placeholder = "Prenumele"/>
						<p className = {styles.errorMessage}>Nume prea scurt</p>
					</div>
				</div>
				<div className={styles.inputAlign}>
					<label className = {styles.labelInput} for="email">Email</label>
					<input className = {styles.inputInput} id="email" type="text" name="email-input-signup" placeholder = "Email"/>
					<p className = {styles.errorMessage}>Email incorect si prea scurt</p>
				</div>
				<div className={styles.inputAlign}>
					<label className = {styles.labelInput} for="password">Parola</label>
					<input className = {styles.inputInput} id="password" type="password" name="password" placeholder = "Parola"/>
					<p className = {styles.errorMessage}>Parola nu este corect prea scurt</p>
				</div>
				<div className={styles.inputAlign}>
					<label className = {styles.labelInput} for="password_confirmation">Confirmă Parola</label>
					<input className = {styles.inputInput} id="password_confirmation" type="password" name="password_confirmation" placeholder = "Confirmă Parola"/>
					<p className = {styles.errorMessage}>Parola nu este la fel cu ce ade sus</p>
				</div>
				<div className={styles.inputAlignRadio}>
					<label className = {styles.labelInput}>Genul</label>
					<div>
						<input className = {styles.inputInput} className = {styles.error} value = "B" id="radio1" name = "radio1" type = "radio"/>
						<label className = {styles.labelInput} for="radio1">Bărbat</label>
						<input className = {styles.inputInput} value = "F" id="radio2" name = "radio1" type = "radio"/>
						<label className = {styles.labelInput} for="radio2">Femeie</label>
						<input className = {styles.inputInput} value = "A" id="radio3" name = "radio1" type = "radio"/>
						<label className = {styles.labelInput} for="radio3">Altul</label>
					</div>
					<p className = {styles.errorMessage}>Alege un gen</p>
				</div>
				<div className={styles.inputAlign}>
					<label className = {styles.labelInput} for="date">Data, luna, anul nașterii</label>
					<input className = {styles.inputInput} id="date" type="date" name="date-signup"/>
					<p className = {styles.errorMessage}>Alege o data oarecare</p>
				</div>
				
				<div className = {styles.terms}>
					<input className = {styles.inputInput} type="checkbox" id = "checkbox"/>
					&#160;
					<label className = {styles.labelInput} for="checkbox">Acceptă Termenii și Politica (vă rugăm citiți)</label>
				</div>
				<div className = {styles.btnSubmit}>
					<button type="submit">Înregistrează-te</button>
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
						<p>Înregistrează-te cu Google</p>
					</div>
				</div>
				<div className = {styles.socialNetBox}>
					<div>
						&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
						<img height = "26" src = {facebook}/>&nbsp;&nbsp;
						<p>Înregistrează-te cu Facebook</p>
					</div>
				</div>
			</div>
		</div>
	</div>

</main>
</>
);
};
export default SignUp;