import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const INITIAL_STATE = {
	title: true,
	text: true,
	date: true
};

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState(INITIAL_STATE);

	useEffect(() => {
		let timerId;
		if (!formValidState.title || !formValidState.date || !formValidState.text) {
			timerId = setTimeout(() => {
				setFormValidState(INITIAL_STATE);
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [formValidState]);

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
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input
						type='text'
						name='title'
						// style={{ border: formValidState.title ? undefined : '1px solid red' }} Вариант для плавных вещей

						// className={`${styles.input} ${
						// 	formValidState.title ? '' : styles.invalid
						// }`} Вариант с шаблонными строками(Template)
						className={cn(styles['input-title'], {
							[styles.invalid]: !formValidState.title
						})}
					/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor='date' className={styles['form-label']}>
						<img src='calendar.svg' alt='Иконка Календаря' />
						<span>Дата</span>
					</label>
					<input
						type='date'
						name='date'
						id='date'
						className={cn(styles['input'], {
							[styles.invalid]: !formValidState.date
						})}
					/>
				</div>

				<div className={styles['form-row']}>
					<label htmlFor='tag' className={styles['form-label']}>
						<img src='folder.svg' alt='Иконка Папки' />
						<span>Метки</span>
					</label>
					<input type='text' name='tag' id='tag' className={styles['input']} />
				</div>
				<textarea
					name='text'
					id=''
					cols='30'
					rows='10'
					className={cn(styles['input'], {
						[styles.invalid]: !formValidState.text
					})}
				></textarea>
				<Button text={'Сохранить'} />
			</form>
		</>
	);
}

export default JournalForm;
