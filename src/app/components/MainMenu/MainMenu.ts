import styles from './MainMenu.module.scss';
import { Aside } from '../Aside/Aside';
import { InfoContent, RulesContent } from '../sidebars/sidebars';
import { Header } from '../HeaderCyberChess/Header';
import { Footer } from '../footer/Footer';
import { Button } from '../genericButton/Button';
import { create } from 'lodash';

export interface StartGameParams {
    playWith: 'computer' | 'user';
    timePerPlayer: '3' | '5' | '10' | 'noLimit';
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
            const params = { playWith: data.get('playWith') } as StartGameParams;
            onStart(params);
            console.log(event);
            event.preventDefault();
        });

        const playWithDiv = document.createElement('div');
        playWithDiv.classList.add(styles.playWithDiv);
        playWithDiv.innerHTML = `<h4>PLAY WITH</h4>`;
        const computer = document.createElement('input');
        const computerLabel = document.createElement('label');
        computerLabel.innerText = 'computer';
        computer.type = 'radio';
        computer.setAttribute('id', 'id1');
        computer.value = 'computer';
        computer.setAttribute('name', 'playWith');
        computerLabel.setAttribute('for', 'id1');

        const otherUser = document.createElement('input');
        const otherUserLabel = document.createElement('label');
        otherUserLabel.innerText = 'other user';
        otherUser.type = 'radio';
        otherUser.setAttribute('id', 'id2');
        otherUserLabel.setAttribute('for', 'id2');
        otherUser.value = 'user';
        otherUser.setAttribute('name', 'playWith');
        playWithDiv.append(computer, computerLabel, otherUser, otherUserLabel);

        const timePerPlayerDiv = document.createElement('div');
        timePerPlayerDiv.classList.add(styles.timePerPlayerDiv);
        timePerPlayerDiv.innerHTML = `<h4>TIME PER PLAYER</h4>`;

        const enterYourNameDiv = document.createElement('div');
        enterYourNameDiv.classList.add(styles.enterYourNameDiv);
        enterYourNameDiv.innerHTML = `<h4>ENTER YOUR NAME</h4>`;
        const input1 = document.createElement('input');
        input1.setAttribute('name', 'input1');
        const input2 = document.createElement('input');
        input2.setAttribute('name', 'input2');
        enterYourNameDiv.append(input1, input2);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add(styles.buttonDiv);

        const startTheGameButton = new Button(
            'START THE GAME',
            function () {
                console.log('animated button');
            },
            true,
        );
        startTheGameButton.button.classList.add(styles.startTheGameButton);
        startTheGameButton.button.type = 'submit';

        //FOOTER
        const footerWrapper = document.createElement('div');
        footerWrapper.classList.add(styles.wrapperFooter);
        const footerImage = new Footer();
        footerWrapper.appendChild(footerImage.element);

        //APPENDS
        buttonDiv.append(startTheGameButton.button);
        mainMenuSettingsWrapper.append(playWithDiv, timePerPlayerDiv, enterYourNameDiv, buttonDiv);
        wrapper.append(mainMenuSettingsWrapper);
        container.append(rules.element, info.element, cyberChessTextWrapper, wrapper, footerWrapper);

        return container;
    }
}
