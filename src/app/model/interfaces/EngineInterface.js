'use strict';
exports.__esModule = true;
var Side;
(function (Side) {
    Side[(Side['White'] = 0)] = 'White';
    Side[(Side['Black'] = 1)] = 'Black';
})(Side || (Side = {}));
var queen = /** @class */ (function () {
    function queen(cord, side) {
        this.cord = cord;
        this.side = side;
    }
    queen.prototype.getPossibleMoves = function () {
        var xy = { x: 5, y: 5, moveType: MoveType.NormalMove };
        var arr = [];
        arr.push(xy);
        return arr;
    };
    return queen;
})();
console.log(queen);
var MoveType;
(function (MoveType) {
    MoveType[(MoveType['NormalMove'] = 0)] = 'NormalMove';
    MoveType[(MoveType['Capture'] = 1)] = 'Capture';
    MoveType[(MoveType['Castling'] = 2)] = 'Castling';
})(MoveType || (MoveType = {}));
