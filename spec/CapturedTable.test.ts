import { CapturedTable } from '../src/app/components/game/capturedTable/CapturedTable';

describe('Generate table with captured pieces', () => {
    type Piece = 'queen' | 'king' | 'pawn' | 'knight' | 'rook' | 'bishop';
    const arrayCapturedPiecesPlayer: Piece[] = ['queen', 'pawn', 'pawn', 'bishop', 'knight', 'pawn', 'rook', 'king'];
    const sampleTablePlayerFull = new CapturedTable('player', arrayCapturedPiecesPlayer);
    const arrayCapturedPiecesOpponent: Piece[] = [];
    const sampleTableOpponentEmpty = new CapturedTable('opponent', arrayCapturedPiecesOpponent);

    it('should create DIV element', () => {
        expect(sampleTablePlayerFull.element.tagName).toEqual('DIV');
        expect(sampleTableOpponentEmpty.element.tagName).toEqual('DIV');
    });

    it('should create correct class name', () => {
        expect(sampleTablePlayerFull.element.className).toBe('player');
        expect(sampleTableOpponentEmpty.element.className).toBe('opponent');
    });

    it('should create DIV element for each Captured Piece', () => {
        expect(sampleTablePlayerFull.element.childNodes.length).toEqual(8);
        expect(sampleTableOpponentEmpty.element.childNodes.length).toEqual(0);
    });
});
