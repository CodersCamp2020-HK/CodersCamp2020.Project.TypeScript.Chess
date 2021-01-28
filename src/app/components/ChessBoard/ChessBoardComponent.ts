import { ChessBoardRepresentation, Piece, Cord, Side, PieceType } from '../../models/EngineInterface';
import styles from './chess.module.scss';
export interface PieceElement {
    element: HTMLElement;
    piece: PieceType;
    side: Side;
}

export class ChessBoardComponent {
    wrapper: HTMLDivElement;
    board: HTMLDivElement;
    verticalAxi: HTMLDivElement;
    horizontalAxi: HTMLDivElement;
    blackTilesClassList: string;
    whiteTilesClassList: string;
    tiles: Array<Array<null | HTMLDivElement>> = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];
    piecesElements: PieceElement[];
    constructor(
        wrapper: HTMLDivElement,
        piecesElements: PieceElement[],
        chessBoardRepresentation: ChessBoardRepresentation,
    ) {
        this.wrapper = wrapper;

        this.board = document.createElement('div');
        this.board.className = styles.board;

        this.verticalAxi = document.createElement('div');
        this.verticalAxi.className = styles.vertical__axi;

        this.horizontalAxi = document.createElement('div');
        this.horizontalAxi.className = styles.horizontal__axi;

        this.blackTilesClassList = `${styles.tile} ${styles.black__tile}`;
        this.whiteTilesClassList = `${styles.tile} ${styles.white__tile}`;

        this.piecesElements = piecesElements;

        this.wrapper.appendChild(this.verticalAxi);
        this.wrapper.appendChild(this.horizontalAxi);
        this.wrapper.appendChild(this.board);

        this.renderAxi(this.horizontalAxi, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
        this.renderAxi(this.verticalAxi, [1, 2, 3, 4, 5, 6, 7, 8]);
        this.renderBoard(chessBoardRepresentation);
    }

    renderBoard(chessBoardRepresentation: ChessBoardRepresentation): void {
        const blackTile = document.createElement('div');
        blackTile.className = this.blackTilesClassList;

        const whiteTile = document.createElement('div');
        whiteTile.className = this.whiteTilesClassList;

        let currentTile = blackTile;
        this.board.innerHTML = '';

        for (let row = 0; row < chessBoardRepresentation.length; row++) {
            if (row % 2 == 0) {
                currentTile = whiteTile;
            } else {
                currentTile = blackTile;
            }

            for (let column = 0; column < chessBoardRepresentation[row].length; column++) {
                const tileToAppend = currentTile.cloneNode(true) as HTMLDivElement;

                if (chessBoardRepresentation[row][column] !== null) {
                    const pieceElement: PieceElement | undefined = this.piecesElements.find((element) => {
                        if (
                            element.piece == chessBoardRepresentation[row][column]?.piece &&
                            element.side == chessBoardRepresentation[row][column]?.side
                        ) {
                            return true;
                        }
                    });
                    if (pieceElement) {
                        tileToAppend.appendChild(pieceElement.element);
                    }
                }

                this.tiles[row][column] = tileToAppend;

                this.board.appendChild(tileToAppend);

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
        const selectedTile = this.tiles[cord.y][cord.x];
        classList.forEach((el) => {
            selectedTile?.classList.add(el);
        });
    }

    removeTileClassList(cord: Cord, classList: string[]): void {
        const selectedTile = this.tiles[cord.y][cord.x];
        classList.forEach((el) => {
            selectedTile?.classList.remove(el);
        });
    }

    removeTileEvent(cord: Cord, eventName: string, eventCallback: () => void): void {
        const selectedTile = this.tiles[cord.y][cord.x];
        selectedTile?.removeEventListener(eventName, eventCallback);
    }

    addTileEvent(cord: Cord, eventName: string, eventCallback: () => void): void {
        const selectedTile = this.tiles[cord.y][cord.x];
        selectedTile?.addEventListener(eventName, eventCallback);
    }
}
