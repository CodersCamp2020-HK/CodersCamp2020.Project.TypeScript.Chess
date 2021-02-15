import styles from './previousMoves.module.scss';
import { piecesArray } from '../PiecesElements/piecesElements';
import { PieceElement } from '../ChessBoard/ChessBoardComponent';
import { Side, PieceType } from '../../domain/basicChessTypes';
import { opponent } from '../game/capturedTable/CapturedTable.module.scss';
import { sayText } from './sayText';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

interface Notation {
    white: string;
    black: string;
    [key: string]: string;
}

export class PreviousMoves {
    element = document.createElement('div');
    notationArray: Notation[];
    constructor(notationArray: Notation[]) {
        this.element.classList.add(styles.wrapper);
        this.notationArray = notationArray;
        this.render(notationArray);
    }

    render(notationArray: Notation[]): void {
        this.element.innerHTML = '';
        this.notationArray = notationArray;

        const ol = document.createElement('ol');

        notationArray.forEach((notation, index) => {
            const currentMadeMove = notation.black == '' ? notation.white : notation.black;
            const twoEmpties = notation.black == '' && notation.white == '';
            let markedEmpty = false;

            const li = document.createElement('li');
            li.classList.add(styles.listItem);

            const piecesMap = new Map([
                ['K', PieceType.King],
                ['Q', PieceType.Queen],
                ['R', PieceType.Rook],
                ['B', PieceType.Bishop],
                ['N', PieceType.Knight],
                ['P', PieceType.Pawn],
            ]);

            const piecesNames = new Map([
                ['K', 'Król'],
                ['Q', 'Królowa'],
                ['R', 'Wieża'],
                ['B', 'Goniec'],
                ['N', 'Skoczek'],
                ['P', 'Pion'],
            ]);

            const piecesNamesPromotion = new Map([
                ['K', 'Króla'],
                ['Q', 'Królową'],
                ['R', 'Wieżę'],
                ['B', 'Goniec'],
                ['N', 'Skoczka'],
                ['P', 'Piona'],
            ]);

            const actionsMap = new Map([
                ['x', 'Bicie'],
                ['=', 'Promocja'],
                ['+', 'Szach'],
                ['#', 'Mat'],
                ['½-½', 'Pat'],
            ]);

            for (const color in notation) {
                const sideColor = color == 'white' ? Side.White : Side.Black;
                const currentClassName = color == 'white' ? 'player' : 'opponent';

                const span = document.createElement('span');

                if (notation[color] == '') {
                    span.textContent = '';
                    span.classList.add(styles[currentClassName]);
                    li.append(span);

                    if (twoEmpties) {
                        if (!markedEmpty) {
                            sayText('Gra rozpoczęta');
                            markedEmpty = true;
                        }
                    }

                    continue;
                }

                if (notation[color] == '0-0') {
                    span.textContent = 'Roszada';
                    span.classList.add(styles[currentClassName]);
                    li.append(span);

                    if (notationArray.length - 1 == index) {
                        if (currentMadeMove == notation[color]) {
                            sayText(span.textContent as string);
                        }
                    }

                    continue;
                }

                if (notation[color] == '0-0-0') {
                    span.textContent = 'Długa roszada';
                    span.classList.add(styles[currentClassName]);
                    li.append(span);

                    if (notationArray.length - 1 == index) {
                        if (currentMadeMove == notation[color]) {
                            sayText(span.textContent as string);
                        }
                    }

                    continue;
                }

                const pieceAbbreviation: string = notation[color][0];
                const currentFigType = piecesMap.get(pieceAbbreviation);
                const currentFigName = piecesNames.get(pieceAbbreviation) as string;
                const pieceOrigin = notation[color].slice(1, 3);
                const pieceDestination = notation[color].slice(3, 5);

                const pieceElement: PieceElement | undefined = piecesArray.filter((element) => {
                    if (element.figType == currentFigType && element.side == sideColor) {
                        return true;
                    }
                })[0];

                const pieceImage = pieceElement.element.cloneNode(true) as HTMLImageElement;
                pieceImage.classList.add(styles.pieceImage);

                span.append(pieceImage, `${pieceOrigin} > ${pieceDestination} `);

                if (notationArray.length - 1 == index) {
                    if (currentMadeMove == notation[color]) {
                        sayText(currentFigName + ' z ' + pieceOrigin + ' na ' + pieceDestination);
                    }
                }

                span.classList.add(styles[currentClassName]);

                for (const action of actionsMap.keys()) {
                    if (notation[color].includes(action)) {
                        const currentAction = actionsMap.get(action) as string;
                        if (currentAction == 'Promocja') {
                            const promotionPieceId = notation[color].indexOf('=') + 1;
                            const promotionPieceAbbreviation = notation[color][promotionPieceId];
                            const currentPromotionFigType = piecesMap.get(promotionPieceAbbreviation);
                            const currentPromotionFigName = piecesNamesPromotion.get(
                                promotionPieceAbbreviation,
                            ) as string;
                            const promotionPieceElement: PieceElement | undefined = piecesArray.filter((element) => {
                                if (element.figType == currentPromotionFigType && element.side == sideColor) {
                                    return true;
                                }
                            })[0];
                            promotionPieceElement.element.classList.add(styles.pieceImage);
                            span.append(currentAction + ' > ', promotionPieceElement.element);

                            if (notationArray.length - 1 == index) {
                                if (currentMadeMove == notation[color]) {
                                    sayText('Promocja na ' + currentPromotionFigName);
                                }
                            }

                            continue;
                        }
                        span.append(currentAction + '! ');
                        if (notationArray.length - 1 == index) {
                            if (currentMadeMove == notation[color]) {
                                sayText(currentAction + '!');
                            }
                        }
                    }
                }

                li.append(span);
            }

            li.insertBefore(document.createTextNode(' | '), li.lastChild);
            //`${bluePiece} ${blueOrigin} > ${blueDestination} `

            ol.append(li);
        });

        this.element.append(ol);

        const scrollbar = new SimpleBar(this.element, { autoHide: true });
    }
}
