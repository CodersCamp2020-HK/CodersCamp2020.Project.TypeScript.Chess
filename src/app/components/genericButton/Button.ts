import styles from './Button.module.scss';

export class Button {
    private __button: HTMLButtonElement;

    constructor(text: string, classList: string[], onClickCb: any) {
        this.__button = document.createElement('button');
        this.__button.classList.add(styles.button, ...classList);
        this.__button.innerText = text;
        this.__button.addEventListener('click', () => onClickCb());
    }

    public get button(): HTMLButtonElement {
        return this.__button;
    }
}
