import { ChessBoardRepresentation, Cord, Side, PieceType } from '../../domain/basicChessTypes';
import styles from './chess.module.scss';
export interface PieceElement {
    element: HTMLElement;
    figType: PieceType;
    side: Side;
}

export class ChessBoardComponent {
    public wrapper: HTMLDivElement;
    private _board: HTMLDivElement;
    private _verticalAxi: HTMLDivElement;
    private _horizontalAxi: HTMLDivElement;
    private readonly _blackTilesClassList: string;
    private readonly _whiteTilesClassList: string;
    private _tiles: Array<Array<null | HTMLDivElement>> = [
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

        this._board = document.createElement('div');
        this._board.className = styles.board;

        this._verticalAxi = document.createElement('div');
        this._verticalAxi.className = styles.vertical__axi;

        this._horizontalAxi = document.createElement('div');
        this._horizontalAxi.className = styles.horizontal__axi;

        this._blackTilesClassList = `${styles.tile} ${styles.black__tile}`;
        this._whiteTilesClassList = `${styles.tile} ${styles.white__tile}`;

        this.piecesElements = piecesElements;

        this.wrapper.appendChild(this._verticalAxi);
        this.wrapper.appendChild(this._horizontalAxi);
        this.wrapper.appendChild(this._board);

        this.renderAxi(this._horizontalAxi, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
        this.renderAxi(this._verticalAxi, [1, 2, 3, 4, 5, 6, 7, 8]);
        this.renderBoard(chessBoardRepresentation);
    }

    renderBoard(chessBoardRepresentation: ChessBoardRepresentation): void {
        const blackTile = document.createElement('div');
        blackTile.className = this._blackTilesClassList;

        const whiteTile = document.createElement('div');
        whiteTile.className = this._whiteTilesClassList;

        let currentTile = blackTile;
        this._board.innerHTML = '';

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
                            element.figType == chessBoardRepresentation[row][column]?.figType &&
                            element.side == chessBoardRepresentation[row][column]?.side
                        ) {
                            return true;
                        }
                    });
                    if (pieceElement) {
                        tileToAppend.appendChild(pieceElement.element);
                    }
                }

                this._tiles[row][column] = tileToAppend;

                this._board.appendChild(tileToAppend);

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
        const selectedTile = this._tiles[cord.y][cord.x];
        classList.forEach((el) => {
            selectedTile?.classList.add(el);
        });
    }

    removeTileClassList(cord: Cord, classList: string[]): void {
        const selectedTile = this._tiles[cord.y][cord.x];
        classList.forEach((el) => {
            selectedTile?.classList.remove(el);
        });
    }

    removeTileEvent(cord: Cord, eventName: string, eventCallback: () => void): void {
        const selectedTile = this._tiles[cord.y][cord.x];
        selectedTile?.removeEventListener(eventName, eventCallback);
    }

    addTileEvent(cord: Cord, eventName: string, eventCallback: () => void): void {
        const selectedTile = this._tiles[cord.y][cord.x];
        selectedTile?.addEventListener(eventName, eventCallback);
    }

    get board(): HTMLDivElement {
        return this._board;
    }

    get verticalAxi(): HTMLDivElement {
        return this._verticalAxi;
    }

    get horizontalAxi(): HTMLDivElement {
        return this._horizontalAxi;
    }

    get tiles(): Array<Array<null | HTMLDivElement>> {
        return this._tiles;
    }
}
