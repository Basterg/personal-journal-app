import './App.css';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';

import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

function App() {
	const INITIAL_DATA = [
		// {
		// 	title: 'Подготовка к обновлению курсов',
		// 	text: 'Сегодня провёл весь день за...',
		// 	date: new Date(),
		// 	id: 1
		// },
		// {
		// 	title: 'Поход в годы',
		// 	text: 'Думал, что очень много време...',
		// 	date: new Date(),
		// 	id: 2
		// }
	];

	const [items, setItems] = useState(INITIAL_DATA);

	const addItem = newJournalItem => {
		setItems(oldItems => [
			...oldItems,
			{
				title: newJournalItem.title,
				text: newJournalItem.text,
				date: new Date(newJournalItem.date),
				id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
			}
		]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={items} />
			</LeftPanel>

			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
