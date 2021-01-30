// class Timer(
//     gameTime: number;
//     addedTime: number;
//     constructor(gameTime: number, addedTime: number): {
//         this.gameTime = gameTime;
// this.addedTime = addedTime;
//     }
// )
var Czlowiek = /** @class */ (function () {
    function Czlowiek(name, age) {
        this.imie = name;
        this.wiek = age;
    }
    return Czlowiek;
}());
var Tomek = new Czlowiek("Tomek", 24);
console.log(Tomek);
