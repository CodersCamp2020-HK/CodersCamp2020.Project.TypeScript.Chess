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
import { ChessEngine } from './ChessEngine';
import { IChessBoardInputDevice } from '../domain/IChessBoardInputDevice';
import { IGameStatsPresenter } from '../domain/IGameStatsPresenter';
import _ from 'lodash';
import { AI } from './AI';
import { StartGameParams } from '../components/MainMenu/MainMenu';

export class GameController {
    private currentTurn: Side;
    private lastBoardState: ChessBoardView;
    private currentSelectedPiece: Piece | null = null;
    private chessboardState = ChessBoard.createNewBoard();
    private gameState: GameState = new GameState();
    public chessEngine: IChessEngine = new ChessEngine();
    undoNumbersWhite = 0;
    undoNumbersBlack = 0;
    stockfish: AI;
    isAI: boolean;
    constructor(
        private params: StartGameParams,
        public chessboardPresenter: IChessBoardPresenter,
        public gameStatsPresenter: IGameStatsPresenter,
        private chessboardInputDevice: IChessBoardInputDevice,
        private onEndGame: (score: Score) => void,
    ) {
        this.stockfish = new AI(10);
        this.currentTurn = Side.White;
        this.lastBoardState = [];
        this.isAI = params.playWith === 'computer';

        this.chessboardInputDevice.onHover((cord) => this.handleOnHover(cord));
        this.chessboardInputDevice.onClick((cord) => this.handleOnClick(cord));

        this.gameStatsPresenter.createPreviousButtons(
            () => this.renderFirstBoard(),
            () => this.renderPreviousBoard(),
            () => this.renderNextBoard(),
            () => this.renderLastBoard(),
        );
    }

    private hasMove(cord: Cord): boolean {
        if (this.currentSelectedPiece) {
            const possibleMoves = this.getPossibleMoves();
            return possibleMoves.some((item) => item.x === cord.x && item.y === cord.y);
        }
        return false;
    }

    private renderFirstBoard(): void {
        if (this.currentTurn === Side.White) {
            this.undoNumbersWhite = 0;
            this.chessboardPresenter.render(this.gameState.previousBoards[this.undoNumbersWhite]);
        }
    }

    private renderPreviousBoard(): void {
        if (this.undoNumbersWhite > 0 && this.currentTurn === Side.White) {
            this.undoNumbersWhite--;
            this.chessboardPresenter.render(this.gameState.previousBoards[this.undoNumbersWhite]);
        }
    }

    private renderNextBoard(): void {
        if (this.undoNumbersWhite < this.gameState.previousBoards.length - 1 && this.currentTurn === Side.White) {
            this.undoNumbersWhite++;
            this.chessboardPresenter.render(this.gameState.previousBoards[this.undoNumbersWhite]);
        }
    }

    private renderLastBoard(): void {
        if (this.currentTurn === Side.White) {
            this.undoNumbersWhite = this.gameState.previousBoards.length - 1;
            this.chessboardPresenter.render(this.gameState.previousBoards[this.undoNumbersWhite]);
        }
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

    private endGame(side: Side, winWay: string, playerName: string, opponentName: string) {
        this.gameStatsPresenter.openModal(
            side,
            this.gameState.previousMoves.length,
            this.gameStatsPresenter.getRemainingTime(side),
            winWay,
            playerName,
            opponentName,
            () => console.log('Main'),
            () => console.log('Play again'),
        );
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
        this.gameState.updateCapturedPieces(this.chessboardState.board, this.currentTurn);
        this.gameStatsPresenter.updateCaptureTable(this.gameState.capturedPieces);

        if (this.gameState.previousBoards.length === 1) {
            this.gameStatsPresenter.startTimer(Side.Black, () => {
                this.endGame(Side.White, 'Timeout', this.params.playerName1, this.params.playerName2);
            });
        }
        if (this.gameState.previousBoards.length > 1) {
            if (this.currentTurn === Side.Black) {
                this.gameStatsPresenter.stopTimer(Side.White);
                this.gameStatsPresenter.startTimer(Side.Black, () => {
                    this.endGame(Side.White, 'Timeout', this.params.playerName1, this.params.playerName2);
                });
            } else {
                this.gameStatsPresenter.stopTimer(Side.Black);
                this.gameStatsPresenter.startTimer(Side.White, () => {
                    this.endGame(Side.Black, 'Timeout', this.params.playerName1, this.params.playerName2);
                });
            }
        }

        if (this.chessEngine.isCheckmate(this.chessboardState, this.currentTurn, this.lastBoardState)) {
            this.endGame(this.currentTurn, 'Mat', this.params.playerName1, this.params.playerName2);
        } else if (this.chessEngine.isStealemate(this.chessboardState, this.currentTurn, this.lastBoardState)) {
            this.endGame(this.currentTurn, 'Pat', this.params.playerName1, this.params.playerName2);
        }
        if (this.chessEngine.isCheck(this.chessboardState, this.currentTurn, this.lastBoardState)) {
            console.log('Szach');
        }
        this.chessboardPresenter.clearMarkedFields();
        this.currentSelectedPiece = null;

        // STOCKFISH
        if (this.currentTurn === Side.Black && this.isAI) {
            this.stockfish.getMove({ x: lastPiece.cord.x, y: lastPiece.cord.y }, { x, y }).then((aiMove) => {
                let piece = this.chessboardState.getPiece({ x: aiMove.from.x, y: aiMove.from.y });
                if (!piece) throw new Error('Stockfish pijany!');
                const moves = this.getPossibleMoves(piece);
                const filteredMoves = moves.filter((move) => move.x === aiMove.to.x && move.y === aiMove.to.y);
                const { x, y, moveType } = filteredMoves[0];
                this.lastBoardState = this.gameState.previousBoards[this.gameState.previousBoards.length - 1];
                const lastPiece = _.cloneDeep(piece);
                const cord = aiMove.to;
                if (moveType === MoveType.EnPassant) {
                    this.chessboardState.makeEnPassant(piece, cord);
                } else if (moveType === MoveType.Castling) {
                    this.chessboardState.makeCastling(piece, cord);
                } else {
                    this.chessboardState.makeMove(piece, cord);
                }

                this.gameState.updatePreviousBoards(this.chessboardState.board);
                this.undoNumbersWhite = this.gameState.previousBoards.length - 1;
                this.undoNumbersWhite = this.gameState.previousBoards.length - 1;

                if (
                    (cord.x === 0 && piece.figType === PieceType.Pawn) ||
                    (cord.x === 7 && piece.figType === PieceType.Pawn)
                ) {
                    this.gameStatsPresenter.openPromotionModal(this.currentTurn, (pieceChosen) => {
                        if (piece) {
                            piece.figType = pieceChosen;
                        } else {
                            throw new Error('Cannot promote piece.');
                        }
                        this.continueOnClick(lastPiece, { x, y, moveType }, pieceChosen);
                    });
                    return;
                }

                this.continueOnClick(lastPiece, { x, y, moveType }, PieceType.Queen);
                piece = null;
                this.currentTurn = Side.White;
            });
        }
    }

    handleOnHover(cord: Cord): void {
        if (!this.isAI) {
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
    }

    handleOnClick(cord: Cord): void {
        let piece = this.chessboardState.getPiece(cord);

        if (this.currentSelectedPiece) {
            const moves = this.getPossibleMoves();
            const filteredMoves = moves.filter((move) => move.x === cord.x && move.y === cord.y);
            if (filteredMoves.length > 0) {
                const { x, y, moveType } = filteredMoves[0];
                if (cord.x === x && cord.y === y) {
                    this.lastBoardState = this.gameState.previousBoards[this.gameState.previousBoards.length - 1];
                    const lastPiece = _.cloneDeep(this.currentSelectedPiece);

                    if (moveType === MoveType.EnPassant) {
                        this.chessboardState.makeEnPassant(this.currentSelectedPiece, cord);
                    } else if (moveType === MoveType.Castling) {
                        this.chessboardState.makeCastling(this.currentSelectedPiece, cord);
                    } else {
                        this.chessboardState.makeMove(this.currentSelectedPiece, cord);
                    }

                    this.gameState.updatePreviousBoards(this.chessboardState.board);
                    this.undoNumbersWhite = this.gameState.previousBoards.length - 1;
                    this.undoNumbersWhite = this.gameState.previousBoards.length - 1;

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
        if (!this.isAI) {
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
