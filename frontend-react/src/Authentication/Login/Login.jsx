import '../../general.css';
import styles from '../auth.module.css';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import moldova from '../../assets/moldova.png';
import logo from '../../assets/logo.png';
import twitter from '../../assets/twitter.png';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function Login(){
	const navigate = useNavigate();
	const context  = useOutletContext();
	const email = useRef();
	const password = useRef();
	const btn = useRef();

	const client = context.client;


	console.log('in Log');

	function handleError(){
		btn.current.style.backgroundColor = "#E3242B";
		btn.current.innerText = "Credențiale Invalide";
		setTimeout(() => {
			btn.current.style.backgroundColor = "#864cff";
			btn.current.innerText = "Conectează-te";
		},3000);
	}

	const onSubmit = (ev) => {
		ev.preventDefault();
		

		const payload = {
			'email':email.current.value,
			'password':password.current.value
		}
		
		client.post('/login',payload)
		.then(({data}) => {
			if (data.message){
				if (data.message == "Credențiale Invalide"){
					handleError();
				}
			}else{
				context.setUser(data.user);
				context.setToken(data.token);
				localStorage.setItem('ACCESS_TOKEN',data.token);
				console.log("navigate");
				navigate('/');
			}
		}).catch(err => {
			const response = err.response;
			
			if (response && response.status == 422){
				context.setErrors(response.data.errors);
				handleError();
			}
		});
	};


return(
<>
<main>
	<div className = {styles.logoImg}>
		<img draggable = "false" src = {logo}/>
	</div>
	<div className = {styles.formContainer}>
		
		<div className={styles.formLayout}>
			<form method="POST" onSubmit = {onSubmit} action = "/">
				<div>
					<h1>Conectează-te</h1>
				</div>
				<div>
					<div className={styles.inputAlign}>
						<label className = {styles.labelInput} for="email">Email</label>
						<input ref = {email} className = {styles.inputInput} id="email" type="text" name="email-input-signup" placeholder = "Email"/>
						
					</div>
					<div className={styles.inputAlign} style={{ marginTop: "10px" }}>
						<label className = {styles.labelInput} for="password">Parola</label>
						<input ref = {password} className = {styles.inputInput} id="password" type="password" name="password" placeholder = "Parola"/>
					</div>
					
					<div className = {`${styles.btnSubmit} ${styles.loginBug}`}>
						<button ref = {btn} type="submit">Conectează-te</button>
					</div>
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
							<p>Conectează-te cu Google</p>
						</div>
					</div>
					<div className = {styles.socialNetBox}>
						<div>
							&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
							<img height = "26" src = {twitter}/>&nbsp;&nbsp;
							<p>Conectează-te cu X</p>
						</div>
					</div>
				</div>
				*/}
				<p className = {styles.dontHave}>Nu ai un cont? <a onClick = {() => context.signup()}>Înregistrează-te</a></p>
			</form>
		</div>
	</div>
</main>
</>
);
};
export default Login;