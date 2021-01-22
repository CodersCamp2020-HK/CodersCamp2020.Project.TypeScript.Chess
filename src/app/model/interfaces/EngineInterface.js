var PieceType;
(function (PieceType) {
    PieceType[PieceType["Pawn"] = 0] = "Pawn";
    PieceType[PieceType["King"] = 1] = "King";
    PieceType[PieceType["Queen"] = 2] = "Queen";
    PieceType[PieceType["Rook"] = 3] = "Rook";
    PieceType[PieceType["Bishop"] = 4] = "Bishop";
    PieceType[PieceType["Knight"] = 5] = "Knight";
})(PieceType || (PieceType = {}));
var Side;
(function (Side) {
    Side[Side["White"] = 0] = "White";
    Side[Side["Black"] = 1] = "Black";
})(Side || (Side = {}));
var MoveType;
(function (MoveType) {
    MoveType[MoveType["NormalMove"] = 0] = "NormalMove";
    MoveType[MoveType["Capture"] = 1] = "Capture";
})(MoveType || (MoveType = {}));
var a = [{ x: 'A', y: 6, moveType: 0 }];
console.log(a);
// interface ChessEngine {}
