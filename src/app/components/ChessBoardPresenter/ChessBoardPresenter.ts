import { ChessBoardView } from '../../domain/IChessBoard';
import {
    IChessBoardPresenter,
    ReadonlyMovesWithDisplayType,
    OnHoverHandler,
    OnClickHandler,
    ChessBoardSquareDisplayType
} from '../../domain/IPresenter';
import { ChessBoardComponent } from '../ChessBoard/ChessBoardComponent';
import styles from '../game/Game.module.scss';
import boardStyles from '../ChessBoard/chess.module.scss';
import { ChessBoard } from '../../infrastructure/ChessBoard';
import { piecesArray } from '../PiecesElements/piecesElements';
import { Cord } from '../../domain/basicChessTypes';
import styles from '../ChessBoard/chess.module.scss';


const displayToStyle = new Map([
    [ChessBoardSquareDisplayType.],
    [ChessBoardSquareDisplayType.Castling, styles.castling]
]);

class ChessBoardPresenter implements IChessBoardPresenter {
    private chessboardComponent: ChessBoardComponent;
    private chessboardWrapper: HTMLDivElement;

    constructor() {
        this.chessboardWrapper = document.createElement('div');
        const chessboard = ChessBoard.createNewBoard();
        this.chessboardWrapper.classList.add(styles.wrapperChessboard, boardStyles.boardWrapper);
        this.chessboardComponent = new ChessBoardComponent(this.chessboardWrapper, [...piecesArray], chessboard.board);
    }

    render(chessBoard: ChessBoardView): void {
        this.chessboardComponent.renderBoard(chessBoard);
    }

    markFields(fields: ReadonlyMovesWithDisplayType): void {}

    clearMarkedFields(fields?: readonly Readonly<Cord>[]): void {}

    onHover(callback: OnHoverHandler): void {}

    onClick(callback: OnClickHandler): void {}

    get element(): HTMLElement {
        return this.chessboardWrapper;
    }
}

export { ChessBoardPresenter };
