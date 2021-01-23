import { ChessBoardRepresentation } from '../models/EngineInterface';
import { Piece } from '../models/EngineInterface';
import { Cord } from '../models/EngineInterface';

interface PieceFile {
    url: string,
}

export class ChessBoardComponent {
    wrapper: HTMLDivElement;
    chessBoardElement: HTMLDivElement;
    verticalAxi: HTMLDivElement;
    horizontalAxi: HTMLDivElement;
    blackTilesClassList: string;
    whiteTilesClassList: string;
    piecesFiles: PieceFile[];
    constructor(blackTilesClassList: string, whiteTilesClassList: string, piecesFiles: PieceFile[], chessBoardRepresentation: ChessBoardRepresentation) {
        this.wrapper = document.createElement('div');
        this.chessBoardElement = document.createElement('div');
        this.verticalAxi = document.createElement('div');
        this.horizontalAxi = document.createElement('div');
        this.chessBoardElement = document.createElement('div');
        this.blackTilesClassList = blackTilesClassList;
        this.whiteTilesClassList = blackTilesClassList;
        this.piecesFiles = piecesFiles;

        this.wrapper.appendChild(this.verticalAxi);
        this.wrapper.appendChild(this.horizontalAxi);
        this.wrapper.appendChild(this.chessBoardElement);

        //this.render(chessBoardRepresentation);
    }

    render(chessBoardRepresentation: ChessBoardRepresentation) {

        let blackTile = document.createElement('div');
        blackTile.classList.add(this.blackTilesClassList);

        let whiteTile = document.createElement('div');
        whiteTile.classList.add(this.whiteTilesClassList);

        let currentTile = blackTile;
        this.chessBoardElement.innerHTML = "";

        for(let i = 0; i < chessBoardRepresentation.length-1; i++) {

           currentTile = currentTile == whiteTile ? blackTile : whiteTile;

            for(let j = 0; j < chessBoardRepresentation[i].length-1; j++) {
                let tileToAppend = currentTile.cloneNode(true) as HTMLDivElement;
                tileToAppend.dataset.x = i.toString();
                tileToAppend.dataset.y = j.toString();
                if(chessBoardRepresentation[i][j] !== null) {

                }

                this.chessBoardElement.appendChild(tileToAppend);

                currentTile = currentTile == whiteTile ? blackTile : whiteTile;
            }

        }
        return 
    }
}