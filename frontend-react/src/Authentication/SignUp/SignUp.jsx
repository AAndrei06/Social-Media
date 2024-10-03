import '../../general.css';
import styles from '../auth.module.css';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import twitter from '../../assets/twitter.png';
import moldova from '../../assets/moldova.png';
import logo from '../../assets/logo.png';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function SignUp(){

	const navigate = useNavigate();

	const name1 = useRef();
	const name2 = useRef();
	const email = useRef();
	const password = useRef();
	const password_confirmation = useRef();
	const gender = useRef();
	const date = useRef();
	const accepted = useRef();


	// Errors

	const nameErr = useRef();
	const surnameErr = useRef();
	const emailErr = useRef();
	const passErr = useRef();
	const passConfErr = useRef();
	const genderErr = useRef();
	const dateErr = useRef();
	const acceptedErr = useRef();



	const context = useOutletContext();

	if (context.errors){
		const errors = context.errors;

		if (errors.date){
			dateErr.current.style.opacity = "1";
			dateErr.current.innerText = errors.date[0];
		}else{
			dateErr.current.style.opacity = "0";
		}

		if (errors.password){
			
			if (errors.password[0] == 'Parolele nu se potrivesc'){
				passConfErr.current.style.opacity = "1";
				passConfErr.current.innerText = errors.password[0];
			}else{
				passConfErr.current.style.opacity = "0";
			}

			if (errors.password[0] != 'Parolele nu se potrivesc'){
				passErr.current.style.opacity = "1";
				passErr.current.innerText = errors.password[0];
			}else{
				passErr.current.style.opacity = "0";
			}

		}else{
			passErr.current.style.opacity = "0";
			passConfErr.current.style.opacity = "0";
		}

		if (errors.name){
			nameErr.current.style.opacity = "1";
			nameErr.current.innerText = errors.name[0];
		}else{
			nameErr.current.style.opacity = "0";
		}

		if (errors.surname){
			surnameErr.current.style.opacity = "1";
			surnameErr.current.innerText = errors.surname[0];
		}else{
			surnameErr.current.style.opacity = "0";
		}

		if (errors.email){
			emailErr.current.style.opacity = "1";
			emailErr.current.innerText = errors.email[0];
		}else{
			emailErr.current.style.opacity = "0";
		}

		if (errors.gender){
			genderErr.current.style.opacity = "1";
			genderErr.current.innerText = errors.gender[0];
		}else{
			genderErr.current.style.opacity = "0";
		}
	}

	const {setToken, setUser} = useOutletContext();
	const client = context.client;

	const onSubmit = (ev) => {
		ev.preventDefault();

		const payload = {
			surname: name1.current.value,
			name: name2.current.value,
			email: email.current.value,
			password: password.current.value,
			password_confirmation: password_confirmation.current.value,
			gender: gender.current,
			date: date.current.value,
			accepted: accepted.current.checked
		};
		if (accepted.current.checked){
			acceptedErr.current.style.color = "black";
			client.post('/signup',payload)
			.then(({data}) => {
				setUser(data.user);
				setToken(data.token);
				console.log(data);
				localStorage.setItem('ACCESS_TOKEN',data.token);
				navigate('/');
			}).catch(err => {
				const response = err.response;
				if (response && response.status == 422){
					context.setErrors(response.data.errors);
				}
			});
		}else{
			acceptedErr.current.style.color = "#E3242B";
		}
	}

	return(
	<>
	<main>
		<div className = {styles.logoImg}>
			<img draggable = "false" src = {logo}/>
		</div>
		<div className = {styles.formContainer}>
			
			<div className = {styles.formLayout}>
				<div>
					<h1>Înregistrează-te</h1>
				</div>
				<div>
					<form method = "POST" onSubmit = { onSubmit }>
						<div className={styles.nameLayout}>
							<div className={styles.alignNames}>
								<label className = {styles.labelInput} for="name1">Numele</label>
								<input ref = {name1} className = {styles.inputInput} type="text" name="name-1-input" id="name1" placeholder = "Numele"/>
								<p ref = {surnameErr} className = {styles.errorMessage}>Nume prea scurt</p>
							</div>
							<div className={styles.alignNames}>
								<label className = {styles.labelInput} for="name2">Prenumele</label>
								<input ref = {name2} className = {styles.inputInput} type="text" name="name-2-input" id="name2" placeholder = "Prenumele"/>
								<p ref = {nameErr} className = {styles.errorMessage}>Nume prea scurt</p>
							</div>
						</div>
						<div className={styles.inputAlign}>
							<label className = {styles.labelInput} for="email">Email</label>
							<input ref = {email} className = {styles.inputInput} id="email" type="text" name="email-input-signup" placeholder = "Email"/>
							<p ref = {emailErr} className = {styles.errorMessage}>Email incorect si prea scurt</p>
						</div>
						<div className={styles.inputAlign}>
							<label className = {styles.labelInput} for="password">Parola</label>
							<input ref = {password} className = {styles.inputInput} id="password" type="password" name="password" placeholder = "Parola"/>
							<p ref = {passErr} className = {styles.errorMessage}>Parola nu este corect prea scurt</p>
						</div>
						<div className={styles.inputAlign}>
							<label className = {styles.labelInput} for="password_confirmation">Confirmă Parola</label>
							<input ref = {password_confirmation} className = {styles.inputInput} id="password_confirmation" type="password" name="password_confirmation" placeholder = "Confirmă Parola"/>
							<p ref = {passConfErr} className = {styles.errorMessage}>Parola nu este la fel cu ce ade sus</p>
						</div>
						<div className={styles.inputAlignRadio}>
							<label className = {styles.labelInput}>Genul</label>
							<div>
								<input onChange = {() => {gender.current = "B"}} className = {styles.inputInput} className = {styles.error} value = "B" id="radio1" name = "radio1" type = "radio"/>
								<label className = {styles.labelInput} for="radio1">Bărbat</label>
								<input onChange = {() => {gender.current = "F"}} className = {styles.inputInput} value = "F" id="radio2" name = "radio1" type = "radio"/>
								<label className = {styles.labelInput} for="radio2">Femeie</label>
								<input onChange = {() => {gender.current = "A"}} className = {styles.inputInput} value = "A" id="radio3" name = "radio1" type = "radio"/>
								<label className = {styles.labelInput} for="radio3">Altul</label>
							</div>
							<p ref = {genderErr} className = {styles.errorMessage}>Alege un gen</p>
						</div>
						<div className={styles.inputAlign}>
							<label className = {styles.labelInput} for="date">Data, luna, anul nașterii</label>
							<input ref = {date} className = {styles.inputInput} id="date" type="date" name="date-signup"/>
							<p ref = {dateErr} className = {styles.errorMessage}>Alege o data oarecare</p>
						</div>
						
						<div className = {styles.terms}>
							<input ref = {accepted} className = {styles.inputInput} type="checkbox" id = "checkbox"/>
							&#160;
							<label ref = {acceptedErr} className = {styles.labelInput} for="checkbox">Acceptă Termenii și Politica (vă rugăm citiți)</label>
						</div>
						<div className = {styles.btnSubmit}>
							<button type="submit">Înregistrează-te</button>
						</div>
					</form>
				</div>
				{/*
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
							<img height = "26" src = {twitter}/>&nbsp;&nbsp;
							<p>Înregistrează-te cu X</p>
						</div>
					</div>
				</div>
				*/}
				<p className = {styles.dontHave}>Ai un cont? <a onClick = {() => context.login()}>Conectează-te</a></p>

			</div>
		</div>
	</main>
	</>
	);
};
export default SignUp;