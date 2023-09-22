export const INITIAL_STATE = {
	isValid: {
		text: true,
		date: true,
		title: true
	},
	values: {
		text: '',
		date: '',
		title: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

/* eslint-disable indent */
export function formReducer(state, action) {
	switch (action.type) {
		case 'SET_VALUE':
			return { ...state, values: { ...state.values, ...action.payload } };
		case 'CLEAR':
			return {
				...state,
				values: INITIAL_STATE.values,
				isFormReadyToSubmit: false
			};
		case 'RESET_VALIDITY':
			return { ...state, isValid: INITIAL_STATE.isValid };
		case 'SUBMIT': {
			const titleValidity = state.values.title?.trim().length;
			const dateValidity = state.values.date?.trim().length;
			const textValidity = state.values.text?.trim().length;
			return {
				...state,
				isValid: {
					title: titleValidity,
					date: dateValidity,
					text: textValidity
				},
				isFormReadyToSubmit: titleValidity && dateValidity && textValidity
			};
		}
	}
}
