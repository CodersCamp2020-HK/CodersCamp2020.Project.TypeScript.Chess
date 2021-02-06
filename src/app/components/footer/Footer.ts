import styles from './Footer.module.scss';

export class Footer {
    private __element: HTMLDivElement;

    constructor() {
        this.__element = document.createElement('div');
        this.__element.classList.add(styles.wrapper);

        const footerImageLeft = document.createElement('div');

        const footerTextWrapper = document.createElement('div');
        const codersCampText = document.createElement('p');
        codersCampText.innerHTML = '.Coders<span>Camp</span>';
        footerTextWrapper.appendChild(codersCampText);

        const footerImageRight = document.createElement('div');

        footerImageLeft.classList.add(styles.left);
        footerImageRight.classList.add(styles.right);
        footerTextWrapper.classList.add(styles.textwrapper);

        this.__element.append(footerImageLeft, footerTextWrapper, footerImageRight);
    }

    public get element(): HTMLDivElement {
        return this.__element;
    }
}
