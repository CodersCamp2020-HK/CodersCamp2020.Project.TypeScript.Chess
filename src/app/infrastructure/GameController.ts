import { Cord, CordWithMoveType, MoveType, Piece, Side } from '../domain/basicChessTypes';
import { ChessBoardView } from '../domain/IChessBoard';
import { IChessEngine } from '../domain/IChessEngine';
import { IChessBoardPresenter } from '../domain/IPresenter';
import { ChessBoard } from './ChessBoard';
import { GameState } from './GameState';
import { ReadonlyMovesWithDisplayType, CordWithDisplayType, ChessBoardSquareDisplayType } from '../domain/IPresenter';

export class GameController {
    constructor(
        private currentTurn: Side,
        private lastBoardState: ChessBoardView,
        private pieceIsSelected: boolean,
        private currentSelectedPiece: Piece | null,
        private chessboardState: ChessBoard,
        private gameState: GameState,
        public chessEngine: IChessEngine,
        public chessboardPresenter: IChessBoardPresenter,
    ) {
        this.currentTurn = Side.White;
        this.pieceIsSelected = false;
        this.lastBoardState = this.gameState.previousBoards[this.gameState.previousBoards.length - 1];
        chessboardPresenter.onHover((cord) => this.handleOnHover(cord));
        chessboardPresenter.onClick((cord) => this.handleOnClick(cord));
    }

    private convertMovesToDisplayType(moves: CordWithMoveType[]): ReadonlyMovesWithDisplayType {
        const moveTypeToDisplayType = new Map([
            [MoveType.NormalMove, ChessBoardSquareDisplayType.Normal],
            [MoveType.Capture, ChessBoardSquareDisplayType.Capture],
            [MoveType.Castling, ChessBoardSquareDisplayType.Castling],
            [MoveType.Promotion, ChessBoardSquareDisplayType.Promotion],
            [MoveType.EnPassant, ChessBoardSquareDisplayType.EnPassant],
        ]);
        const result: Array<CordWithDisplayType> = [];
        moves.forEach((move) => {
            if (move) {
                const displayType = moveTypeToDisplayType.get(move.moveType);
                if (displayType) result.push({ x: move.x, y: move.y, display: displayType });
            }
        });
        return result;
    }

    handleOnHover(cord: Cord): void {
        if (this.currentSelectedPiece) {
            const possibleMoves = this.chessEngine.getPossibleMovesForPiece(
                this.currentSelectedPiece.cord,
                this.chessboardState,
                this.lastBoardState,
            );
            const hasMove = possibleMoves.some((item) => item.x === cord.x && item.y === cord.y);
            if (hasMove) {
                this.chessboardPresenter.markFields([
                    { x: cord.x, y: cord.y, display: ChessBoardSquareDisplayType.Move },
                ]);
            }
        }
        this.chessboardPresenter.clearMarkedFields();
        const moves = this.chessEngine.getPossibleMovesForPiece(cord, this.chessboardState, this.lastBoardState);
        this.chessboardPresenter.markFields(this.convertMovesToDisplayType(moves));
    }

    handleOnClick(cord: Cord): void {
        const piece = this.chessboardState.getPiece(cord);
        if (piece && piece.side === this.currentTurn) {
            this.pieceIsSelected = !this.pieceIsSelected;
            this.currentSelectedPiece = piece;
            // this.chessboardPresenter.clearMarkedFields(); ???????
            this.chessboardPresenter.markFields([
                { x: piece.cord.x, y: piece.cord.y, display: ChessBoardSquareDisplayType.Selected },
            ]);
        } else if (this.pieceIsSelected && this.currentSelectedPiece) {
            const possibleMoves = this.chessEngine.getPossibleMovesForPiece(
                this.currentSelectedPiece.cord,
                this.chessboardState,
                this.lastBoardState,
            );
            const hasMove = possibleMoves.some((item) => item.x === cord.x && item.y === cord.y);
            if (hasMove) {
                this.chessboardState.makeMove(this.currentSelectedPiece, cord);
                this.currentTurn === Side.Black ? Side.White : Side.Black;
                // if (this.chessEngine.isCheckmate) {
                //     console.log('Koniec');
                // }
                // if (this.chessEngine.isStealemate) {
                //     console.log('Remis');
                // }
                if (this.chessEngine.isCheck(this.chessboardState, this.currentTurn)) {
                    this.chessboardPresenter.markFields([{ x: 0, y: 0, display: ChessBoardSquareDisplayType.Check }]);
                }
            }
            this.chessboardPresenter.clearMarkedFields();
            this.currentSelectedPiece = null;
            this.pieceIsSelected = false;
        }
    }
}
