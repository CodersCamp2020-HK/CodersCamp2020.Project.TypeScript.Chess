declare namespace ChessScssNamespace {
    export interface IChessScss {
        black: string;
        board: string;
        white: string;
    }
}

declare const ChessScssModule: ChessScssNamespace.IChessScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: ChessScssNamespace.IChessScss;
};

export = ChessScssModule;
