import styles from './Aside.module.scss';
import arrow from './arrow.svg';

type Sides = 'left' | 'right';

export class Aside {
    private __aside: HTMLDivElement;
    constructor(btnText: string, side: Sides, content: string) {
        this.__aside = document.createElement('div');
        this.__aside.className = styles.wrapper;
        side === 'left' && this.__aside.classList.add(styles.left);
        side === 'right' && this.__aside.classList.add(styles.right);
        const button = document.createElement('button');
        const arrow1 = document.createElement('img');
        const arrow2 = document.createElement('img');
        arrow1.src = arrow;
        arrow2.src = arrow;
        button.appendChild(arrow1);
        button.appendChild(document.createTextNode(btnText));
        button.appendChild(arrow2);
        button.className = styles.btn;
        button.addEventListener('click', () => {
            this.__aside.classList.toggle(styles.active);
        });
        this.__aside.appendChild(button);
        this.__aside.appendChild(document.createTextNode(content));
    }

    public get element(): HTMLDivElement {
        return this.__aside;
    }
}
