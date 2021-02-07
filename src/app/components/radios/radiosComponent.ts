import { container } from '../game/Game.module.scss';

interface Data {
    value: string;
    label: string;
    category?: string;
}

export class Radios {
    private _currentSelected: Data;
    _element: HTMLDivElement;
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

            radio.classList.add('single-radio');

            this._radios.push(radio);
        });
    }

    renderLabels(): void {
        this._labels = [];

        this._data.forEach((singleData) => {
            const label = document.createElement('label');

            label.setAttribute('for', singleData.value);
            label.textContent = singleData.label;

            label.classList.add('single-label');
            this._labels.push(label);
        });
    }

    renderOptionContainers() {
        this._options = [];
        this._data.forEach((singleData, index) => {
            const container = document.createElement('div');

            container.append(this._labels[index], this._radios[index]);
            container.classList.add('single-option');
            this._options.push(container);
        });
    }
}
