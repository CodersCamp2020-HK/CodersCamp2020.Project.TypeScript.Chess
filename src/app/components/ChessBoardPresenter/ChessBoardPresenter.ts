import { ChessBoardView } from '../../domain/IChessBoard';
import {
    IChessBoardPresenter,
    ReadonlyMovesWithDisplayType,
    ChessBoardSquareDisplayType,
} from '../../domain/IPresenter';
import { ChessBoardComponent } from '../ChessBoard/ChessBoardComponent';
import styles from '../game/Game.module.scss';
import asideStyles from '../Aside/Aside.module.scss';
import boardStyles from '../ChessBoard/chess.module.scss';
import { piecesArray } from '../PiecesElements/piecesElements';
import { Cord, allBoardCords } from '../../domain/basicChessTypes';
import { Side } from '../../domain/basicChessTypes';
import { ChessBoardDomInputDevice } from './ChessBoardDomInputDevice';
import { generateDeafultChessboard } from '../../utils/ChessboardHelpers';
import { IChessBoardInputDevice } from '../../domain/IChessBoardInputDevice';

const displayToStyle = new Map<ChessBoardSquareDisplayType, string>([
    [ChessBoardSquareDisplayType.Normal, boardStyles.possibleMove],
    [ChessBoardSquareDisplayType.Move, boardStyles.possibleMoveHover],
    [ChessBoardSquareDisplayType.Selected, boardStyles.selected],
    [ChessBoardSquareDisplayType.Capture, boardStyles.capture],
    [ChessBoardSquareDisplayType.Castling, boardStyles.possibleMoveHover],
    [ChessBoardSquareDisplayType.EnPassant, boardStyles.enPassant],
]);

export class ChessBoardPresenter implements IChessBoardPresenter {
    private chessboardComponent: ChessBoardComponent;
    private chessboardWrapper: HTMLDivElement;
    private _inputDevice: ChessBoardDomInputDevice;

    constructor(chessboard: ChessBoardView = generateDeafultChessboard()) {
        this.chessboardWrapper = document.createElement('div');
        this.chessboardWrapper.classList.add(styles.wrapperChessboard, boardStyles.boardWrapper);
        this.chessboardComponent = new ChessBoardComponent(this.chessboardWrapper, [...piecesArray], chessboard);
        this._inputDevice = new ChessBoardDomInputDevice(this.chessboardComponent);
    }

    get inputDevice(): IChessBoardInputDevice {
        return this._inputDevice;
    }

    render(chessBoard: ChessBoardView): void {
        this.chessboardComponent.renderBoard(chessBoard);
        this._inputDevice.update();
    }

    markFields(fields: ReadonlyMovesWithDisplayType, side: Side): void {
        const currentColorToAdd = side == Side.White ? boardStyles.opponent : boardStyles.player;
        fields.forEach((field) => {
            const cssClass = displayToStyle.get(field.display);

            if (cssClass !== undefined) {
                this.chessboardComponent.addTileClassList({ x: field.x, y: field.y }, [currentColorToAdd, cssClass]);
            }
        });

        const castlingFields = fields.filter((x) => x.display === ChessBoardSquareDisplayType.Castling);
        for (const field of castlingFields) {
            if (field.x == 0 && field.y == 2) {
                const leftArrows: Cord[] = [{ x: 0, y: 4 }];
                leftArrows.forEach((cord) =>
                    this.chessboardComponent.addTileClassList(cord, [currentColorToAdd, boardStyles.castlingLeft]),
                );
                const rightArrows: Cord[] = [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 0, y: 3 },
                ];
                rightArrows.forEach((cord) =>
                    this.chessboardComponent.addTileClassList(cord, [currentColorToAdd, boardStyles.castlingRight]),
                );
            }

            if (field.x == 0 && field.y == 6) {
                const leftArrows: Cord[] = [
                    { x: 0, y: 5 },
                    { x: 0, y: 6 },
                    { x: 0, y: 7 },
                ];
                leftArrows.forEach((cord) =>
                    this.chessboardComponent.addTileClassList(cord, [currentColorToAdd, boardStyles.castlingLeft]),
                );
                const rightArrows: Cord[] = [{ x: 0, y: 4 }];
                rightArrows.forEach((cord) =>
                    this.chessboardComponent.addTileClassList(cord, [currentColorToAdd, boardStyles.castlingRight]),
                );
            }

            if (field.x == 7 && field.y == 2) {
                const leftArrows: Cord[] = [{ x: 7, y: 4 }];
                leftArrows.forEach((cord) =>
                    this.chessboardComponent.addTileClassList(cord, [currentColorToAdd, boardStyles.castlingLeft]),
                );
                const rightArrows: Cord[] = [
                    { x: 7, y: 0 },
                    { x: 7, y: 1 },
                    { x: 7, y: 2 },
                    { x: 7, y: 3 },
                ];
                rightArrows.forEach((cord) =>
                    this.chessboardComponent.addTileClassList(cord, [currentColorToAdd, boardStyles.castlingRight]),
                );
            }

            if (field.x == 7 && field.y == 6) {
                const leftArrows: Cord[] = [
                    { x: 7, y: 5 },
                    { x: 7, y: 6 },
                    { x: 7, y: 7 },
                ];
                leftArrows.forEach((cord) =>
                    this.chessboardComponent.addTileClassList(cord, [currentColorToAdd, boardStyles.castlingLeft]),
                );
                const rightArrows: Cord[] = [{ x: 7, y: 4 }];
                rightArrows.forEach((cord) =>
                    this.chessboardComponent.addTileClassList(cord, [currentColorToAdd, boardStyles.castlingRight]),
                );
            }
        }
    }

    clearMarkedFields(fields?: readonly Readonly<Cord>[]): void {
        const cordsToClear = fields ?? allBoardCords;
        for (const cord of cordsToClear) {
            this.chessboardComponent.clearTileClassList(cord);
        }
    }

    setDangerColor(): void {
        const gameBorder = document.body.querySelector('.' + styles.container) as HTMLElement;
        if (gameBorder) {
            gameBorder.classList.add(styles.danger);
        }

        const asides = document.querySelectorAll('.' + asideStyles.wrapper);

        asides.forEach((aside) => {
            aside.classList.add(asideStyles.danger);
        });

        const buttons = document.querySelectorAll('.' + asideStyles.btn);

        buttons.forEach((button) => {
            button.classList.add(asideStyles.danger);
        });
    }

    unsetDangerColor(): void {
        const bord = document.body.querySelector('.' + styles.container) as HTMLElement;
        if (bord) {
            bord.classList.remove(styles.danger);
        }

        const asides = document.querySelectorAll('.' + asideStyles.wrapper);

        asides.forEach((aside) => {
            aside.classList.remove(asideStyles.danger);
        });

        const buttons = document.querySelectorAll('.' + asideStyles.btn);

        buttons.forEach((button) => {
            button.classList.remove(asideStyles.danger);
        });
    }

    get element(): HTMLElement {
        return this.chessboardWrapper;
    }
}
