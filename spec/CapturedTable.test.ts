/**
 * @jest-environment jsdom
 */

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
        expect(sampleTablePlayerFull.element.className).toBe('capturedWrapper player');
        expect(sampleTableOpponentEmpty.element.className).toBe('capturedWrapper opponent');
    });

    it('should create DIV element for each Captured Piece', () => {
        expect(sampleTablePlayerFull.element.childNodes.length).toEqual(8);
        expect(sampleTableOpponentEmpty.element.childNodes.length).toEqual(0);
    });

    it('should display updated pieces', () => {
        sampleTablePlayerFull.update(['pawn', 'rook', 'king']);
        sampleTableOpponentEmpty.update(['pawn', 'rook', 'king']);
        expect(sampleTablePlayerFull.element.childNodes.length).toEqual(3);
        expect(sampleTableOpponentEmpty.element.childNodes.length).toEqual(3);
    });
});
