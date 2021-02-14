import styles from './Header.module.scss';

export class Header {
    private __element: HTMLElement;

    constructor() {
        this.__element = document.createElement('div');
        this.__element.classList.add(styles.header);

        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add(styles.cyberData);

        const cyberChess = document.createElement('div');
        cyberChess.classList.add(styles.cyberChess);
        cyberChess.innerHTML = '<span>C</span>yber <span>C</span>hess';

        const cyberData = document.createElement('div');
        cyberData.classList.add(styles.cyberData);
        cyberData.textContent = '2021';

        this.__element.append(emptyDiv, cyberChess, cyberData);
    }

    public get element(): HTMLElement {
        return this.__element;
    }
}
