import { Cord, Side, PieceType } from '../../domain/basicChessTypes';
import { ChessBoardView } from '../../domain/IChessBoard';
import styles from './chess.module.scss';
export interface PieceElement {
    element: HTMLElement | SVGSVGElement;
    figType: PieceType;
    side: Side;
}

export class ChessBoardComponent {
    private _wrapper: HTMLDivElement;
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
    constructor(wrapper: HTMLDivElement, piecesElements: PieceElement[], chessBoardRepresentation: ChessBoardView) {
        this._wrapper = wrapper;

        this._board = document.createElement('div');
        this._board.className = styles.board;

        this._verticalAxi = document.createElement('div');
        this._verticalAxi.className = styles.verticalAxi;

        this._horizontalAxi = document.createElement('div');
        this._horizontalAxi.className = styles.horizontalAxi;

        this._blackTilesClassList = `${styles.tile} ${styles.blackTile}`;
        this._whiteTilesClassList = `${styles.tile} ${styles.whiteTile}`;

        this.piecesElements = piecesElements;

        this._wrapper.append(this._verticalAxi, this._horizontalAxi, this._board);

        this.renderAxi(this._horizontalAxi, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
        this.renderAxi(this._verticalAxi, [1, 2, 3, 4, 5, 6, 7, 8].reverse());
        this.renderBoard(chessBoardRepresentation);
    }

    renderBoard(chessBoardRepresentation: ChessBoardView): void {
        const blackTile = document.createElement('div');
        blackTile.className = this._blackTilesClassList;

        const whiteTile = document.createElement('div');
        whiteTile.className = this._whiteTilesClassList;

        let currentTile = blackTile;
        this._board.innerHTML = '';

        for (let row = 0; row < chessBoardRepresentation.length; row++) {
            currentTile = row % 2 ? blackTile : whiteTile;

            for (let column = 0; column < chessBoardRepresentation[row].length; column++) {
                const tileToAppend = currentTile.cloneNode(true) as HTMLDivElement;

                if (chessBoardRepresentation[row][column] !== null) {
                    const pieceElement: PieceElement | undefined = this.piecesElements.find(
                        (element) =>
                            element.figType == chessBoardRepresentation[row][column]?.figType &&
                            element.side == chessBoardRepresentation[row][column]?.side,
                    );
                    if (pieceElement) {
                        tileToAppend.appendChild(pieceElement.element.cloneNode(true));
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
        const selectedTile = this._tiles[cord.x][cord.y];
        classList.forEach((el) => {
            selectedTile?.classList.add(el);
        });
    }

    clearTileClassList(cord: Cord): void {
        const selectedTile = this._tiles[cord.x][cord.y];
        if (selectedTile !== null) {
            selectedTile.className = '';
        }
    }

    removeTileClassList(cord: Cord, classList: string[]): void {
        const selectedTile = this._tiles[cord.x][cord.y];
        classList.forEach((el) => {
            selectedTile?.classList.remove(el);
        });
    }

    removeTileEvent(cord: Cord, eventName: string, eventCallback: () => void): void {
        const selectedTile = this._tiles[cord.x][cord.y];
        selectedTile?.removeEventListener(eventName, eventCallback);
    }

    addTileEvent(cord: Cord, eventName: string, eventCallback: () => void): void {
        const selectedTile = this._tiles[cord.x][cord.y];
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

    get wrapper(): HTMLDivElement {
        return this._wrapper;
    }
}
