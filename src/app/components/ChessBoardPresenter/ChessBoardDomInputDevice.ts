import { allBoardCords } from '../../domain/basicChessTypes';
import { OnClickHandler, OnHoverHandler } from '../../domain/IPresenter';
import { ChessBoardComponent } from '../ChessBoard/ChessBoardComponent';

export class ChessBoardDomInputDevice {
    private onHoverHandler?: OnHoverHandler;
    private onHoverHandlers: (() => void)[] = [...Array(allBoardCords.length)];

    private onClickHandler?: OnHoverHandler;
    private onClickHandlers: (() => void)[] = [...Array(allBoardCords.length)];

    constructor(private chessboardComponent: ChessBoardComponent) { }

    onHover(callback: OnHoverHandler): void {
        if (this.onHoverHandler) {
            this.unregisterCallbacks('mouseover');
        }
        this.onHoverHandler = callback;
        this.registerCallbacks('mouseover');
    }

    onClick(callback: OnClickHandler): void {
        if (this.onClickHandler) {
            this.unregisterCallbacks('click');
        }
        this.onClickHandler = callback;
        this.registerCallbacks('click');
    }

    update(): void {
        if (this.onHoverHandler) {
            this.registerCallbacks('mouseover');
        }
        if (this.onClickHandler) {
            this.registerCallbacks('click');
        }
    }

    private registerCallbacks(name: 'click' | 'mouseover') {
        let i = 0;
        const handlers = name === 'click' ? this.onClickHandlers : this.onHoverHandlers;
        for (const cord of allBoardCords) {
            const handler = name === 'click' ? () => this.onClickHandler?.(cord) : () => this.onHoverHandler?.(cord);
            handlers[i++] = handler;
            this.chessboardComponent.addTileEvent(cord, name, handler);
        }
    }

    private unregisterCallbacks(name: 'click' | 'mouseover') {
        let i = 0;
        const handlers = name === 'click' ? this.onClickHandlers : this.onHoverHandlers;
        for (const cord of allBoardCords) {
            this.chessboardComponent.addTileEvent(cord, name, handlers[i++]);
        }
    }
}
