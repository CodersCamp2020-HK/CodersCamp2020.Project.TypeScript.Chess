import { CordWithMoveTypes, MoveType, Piece, PieceType, PromotionPieceType } from '../domain/basicChessTypes';

export function moveToNotation(
    piece: Piece,
    moveTo: CordWithMoveTypes,
    promotionPiece: PromotionPieceType,
): Array<string | number> {
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

    const convertPromotionPiece = new Map([
        [PromotionPieceType.Bishop, 'B'],
        [PromotionPieceType.Knight, 'N'],
        [PromotionPieceType.Rook, 'R'],
        [PromotionPieceType.Queen, 'Q'],
    ]);
    const covnertMoveType = new Map([
        [MoveType.NormalMove, ''],
        [MoveType.Capture, 'x'],
        [MoveType.EnPassant, 'x'],
        [MoveType.Promotion, '='],
    ]);

    if (!piece) throw new Error('Piece not provided.');
    const pieceLetter = convertPieceToString.get(piece.figType);
    const cordXFromLetter = convertXCordToLetter.get(piece.cord.x);
    const cordXToLetter = convertXCordToLetter.get(moveTo.x);
    const cordYFromLetter = convertYCordToLetter.get(piece.cord.y);
    const cordYToLetter = convertYCordToLetter.get(moveTo.y);

    if (pieceLetter && cordXFromLetter && cordXToLetter && cordYFromLetter && cordYToLetter) {
        move.push(pieceLetter, cordYFromLetter, cordXFromLetter, cordYToLetter, cordXToLetter);
    }

    moveTo.moveType.forEach((moveType) => {
        const promoted = convertPromotionPiece.get(promotionPiece);
        const algebraicMoveType = covnertMoveType.get(moveType);
        if (algebraicMoveType && promoted) {
            algebraicMoveType === '=' ? move.push(algebraicMoveType, promoted) : move.push(algebraicMoveType);
        }
    });

    return move;
}
