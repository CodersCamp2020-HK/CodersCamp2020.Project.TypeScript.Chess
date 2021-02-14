import styles from './ModalQuit.module.scss';
import { Label } from '../../genericLabel/Label';
import { Button } from '../../genericButton/Button';

export class ModalQuit {
    private __element: HTMLDialogElement;

    constructor(onMainMenu: () => void) {
        this.__element = document.createElement('dialog');
        this.__element.classList.add(styles.modalInvisible);
        const modalWrapper = document.createElement('div');
        this.__element.append(modalWrapper);
        modalWrapper.classList.add(styles.modalWrapper);

        const labelHeader = new Label('blue', 'ARE YOU SURE YOU WANT TO QUIT THE GAME?');
        const buttonCancel = new Button(
            'Cancel',
            () => {
                this.__element.classList.remove(styles.modal);
                this.__element.classList.add(styles.modalInvisible);
            },
            true,
        );
        const buttonQuit = new Button('Quit', onMainMenu, true);
        modalWrapper.append(labelHeader.element, buttonCancel.button, buttonQuit.button);
    }

    public get element(): HTMLDialogElement {
        return this.__element;
    }

    public openModal(): void {
        this.__element.classList.remove(styles.modalInvisible);
        this.__element.classList.add(styles.modal);
    }
}
