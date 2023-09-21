import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true
	});
	const addJournalItem = e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);

		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState(prevState => ({ ...prevState, title: false }));
			isFormValid = false;
		} else {
			setFormValidState(prevState => ({ ...prevState, title: true }));
		}
		if (!formProps.text?.trim().length) {
			setFormValidState(prevState => ({ ...prevState, text: false }));
			isFormValid = false;
		} else {
			setFormValidState(prevState => ({ ...prevState, text: true }));
		}
		if (!formProps.date) {
			setFormValidState(prevState => ({ ...prevState, date: false }));
			isFormValid = false;
		} else {
			setFormValidState(prevState => ({ ...prevState, date: true }));
		}

		if (!isFormValid) {
			return;
		}

		onSubmit(formProps);
	};
	return (
		<>
			<form className='journal-form' onSubmit={addJournalItem}>
				<input
					type='text'
					name='title'
					style={{ border: formValidState.title ? undefined : '1px solid red' }}
				/>
				<input
					type='date'
					name='date'
					style={{ border: formValidState.date ? undefined : '1px solid red' }}
				/>
				<input type='text' name='tag' />
				<textarea
					name='text'
					id=''
					cols='30'
					rows='10'
					style={{ border: formValidState.text ? undefined : '1px solid red' }}
				></textarea>
				<Button text={'Сохранить'} />
			</form>
		</>
	);
}

export default JournalForm;
