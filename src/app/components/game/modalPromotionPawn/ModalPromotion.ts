import styles from './ModalPromotion.module.scss';
import { Label } from '../../genericLabel/Label';
import { PieceType, Side } from '../../../domain/basicChessTypes';

type StringPiece = 'rook' | 'knight' | 'queen' | 'bishop';

export class ModalPromotion {
    private __element: HTMLDialogElement;
    private __pieceChosen: StringPiece = 'queen';
    private __onClick: (piece: PieceType) => void = () => {
        console.log();
    };

    constructor(side: Side) {
        this.__pieceChosen = 'queen';
        this.__element = document.createElement('dialog');
        this.__element.classList.add(styles.modalInvisible);
        const modalWrapper = document.createElement('div');
        this.__element.append(modalWrapper);
        modalWrapper.classList.add(styles.modalWrapper);

        let labelPromotion: Label;
        const piecesWrapper = document.createElement('div');
        piecesWrapper.classList.add(styles.piecesWrapper);

        if (side === Side.White) {
            modalWrapper.classList.add(styles.wrapperOpponent);
            labelPromotion = new Label('red', 'By which piece will you replace the pawn?');
            piecesWrapper.classList.add(styles.player);
        } else {
            modalWrapper.classList.add(styles.wrapperPlayer);
            labelPromotion = new Label('blue', 'By which piece will you replace the pawn?');
            piecesWrapper.classList.add(styles.opponent);
        }
        modalWrapper.append(labelPromotion.element, piecesWrapper);

        const piecesPossiblePromotion: StringPiece[] = ['rook', 'knight', 'queen', 'bishop'];
        const stringToPieceType = new Map<StringPiece, PieceType>([
            ['rook', PieceType.Rook],
            ['knight', PieceType.Knight],
            ['queen', PieceType.Queen],
            ['bishop', PieceType.Bishop],
        ]);

        for (let i = 0; i < piecesPossiblePromotion.length; i++) {
            const namePiece = piecesPossiblePromotion[i];
            const buttonPiece = document.createElement('div');
            buttonPiece.classList.add(styles.box, piecesPossiblePromotion[i]);
            const imagePiece = document.createElement('div');
            imagePiece.classList.add(styles[piecesPossiblePromotion[i]]);
            buttonPiece.append(imagePiece);
            piecesWrapper.append(buttonPiece);

            buttonPiece.addEventListener('click', () => {
                this.__element.classList.remove(styles.modal);
                this.__element.classList.add(styles.modalInvisible);
                this.__pieceChosen = namePiece;
                const pieceType = stringToPieceType.get(this.__pieceChosen);
                if (pieceType) this.__onClick(pieceType);
            });
        }
    }

    public get element(): HTMLDialogElement {
        return this.__element;
    }

    public openModal(onClick: (piece: PieceType) => void): void {
        this.__element.classList.remove(styles.modalInvisible);
        this.__element.classList.add(styles.modal);
        this.__onClick = onClick;
    }

    public get pieceChosen(): string {
        return this.__pieceChosen;
    }
}
