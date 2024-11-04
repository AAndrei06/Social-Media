import { Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';


export default function Wrapper(){
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState();
	const [err, setErr] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
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

	
	useEffect(() => {
		setToken(localStorage.getItem("ACCESS_TOKEN"));
		axiosClient.get('/user').then((data) => {
			setUser(data.data);
		}).catch((e) => {
			setUser(null);
		});
	}, []);


	async function deleteMessage(id){
		await axiosClient.post(`chat/delete/message/${id}`).then((data) => {
			showSuccess(data.data);
			console.log(data);
		}).catch((e) => {
			console.log(e);
		});
	}

	async function logout(){
		await axiosClient.post(`/logout`).then((data) => {
			showSuccess(data.data);
			console.log(data);
			localStorage.removeItem('ACCESS_TOKEN');
			goToLogin();
			setToken(null);
		}).catch((e) => {
			console.log(e);
		});
	}

	function showError(msg){
		setShowAlert(o => true);
		setMessage(e => msg);
		setErr(e => true);
	}

	function showSuccess(msg){
		setShowAlert(o => true);
		setMessage(e => msg);
		setErr(e => false);
	}

	function goToPostsUser(idx){
		navigate(`posts/${idx}`);
		window.location.reload();
	}


	function goToVideosUser(idx){
		navigate(`videos/user/${idx}`);
		window.location.reload();
	}

	function goToProfile(idx){
		navigate(`profile/${idx}`, { replace: true });
		window.location.reload();
	}

	function goToPost(idx) {
	    navigate(`/${idx}`);
	    window.location.reload();
	}

	function goToShort(idx){
		navigate(`/videos/${idx}`);
		window.location.reload();
	}

	function goToChat(){
		navigate("chat");
	}

	function goToFriends(){
		navigate("friends");
		window.location.reload();
	}

	function goToVideos(){
		navigate("videos");
		window.location.reload();
	}

	function goToHome(){
		navigate("");
		window.location.reload();
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
					message: message,
					setMessage: setMessage,
					showAlert: showAlert,
					setShowAlert: setShowAlert,
					err: err,
					setErr: setErr,
					showError: showError,
					showSuccess, showSuccess,
					errors: errors,
					setErrors: setErrors,
					goToPost: goToPost,
					goToShort: goToShort,
					deleteMessage: deleteMessage,
					goToPostsUser: goToPostsUser,
					goToVideosUser: goToVideosUser,
					logout: logout
				}
			}/>
		</>
	);
}