export interface IChessBoardInputDevice {
    onClickEvent(callback: () => void): void;
    onHoverEvent(callback: () => void): void;
}
