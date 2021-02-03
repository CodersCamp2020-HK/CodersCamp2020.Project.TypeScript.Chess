import styles from './CapturedTable.module.scss';

type Piece = 'queen' | 'king' | 'pawn' | 'knight' | 'rook' | 'bishop';

type CapturedPiecesSide = 'player' | 'opponent';

export class CapturedTable {
    private __element: HTMLDivElement;

    constructor(side: CapturedPiecesSide, capturedPieces: Piece[]) {
        this.__element = document.createElement('div');
        this.__element.classList.add(styles.capturedWrapper);
        this.__element.classList.add(styles[side]);

        for (let i = 0; i < capturedPieces.length; i++) {
            const pieceImage = document.createElement('div');
            pieceImage.classList.add(styles[capturedPieces[i]]);
            this.__element.appendChild(pieceImage);
        }
    }

    public update(updateCapturedPieces: Piece[]): void {
        this.__element.innerHTML = '';
        for (let i = 0; i < updateCapturedPieces.length; i++) {
            const pieceImage = document.createElement('div');
            pieceImage.classList.add(styles[updateCapturedPieces[i]]);
            this.__element.appendChild(pieceImage);
        }
    }

    public get element(): HTMLDivElement {
        return this.__element;
    }
}
