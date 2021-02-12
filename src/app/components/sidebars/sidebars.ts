import { data } from './infoData.ts';
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
        this._element.classList.add(styles.mainWrapper);

        const logo = document.createElement('span');
        logo.textContent = data.logo;
        logo.classList.add(styles.logo);

        const year = document.createElement('span');
        year.textContent = data.year;
        year.classList.add(styles.year);

        const description = document.createElement('p');
        description.textContent = data.description;
        description.classList.add(styles.description);

        const mentorWrapper = document.createElement('div');
        const mentorLabel = document.createElement('label');
        mentorLabel.textContent = 'Mentor';
        mentorLabel.classList.add(styles.label);
        const mentorName = document.createElement('span');
        mentorName.textContent = data.mentor;
        mentorWrapper.classList.add(styles.mentor);
        mentorWrapper.append(mentorLabel, mentorName);

        const teamWrapper = document.createElement('div');
        const teamLabel = document.createElement('label');
        teamLabel.textContent = 'Team';
        teamLabel.classList.add(styles.label);
        const teamList = document.createElement('ol');
        teamList.classList.add(styles.teamList);
        data.team.forEach((name) => {
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
        link.textContent = data.link;
        link.href = data.link;
        link.target = '_blank';
        link.classList.add(styles.link);
        linkWrapper.classList.add(styles.linkWrapper);
        linkWrapper.append(linkLabel, link);

        this._element.append(logo, year, description, mentorWrapper, teamWrapper, linkWrapper);
    }
}

export class RulesContent {
    private _element: HTMLDivElement = document.createElement('div');
    constructor() {
        this.render();
    }

    render(): void {
        this._element.innerHTML = '';
        this._element.classList.add(styles.mainWrapper);

        const piecesLabel = document.createElement('label');
        piecesLabel.textContent = 'Chess moves';
        piecesLabel.classList.add(styles.rulesLabel);

        const castlingLabel = document.createElement('label');
        castlingLabel.textContent = 'Castling';
        castlingLabel.classList.add(styles.rulesLabel);

        const enPassantLabel = document.createElement('label');
        enPassantLabel.textContent = 'enPassant';
        enPassantLabel.classList.add(styles.rulesLabel);

        const pawnPromotionLabel = document.createElement('label');
        pawnPromotionLabel.textContent = 'enPassant';
        pawnPromotionLabel.classList.add(styles.rulesLabel);

        this._element.append(piecesLabel);
    }
    get element(): HTMLDivElement {
        return this._element;
    }
}
