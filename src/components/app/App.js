import React, { useCallback, useState } from "react";
import { useForm } from "../../hooks/useForm/useForm";
import Input from "../UI/input";
import BlackButton from "../UI/button/blackButton";
import Progress from "../UI/progress/Progress";

const INITIAL_FORM = {
	login: {
		value: "",
		validation: { required: true },
	},
	password: {
		value: "",
		validation: {
			required: true,
			minLength: 4,
		},
	},
};

const App = () => {
	const [loading, setLoading] = useState(false);

	const { values, handlers, isDisabledAll } = useForm(INITIAL_FORM);

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault();
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				console.log(values);
			}, 1000);
		},
		[values]
	);

	return (
		<form
			className="card hoverable"
			style={{
				gridArea: "cc",
				margin: 0,
			}}
			onSubmit={submitHandler}
		>
			<div className="card-content">
				<Input
					label="Логин"
					value={handlers.login.value}
					disabled={loading}
					onChange={handlers.login.onChange}
					invalid={handlers.login.touched && handlers.login.invalid}
					invalidMessage={handlers.login.invalidMessage}
				/>

				<Input
					label="Пароль"
					type="password"
					disabled={loading}
					value={handlers.password.value}
					onChange={handlers.password.onChange}
					invalid={handlers.password.touched && handlers.password.invalid}
					invalidMessage={handlers.password.invalidMessage}
				/>
			</div>

			<div className="card-action">
				<BlackButton type="submit" disabled={isDisabledAll || loading}>
					Войти
					<i className="material-icons right">send</i>
				</BlackButton>
			</div>

			<Progress canVisible={loading} />
		</form>
	);
};

export default App;
