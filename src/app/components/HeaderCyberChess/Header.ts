import styles from './Header.module.scss';

export class Header {
    private __element: HTMLElement;

    constructor() {
        this.__element = document.createElement('div');
        this.__element.classList.add(styles.header);

        const cyberChess = document.createElement('div');
        cyberChess.classList.add(styles.cyberChess);
        cyberChess.textContent = 'Cyber Chess';

        const cyberData = document.createElement('div');
        cyberData.classList.add(styles.cyberChess);
        cyberData.textContent = '2021';

        this.__element.append(cyberChess, cyberData);
    }

    public get element(): HTMLElement {
        return this.__element;
    }
}
