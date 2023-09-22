import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const { userId } = useContext(UserContext);

	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	/* eslint-disable indent */

	const focusError = isValid => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.text:
				textRef.current.focus();
				break;
		}
	};

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.text) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	useEffect(() => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: { userId }
		});
	}, [userId]);

	const onChange = e => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: { [e.target.name]: e.target.value }
		});
	};

	const addJournalItem = e => {
		e.preventDefault();

		dispatchForm({ type: 'SUBMIT' });
	};
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input
					type='text'
					name='title'
					value={values.title}
					onChange={onChange}
					ref={titleRef}
					appearance={'title'}
					isValid={isValid.title}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='calendar.svg' alt='Иконка Календаря' />
					<span>Дата</span>
				</label>
				<Input
					type='date'
					name='date'
					id='date'
					ref={dateRef}
					value={values.date}
					onChange={onChange}
					isValid={isValid.date}
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='folder.svg' alt='Иконка Папки' />
					<span>Метки</span>
				</label>
				<Input type='text' name='tag' id='tag' />
			</div>
			<textarea
				name='text'
				id=''
				cols='30'
				rows='10'
				value={values.text}
				onChange={onChange}
				ref={textRef}
				className={cn(styles['input'], {
					[styles.invalid]: !isValid.text
				})}
			></textarea>
			<Button text={'Сохранить'} />
		</form>
	);
}

export default JournalForm;
