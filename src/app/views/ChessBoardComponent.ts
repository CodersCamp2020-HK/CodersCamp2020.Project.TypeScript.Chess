import { ChessBoardRepresentation, Piece, Cord, Side, PieceType } from '../models/EngineInterface';

export interface PieceElement {
    element: HTMLElement;
    piece: PieceType;
    side: Side;
}

import styles from './chess.scss';
export class ChessBoardComponent {
    wrapper: HTMLDivElement;
    chessBoardElement: HTMLDivElement;
    verticalAxi: HTMLDivElement;
    horizontalAxi: HTMLDivElement;
    blackTilesClassList: string;
    whiteTilesClassList: string;
    piecesElements: PieceElement[];
    constructor(
        blackTilesClassList: string,
        whiteTilesClassList: string,
        piecesElements: PieceElement[],
        chessBoardRepresentation: ChessBoardRepresentation,
    ) {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'board-wrapper';

        this.chessBoardElement = document.createElement('div');
        this.chessBoardElement.className = 'board';

        this.verticalAxi = document.createElement('div');
        this.verticalAxi.className = 'vertical-axi';

        this.horizontalAxi = document.createElement('div');
        this.horizontalAxi.className = 'horizontal-axi';

        this.blackTilesClassList = blackTilesClassList;
        this.whiteTilesClassList = whiteTilesClassList;

        this.piecesElements = piecesElements;

        this.wrapper.appendChild(this.verticalAxi);
        this.wrapper.appendChild(this.horizontalAxi);
        this.wrapper.appendChild(this.chessBoardElement);

        this.renderAxi(this.horizontalAxi, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
        this.renderAxi(this.verticalAxi, [1, 2, 3, 4, 5, 6, 7, 8]);
        this.render(chessBoardRepresentation);
    }

    render(chessBoardRepresentation: ChessBoardRepresentation): void {
        const blackTile = document.createElement('div');
        blackTile.classList.add(this.blackTilesClassList);

        const whiteTile = document.createElement('div');
        whiteTile.classList.add(this.whiteTilesClassList);

        let currentTile = blackTile;
        this.chessBoardElement.innerHTML = '';

        for (let i = 0; i < chessBoardRepresentation.length; i++) {
            if (i % 2 == 0) {
                currentTile = whiteTile;
            } else {
                currentTile = blackTile;
            }

            for (let j = 0; j < chessBoardRepresentation[i].length; j++) {
                const tileToAppend = currentTile.cloneNode(true) as HTMLDivElement;
                tileToAppend.dataset.x = j.toString();
                tileToAppend.dataset.y = i.toString();

                if (chessBoardRepresentation[i][j] !== null) {
                    const pieceElement: PieceElement | undefined = this.piecesElements.find((element) => {
                        if (
                            element.piece == chessBoardRepresentation[i][j]?.piece &&
                            element.side == chessBoardRepresentation[i][j]?.side
                        ) {
                            return true;
                        }
                    });
                    if (pieceElement) {
                        tileToAppend.appendChild(pieceElement.element);
                    }
                }

                this.chessBoardElement.appendChild(tileToAppend);

                currentTile = currentTile == blackTile ? whiteTile : blackTile;
            }
        }
    }
    renderAxi(axi: HTMLDivElement, legend: (number | string)[]): void {
        axi.innerHTML = '';
        legend.forEach((legendRow) => {
            const span = document.createElement('span');
            span.className = 'one-legend';
            span.textContent = legendRow.toString();
            axi.appendChild(span);
        });
    }
    addTileClassList(cord: Cord, classList: string[]): void {
        const selectedTile = this.chessBoardElement.querySelector(`div[data-x="${cord.x}"][data-y="${cord.y}"]`);
        selectedTile?.classList.add(...classList);
    }

    removeTileClassList(cord: Cord, classList: string[]): void {
        const selectedTile = this.chessBoardElement.querySelector(`div[data-x="${cord.x}"][data-y="${cord.y}"]`);
        selectedTile?.classList.remove(...classList);
    }

    removeTileEvent(cord: Cord, eventName: string, eventCallback: () => void): void {
        const selectedTile = this.chessBoardElement.querySelector(`div[data-x="${cord.x}"][data-y="${cord.y}"]`);
        selectedTile?.removeEventListener(eventName, eventCallback);
    }

    addTileEvent(cord: Cord, eventName: string, eventCallback: () => void): void {
        const selectedTile = this.chessBoardElement.querySelector(`div[data-x="${cord.x}"][data-y="${cord.y}"]`);
        selectedTile?.addEventListener(eventName, eventCallback);
    }
}
