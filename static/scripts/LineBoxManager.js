"use strict";

export default class LineBoxManager {
    constructor(boxName, frames) {
        this.boxName = boxName;
        this.frames = frames;
    }

    initBoxContent(startPos) {
        this.box = document.getElementById(this.boxName);
        this.box.innerHTML = "";

        let htmlContent = "";
        for(let i = startPos; i < (startPos + 10); i++) {
            if(this.frames[i] !== null && this.frames[i] !== undefined) {
                if (this.frames[i].marked === false) {
                    htmlContent = htmlContent + "<td class = 'tdFrameClass'>" + i + "</td>";
                } else {
                    htmlContent = htmlContent + "<td class = 'tdFrameClass' style = 'background-color: #CCCCCC'>" + i + "</td>";
                }
            } else {
                htmlContent = htmlContent + "<td class = 'tdFrameClass' style = 'background-color: #FF0000; color: white;'>" + i + "</td>";
            }
        }

        htmlContent = '<table><tr>' + htmlContent + '</tr></table>';
        this.box.innerHTML = htmlContent;
    }
}
