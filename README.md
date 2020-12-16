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

`Validation` settings

| field     | config                          |
| --------- | ------------------------------- |
| required  | message: String,                |
| minLength | value: Number, message: String, |
| email     | message: String,                |

```js
import { useForm } from "@asosunoff/react_use_form";

const INITIAL_FORM = {
  some_field: {
    /* fields for inner use */
    value: "",
    validation: {
      email: {
        message: "Не правильно введён email",
      },
    },
    /* customer fields */
    type: "text",
    label: "text",
  },
};

const App = () => {
  const { values, handlers, isFormInvalid /* , reset, setValue */ } = useForm(
    INITIAL_FORM
  );

  return (
    <form>
      <div>
        {Object.entries(handlers).map(([nameField, config]) => (
          <Input
            key={nameField}
            label={config.label} /* customer field */
            value={config.value} /* customer field */
            onChange={config.onChange} /* set value handler */
            invalid={config.touched && config.invalid}
            invalidMessage={config.invalidMessage}
          />
        ))}
      </div>
    </form>
  );
};
```
