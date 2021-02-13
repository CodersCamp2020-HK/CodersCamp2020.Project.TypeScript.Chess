import { data } from './infoData';
import { data as rulesData } from './rulesData';
import styles from './sidebars.module.scss';

export class InfoContent {
    private _element: HTMLDivElement = document.createElement('div');
    private _data = data;
    constructor() {
        this.render();
    }
    get element(): HTMLDivElement {
        return this._element;
    }

    render(): void {
        this._element.innerHTML = '';
        this._element.classList.add(styles.mainWrapperInfo);

        const logo = document.createElement('span');
        logo.textContent = this._data.logo;
        logo.classList.add(styles.logo);

        const year = document.createElement('span');
        year.textContent = this._data.year;
        year.classList.add(styles.year);

        const description = document.createElement('p');
        description.textContent = this._data.description;
        description.classList.add(styles.description);

        const mentorWrapper = document.createElement('div');
        const mentorLabel = document.createElement('label');
        mentorLabel.textContent = 'Mentor';
        mentorLabel.classList.add(styles.label);
        const mentorName = document.createElement('span');
        mentorName.textContent = this._data.mentor;
        mentorWrapper.classList.add(styles.mentor);
        mentorWrapper.append(mentorLabel, mentorName);

        const teamWrapper = document.createElement('div');
        const teamLabel = document.createElement('label');
        teamLabel.textContent = 'Team';
        teamLabel.classList.add(styles.label);
        const teamList = document.createElement('ol');
        teamList.classList.add(styles.teamList);
        this._data.team.forEach((name) => {
            const li = document.createElement('li');
            li.textContent = name;
            teamList.append(li);
        });
        teamWrapper.classList.add(styles.team);
        teamWrapper.append(teamLabel, teamList);

        const linkWrapper = document.createElement('div');
        const linkLabel = document.createElement('label');
        linkLabel.textContent = 'Link to github';
        linkLabel.classList.add(styles.label);
        const link = document.createElement('a');
        link.textContent = this._data.link;
        link.href = this._data.link;
        link.target = '_blank';
        link.classList.add(styles.link);
        linkWrapper.classList.add(styles.linkWrapper);
        linkWrapper.append(linkLabel, link);

        this._element.append(logo, year, description, mentorWrapper, teamWrapper, linkWrapper);
    }
}

export class RulesContent {
    private _element: HTMLDivElement = document.createElement('div');
    private _data = rulesData;
    constructor() {
        this.render();
    }

    render(): void {
        this._element.innerHTML = '';
        this._element.classList.add(styles.mainWrapperRules);

        const piecesLabel = document.createElement('label');
        piecesLabel.textContent = 'Chess moves';
        piecesLabel.classList.add(styles.rulesLabel);

        const piecesContainer = document.createElement('div');
        piecesContainer.classList.add(styles.piecesContainer);

        this._data.pieces.forEach((piece) => {
            const pieceCard = document.createElement('div');
            pieceCard.classList.add(styles.pieceCard);

            const pieceContainerImage = document.createElement('div');
            pieceContainerImage.classList.add(styles.pieceContainerImage);
            const pieceImage = piece.img.cloneNode(true) as HTMLImageElement;
            pieceImage.classList.add(styles.pieceImage);
            pieceContainerImage.append(pieceImage);

            const pieceDescription = document.createElement('div');
            pieceDescription.classList.add(styles.pieceDescription);

            const pieceName = document.createElement('span');
            pieceName.classList.add(styles.pieceName);
            pieceName.textContent = piece.name;

            const pieceText = document.createElement('p');
            pieceText.classList.add(styles.pieceText);
            pieceText.textContent = piece.description;

            pieceDescription.append(pieceName, pieceText);

            pieceCard.append(pieceContainerImage, pieceDescription);

            piecesContainer.append(pieceCard);
        });
        const castlingLabel = document.createElement('label');
        castlingLabel.textContent = 'Castling';
        castlingLabel.classList.add(styles.rulesLabel);

        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add(styles.actionsContainer);

        this._data.actions.forEach((action) => {
            const actionCard = document.createElement('div');
            actionCard.classList.add(styles.actionCard);

            const actionName = document.createElement('span');
            actionName.textContent = action.name;
            actionName.classList.add(styles.actionName);

            const actionDescription = document.createElement('p');
            actionDescription.textContent = action.description;
            actionDescription.classList.add(styles.actionDescription);

            const actionImage = action.img.cloneNode(true) as HTMLImageElement;
            actionImage.classList.add(styles.actionImage);

            actionCard.append(actionName, actionDescription, actionImage);
            actionsContainer.append(actionCard);
        });

        this._element.append(piecesLabel, piecesContainer, actionsContainer);
    }
    get element(): HTMLDivElement {
        return this._element;
    }
}
