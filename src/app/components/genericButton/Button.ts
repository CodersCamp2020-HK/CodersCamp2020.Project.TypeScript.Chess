import styles from './Button.module.scss';
export class Button {
    private __button: HTMLButtonElement;

    constructor(text: string, onClickCb: any, isAnimated?: boolean) {
        this.__button = document.createElement('button');
        this.__button.classList.add(styles.button);
        isAnimated === true ? this.__button.classList.add(styles.buttonAnimated) : null;
        this.__button.innerText = text;
        this.__button.addEventListener('click', () => onClickCb());
    }

    public get button(): HTMLButtonElement {
        return this.__button;
    }
}
