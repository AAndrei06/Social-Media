import styles from './shortvideos.module.css';
import NavBar from '../Components/NavBar/NavBar.jsx';
import Short from '../Components/Short/Short.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import CommentsSection from '../Components/CommentsSection/CommentsSection.jsx';
import { useState } from 'react';
import './short.css';

export default function ShortVideos(){
	const [open, setOpen] = useState(false);

	function handleSlideChange(){
		setOpen(false);
	}

	return(
		<>
			<main className = {styles.main}>
				<NavBar/>
				<CommentsSection set = {setOpen} open = {open}/>
				<div className = {styles.mainDiv}>
					<Swiper onSlideChange={handleSlideChange} direction={'vertical'} slidesPerView={1} mousewheel={true} modules={[Mousewheel]}
					pagination={{
					clickable: true,

					}}
					>
						<SwiperSlide>
							{({isActive}) => (<Short set = {setOpen} open = {open} play = {isActive}/>)}
						</SwiperSlide>
						<SwiperSlide>
							{({isActive}) => (<Short set = {setOpen} open = {open} play = {isActive}/>)}
						</SwiperSlide>
					
					</Swiper>
				</div>
			</main>
		</>
	);
}	