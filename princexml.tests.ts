/// <reference path="index.d.ts" />

Prince.addEventListener("complete", () => {
    let x = 0;
    x++;
}, false);

Prince.registerPostLayoutFunc(ReturnTestMessage);

function ReturnTestMessage() {
    return true
}