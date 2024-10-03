import { Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';


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

	if (!user){
		axiosClient.get('/user').then((data) => {
			setUser(data.data);
		});
	}

	if (!token){
		setToken(localStorage.getItem("ACCESS_TOKEN"));
	}

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