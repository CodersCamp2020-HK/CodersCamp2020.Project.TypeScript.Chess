import { CordWithMoveType, MoveType, Piece, PieceType, Side } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { convertEmojiToRep, convertEmojitoCordWithMoveType, displayEmojiBoard } from './Display';

const chessboard = new ChessBoard();
const emptyChessboard: Array<Array<Piece | null>> = [
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
    cord: { x: 6, y: 0 },
    side: Side.Black,
    isMoved: true,
};

const king: Piece = {
    figType: PieceType.King,
    cord: { x: 0, y: 1 },
    side: Side.Black,
    isMoved: true,
};

const queen: Piece = {
    figType: PieceType.Queen,
    cord: { x: 7, y: 2 },
    side: Side.Black,
    isMoved: true,
};

const blackPawn: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 4, y: 2 },
    side: Side.Black,
    isMoved: true,
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
const blackKnight: Piece = {
    figType: PieceType.Knight,
    cord: { x: 0, y: 6 },
    side: Side.Black,
    isMoved: true,
};

emptyChessboard[blackRook.cord.x][blackRook.cord.y] = blackRook;
emptyChessboard[king.cord.x][king.cord.y] = king;
emptyChessboard[queen.cord.x][queen.cord.y] = queen;
emptyChessboard[blackPawn.cord.x][blackPawn.cord.y] = blackPawn;
emptyChessboard[whiteRook.cord.x][whiteRook.cord.y] = whiteRook;
emptyChessboard[bishop.cord.x][bishop.cord.y] = bishop;
emptyChessboard[whitePawn.cord.x][whitePawn.cord.y] = whitePawn;
emptyChessboard[blackKnight.cord.x][blackKnight.cord.y] = blackKnight;

jest.spyOn(chessboard, 'board', 'get').mockReturnValue(emptyChessboard);

const emojiBoard = [
    ['.', '♚', '.', '.', '.', '.', '♞', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '♖', '.', '.', '♗', '.', '.'],
    ['.', '.', '♟', '.', '♙', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♜', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '♛', '.', '.', '.', '.', '.'],
];

describe(`Given: Emoji chessboard: ${displayEmojiBoard(emojiBoard)}`, () => {
    describe('When: convertEmojiToRep is invoked on emoji chessboard', () => {
        it(`Then: chessboard representation should be returned`, () => {
            const actual = convertEmojiToRep(emojiBoard);
            expect(actual).toEqual(chessboard.board);
        });
    });
});

const emojiMoveTypeBoard = [
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '👟', '👟', '⚔️', '.', '.'],
    ['.', '.', '🏰', '👟', '♚', '👟', '🏰', '.'],
];
describe(`Given: Emoji chessboard with move types: ${displayEmojiBoard(emojiMoveTypeBoard)}`, () => {
    describe('When: convertEmojitoCordWithMoveType is invoked', () => {
        const expected: CordWithMoveType[] = [
            { x: 7, y: 3, moveType: MoveType.NormalMove },
            { x: 6, y: 3, moveType: MoveType.NormalMove },
            { x: 6, y: 4, moveType: MoveType.NormalMove },
            { x: 7, y: 5, moveType: MoveType.NormalMove },
            { x: 6, y: 5, moveType: MoveType.Capture },
            { x: 7, y: 2, moveType: MoveType.Castling },
            { x: 7, y: 6, moveType: MoveType.Castling },
        ];
        it(`Then: cords with move types should be returned`, () => {
            const actual = convertEmojitoCordWithMoveType(emojiMoveTypeBoard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});
