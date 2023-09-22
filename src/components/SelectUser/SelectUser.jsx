import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
	const { userId, setUserId } = useContext(UserContext);
	const onChangeUser = e => {
		setUserId(e.target.value);
	};
	return (
		<select name='user' id='user' value={userId} onChange={onChangeUser}>
			<option value='1'>Антон</option>
			<option value='2'>Вася</option>
		</select>
	);
}

export default SelectUser;
