import styles from './input.module.scss';

interface InputError {
    valid: boolean;
    message: string;
}

export class Input {
    private _value = '';
    private _maxLength = 20;
    private _minLength = 3;
    private _element: HTMLInputElement;
    private _errorsElement: HTMLDivElement;
    private _wrapper: HTMLDivElement;
    private _errors: InputError[];
    constructor(placeholder: string, minLength?: number, maxLength?: number) {
        if (minLength) this._minLength = minLength;
        if (maxLength) this._maxLength = maxLength;

        this._element = document.createElement('input');
        this._element.type = 'text';
        this._element.placeholder = placeholder;
        this._element.maxLength = this._maxLength;
        this._element.minLength = this._minLength;
        this._element.classList.add(styles.input);
        this._element.addEventListener('input', this.onChange.bind(this));

        this._wrapper = document.createElement('div');
        this._wrapper.classList.add(styles.wrapper);
        this._wrapper.appendChild(this._element);

        this._errors = [];
        this._errorsElement = document.createElement('div');
        this._errorsElement.classList.add(styles.errors);
    }

    onChange(): void {
        this._value = this._element.value;

        this._errors = [];
        const possibleErorrs = [
            this.isEmpty(),
            this.doesStartWithWhiteSpaces(),
            this.doesEndWithWhiteSpaces(),
            this.isTooLong(),
            this.isTooShort(),
        ];

        const allErrors = possibleErorrs.filter((err) => !err.valid);
        this._errors = [...allErrors];
        this.updateErrorsElement();
        if (this._errors.length > 0) {
            this._wrapper.classList.add(styles.wrong);
            this._element.classList.add(styles.wrong);
            //pseudoStyle(this._wrapper, 'before', 'background-color', '#FD6059');
        } else {
            this._wrapper.classList.remove(styles.wrong);
            this._element.classList.remove(styles.wrong);
            //pseudoStyle(this._wrapper, 'before', 'background-color', '#44E0DB');
        }
    }

    isValid(): boolean {
        if (this._errors.length > 0) {
            this._element.focus();
            return false;
        }
        if (!this.isEmpty().valid) {
            this._errors.push(this.isEmpty());
            this.updateErrorsElement();
            this._wrapper.classList.add(styles.wrong);
            this._element.classList.add(styles.wrong);
            //pseudoStyle(this._wrapper, 'before', 'background-color', '#FD6059');
            this._element.focus();
            return false;
        }
        return true;
    }

    doesStartWithWhiteSpaces(): InputError {
        return {
            valid: this._value.trimStart() !== this._value ? false : true,
            message: 'Value cannot start with White Space(s)',
        };
    }

    doesEndWithWhiteSpaces(): InputError {
        return {
            valid: this._value.trimEnd() !== this._value ? false : true,
            message: 'Value cannot end with White Space(s)',
        };
    }

    isTooLong(): InputError {
        return {
            valid: this._value.length > this._maxLength ? false : true,
            message: `Value cannot have more than ${this._maxLength} characters`,
        };
    }

    isTooShort(): InputError {
        return {
            valid: this._value.length < this._minLength ? false : true,
            message: `Value cannot have less than ${this._minLength} characters`,
        };
    }

    isEmpty(): InputError {
        return {
            valid: this._value.length == 0 ? false : true,
            message: `Value cannot be empty`,
        };
    }

    updateErrorsElement(): void {
        this._errorsElement.innerHTML = '';
        const ol = document.createElement('ol');
        this._errors.forEach((singleError) => {
            const li = document.createElement('li');
            li.append(singleError.message);
            ol.appendChild(li);
        });
        this._errorsElement.innerHTML = ol.innerHTML;
    }

    get value(): string {
        return this._value;
    }

    get wrapper(): HTMLDivElement {
        return this._wrapper;
    }

    get errors(): InputError[] {
        return this._errors;
    }
    get element(): HTMLInputElement {
        return this._element;
    }

    get errorsElement(): HTMLDivElement {
        return this._errorsElement;
    }
}
