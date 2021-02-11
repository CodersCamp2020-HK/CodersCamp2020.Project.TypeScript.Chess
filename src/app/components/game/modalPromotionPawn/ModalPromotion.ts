import styles from './ModalPromotion.module.scss';
import { Label } from '../../genericLabel/Label';
import { Side } from '../../../domain/basicChessTypes';

export class ModalPromotion {
    private __element: HTMLDialogElement;
    private __pieceChosen: string;

    constructor(side: Side) {
        this.__pieceChosen = '';
        this.__element = document.createElement('dialog');
        this.__element.classList.add(styles.modalInvisible);
        const modalWrapper = document.createElement('div');
        this.__element.append(modalWrapper);
        modalWrapper.classList.add(styles.modalWrapper);

        const labelPromotion = new Label('blue', 'By which piece will you replace the pawn?');

        const piecesWrapper = document.createElement('div');
        piecesWrapper.classList.add(styles.piecesWrapper);
        modalWrapper.append(labelPromotion.element, piecesWrapper);

        side === Side.White ? piecesWrapper.classList.add(styles.player) : piecesWrapper.classList.add(styles.opponent);

        type Piece = 'rook' | 'knight' | 'queen' | 'bishop';
        const piecesPossiblePromotion: Piece[] = ['rook', 'knight', 'queen', 'bishop'];

        for (let i = 0; i < piecesPossiblePromotion.length; i++) {
            const buttonPiece = document.createElement('div');
            buttonPiece.classList.add(styles.box);
            const imagePiece = document.createElement('div');
            imagePiece.classList.add(styles[piecesPossiblePromotion[i]]);
            buttonPiece.append(imagePiece);
            piecesWrapper.append(buttonPiece);

            buttonPiece.addEventListener('click', () => {
                this.__element.classList.remove(styles.modal);
                this.__element.classList.add(styles.modalInvisible);
                this.__pieceChosen = piecesPossiblePromotion[i];
            });
        }
    }

    public get element(): HTMLDialogElement {
        return this.__element;
    }

    public openModal(): void {
        this.__element.classList.remove(styles.modalInvisible);
        this.__element.classList.add(styles.modal);
    }

    public get pieceChosen(): string {
        return this.__pieceChosen;
    }
}
