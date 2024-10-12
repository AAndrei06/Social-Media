import styles from './shortvideos.module.css';
import NavBar from '../Components/NavBar/NavBar.jsx';
import Short from '../Components/Short/Short.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import CommentsSection from '../Components/CommentsSection/CommentsSection.jsx';
import { useState, useEffect } from 'react';
import './short.css';
import { useOutletContext } from 'react-router-dom';

export default function ShortVideos(){

	const context = useOutletContext();
	const client = context.client;

	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	/*
	const [commentPostId, setCommentPostId] = useState('1');
	const [likePostId, setLikePostId] = useState('1');
*/
	const [open, setOpen] = useState(false);
	const [id, setId] = useState('1');

	function handleSlideChange(){
		setOpen(false);
	}

	useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await client.get('/videos');
                setVideos(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

	return(
		<>
			<main className = {styles.main}>
				<NavBar/>
				<CommentsSection type = {"shortVideos"} id = {id} set = {setOpen} open = {open}/>
				<div className = {styles.mainDiv}>
					<Swiper onSlideChange={handleSlideChange} direction={'vertical'} slidesPerView={1} mousewheel={true} modules={[Mousewheel]}
					pagination={{
					clickable: true,

					}}
					>
					{videos.map(video => (
						<SwiperSlide key = {video.id}>
							{({isActive}) => (<Short video = {video} setId = {setId} set = {setOpen} open = {open} play = {isActive}/>)}
						</SwiperSlide>
					))}
					
					</Swiper>
				</div>
			</main>
		</>
	);
}	