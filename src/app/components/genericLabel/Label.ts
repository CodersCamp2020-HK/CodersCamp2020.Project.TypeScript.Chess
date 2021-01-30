import styles from './Label.module.scss';

type LabelColor = 'red' | 'blue' | 'yellow';

export class Label {
    private __element: HTMLDivElement;

    constructor(labelColor: LabelColor, labelText: string) {
        this.__element = document.createElement('div');
        this.__element.textContent = labelText;
        this.__element.classList.add(styles.labelwrapper);

        const labelLine = document.createElement('div');
        labelLine.classList.add(styles.labelline);
        this.__element.appendChild(labelLine);

        labelColor === 'red' && this.__element.classList.add(styles.red);
        labelColor === 'blue' && this.__element.classList.add(styles.blue);
        labelColor === 'yellow' && this.__element.classList.add(styles.yellow);
    }

    public get element(): HTMLDivElement {
        return this.__element;
    }
}
