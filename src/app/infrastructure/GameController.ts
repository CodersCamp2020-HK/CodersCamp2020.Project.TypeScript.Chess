import {
    Cord,
    MoveType,
    Piece,
    PromotionPieceType,
    Score,
    Side,
    CordWithMoveType,
    PieceType,
} from '../domain/basicChessTypes';
import { ChessBoardView } from '../domain/IChessBoard';
import { IChessEngine } from '../domain/IChessEngine';
import { IChessBoardPresenter } from '../domain/IPresenter';
import { ChessBoard } from './ChessBoard';
import { GameState } from './GameState';
import { ChessBoardSquareDisplayType } from '../domain/IPresenter';
import { convertMovesToDisplayType } from '../utils/ConvertMovesToDisplayType';
import { Timer } from '../components/timer/Timer';
import { ChessEngine } from './ChessEngine';
import { IGameStatsPresenter } from '../domain/IGameStatsPresenter';
import _ from 'lodash';

export class GameController {
    private whiteTimer: Timer;
    private blackTimer: Timer;
    private currentTurn: Side;
    private lastBoardState: ChessBoardView;
    private currentSelectedPiece: Piece | null = null;
    private chessboardState = new ChessBoard();
    private gameState: GameState = new GameState();
    public chessEngine: IChessEngine = new ChessEngine();
    constructor(
        public chessboardPresenter: IChessBoardPresenter,
        public gameStatsPresenter: IGameStatsPresenter,
        private onEndGame: (score: Score) => void,
    ) {
        this.whiteTimer = new Timer(300, 0, () => onEndGame(Score.BlackWon));
        this.blackTimer = new Timer(300, 0, () => onEndGame(Score.WhiteWon));
        this.currentTurn = Side.White;
        this.lastBoardState = [];
        chessboardPresenter.onHover((cord) => this.handleOnHover(cord));
        chessboardPresenter.onClick((cord) => this.handleOnClick(cord));
    }

    private hasMove(cord: Cord): boolean {
        if (this.currentSelectedPiece) {
            const possibleMoves = this.getPossibleMoves();
            return possibleMoves.some((item) => item.x === cord.x && item.y === cord.y);
        }
        return false;
    }

    private getPossibleMoves(piece?: Piece): CordWithMoveType[] {
        if (piece) {
            const moves = this.chessEngine.getPossibleMovesForPiece(
                piece.cord,
                this.chessboardState,
                this.lastBoardState,
            );
            return this.chessEngine.getPossibleMovesForPieceWhenIsCheck(
                piece.cord,
                this.chessboardState,
                this.lastBoardState,
                moves,
            );
        }
        if (this.currentSelectedPiece) {
            const moves = this.chessEngine.getPossibleMovesForPiece(
                this.currentSelectedPiece.cord,
                this.chessboardState,
                this.lastBoardState,
            );
            return this.chessEngine.getPossibleMovesForPieceWhenIsCheck(
                this.currentSelectedPiece.cord,
                this.chessboardState,
                this.lastBoardState,
                moves,
            );
        }
        return [];
    }

    private continueOnClick(lastPiece: Piece, { x, y, moveType }: CordWithMoveType, promotionPiece: PieceType) {
        this.chessboardPresenter.render(this.chessboardState.board);
        this.currentTurn = this.currentTurn === Side.White ? Side.Black : Side.White;
        const promotionPieceType = new Map<PieceType, PromotionPieceType>([
            [PieceType.Rook, PromotionPieceType.Rook],
            [PieceType.Knight, PromotionPieceType.Knight],
            [PieceType.Queen, PromotionPieceType.Queen],
            [PieceType.Bishop, PromotionPieceType.Bishop],
        ]);
        const chosen = promotionPieceType.get(promotionPiece);
        if (chosen !== undefined) {
            this.gameState.updatePreviousMoves(
                lastPiece,
                { x, y, moveType: [moveType] },
                this.chessEngine,
                this.chessboardState,
                chosen,
            );
        }
        this.gameStatsPresenter.updatePreviousMoves(this.gameState.previousMoves);
        console.log(this.gameState.previousMoves);

        this.gameState.updateCapturedPieces(this.chessboardState, this.currentTurn);
        this.gameStatsPresenter.updateCaptureTable(this.gameState.capturedPieces);

        if (this.gameState.previousBoards.length === 1) {
            this.blackTimer.start(Score.WhiteWon);
        }
        if (this.gameState.previousBoards.length > 1) {
            if (this.currentTurn === Side.Black) {
                this.whiteTimer.stop();
                this.blackTimer.start(Score.WhiteWon);
            } else {
                this.blackTimer.stop();
                this.whiteTimer.start(Score.BlackWon);
            }
        }

        if (this.chessEngine.isCheckmate(this.chessboardState, this.currentTurn, this.lastBoardState)) {
            console.log('Macik');
        }
        if (this.chessEngine.isStealemate(this.chessboardState, this.currentTurn, this.lastBoardState)) {
            console.log('Pacik');
        }
        if (this.chessEngine.isCheck(this.chessboardState, this.currentTurn, this.lastBoardState)) {
            console.log('Szach');
        }
        this.chessboardPresenter.clearMarkedFields();
        this.currentSelectedPiece = null;
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
                const moves = this.getPossibleMoves(piece);
                this.chessboardPresenter.markFields(convertMovesToDisplayType(moves), this.currentTurn);
            } else {
                this.chessboardPresenter.clearMarkedFields();
            }
        }
    }

    handleOnClick(cord: Cord): void {
        let piece = this.chessboardState.getPiece(cord);

        if (this.currentSelectedPiece) {
            const moves = this.getPossibleMoves();
            const filteredMoves = moves.filter((move) => move.x === cord.x && move.y === cord.y);
            if (filteredMoves.length > 0) {
                const { x, y, moveType } = filteredMoves[0];
                if (cord.x === x && cord.y === y) {
                    this.gameState.updatePreviousBoards(this.chessboardState.board);
                    this.lastBoardState = this.gameState.previousBoards[this.gameState.previousBoards.length - 1];
                    const lastPiece = _.cloneDeep(this.currentSelectedPiece);

                    moveType === MoveType.EnPassant
                        ? this.chessboardState.makeEnPassant(this.currentSelectedPiece, cord)
                        : this.chessboardState.makeMove(this.currentSelectedPiece, cord);

                    if (
                        (cord.x === 0 && this.currentSelectedPiece.figType === PieceType.Pawn) ||
                        (cord.x === 7 && this.currentSelectedPiece.figType === PieceType.Pawn)
                    ) {
                        this.gameStatsPresenter.openPromotionModal(this.currentTurn, (pieceChosen) => {
                            if (this.currentSelectedPiece) {
                                this.currentSelectedPiece.figType = pieceChosen;
                            } else {
                                throw new Error('Cannot promote piece.');
                            }
                            this.continueOnClick(lastPiece, { x, y, moveType }, pieceChosen);
                        });
                        return;
                    }

                    this.continueOnClick(lastPiece, { x, y, moveType }, PieceType.Queen);
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
            const moves = this.getPossibleMoves();
            this.chessboardPresenter.markFields(convertMovesToDisplayType(moves), piece.side);
            this.chessboardPresenter.markFields(
                [{ ...piece.cord, display: ChessBoardSquareDisplayType.Selected }],
                piece.side,
            );
        }
    }
}
