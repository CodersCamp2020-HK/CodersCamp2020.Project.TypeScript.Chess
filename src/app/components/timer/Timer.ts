export class Timer {
    gameTimeInSec: number;
    addedTimeInSec: number;
    element: HTMLElement;

    constructor(gameTimeInSec: number, addedTimeInSec: number) {
        this.element = document.createElement('div');
        this.gameTimeInSec = gameTimeInSec;
        this.addedTimeInSec = addedTimeInSec;
    }

    startTime() {
        const actualTimer = setInterval(() => {
            this.gameTimeInSec--;
            this.element.innerText = this.convertTime();
        }, 1000);
        return actualTimer;
    }
    convertTime(): string {
        const mins = Math.floor(this.gameTimeInSec / 60);
        const secs = this.gameTimeInSec % 60;
        let stringMins = '';
        let stringSecs = '';
        mins < 10 ? (stringMins = `0${mins}`) : (stringMins = `${mins}`);
        secs < 10 ? (stringSecs = `0${secs}`) : (stringSecs = `${secs}`);
        return `${stringMins}:${stringSecs}`;
    }
    stopTime() {
        const actualTimer = this.startTime();
        clearInterval(actualTimer);
    }
}
