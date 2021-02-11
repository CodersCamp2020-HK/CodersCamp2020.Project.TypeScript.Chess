import styles from './ModalPromotion.module.scss';
import { Label } from '../../genericLabel/Label';
import { Side } from '../../../domain/basicChessTypes';

export class ModalPromotion {
    private __element: HTMLDialogElement;

    constructor(side: Side) {
        this.__element = document.createElement('dialog');
        this.__element.classList.add(styles.modal);
        const modalWrapper = document.createElement('div');
        this.__element.append(modalWrapper);
        modalWrapper.classList.add(styles.modalWrapper);

        const labelPromotion = new Label('blue', 'By which piece will you replace the pawn?');

        const piecesWrapper = document.createElement('div');
        piecesWrapper.classList.add(styles.piecesWrapper);

        side === Side.White ? piecesWrapper.classList.add(styles.player) : piecesWrapper.classList.add(styles.opponent);

        const buttonRook = document.createElement('div');
        buttonRook.classList.add(styles.box, styles.rook);
        const buttonKnight = document.createElement('div');
        buttonKnight.classList.add(styles.box, styles.knight);
        const buttonQueen = document.createElement('div');
        buttonQueen.classList.add(styles.box, styles.queen);
        const buttonBishop = document.createElement('div');
        buttonBishop.classList.add(styles.box, styles.bishop);

        modalWrapper.append(labelPromotion.element, piecesWrapper);
        piecesWrapper.append(buttonRook, buttonKnight, buttonQueen, buttonBishop);
    }

    public get element(): HTMLDialogElement {
        return this.__element;
    }

    public open() {
        this.__element.open = true;
    }

    public close() {
        this.__element.open = false;
    }
}
