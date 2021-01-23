export class Button {
  private __button: HTMLButtonElement;

  constructor(tekst: string, classList: string[], callback: any) {
    this.__button = document.createElement('button');
    this.__button.classList.add('button', ...classList);
    this.__button.innerText = tekst;
    this.__button.addEventListener('click', () => callback());
  }

  public get button(): HTMLButtonElement {
    return this.__button;
  }
}