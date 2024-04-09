import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './App.module.css';

const schema = yup.object().shape({
	email: yup
		.string()
		.matches(/\S+@\S+\.\S+/, 'Некорректный email')
		.required('Email обязателен для заполнения'),
	password: yup
		.string()
		.min(3, 'Пароль должен содержать минимум 3 символа')
		.max(20, 'Пароль должен содержать максимум 20 символов')
		.required('Пароль обязателен для заполнения'),
	confirmPassword: yup
		.string()
		.test('password', 'Пароли не совпадают', function (value) {
			return this.parent.password === value;
		})
		.required('Подтверждение пароля обязательно'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (dataForm) => {
		console.log('Данные формы:', dataForm);
	};

	return (
		<div className={styles.app}>
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label>Email:</label>
					<input type="email" {...register('email')} className={errors.email ? 'inputError' : ''} />
					<span>{errors.email?.message}</span>
				</div>
				<div>
					<label>Пароль:</label>
					<input type="password" {...register('password')} className={errors.password ? 'inputError' : ''} />
					<span>{errors.password?.message}</span>
				</div>
				<div>
					<label>Подтвердите пароль:</label>
					<input type="password" {...register('confirmPassword')} className={errors.confirmPassword ? 'inputError' : ''} />
					<span>{errors.confirmPassword?.message}</span>
				</div>
				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
