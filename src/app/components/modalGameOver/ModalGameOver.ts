import styles from './ModalGameOver.module.scss';
import { Side } from '../../domain/basicChessTypes';
import { Label } from '../genericLabel/Label';
import { Button } from '../genericButton/Button';
import { convertTime } from '../../utils/ConvertTime';

export class ModalGameOver {
    private __element: HTMLDialogElement;
    private time: number;
    constructor(
        winnerSide: Side,
        numberOfMoves: number,
        time: number,
        winWay: string,
        namePlayer: string,
        nameOpponent: string,
        onMainMenuCb: () => void,
        onPlayAgainCb: () => void,
    ) {
        this.time = time;
        const timeInString = time.toFixed(1);
        this.__element = document.createElement('dialog');
        this.__element.classList.add(styles.modalInvisible);
        const modalWrapper = document.createElement('div');
        this.__element.append(modalWrapper);
        modalWrapper.classList.add(styles.modalWrapper);

        let labelHeader: Label;
        let labelWin: Label;
        let labelMoves: Label;
        let labelTime: Label;

        const tableScore = document.createElement('div');
        tableScore.classList.add(styles.tableScore);
        const scoreTxt = document.createElement('p');
        scoreTxt.classList.add(styles.score);
        const playerTxt = document.createElement('p');
        playerTxt.innerHTML = namePlayer;
        playerTxt.classList.add(styles.playerTxt);
        const opponentTxt = document.createElement('p');
        nameOpponent = nameOpponent.length > 0 ? nameOpponent : 'Computer';
        opponentTxt.innerHTML = nameOpponent;
        opponentTxt.classList.add(styles.opponentTxt);
        tableScore.append(playerTxt, scoreTxt, opponentTxt);

        if (winnerSide === Side.White) {
            labelHeader = new Label('yellow', `${namePlayer} is a winner`);
            labelHeader.element.classList.add(styles.labelHeader);
            modalWrapper.classList.add(styles.wrapperPlayer);
            labelWin = new Label('red', `Win by: ${winWay}`);
            labelMoves = new Label('red', `Moves: ${numberOfMoves}`);
            labelTime = new Label('red', `Time: ${convertTime(parseInt(timeInString))}`);
            scoreTxt.innerHTML = '1\xA0<span>:\xA0</span><span>0</span>';
        } else {
            labelHeader = new Label('yellow', `${nameOpponent} is a winner`);
            labelHeader.element.classList.add(styles.labelHeader);
            modalWrapper.classList.add(styles.wrapperOpponent);
            labelWin = new Label('blue', winWay);
            labelMoves = new Label('blue', `Moves: ${numberOfMoves}`);
            labelTime = new Label('blue', `Time: ${convertTime(parseInt(timeInString))}`);
            scoreTxt.innerHTML = '0\xA0<span>:\xA0</span><span>1</span>';
        }

        labelWin.element.classList.add(styles.label);
        labelMoves.element.classList.add(styles.label);
        labelTime.element.classList.add(styles.label);

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add(styles.buttonWrapper);
        const buttonMainMenu = new Button(
            'Main Menu',
            () => {
                this.__element.classList.remove(styles.modal);
                this.__element.classList.add(styles.modalInvisible);
                onMainMenuCb();
            },
            true,
        );
        const buttonPlayAgain = new Button(
            'Play Again',
            () => {
                this.__element.classList.remove(styles.modal);
                this.__element.classList.add(styles.modalInvisible);
                onPlayAgainCb();
            },
            true,
        );
        buttonWrapper.append(buttonMainMenu.button, buttonPlayAgain.button);

        modalWrapper.append(
            labelHeader.element,
            tableScore,
            labelWin.element,
            labelMoves.element,
            labelTime.element,
            buttonWrapper,
        );
    }

    public get element(): HTMLDialogElement {
        return this.__element;
    }

    public openModal(): void {
        this.__element.classList.remove(styles.modalInvisible);
        this.__element.classList.add(styles.modal);
    }
}
