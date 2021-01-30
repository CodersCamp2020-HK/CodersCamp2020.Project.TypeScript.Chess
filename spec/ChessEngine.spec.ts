import { ChessBoardRepresentation, CordWithMoveType, Piece, PieceType, Side } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { ChessEngine } from '../src/app/infrastructure/ChessEngine';

const displayChessboard = (chessboard: ChessBoardRepresentation) => {
    const result: string[][] = [];
    for (const row of chessboard) {
        const pieceSymbol = new Map([
            [PieceType.Bishop, 'B '],
            [PieceType.King, 'K '],
            [PieceType.Knight, 'N '],
            [PieceType.Pawn, 'P '],
            [PieceType.Queen, 'Q '],
            [PieceType.Rook, 'R '],
        ]);
        result.push(
            row.map((cord) => {
                if (cord) {
                    const side = cord.side == Side.White ? ' w' : ' b';
                    return side + pieceSymbol.get(cord.figType);
                }
                return '    ';
            }) as string[],
        );
    }
    return `
    ${result[0]}
    ${result[1]}
    ${result[2]}
    ${result[3]}
    ${result[4]}
    ${result[5]}
    ${result[6]}
    ${result[7]}`;
};

const displayMoves = (moves: CordWithMoveType[]) => {
    const result: string[] = [];
    for (const move of moves) {
        result.push(JSON.stringify(move).padStart(36));
    }
    return result.join('\n');
};

const chessboard = new ChessBoard();
chessboard.board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const blackRook: Piece = {
    figType: PieceType.Rook,
    cord: { x: 0, y: 0 },
    side: Side.Black,
    isMoved: false,
};

const king: Piece = {
    figType: PieceType.King,
    cord: { x: 0, y: 1 },
    side: Side.Black,
    isMoved: true,
};

const queen: Piece = {
    figType: PieceType.Queen,
    cord: { x: 0, y: 2 },
    side: Side.Black,
    isMoved: true,
};

const blackPawn: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 2 },
    side: Side.Black,
    isMoved: false,
};

const whiteRook: Piece = {
    figType: PieceType.Rook,
    cord: { x: 3, y: 2 },
    side: Side.White,
    isMoved: true,
};

const bishop: Piece = {
    figType: PieceType.Bishop,
    cord: { x: 3, y: 5 },
    side: Side.White,
    isMoved: true,
};

const whitePawn: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 4, y: 4 },
    side: Side.White,
    isMoved: true,
};

chessboard.board[blackRook.cord.x][blackRook.cord.y] = blackRook;
chessboard.board[king.cord.x][king.cord.y] = king;
chessboard.board[queen.cord.x][queen.cord.y] = queen;
chessboard.board[blackPawn.cord.x][blackPawn.cord.y] = blackPawn;
chessboard.board[whiteRook.cord.x][whiteRook.cord.y] = whiteRook;
chessboard.board[bishop.cord.x][bishop.cord.y] = bishop;
chessboard.board[whitePawn.cord.x][whitePawn.cord.y] = whitePawn;

const chessEngine = new ChessEngine();

describe(`Given: Chessboard ${displayChessboard(chessboard.board)}`, () => {
    describe(`When: getPossibleMovesForPiece for black rook is invoked`, () => {
        const expected: CordWithMoveType[] = [
            { x: 1, y: 0, moveType: 0 },
            { x: 2, y: 0, moveType: 0 },
            { x: 3, y: 0, moveType: 0 },
            { x: 4, y: 0, moveType: 0 },
            { x: 5, y: 0, moveType: 0 },
            { x: 6, y: 0, moveType: 0 },
            { x: 7, y: 0, moveType: 0 },
        ];
        it(`Then: possible moves for black rook should be:\n${displayMoves(expected)}`, () => {
            const actual = chessEngine.getPossibleMovesForPiece(blackRook.cord, chessboard);
            expect(actual).toMatchObject(expected);
        });
    });
    describe(`When: getPossibleMovesForPiece for black king is invoked`, () => {
        const expected: CordWithMoveType[] = [
            { x: 1, y: 1, moveType: 0 },
            { x: 1, y: 0, moveType: 0 },
        ];
        it(`Then: possible moves for black king should be:\n${displayMoves(expected)}`, () => {
            const actual = chessEngine.getPossibleMovesForPiece(king.cord, chessboard);
            expect(actual).toMatchObject(expected);
        });
    });
    describe(`When: getPossibleMovesForPiece for black queen is invoked`, () => {
        const expected: CordWithMoveType[] = [
            { x: 1, y: 3, moveType: 0 },
            { x: 2, y: 4, moveType: 0 },
            { x: 3, y: 5, moveType: 1 },
            { x: 1, y: 1, moveType: 0 },
            { x: 2, y: 0, moveType: 0 },
            { x: 0, y: 3, moveType: 0 },
            { x: 0, y: 4, moveType: 0 },
            { x: 0, y: 5, moveType: 0 },
            { x: 0, y: 6, moveType: 0 },
            { x: 0, y: 7, moveType: 0 },
        ];
        it(`Then: possible moves for black queen should be:\n${displayMoves(expected)}`, () => {
            const actual = chessEngine.getPossibleMovesForPiece(queen.cord, chessboard);
            expect(actual).toMatchObject(expected);
        });
    });
    describe(`When: getPossibleMovesForPiece for white rook is invoked`, () => {
        const expected: CordWithMoveType[] = [
            { x: 3, y: 0, moveType: 0 },
            { x: 3, y: 1, moveType: 0 },
            { x: 3, y: 3, moveType: 0 },
            { x: 3, y: 4, moveType: 0 },
            { x: 1, y: 2, moveType: 1 },
            { x: 2, y: 2, moveType: 0 },
            { x: 4, y: 2, moveType: 0 },
            { x: 5, y: 2, moveType: 0 },
            { x: 6, y: 2, moveType: 0 },
            { x: 7, y: 2, moveType: 0 },
        ];
        it(`Then: possible moves for white rook should be:\n${displayMoves(expected)}`, () => {
            const actual = chessEngine.getPossibleMovesForPiece(whiteRook.cord, chessboard);
            expect(actual).toMatchObject(expected);
        });
    });
    describe(`When: getPossibleMovesForPiece for white bishop is invoked`, () => {
        const expected: CordWithMoveType[] = [
            { x: 4, y: 6, moveType: 0 },
            { x: 5, y: 7, moveType: 0 },
            { x: 2, y: 6, moveType: 0 },
            { x: 1, y: 7, moveType: 0 },
            { x: 2, y: 4, moveType: 0 },
            { x: 1, y: 3, moveType: 0 },
            { x: 0, y: 2, moveType: 1 },
        ];
        it(`Then: possible moves for white bishop should be:\n${displayMoves(expected)}`, () => {
            const actual = chessEngine.getPossibleMovesForPiece(bishop.cord, chessboard);
            expect(actual).toMatchObject(expected);
        });
    });
});
