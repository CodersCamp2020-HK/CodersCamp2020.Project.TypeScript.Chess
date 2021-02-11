import { getCapturedPieceNames } from '../utils/CapturedPieces';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import _ from 'lodash';
import { CordWithMoveType, MoveType, Piece, PieceType, Side } from '../domain/basicChessTypes';
import { IChessEngine } from '../domain/IChessEngine';

export class GameState {
    private __capturedPieces: { white: string[]; black: string[] }[] = [];
    private __previousBoards: ChessBoardView[] = [];
    private __previousMoves: { white: string; black: string }[] = [{ white: '', black: '' }];

    public get capturedPieces(): { white: string[]; black: string[] }[] {
        return this.__capturedPieces;
    }

    public get previousBoards(): ChessBoardView[] {
        return this.__previousBoards;
    }

    public get previousMoves(): { white: string; black: string }[] {
        return this.__previousMoves;
    }

    updateCapturedPieces(boardState: IChessBoard): void {
        const blackPieceNames = getCapturedPieceNames(Side.Black, boardState);
        const whitePiecesNames = getCapturedPieceNames(Side.White, boardState);

        const capturedPiece = { black: whitePiecesNames, white: blackPieceNames };
        this.__capturedPieces.push(capturedPiece);
    }

    updatePreviousBoards(chessboard: ChessBoardView): void {
        this.__previousBoards.push(_.cloneDeep(chessboard));
    }

    updatePreviousMoves(
        piece: Piece,
        moveTo: CordWithMoveType,
        chessEngine: IChessEngine,
        chessboard: IChessBoard,
    ): void {
        const move = [];
        const convertXCordToLetter = new Map([
            [0, 8],
            [1, 7],
            [2, 6],
            [3, 5],
            [4, 4],
            [5, 3],
            [6, 2],
            [7, 1],
        ]);
        const convertYCordToLetter = new Map([
            [0, 'a'],
            [1, 'b'],
            [2, 'c'],
            [3, 'd'],
            [4, 'e'],
            [5, 'f'],
            [6, 'g'],
            [7, 'h'],
        ]);
        const convertPieceToString = new Map([
            [PieceType.Pawn, 'P'],
            [PieceType.Bishop, 'B'],
            [PieceType.Knight, 'N'],
            [PieceType.Rook, 'R'],
            [PieceType.King, 'K'],
            [PieceType.Queen, 'Q'],
        ]);
        const covnertMoveType = new Map([
            [MoveType.NormalMove, ''],
            [MoveType.Capture, 'x'],
            [MoveType.EnPassant, 'x'],
            [MoveType.Promotion, ''],
        ]);
        let lastIndex = this.__previousMoves.length - 1;
        if (this.__previousMoves[lastIndex].white.length > 0 && this.__previousMoves[lastIndex].black.length > 0) {
            this.__previousMoves.push({ white: '', black: '' });
            lastIndex++;
        }
        if (!piece) throw new Error('Piece not provided.');
        const pieceLetter = convertPieceToString.get(piece.figType);
        const cordXFromLetter = convertXCordToLetter.get(piece.cord.x);
        const cordXToLetter = convertXCordToLetter.get(moveTo.x);
        const cordYFromLetter = convertYCordToLetter.get(piece.cord.y);
        const cordYToLetter = convertYCordToLetter.get(moveTo.y);
        if (
            pieceLetter !== undefined &&
            cordXFromLetter !== undefined &&
            cordXToLetter !== undefined &&
            cordYFromLetter !== undefined &&
            cordYToLetter !== undefined
        ) {
            move.push(pieceLetter, cordYFromLetter, cordXFromLetter, cordYToLetter, cordXToLetter);
        }
        const algebraicMoveType = covnertMoveType.get(moveTo.moveType);
        if (algebraicMoveType !== undefined) move.push(algebraicMoveType);
        const enemySide = piece.side === Side.Black ? Side.White : Side.Black;
        // if (chessEngine.isCheckmate(chessboard, enemySide)) {
        //     move.push('#');
        //     const joinedMove = move.join();
        //     piece.side === Side.White
        //         ? (this.__previousMoves[lastIndex].white = joinedMove)
        //         : (this.__previousMoves[lastIndex].black = joinedMove);
        //     return;
        // }
        // if (chessEngine.isStealemate(chessboard, enemySide)) {
        //     piece.side === Side.White
        //         ? (this.__previousMoves[lastIndex].white = '½-½')
        //         : (this.__previousMoves[lastIndex].black = '½-½');
        //     return;
        // }
        if (chessEngine.isCheck(chessboard, enemySide)) {
            move.push('+');
            const joinedMove = move.join('');
            piece.side === Side.White
                ? (this.__previousMoves[lastIndex].white = joinedMove)
                : (this.__previousMoves[lastIndex].black = joinedMove);
        }
        if (moveTo.moveType === MoveType.Castling) {
            moveTo.x === 6 ? move.push('0-0') : move.push('0-0-0');
        }
        const joinedMove = move.join('');
        piece.side === Side.White
            ? (this.__previousMoves[lastIndex].white = joinedMove)
            : (this.__previousMoves[lastIndex].black = joinedMove);
    }
}
