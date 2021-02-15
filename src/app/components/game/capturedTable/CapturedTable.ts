import { CapturedPiecesSide, StringPieces } from '../../../domain/basicChessTypes';
import styles from './CapturedTable.module.scss';

export class CapturedTable {
    private __element: HTMLDivElement;

    constructor(side: CapturedPiecesSide, capturedPieces: StringPieces[]) {
        this.__element = document.createElement('div');
        this.__element.classList.add(styles.capturedWrapper, styles[side]);

        for (let i = 0; i < capturedPieces.length; i++) {
            const pieceImage = document.createElement('div');
            pieceImage.classList.add(styles[capturedPieces[i]]);
            this.__element.appendChild(pieceImage);
        }
    }

    public update(updateCapturedPieces: StringPieces[]): void {
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
