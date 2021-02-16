# Coders Camp 2020 | Projekt Zespołowy | TypeScript

![CyperpunkChessLogo](https://user-images.githubusercontent.com/56504859/107998538-ab799d00-6fe5-11eb-836b-cc4d7ff870c4.PNG)

## Zespół projektowy

Zespół pracował w ramach kursu [CodersCamp](https://coderscamp.pl/).
Aplikację wykonali uczestnicy kursu przy pomocy mentora.
Zachęcamy do odwiedzenia profili członków zespołu, w celu zapoznania się z ich portfolio.

**Mentor**: [Hubert Kawałek](https://github.com/htk4)

**Uczestnicy**:

-   [Anna Marszałek](https://github.com/Ania-Em)
-   [Mateusz Baciak](https://github.com/bat098)
-   [Mateusz Król](https://github.com/KrolMateusz)
-   [Mateusz Kmieć](https://github.com/Haivex)
-   [Tomasz Dudek](https://github.com/dudeek)
-   [Weronika Dziedzic](https://github.com/blackrabbit2)

## Cyberpunk chess
# CodersCamp 2020 - Projekt TypeScript
**CodersCamp (coderscamp.edu.pl) - Największy otwarty kurs programowania webowego** 

### Demo

Wersja demonstracyjna aplikacji jest dostępna [TUTAJ](https://coderscamp2020-hk.github.io/CodersCamp2020.Project.TypeScript.Chess/index.html).

### Cel projektu

Celem projektu było napisanie aplikacji wykorzystującej dotychczas nabytą wiedzę z następujących technologi: html, css, javascript, typescript.
Zespół projektowy zdecydował się na aplikacje - gra w szachy z motywem gry Cyberpunk 2077. Aplikacja umożliwia grę w szachy, rywalizację z graczem i komputerem umożliwiając grę w wyznacznym czasie.

Aplikacja została wykonana wg dostarczonych przez organizatorów CodersCamp wymagań.
Szablon projektu dostępny jest [TUTAJ](https://github.com/CodersCamp2020/CodersCamp2020.Project.TypeScript.Chess).


### Działanie aplikacji

#### Menu Główne

W menu głównym należy wybrać tryb gry, czas rozgrywki oraz wpisać imię gracza. 
Możliwe tryby gry:

-   Computer — możliwość gry z komputerem
-   Other user — możliwość gry z innym graczem

Następnie długość trwania gry rozgrywki dla jednego gracza. Możliwe opcje do wyboru:

-   3 min
-   5 min
-   10 min
-   30 min

Ostatnia opcja to podanie nazw graczy. Możliwe opcje do wyboru:

-   Player1 - pole w którym użytkownik podaje swoją nazwę
-   Player2 - pole w którym podajemy nazwę drugiego gracza. Pole to jest opcjonalne, nie wymaga wypełnienia w przypadku gry z komputerem

##### Zasady gry

Zasady gry wyświetlane są w formie modalu z lewej strony po naciśnięciu przycisku RULES na ekranie menu głownego jak i również można podejrzeć je w trakcie rozgrywki.

##### Informacje

Użytkowik w dowolnym momencie jest w stanie podejrzeć informacje dotyczące projektu. Zostały one przygotowane w formie modalu z prawej strony po naciśnięciu przycisku INFO na ekranie menu głownego jak i podczas rozgrywki.

#### Rozgrywka

Partie rozgrywa się na planszy nazywanej szachownicą. Szachownica składa się z 64 pól, na przemian białych i czarnych. Pola w pionie opisane są za pomocą cyfr od 1 do 8, natomiast pola w poziomie za pomocą liter od A do H. Opis alfanumeryczny pozwala na określenie współrzędnych każdej figury na szachownicy. Na szachownicy umieszczone są 32 bierki (w sześciu rodzajach, w tym po 8 pionów i 8 figur, łącznie 16 dla każdego z graczy). Celem gry jest danie mata, tzn. zagrożenie królowi przeciwnika usunięciem z dalszej rozgrywki („zbiciem”). Gra może zakończyć się na trzy sposoby. 
1. Wykonany zostaje szach-mat
2. Skończy się czas rozgrywki dla jednej ze stron
3. Wykonany zostaje pat

#### Sterowanie

Aby wykonać ruch należy umieścić kursor na wybranej bierce. Następnie kliknać w celu wyświetlenia możliwych ruchów bierki. Na koniec wybrać jedno z podświetlonych pól, by przesunięcia bierki.

<p align="center">
  <img src="https://user-images.githubusercontent.com/56504859/108079996-b416b580-706f-11eb-9793-8c93d8f5d4ea.gif" alt="gif" />
</p>

#### Sterowanie głosem

Aplikacja umożliwia sterowanie pionkami w języku polskim. W celu wykonania ruchu wywołujemy głosowo pole na jakim znajduje się pionek. Następnie wyświelane zostają możliwe ruchy wybranym pionkiem, a następnie podajemy pole na jakim ma stanąć pionek

### Zmiany wprowadzone w wymaganiach

Lekkim wizualnym zmianom uległ projekt dostarczony przez grafika.

### Zrealizowane dodatkowe zadania

Nasz zespół zrealizował także zadania dodatkowe, wykraczające poza zakres kursu

1. Utowrzony został szablon graficzny aplikacji w programie Figma.

2. Wykorzystaliśmy Web Speech API w celu umożliwieniu gry za pomocą głosem.

## Development aplikacji

Jeśli chcesz pomóc, w dalszym rozwoju aplikacji, z chęcią przyjmiemy Twoje Pull Requesty.

### Wykorzystywane technologie

W trakcie developmentu wykorzystujemy:

-   TypeScript
-   CSS & SCSS, do stylowania aplikacji
-   HTML, do definiowania struktury aplikacji

Pozostałe narzędzia wspomagające pracę:

-   Lodash do pracy z tablicami/obiektami
-   Web speech API (SpeechRecognition, SpeechSynthesis)


### Uruchomienie projektu

Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm install`
2. Wystartuj serwer developerski `npm run dev`

Aplikacja będzie dostępna pod adresem [localhost:8080/](http://localhost:8080)

Kod produkcyjny aplikacji umieszczamy w katalogu `dist`.

### Uruchomienie testów

Dodając swoje 5 groszy do naszej aplikacji, pamiętaj o pokryciu kodu testami.
Aby uruchomić testy aplikacji, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm install` (jeśli nie zrobiłeś już tego wcześniej).
2. Uruchom testy, wykonując komendę: `npm run test`. Testy z raportem pokrycia uruchomisz za pomocą: `npm run test:cov`.

Kod testów umieszczamy w katalogu `test`.

zmieni adres, z jakiego aplikacja będzie korzystać, aby łączyć się z SWApi. Domyślnie jest to zdefiniowane w pliku `.env` na wartość: `https://swapi.dev/api`.

### Organizacja pracy

Praca zespołu była organizowana przy użyciu narzędzi dostarczanych przez GitHub.
Zadania opisywaliśmy za pomocą GitHub Issues i dzieliśmy czas ich wykonania na tygodnie za pomocą GitHub Projects.
Każde z zadań było estymowane przez mentora, dzięki czemu staraliśmy się, aby liczba punktów przypadająca w danym tygodniu na każdą osobę w zespole była podobna.
Jeśli chcesz zaproponować, jakąś zmianę w aplikacji, utwórz nowy Issue, wzorując się na poprzednich.
