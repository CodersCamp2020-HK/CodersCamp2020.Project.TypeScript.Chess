import styles from './Label.module.scss';

type LabelColor = 'red' | 'blue' | 'yellow';

export class Label {
    private __element: HTMLDivElement;

    constructor(labelColor: LabelColor, labelText: string) {
        this.__element = document.createElement('div');
        this.__element.textContent = labelText;
        this.__element.classList.add(styles.labelWrapper);

        const labelLine = document.createElement('div');
        labelLine.classList.add(styles.labelLine);
        this.__element.appendChild(labelLine);

        this.__element.classList.add(styles[labelColor]);
    }

    public get element(): HTMLDivElement {
        return this.__element;
    }
}
