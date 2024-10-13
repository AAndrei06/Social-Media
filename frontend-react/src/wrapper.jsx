import { Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';


export default function Wrapper(){
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [errors, setErrors] = useState();
	const axiosClient = axios.create({
		baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
	});
	axiosClient.interceptors.request.use((config) => {
		const tokenStored = localStorage.getItem("ACCESS_TOKEN");
		config.headers.Authorization = `Bearer ${tokenStored}`;
		return config;
	});
	axiosClient.interceptors.response.use((response) => {
		return response;
	});

/*
	if (localStorage.getItem("ACCESS_TOKEN") && token == null && user == null){
		setToken(localStorage.getItem("ACCESS_TOKEN"));
		axiosClient.get('/user').then((data) => {
			console.log(data.data);
			setUser(data.data);
			console.log(user);
		}).catch((e) => {
			setUser({'h':'1'});
		});
	}
*/
	
	useEffect(() => {
		setToken(localStorage.getItem("ACCESS_TOKEN"));
		axiosClient.get('/user').then((data) => {
			console.log(data.data);
			setUser(data.data);
			console.log(user);
		}).catch((e) => {
			setUser({'h':'1'});
		});
	}, []);

	

	console.log('user-------------');
	console.log(user);
	console.log(localStorage.getItem("ACCESS_TOKEN"));
	console.log(token);
	console.log(user);
	console.log('edn-------------');

	function goToProfile(idx){
		navigate(`profile/${idx}`);
	}

	function goToChat(){
		navigate("chat");
	}

	function goToFriends(){
		navigate("friends");
	}

	function goToVideos(){
		navigate("videos");
	}

	function goToHome(){
		navigate("");
	}

	function goToLogin(){
		navigate("login");
	}

	function goToSignup(){
		navigate("signup");
	}

	return (
		<>
			<Outlet context = {
				{
					profile: goToProfile,
					chat: goToChat,
					friends: goToFriends,
					videos: goToVideos,
					home: goToHome,
					login: goToLogin,
					signup: goToSignup,
					userId: "37yrh3f3fh783f783f",
					user: user,
					token: token,
					setUser: setUser,
					setToken: setToken,
					client: axiosClient,
					errors: errors,
					setErrors: setErrors
				}
			}/>
		</>
	);
}