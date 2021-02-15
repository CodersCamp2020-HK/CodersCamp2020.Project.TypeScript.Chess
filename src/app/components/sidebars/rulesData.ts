import { piecesArray } from '../PiecesElements/piecesElements';
import Enpassant from './../../../assets/UI/examples/enpassant.jpg';
import Promotion from './../../../assets/UI/examples/promotion.jpg';
import Castling from './../../../assets/UI/examples/castling.jpg';

const enp = document.createElement('img');
enp.src = Enpassant;

const prom = document.createElement('img');
prom.src = Promotion;

const cast = document.createElement('img');
cast.src = Castling;

export const data = {
    pieces: [
        {
            name: 'King',
            img: piecesArray[4].element,
            description:
                'King can move exactly one square horizontally, vertically, or diagonally. At most once in every game, each king is allowed to make a special move, known as castling.',
        },
        {
            name: 'Queen',
            img: piecesArray[8].element,
            description: 'Queen can move any number of vacant squares diagonally, horizontally, or vertically.',
        },
        {
            name: 'Rook',
            img: piecesArray[10].element,
            description:
                'Rook can move any number of vacant squares vertically or horizontally. It also is moved while castling.',
        },
        {
            name: 'Bishop',
            img: piecesArray[2].element,
            description: 'Bishop can move any number of vacant squares in any diagonal direction.',
        },
        {
            name: 'Knight',
            img: piecesArray[6].element,
            description:
                'Knight can move one square along any rank or file and then at an angle. The knight´s movement can also be viewed as an “L” or “7″ laid out at any horizontal or vertical angle.',
        },
        {
            name: 'Pawn',
            img: piecesArray[0].element,
            description:
                'Pawns can move forward one square, if that square is unoccupied. If it has not yet moved, the pawn has the option of moving two squares forward provided both squares in front of the pawn are unoccupied. A pawn cannot move backward. Pawns are the only pieces that capture differently from how they move. They can capture an enemy piece on either of the two spaces adjacent to the space in front of them (i.e., the two squares diagonally in front of them) but cannot move to these spaces if they are vacant. ',
        },
    ],
    actions: [
        {
            name: 'En Passant',
            description: `En Passant may only occur when a pawn is moved two squares on its initial movement. When this happens, the opposing player has the option to take the moved pawn “en passant” as if it had only moved one square. This option, though, only stays open for one move. The En Passant move was developed after pawns were allowed to move more than one square on their initial move. The idea behind this rule was to retain restrictions imposed by slow movement, while at the same time speeding up the game.`,
            img: enp,
        },
        {
            name: `Promotion`,
            description: `If a pawn reaches the opponent´s edge of the table, it will be promoted – the pawn may be converted to a queen, rook, bishop or knight, as the player desires. The choice is not limited to previously captured pieces. Thus its´ theoretically possible having up to nine queens or up to ten rooks, bishops, or knights if all pawns are promoted.`,
            img: prom,
        },
        {
            name: 'Castling',
            description: `During the castling, the king moves two squares towards the rook he intends to castle with, and the rook moves to the square through which the king passed. Castling is only permissible if all of the following conditions hold:

            Neither king nor rook involved in castling may have moved from the original position;
            There must be no pieces between the king and the rook;
            The king may not currently be in check, nor may the king pass through or end up in a square that is under attack by an enemy piece (though the rook is permitted to be under attack and to pass over an attacked square)`,
            img: cast,
        },
    ],
};
