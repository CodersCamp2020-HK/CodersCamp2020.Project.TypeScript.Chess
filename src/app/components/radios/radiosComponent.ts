import { container } from '../game/Game.module.scss';
import styles from '../radios/radios.module.scss';
import { pseudoStyle } from './pseudoStyle';

export interface Data {
    value: string;
    label: string;
    category?: string;
}

export class Radios {
    private _currentSelected: Data;
    private _element: HTMLDivElement;
    private _radios: HTMLInputElement[] = [];
    private _labels: HTMLLabelElement[] = [];
    private _options: HTMLDivElement[] = [];
    private _data: Data[];

    constructor(valuesAndLabels: Data[]) {
        this._currentSelected = valuesAndLabels[0];
        this._data = valuesAndLabels;

        this._element = document.createElement('div');
        this._element.classList.add('radios-wrapper');

        this.renderRadios();
        this.renderLabels();
        this.renderOptionContainers();

        this._element.append(...this._options);
    }

    renderRadios(): void {
        this._radios = [];

        this._data.forEach((singleData, index) => {
            const radio = document.createElement('input');

            radio.type = 'radio';
            radio.value = singleData.value;
            radio.id = singleData.value;

            if (singleData.category) {
                radio.name = singleData.category;
            }

            if (index === 0) {
                radio.checked = true;
            }

            radio.classList.add(styles.radio);

            radio.addEventListener('mouseover', () => {
                const current = radio;
                if (!current.checked) {
                    pseudoStyle(current, 'before', 'content', '');
                    pseudoStyle(
                        current,
                        'before',
                        'box-shadow',
                        'inset 0px 0px 8px 0px #44E0DB, 0px 0px 16px 0px #44E0DB',
                    );
                } else {
                    pseudoStyle(current, 'before', 'content', '');
                    pseudoStyle(current, 'before', 'box-shadow', 'none');
                }
            });

            radio.addEventListener('mouseout', () => {
                const current = radio;
                if (!current.checked) {
                    pseudoStyle(current, 'before', 'content', '');
                    pseudoStyle(current, 'before', 'box-shadow', 'none');
                } else {
                    pseudoStyle(current, 'before', 'content', '');
                    pseudoStyle(current, 'before', 'box-shadow', 'none');
                }
            });

            radio.addEventListener('change', () => {
                const current = radio;
                if (current.checked) {
                    pseudoStyle(current, 'before', 'content', '');
                    pseudoStyle(current, 'before', 'box-shadow', 'none');
                }
                const foundedData = this._data.find((el) => el.value == radio.value);
                if (foundedData) {
                    this._currentSelected = foundedData;
                }
            });

            this._radios.push(radio);
        });
    }

    renderLabels(): void {
        this._labels = [];

        this._data.forEach((singleData) => {
            const label = document.createElement('label');

            label.setAttribute('for', singleData.value);
            label.textContent = singleData.label;

            label.classList.add(styles.label);
            this._labels.push(label);
        });
    }

    renderOptionContainers(): void {
        this._options = [];
        this._data.forEach((singleData, index) => {
            const container = document.createElement('div');

            container.append(this._radios[index], this._labels[index]);
            container.classList.add(styles.option);
            this._options.push(container);
        });
    }

    get element(): HTMLDivElement {
        return this._element;
    }

    get currentSelected(): Data {
        return this._currentSelected;
    }
}
