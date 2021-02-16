import styles from './MainMenu.module.scss';
import { Aside } from '../Aside/Aside';
import { InfoContent, RulesContent } from '../sidebars/sidebars';
import { Header } from '../HeaderCyberChess/Header';
import { Footer } from '../footer/Footer';
import { Button } from '../genericButton/Button';
import { Label } from '../genericLabel/Label';
import { Radios, Data } from '../radios/radiosComponent';
import { Input } from '../Input/input';
import { create, toArray } from 'lodash';
import { IGameStatsPresenter } from '../../domain/IGameStatsPresenter';
import { IChessBoardPresenter } from '../../domain/IPresenter';
import { GameController } from '../../infrastructure/GameController';
import { ChessBoardPresenter } from '../ChessBoardPresenter/ChessBoardPresenter';
import { Game } from '../game/Game';
import { GameStatsPresenter } from '../GameStatsPresenter/GameStatsPresenter';

const textToTime = new Map([
    ['3', 3],
    ['5', 5],
    ['10', 10],
    ['30', 30],
]);

export interface StartGameParams {
    playWith: 'computer' | 'user';
    timePerPlayerSeconds: number;
    playerName1: string;
    playerName2: string;
}

export class MainMenu {
    private __element: HTMLElement;

    constructor(onStart: (params: StartGameParams) => void) {
        this.__element = this.createMainMenu(onStart);
    }

    public get element(): HTMLElement {
        return this.__element;
    }

    private createMainMenu(onStart: (params: StartGameParams) => void): HTMLElement {
        const container = document.createElement('div');
        container.classList.add(styles.container);

        const wrapper = document.createElement('div');
        wrapper.classList.add(styles.wrapper);

        const rules = new Aside('Rules', 'left', new RulesContent().element);
        const info = new Aside('Info', 'right', new InfoContent().element);

        //HEADER
        const cyberChessTextWrapper = document.createElement('div');
        cyberChessTextWrapper.classList.add(styles.wrapperText);
        const header = new Header();
        cyberChessTextWrapper.append(header.element);

        //ŚRODKOWY WRAPPER
        const mainMenuSettingsWrapper = document.createElement('form');
        mainMenuSettingsWrapper.classList.add(styles.mainMenuSettingsWrapper);
        mainMenuSettingsWrapper.addEventListener('submit', (event) => {
            const data = new FormData(mainMenuSettingsWrapper);

            const timeText = data.get('timePerPlayerDiv') as string;
            const time = textToTime.get(timeText) ?? 30;

            const params = {
                playWith: data.get('playWithDiv'),
                timePerPlayerSeconds: time * 60,
                playerName1: data.get('input1'),
                playerName2: data.get('input2'),
            } as StartGameParams;
            onStart(params);

            event.preventDefault();
        });

        //1 DIV
        const playWithDiv = document.createElement('div');
        // playWithDiv.classList.add(styles.playWithDiv);
        const playWithLabel = new Label('blue', 'PLAY WITH');
        const computer: Data[] = [
            {
                value: 'computer',
                label: 'Computer',
                category: 'playWithDiv',
            },
        ];
        const otherUser: Data[] = [
            {
                value: 'otherUser',
                label: 'Other User',
                category: 'playWithDiv',
            },
        ];

        const radiosPlayWith = new Radios(otherUser.concat(computer));
        playWithDiv.classList.add(styles.playWithDiv);
        playWithDiv.append(playWithLabel.element, radiosPlayWith.element);

        //2 DIV
        const timePerPlayerDiv = document.createElement('div');
        // timePerPlayerDiv.classList.add(styles.timePerPlayerDiv);
        const timePerPlayerLabel = new Label('blue', 'TIME PER PLAYER');
        const min3: Data[] = [
            {
                value: '3',
                label: '3min',
                category: 'timePerPlayerDiv',
            },
        ];
        const min5: Data[] = [
            {
                value: '5',
                label: '5min',
                category: 'timePerPlayerDiv',
            },
        ];
        const min10: Data[] = [
            {
                value: '10',
                label: '10min',
                category: 'timePerPlayerDiv',
            },
        ];
        const min30: Data[] = [
            {
                value: '30',
                label: '30min',
                category: 'timePerPlayerDiv',
            },
        ];

        const radiosTime = new Radios(min3.concat(min5).concat(min10).concat(min30));
        timePerPlayerDiv.classList.add(styles.timePerPlayerDiv);
        timePerPlayerDiv.append(timePerPlayerLabel.element, radiosTime.element);

        //3 DIV
        const enterYourNameDiv = document.createElement('div');
        enterYourNameDiv.classList.add(styles.enterYourNameDiv);
        const enterYourNameLabel1 = new Input('Player1', 3, 10);
        enterYourNameLabel1.element.setAttribute('name', 'input1');
        const enterYourNameLabel2 = new Input('Player2', 3, 10);
        enterYourNameLabel2.element.setAttribute('name', 'input2');
        radiosPlayWith.element.childNodes[2].addEventListener('click', () => {
            enterYourNameLabel2.wrapper.style.display = 'none';
        });
        radiosPlayWith.element.childNodes[0].addEventListener('click', () => {
            enterYourNameLabel2.wrapper.style.display = 'inline-block';
        });
        enterYourNameDiv.append(
            enterYourNameLabel1.wrapper,
            enterYourNameLabel1.errorsElement,
            enterYourNameLabel2.wrapper,
            enterYourNameLabel2.errorsElement,
        );

        // BUTTON

        const startTheGameButton = new Button(
            'START THE GAME',
            function () {
                console.log('animated button');
            },
            true,
        );
        startTheGameButton.button.type = 'submit';

        //FOOTER
        const footerWrapper = document.createElement('div');
        footerWrapper.classList.add(styles.wrapperFooter);
        const footerImage = new Footer();
        footerWrapper.appendChild(footerImage.element);

        //APPENDS

        // mainMenuSettingsWrapper.append(playWithDiv, timePerPlayerDiv, enterYourNameDiv, buttonDiv);
        mainMenuSettingsWrapper.append(playWithDiv, timePerPlayerDiv, enterYourNameDiv, startTheGameButton.button);
        wrapper.append(mainMenuSettingsWrapper);
        container.append(rules.element, info.element, cyberChessTextWrapper, wrapper, footerWrapper);

        return container;
    }
}
