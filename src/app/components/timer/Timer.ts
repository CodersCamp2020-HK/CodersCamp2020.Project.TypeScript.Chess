export class Timer {
    private gameTimeInSec: number;
    private addedTimeInSec: number;
    private actualTimer?: number;
    element: HTMLElement;

    constructor(gameTimeInSec: number, addedTimeInSec: number) {
        this.element = document.createElement('div');
        this.gameTimeInSec = gameTimeInSec;
        this.addedTimeInSec = addedTimeInSec;
        this.element.textContent = this.convertTime();
    }

    start(onTimerEndCb: () => void): void {
        if (this.actualTimer !== undefined) {
            this.stop();
        }
        this.actualTimer = window.setInterval(() => {
            this.gameTimeInSec -= 0.1;
            this.element.textContent = this.convertTime();
            if (this.gameTimeInSec <= 0) {
                window.clearInterval(this.actualTimer);
                this.gameTimeInSec = 0;
                this.element.textContent = this.convertTime();
                onTimerEndCb();
            }
        }, 100);
    }

    stop(): void {
        window.clearInterval(this.actualTimer);
        this.gameTimeInSec += this.addedTimeInSec;
    }

    private convertTime(): string {
        const mins = Math.floor(this.gameTimeInSec / 60);
        const secs = this.gameTimeInSec % 60;
        let stringMins = '';
        let stringSecs = '';
        mins < 10 ? (stringMins = `0${mins}`) : (stringMins = `${mins}`);
        secs < 10 ? (stringSecs = `0${secs.toFixed(1)}`) : (stringSecs = `${secs.toFixed(1)}`);
        return `${stringMins}:${stringSecs}`;
    }
    public get remainingTime(): number {
        return this.gameTimeInSec;
    }
}
