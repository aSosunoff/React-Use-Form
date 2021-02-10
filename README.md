# React-Use-Form component React

![Table](./UseForm.gif)

## Demo:

[https://asosunoff.github.io/React-Use-Form/](https://asosunoff.github.io/React-Use-Form/)

### Install component

[npm i @asosunoff/react_use_form](https://www.npmjs.com/package/@asosunoff/react_use_form)

### Launch project:

```
git clone https://github.com/aSosunoff/React-Use-Form.git
cd React-Use-Form
npm i
npm run start
```

### Test project:

```
npm test
```

### Example

```js
import { useForm, InitialForm } from "@asosunoff/react_use_form";

const INITIAL_FORM: InitialForm<"email"> = {
  email: {
    value: "",
    validation: (value) => {
      if (is.not.email(value)) {
        return {
          errorMessage: "Не правильно введён email",
        };
      }
    },
  },
};

const App = () => {
  const {
    values,
    handlers: { email },
    isInvalidForm,
    reset,
    setValue,
  } = useForm(INITIAL_FORM);

  return (
    <form>
      <div>
        <Input
          label="Email"
          value={email.value}
          onChange={email.onChange}
          invalid={email.touched && email.invalid}
          invalidMessage={email.invalidMessage}
        />
      </div>
    </form>
  );
};
```
