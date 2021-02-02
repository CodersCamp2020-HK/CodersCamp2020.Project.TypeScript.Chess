import styles from './Header.module.scss';

export class Header {
    private __element: HTMLElement;

    constructor() {
        this.__element = document.createElement('div');
        this.__element.classList.add(styles.header);
    }

    public get element(): HTMLElement {
        return this.__element;
    }
}
