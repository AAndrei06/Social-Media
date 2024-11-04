import styles from './shortvideos.module.css';
import NavBar from '../Components/NavBar/NavBar.jsx';
import Short from '../Components/Short/Short.jsx';
import LikeSide from '../Components/LikeSide/LikeSide.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import CommentsSection from '../Components/CommentsSection/CommentsSection.jsx';
import { useState, useEffect } from 'react';
import './short.css';
import { useOutletContext, useParams } from 'react-router-dom';

export default function ShortVideos(){

	const context = useOutletContext();
	const client = context.client;
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [video, setVideo] = useState(null);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState('1');

	const [sendOpen, setSendOpen] = useState(true);
	const [friends, setFriends] = useState(null);
	const [idOfSend,setIdOfSend] = useState(null);
	console.log(idOfSend);

	const { uuid, idKey } = useParams();
	console.log('uuid: ',uuid);
	console.log('idKey: ',idKey);
	useEffect(() => {
    const fetchVideo = async () => {
        try {
            const response = await client.get(`video/get/${uuid}`);
            console.log(response.data);
            setVideo(response.data);
        }catch(err){
        	console.log(err);
        }
    };

    fetchVideo();
        
    }, []);

	function handleSlideChange(){
		setOpen(false);
		setSendOpen(false);
	}

	useEffect(() => {
        const fetchVideos = async () => {
            try {
            	if (idKey){
	                const response = await client.get(`/videos/${idKey}`);
	                setVideos(response.data);
	                console.log(response.data);
	            }else{
	            	const response = await client.get('/videos');
	                setVideos(response.data);
	                console.log(response.data);
	            }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    useEffect(() => {
    	if (context.user){
	    	async function fetchFriends(){
				await client.get(`/chat/get`)
				.then(({ data }) => {
				 setFriends(data.mutual_followers);
				 console.log('data: ',data.mutual_followers);
				})
				.catch(error => {
				 console.error(error);
				});
			}
			fetchFriends();
		}
    },[context.user]);

    console.log('Friend Short');
    console.log(friends);
    console.log(idOfSend);

	return(
		<>
			<LikeSide friends = {friends} idOfShort = {idOfSend} set = {setSendOpen} open = {sendOpen}/>
			<main className = {styles.main}>

				<NavBar/>
				
				<CommentsSection type = {"shortVideos"} id = {id} set = {setOpen} open = {open}/>

				<div className = {styles.mainDiv}>
					<Swiper onSlideChange={handleSlideChange} direction={'vertical'} slidesPerView={1} mousewheel={true} modules={[Mousewheel]}
					pagination={{
					clickable: true,

					}}
					>
					{video != null && 
						<SwiperSlide key = {video.id}>

							{({isActive}) => (<Short 
												video = {video} 
												setId = {setId} 
												set = {setOpen} 
												open = {open} 
												play = {isActive} 
												setSendOpen = {setSendOpen}
												setIdOfSend = {setIdOfSend}
												/>)}
						</SwiperSlide>
					}

					{video == null && videos.map(video => (
						<SwiperSlide key = {video.id}>
						
							{({isActive}) => (<Short 
												video = {video} 
												setId = {setId} 
												set = {setOpen} 
												open = {open} 
												play = {isActive} 
												setSendOpen = {setSendOpen}
												setIdOfSend = {setIdOfSend}
												/>)}
						</SwiperSlide>
					))}
					
					</Swiper>
				</div>
			</main>
		</>
	);
}	