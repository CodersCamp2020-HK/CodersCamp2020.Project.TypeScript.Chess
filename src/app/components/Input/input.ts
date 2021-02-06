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
        console.log(allErrors);
    }

    onSubmit(): void {}

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

    get value(): string {
        return this._value;
    }

    get wrapper(): HTMLDivElement {
        return this._wrapper;
    }
}
