import React, { useCallback, useState } from "react";
import { useForm } from "../../hooks/useForm/useForm";
import Input from "../UI/input";
import BlackButton from "../UI/button/blackButton";
import Progress from "../UI/progress/Progress";

const INITIAL_FORM = {
	text: {
		value: "",
		type: "text",
		label: "text",
	},
	login: {
		value: "",
		validation: {
			required: {
				message: "Необходимо заполнить поле",
			},
		},
		type: "text",
		label: "Логин",
	},
	password: {
		value: "",
		validation: {
			required: {
				message: "Необходимо заполнить поле",
			},
			minLength: {
				value: 4,
				message: "Поле должно быть больше 4 символов",
			},
		},
		type: "password",
		label: "Пароль",
		/* invalidMessage: "Необходимо заполнить поле", */
	},
};

const App = () => {
	const [loading, setLoading] = useState(false);

	const { values, handlers, isFormInvalid } = useForm(INITIAL_FORM);

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
				{Object.entries(handlers).map(([key, config]) => (
					<Input
						key={key}
						label={config.label}
						value={config.value}
						disabled={loading}
						onChange={config.onChange}
						invalid={config.touched && config.invalid}
						invalidMessage={config.invalidMessage}
					/>
				))}
			</div>

			<div className="card-action">
				<BlackButton type="submit" disabled={isFormInvalid || loading}>
					Войти
				</BlackButton>
			</div>

			<Progress canVisible={loading} />
		</form>
	);
};

export default App;
