/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cord } from '../domain/basicChessTypes';
import { IChessBoardInputDevice, InputDeviceCallback } from '../domain/IChessBoardInputDevice';

const SpeechRecognition =
    window.SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    (window as any).mozSpeechRecognition ||
    (window as any).msSpeechRecognition ||
    (window as any).oSpeechRecognition;

export class ChessBoardVoiceInputDevice implements IChessBoardInputDevice {
    private recognition: SpeechRecognition;
    private isRunning = false;

    private onHoverHandler?: InputDeviceCallback;
    private onClickHandler?: InputDeviceCallback;

    constructor() {
        this.recognition = new SpeechRecognition();
        this.initializeRecognition();
    }

    onHover(callback: InputDeviceCallback): void {
        this.onHoverHandler = callback;
    }

    onClick(callback: InputDeviceCallback): void {
        this.onClickHandler = callback;
    }

    start(): void {
        this.isRunning = true;
        this.recognition.start();
    }

    stop(): void {
        this.isRunning = false;
        this.recognition.abort();
        this.recognition.stop();
    }

    private initializeRecognition() {
        this.recognition.lang = 'pl-PL';
        this.recognition.interimResults = false;
        this.recognition.continuous = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.onresult = (event) => this.handleRecognition(event);
        this.recognition.onend = () => {
            if (this.isRunning) {
                this.start();
            }
        };
    }

    private handleRecognition(event: SpeechRecognitionEvent): void {
        const confidence = event.results[0][0].confidence;
        const recognizedCommand = event.results[0][0].transcript.toLocaleLowerCase();
        console.log(`confidence: ${confidence}, text: ${recognizedCommand}`);
        const match = recognizedCommand.match(/^([a-h])([1-8])$/);
        if (match) {
            const cord = { x: 8 - Number(match[2]), y: match[1].charCodeAt(0) - 97 } as Cord;
            this.onClickHandler?.(cord);
        }
    }
}
