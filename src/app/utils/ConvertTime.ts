export const convertTime = (gameTimeInSec: number): string => {
    const mins = Math.floor(gameTimeInSec / 60);
    const secs = gameTimeInSec % 60;
    let stringMins = '';
    let stringSecs = '';
    mins < 10 ? (stringMins = `0${mins}`) : (stringMins = `${mins}`);
    secs < 10 ? (stringSecs = `0${secs.toFixed(1)}`) : (stringSecs = `${secs.toFixed(1)}`);
    return `${stringMins}:${stringSecs}`;
};
