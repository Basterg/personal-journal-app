import './JournalList.css';
import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items }) {
	const { userId } = useContext(UserContext);

	if (items.length === 0) {
		return <p>Создайте новое воспоминание</p>;
	}

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<>
			{items
				.filter(el => el.userId === userId)
				.sort(sortItems)
				.map(el => (
					<CardButton key={el.id}>
						<JournalItem title={el.title} text={el.text} date={el.date} />
					</CardButton>
				))}
		</>
	);

	// return <div className='journal-list'></div>;
}

export default JournalList;
