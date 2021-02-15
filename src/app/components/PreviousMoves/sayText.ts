export function sayText(textToSay: string): void {
    const person = new SpeechSynthesisUtterance();
    person.text = textToSay;
    person.lang = 'pl-PL';
    person.rate = 0.6;
    person.pitch = 0.4;
    person.onend = function (event) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(person);
}
