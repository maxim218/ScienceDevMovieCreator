"use strict";

export default class CanvasManager {
    constructor() {
        console.log("Create CanvasManager");
        this.createCanvas();
    }

    createCanvas() {
        this.ww = 910;
        this.hh = 560;

        this.can = document.getElementById('can');
        this.can.style.background = "#FFFFFF";
    }

    drawWalls(ww, hh, fonColor) {
        ww = parseInt(ww);
        hh = parseInt(hh);

        this.can.style.background = fonColor;
        this.can.style.width = ww + "px";
        this.can.style.height = hh + "px";
    }

    addImage(image, count) {
        let textHtml = "<div id = 'picture_box_" + count + "' style = 'position: absolute; padding: 0px; height: 150px; width: 150px; margin-left: 0px; margin-top: 0px;'></div>";
        this.can.innerHTML += textHtml.toString();
        document.getElementById("picture_box_" + count).innerHTML = "<img src = '" + image + "' class = 'canvasImage'>";
    }

    drawImage(name, x, y, w, h) {
        const t = this;
        const box = document.getElementById("picture_box_" + name);
        box.style.marginLeft = x + "px";
        box.style.marginTop = y + "px";
        box.style.width = w + "px";
        box.style.height = h + "px";
    }
}

