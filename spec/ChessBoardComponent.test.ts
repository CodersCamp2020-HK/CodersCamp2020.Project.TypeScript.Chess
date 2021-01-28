/**
 * @jest-environment jsdom
 */

test('test', () => {
    expect(true).toBeTruthy();
});

import { ChessBoardComponent, PieceElement } from '../src/app/components/ChessBoard/ChessBoardComponent';
import * as interfaces from '../src/app/domain/basicChessTypes';

const chessBoardEmpty: interfaces.ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const chessBoardFilled: interfaces.ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        null,
        null,
        null,
        { figType: interfaces.PieceType.Pawn, cord: { x: 0, y: 0 }, side: interfaces.Side.Black, isMoved: false },
        null,
        null,
        null,
        null,
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        null,
        { figType: interfaces.PieceType.Bishop, cord: { x: 0, y: 0 }, side: interfaces.Side.White, isMoved: false },
        null,
        null,
        null,
        null,
        null,
        null,
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const piecesElements: PieceElement[] = [
    {
        element: document.createElement('div'),
        figType: interfaces.PieceType.Pawn,
        side: interfaces.Side.Black,
    },
    {
        element: document.createElement('img'),
        figType: interfaces.PieceType.Bishop,
        side: interfaces.Side.White,
    },
    {
        element: document.createElement('span'),
        figType: interfaces.PieceType.Bishop,
        side: interfaces.Side.Black,
    },
];

const wrapper = document.createElement('div');

const chessboard = new ChessBoardComponent(wrapper, piecesElements, chessBoardEmpty);

describe('ChessBoard Component', () => {
    describe('render', () => {
        test('should render div wrapper', () => {
            expect(chessboard.wrapper).toBeInstanceOf(HTMLDivElement);
        });
        test('should render div chessboard', () => {
            expect(chessboard.board).toBeInstanceOf(HTMLDivElement);
        });
        test('should render 64 tiles', () => {
            expect(chessboard.board.children.length).toBe(64);
        });
        test('should render 32 black tiles', () => {
            expect(chessboard.board.querySelectorAll('.black__tile').length).toBe(32);
        });
        test('should render 32 white tiles', () => {
            expect(chessboard.board.querySelectorAll('.white__tile').length).toBe(32);
        });
        test('should render white tile on first place', () => {
            expect(chessboard.board.children[0].classList.contains('white__tile')).toBe(true);
        });
        test('should render tiles alternately in row', () => {
            expect(chessboard.board.children[0].classList.contains('white__tile')).toBe(true);
            expect(chessboard.board.children[1].classList.contains('black__tile')).toBe(true);
            expect(chessboard.board.children[2].classList.contains('white__tile')).toBe(true);
        });
        test('should render tiles alternately in column', () => {
            expect(chessboard.board.children[0].classList.contains('white__tile')).toBe(true);
            expect(chessboard.board.children[8].classList.contains('black__tile')).toBe(true);
            expect(chessboard.board.children[16].classList.contains('white__tile')).toBe(true);
        });
        test('should render pieces in right places', () => {
            chessboard.renderBoard(chessBoardFilled);
            expect(chessboard.board.children[19].children[0]).toBeInstanceOf(HTMLDivElement);
            expect(chessboard.board.children[41].children[0]).toBeInstanceOf(HTMLImageElement);
        });
    });

    describe('renderAxi', () => {
        chessboard.renderAxi(chessboard.horizontalAxi, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
        chessboard.renderAxi(chessboard.verticalAxi, [1, 2, 3, 4, 5, 6, 7, 8]);
        test('should render Axi X div with letters', () => {
            expect(chessboard.horizontalAxi).toBeInstanceOf(HTMLDivElement);
            expect(chessboard.horizontalAxi.children[0].textContent).toBe('A');
            expect(chessboard.horizontalAxi.children[1].textContent).toBe('B');
        });
        test('should render Axi Y with numbers', () => {
            expect(chessboard.verticalAxi).toBeInstanceOf(HTMLDivElement);
            expect(chessboard.verticalAxi.children[0].textContent).toBe('1');
            expect(chessboard.verticalAxi.children[1].textContent).toBe('2');
        });
        test('should Axi X has 8 elements', () => {
            expect(chessboard.verticalAxi.children.length).toBe(8);
        });
        test('should Axi Y has 8 elements', () => {
            expect(chessboard.verticalAxi.children.length).toBe(8);
        });
    });

    describe('addTileClassList', () => {
        test('should given tile has current classlist with added classes', () => {
            chessboard.addTileClassList({ x: 0, y: 0 }, ['qwe', 'asd']);
            expect(chessboard.tiles[0][0]?.classList.length).toBe(4);
            expect(chessboard.tiles[0][0]?.classList.contains('white__tile')).toBe(true);
            expect(chessboard.tiles[0][0]?.classList.contains('qwe')).toBe(true);
            expect(chessboard.tiles[0][0]?.classList.contains('asd')).toBe(true);
        });
    });
    describe('removeTileClassList', () => {
        test('should given tile has classlist without removed classes', () => {
            chessboard.addTileClassList({ x: 5, y: 0 }, ['qwe', 'asd']);
            chessboard.removeTileClassList({ x: 5, y: 0 }, ['qwe', 'black__tile']);
            expect(chessboard.tiles[0][5]?.classList.length).toBe(2);
            expect(chessboard.tiles[0][5]?.classList.contains('black__tile')).toBe(false);
            expect(chessboard.tiles[0][5]?.classList.contains('qwe')).toBe(false);
            expect(chessboard.tiles[0][5]?.classList.contains('asd')).toBe(true);
        });
    });
});
