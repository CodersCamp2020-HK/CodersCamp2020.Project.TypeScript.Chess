import bishopImage from './../../../assets/UI/pieces/Bishop.svg';
import kingImage from './../../../assets/UI/pieces/King.svg';
import knightImage from './../../../assets/UI/pieces/Knight.svg';
import pawnImage from './../../../assets/UI/pieces/Pawn.svg';
import queenImage from './../../../assets/UI/pieces/Queen.svg';
import rookImage from './../../../assets/UI/pieces/Rook.svg';

import bishopImageRed from './../../../assets/UI/pieces/red/Bishop.svg';
import kingImageRed from './../../../assets/UI/pieces/red/King.svg';
import knightImageRed from './../../../assets/UI/pieces/red/Knight.svg';
import pawnImageRed from './../../../assets/UI/pieces/red/Pawn.svg';
import queenImageRed from './../../../assets/UI/pieces/red/Queen.svg';
import rookImageRed from './../../../assets/UI/pieces/red/Rook.svg';

import { PieceType, Side } from '../../domain/basicChessTypes';
import { PieceElement } from '../ChessBoard/ChessBoardComponent';

//Black
const bishoopImg = document.createElement('img');
bishoopImg.src = bishopImage;

const kingImg = document.createElement('img');
kingImg.src = kingImage;

const knightImg = document.createElement('img');
knightImg.src = knightImage;

const pawnImg = document.createElement('img');
pawnImg.src = pawnImage;

const queenImg = document.createElement('img');
queenImg.src = queenImage;

const rookImg = document.createElement('img');
rookImg.src = rookImage;

//Red
const bishoopImgRed = document.createElement('img');
bishoopImgRed.src = bishopImageRed;

const kingImgRed = document.createElement('img');
kingImgRed.src = kingImageRed;

const knightImgRed = document.createElement('img');
knightImgRed.src = knightImageRed;

const pawnImgRed = document.createElement('img');
pawnImgRed.src = pawnImageRed;

const queenImgRed = document.createElement('img');
queenImgRed.src = queenImageRed;

const rookImgRed = document.createElement('img');
rookImgRed.src = rookImageRed;

export const piecesArray: PieceElement[] = [
    { element: pawnImg, figType: PieceType.Pawn, side: Side.White },
    { element: pawnImgRed, figType: PieceType.Pawn, side: Side.Black },
    { element: bishoopImg, figType: PieceType.Bishop, side: Side.White },
    { element: bishoopImgRed, figType: PieceType.Bishop, side: Side.Black },
    { element: kingImg, figType: PieceType.King, side: Side.White },
    { element: kingImgRed, figType: PieceType.King, side: Side.Black },
    { element: knightImg, figType: PieceType.Knight, side: Side.White },
    { element: knightImgRed, figType: PieceType.Knight, side: Side.Black },
    { element: queenImg, figType: PieceType.Queen, side: Side.White },
    { element: queenImgRed, figType: PieceType.Queen, side: Side.Black },
    { element: rookImg, figType: PieceType.Rook, side: Side.White },
    { element: rookImgRed, figType: PieceType.Rook, side: Side.Black },
];
