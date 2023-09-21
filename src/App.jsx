import './App.css';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';

import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(data.map(item => ({ ...item, date: new Date(item.date) })));
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

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
