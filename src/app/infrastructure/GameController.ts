import { Cord, MoveType, Piece, Score, Side } from '../domain/basicChessTypes';
import { ChessBoardView } from '../domain/IChessBoard';
import { IChessEngine } from '../domain/IChessEngine';
import { IChessBoardPresenter } from '../domain/IPresenter';
import { ChessBoard } from './ChessBoard';
import { GameState } from './GameState';
import { ChessBoardSquareDisplayType } from '../domain/IPresenter';
import { convertMovesToDisplayType } from '../utils/ConvertMovesToDisplayType';
import { Timer } from '../components/timer/Timer';
import { ChessEngine } from './ChessEngine';

export class GameController {
    private whiteTimer: Timer;
    private blackTimer: Timer;
    private turnCounter: number;
    private currentTurn: Side;
    private lastBoardState: ChessBoardView;
    private pieceIsSelected: boolean;
    private currentSelectedPiece: Piece | null = null;
    private chessboardState = new ChessBoard();
    private gameState: GameState = new GameState();
    public chessEngine: IChessEngine = new ChessEngine();
    constructor(public chessboardPresenter: IChessBoardPresenter, private onEndGame: (score: Score) => void) {
        this.whiteTimer = new Timer(300, 3, () => onEndGame(Score.BlackWon));
        this.blackTimer = new Timer(300, 3, () => onEndGame(Score.WhiteWon));
        this.turnCounter = 0;
        this.currentTurn = Side.White;
        this.pieceIsSelected = false;
        this.lastBoardState = [];
        chessboardPresenter.onHover((cord) => this.handleOnHover(cord));
        chessboardPresenter.onClick((cord) => this.handleOnClick(cord));
    }

    private hasMove(cord: Cord): boolean {
        if (this.currentSelectedPiece) {
            const possibleMoves = this.chessEngine.getPossibleMovesForPiece(
                this.currentSelectedPiece.cord,
                this.chessboardState,
                this.lastBoardState,
            );
            return possibleMoves.some((item) => item.x === cord.x && item.y === cord.y);
        }
        return false;
    }

    private updateGameState(): void {
        if (this.turnCounter === 2) {
            this.turnCounter = 0;
            this.gameState.updateCapturedPieces(this.chessboardState);
        }
    }

    private updateTimer(): void {
        if (this.gameState.previousBoards.length === 1 && this.currentTurn === Side.White) {
            this.whiteTimer.start(Score.BlackWon);
        } else {
            if (this.currentTurn === Side.Black) {
                this.whiteTimer.stop();
                this.blackTimer.start(Score.WhiteWon);
            } else {
                this.blackTimer.stop();
                this.whiteTimer.start(Score.BlackWon);
            }
        }
    }

    handleOnHover(cord: Cord): void {
        if (this.currentSelectedPiece) {
            if (this.hasMove(cord)) {
                this.rerenderCurrentSelectedPiece();
                this.chessboardPresenter.markFields(
                    [{ ...cord, display: ChessBoardSquareDisplayType.Move }],
                    this.currentTurn,
                );
            }
        } else {
            const piece = this.chessboardState.getPiece(cord);
            if (piece && piece.side === this.currentTurn) {
                this.chessboardPresenter.clearMarkedFields();
                const moves = this.chessEngine.getPossibleMovesForPiece(
                    cord,
                    this.chessboardState,
                    this.lastBoardState,
                );
                this.chessboardPresenter.markFields(convertMovesToDisplayType(moves), this.currentTurn);
            }
        }
    }

    handleOnClick(cord: Cord): void {
        let piece = this.chessboardState.getPiece(cord);

        if (this.currentSelectedPiece) {
            const moves = this.chessEngine.getPossibleMovesForPiece(
                this.currentSelectedPiece.cord,
                this.chessboardState,
                this.lastBoardState,
            );
            const filteredMoves = moves.filter((move) => move.x === cord.x && move.y === cord.y);
            if (filteredMoves.length > 0) {
                const { x, y, moveType } = filteredMoves[0];
                if (cord.x === x && cord.y === y) {
                    this.turnCounter++;
                    this.gameState.updatePreviousBoards(this.chessboardState.board);
                    this.lastBoardState = this.gameState.previousBoards[this.gameState.previousBoards.length - 1];
                    if (moveType === MoveType.EnPassant) {
                        this.chessboardState.makeEnPassant(this.currentSelectedPiece, cord);
                    } else {
                        this.chessboardState.makeMove(this.currentSelectedPiece, cord);
                    }
                    this.chessboardPresenter.render(this.chessboardState.board);
                    this.currentTurn = this.currentTurn === Side.White ? Side.Black : Side.White;
                    if (this.chessEngine.isCheck(this.chessboardState, this.currentTurn)) {
                        console.log('Szach');
                    }
                    this.chessboardPresenter.clearMarkedFields();
                    this.currentSelectedPiece = null;
                    piece = null;
                }
            }
        }

        if (this.currentSelectedPiece === piece) {
            this.chessboardPresenter.clearMarkedFields();
            this.currentSelectedPiece = null;
        } else if (piece && piece.side === this.currentTurn) {
            this.currentSelectedPiece = piece;
            this.rerenderCurrentSelectedPiece();
        } else {
            this.chessboardPresenter.clearMarkedFields();
            this.currentSelectedPiece = null;
        }
    }

    private rerenderCurrentSelectedPiece(): void {
        if (this.currentSelectedPiece) {
            const piece = this.currentSelectedPiece;
            this.chessboardPresenter.clearMarkedFields();
            const moves = this.chessEngine.getPossibleMovesForPiece(
                piece.cord,
                this.chessboardState,
                this.lastBoardState,
            );
            this.chessboardPresenter.markFields(convertMovesToDisplayType(moves), piece.side);
            this.chessboardPresenter.markFields(
                [{ ...piece.cord, display: ChessBoardSquareDisplayType.Selected }],
                piece.side,
            );
        }
    }
}
