import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;

	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.text) {
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
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div>
					<input
						type='text'
						name='title'
						value={values.title}
						onChange={onChange}
						// style={{ border: formValidState.title ? undefined : '1px solid red' }} Вариант для плавных вещей

						// className={`${styles.input} ${
						// 	formValidState.title ? '' : styles.invalid
						// }`} Вариант с шаблонными строками(Template)
						className={cn(styles['input-title'], {
							[styles.invalid]: !isValid.title
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
						value={values.date}
						onChange={onChange}
						className={cn(styles['input'], {
							[styles.invalid]: !isValid.date
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
					value={values.text}
					onChange={onChange}
					className={cn(styles['input'], {
						[styles.invalid]: !isValid.text
					})}
				></textarea>
				<Button text={'Сохранить'} />
			</form>
		</>
	);
}

export default JournalForm;
