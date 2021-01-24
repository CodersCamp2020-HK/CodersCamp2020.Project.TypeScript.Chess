declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.scss' {
    const styles: { [className: string]: string };
    export default styles;
}
