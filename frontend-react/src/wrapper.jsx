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
	}


	function goToVideosUser(idx){
		navigate(`videos/user/${idx}`);
	}

	function goToProfile(idx){
		navigate(`profile/${idx}`);
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
					goToVideosUser: goToVideosUser
				}
			}/>
		</>
	);
}