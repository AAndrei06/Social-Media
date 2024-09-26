import styles from './friends.module.css';
import NavBar from '../Components/NavBar/NavBar.jsx';
import FriendListItem from '../Components/FriendListItem/FriendListItem.jsx';
import FriendBox from '../Components/FriendBox/FriendBox.jsx';
import { faUserPlus, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function Friends(){

	const [open, setOpen] = useState(true);

	return(<>
			<main className = {styles.mainArea}>
				<NavBar/>
				<div onClick = {() => setOpen(open => !open)} className = {styles.arrow}>
					<FontAwesomeIcon icon = {faChevronRight}/>
				</div>
				{open &&
				<div className = {styles.friendsList}>
					<h2 className = {styles.h2}>Prieteni</h2>
					<div onClick = {() => setOpen(open => !open)} className = {styles.xmark}>
					<FontAwesomeIcon icon = {faXmark}/>
					</div>
					<div>
						<FriendListItem/>
						<FriendListItem/>
						<FriendListItem/>
						<FriendListItem/>
						<FriendListItem/>
						<FriendListItem/>
						<FriendListItem/>
						<FriendListItem/>
						<FriendListItem/>
						<FriendListItem/>
					</div>
						
				</div>
				}
				<div className = {styles.mainDiv}>
					
					<div className = {styles.suggestionList}>
						<h2 className = {styles.h2}>Sugestii de prietenie</h2>
						<div className = {styles.friendsSuggestions}>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
							<FriendBox/>
						</div>
					</div>
				</div>
			</main>
		</>
		)
}