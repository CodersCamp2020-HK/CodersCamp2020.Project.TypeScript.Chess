export class Input {
    private _value = '';
    private _maxLength = 20;
    private _minLength = 3;
    private _element: HTMLInputElement;
    constructor(placeholder: string, minLength?: number, maxLength?: number) {
        if (minLength) this._minLength = minLength;
        if (maxLength) this._maxLength = maxLength;

        this._element = document.createElement('input');
        this._element.type = 'text';
        this._element.placeholder = placeholder;
        this._element.maxLength = this._maxLength;
        this._element.minLength = this._minLength;

        this._element.addEventListener('change', this.onChange.bind(this));
    }

    onChange() {
        this._value = this._element.value;
    }

    doesStartWithWhiteSpaces(): boolean {
        return this._value.trimStart() !== this._value;
    }

    doesEndWithWhiteSpaces(): boolean {
        return this._value.trimEnd() !== this._value;
    }

    isTooLong(): boolean {
        return this._value.length > this._maxLength;
    }

    isTooShort(): boolean {
        return this._value.length < this._minLength;
    }

    get value(): string {
        return this._value;
    }

    get element(): HTMLInputElement {
        return this._element;
    }
}
