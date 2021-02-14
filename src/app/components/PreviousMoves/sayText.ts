export function sayText(textToSay: string): void {
    const person = new SpeechSynthesisUtterance();
    person.text = 'Ala ma kota';
    person.lang = 'pl-PL';
    person.rate = 1.2;
    person.onend = function (event) {
        alert('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(person);

    // const SpeechSynthesis =
    //     window.SpeechSynthesis ||
    //     (window as any).webkitSpeechSynthesis ||
    //     (window as any).mozSpeechSynthesis ||
    //     (window as any).msSpeechSynthesis ||
    //     (window as any).oSpeechSynthesis;

    // const SpeechSynthesisUtterance =
    //     window.SpeechSynthesisUtterance ||
    //     (window as any).webkitSpeechSynthesisUtterance ||
    //     (window as any).mozSpeechSynthesisUtterance ||
    //     (window as any).msSpeechSynthesisUtterance ||
    //     (window as any).oSpeechSynthesisUtterance;

    // const SpeechSynthesisVoice =
    //     window.SpeechSynthesisVoice ||
    //     (window as any).webkitSpeechSynthesisVoice ||
    //     (window as any).mozSpeechSynthesisVoice ||
    //     (window as any).msSpeechSynthesisVoice ||
    //     (window as any).oSpeechSynthesisVoice;

    // const voice = new SpeechSynthesisVoice();

    // const person = new SpeechSynthesisUtterance(textToSay);
    // person.pitch = 1;
    // person.rate = 1;
    // person.voice = voice;

    // const synth = new SpeechSynthesis();
    // synth.speak(person);
}
