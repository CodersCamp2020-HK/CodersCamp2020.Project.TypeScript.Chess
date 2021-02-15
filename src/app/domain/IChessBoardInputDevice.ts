import { Cord } from './basicChessTypes';

export type InputDeviceCallback = (cord: Readonly<Cord>) => void;
export interface IChessBoardInputDevice {
    onHover(callback: InputDeviceCallback): void;
    onClick(callback: InputDeviceCallback): void;
}
