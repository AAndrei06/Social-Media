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
	const [error, setError] = useState(null);
	const [video, setVideo] = useState(null);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState('1');
	const [loading, setLoading] = useState(true);
	const [sendOpen, setSendOpen] = useState(true);
	const [friends, setFriends] = useState(null);
	const [idOfSend,setIdOfSend] = useState(null);

	const { uuid, idKey } = useParams();
	
	useEffect(() => {
		const fetchVideo = async () => {
			try {
				const response = await client.get(`video/get/${uuid}`);
				setVideo(response.data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchVideo();
	}, [uuid]);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = idKey
					? await client.get(`/videos/${idKey}`)
					: await client.get('/videos');
				setVideos(response.data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchVideos();
	}, [idKey]);

	useEffect(() => {
		if (context.user) {
			async function fetchFriends() {
				await client.get(`/chat/get`)
				.then(({ data }) => {
					setFriends(data.mutual_followers);
				})
				.catch(error => {
					console.error(error);
				});
			}
			fetchFriends();
		}
	}, [context.user]);

	const handleSlideChange = () => {
		setOpen(false);
		setSendOpen(false);
	};

	if (loading) return (
		<main className={styles.mainArea12}>
			<div className={styles.centerDiv12}>
				<h1 className={styles.info12}>Se încarcă...</h1>
			</div>
		</main>
	);

	return (
		<>
			<LikeSide friends={friends} idOfShort={idOfSend} set={setSendOpen} open={sendOpen} />
			<main className={styles.main}>
				<NavBar />
				<CommentsSection type="shortVideos" id={id} set={setOpen} open={open} />
				<div className={styles.mainDiv}>
					<Swiper onSlideChange={handleSlideChange} direction={'vertical'} slidesPerView={1} mousewheel={true} modules={[Mousewheel]}
						pagination={{ clickable: true }}>
						{video && (
							<SwiperSlide key={video.id}>
								{({ isActive }) => (
									<Short
										video={video}
										setId={setId}
										set={setOpen}
										open={open}
										play={isActive}
										setSendOpen={setSendOpen}
										setIdOfSend={setIdOfSend}
									/>
								)}
							</SwiperSlide>
						)}
						{!video && videos.map(video => (
							<SwiperSlide key={video.id}>
								{({ isActive }) => (
									<Short
										video={video}
										setId={setId}
										set={setOpen}
										open={open}
										play={isActive}
										setSendOpen={setSendOpen}
										setIdOfSend={setIdOfSend}
									/>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</main>
		</>
	);
}
