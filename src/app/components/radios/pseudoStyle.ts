const UID = {
    _current: 0,
    getNew: function () {
        this._current++;
        return this._current;
    },
};

export const pseudoStyle = function (
    element: HTMLElement | HTMLInputElement,
    pseudo: string,
    prop: string,
    value: string,
): HTMLElement | HTMLInputElement {
    const _this = element;
    const _sheetId = 'pseudoStyles';
    const _head = document.head || document.getElementsByTagName('head')[0];
    const _sheet = document.getElementById(_sheetId) || document.createElement('style');
    _sheet.id = _sheetId;
    const className = 'pseudoStyle2' + UID.getNew();

    _this.className += ' ' + className;

    _sheet.innerHTML += ' .' + className + ':' + pseudo + '{' + prop + ':' + value + '}';
    _head.appendChild(_sheet);
    return element;
};
