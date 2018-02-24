"use strict";

import LineBoxManager from "./LineBoxManager";

export default class ProcessController {
    constructor(canvasManager) {
        console.log("Create ProcessController");
        this.canvasManager = canvasManager;

        this.imagesArr = [];
        this.count = 0;

        this.layersBox = document.getElementById("layersBox");
        this.layersBox.innerHTML = "";

        this.nowStartPosition = 0;
        this.selectedLayerNumber = 0;
        this.selectedFrame = 0;

        this.fonColor = "";
        this.fonWidth = "";
        this.fonHeight = "";

        this.lastFrame = 799;
        console.log("Last frame: " + this.lastFrame);
    }

    setFonParams(ww, hh, fonColor) {
        ww = parseInt(ww);
        hh = parseInt(hh);

        this.fonColor = fonColor;
        this.fonWidth = ww + "px";
        this.fonHeight = hh + "px";

        console.log(this.fonColor + " " + this.fonWidth + " " + this.fonHeight);
    }

    getRolicInfo(lastFrame) {
        this.lastFrame = parseInt(lastFrame);
        console.log("Last frame: " + this.lastFrame);

        const imagesArr = this.imagesArr;
        const answer = [];

        for(let i = 0; i < imagesArr.length; i++) {
            const image = imagesArr[i];

            const answerImage = {
                content: image.content,
                name: image.name,
                frames: []
            };

            for(let j = 0; j < image.frames.length; j++) {
                const frame = image.frames[j];
                if(frame.marked === true) {
                    answerImage.frames.push(frame);
                } else {
                    answerImage.frames.push({});
                }
            }

            answer.push(answerImage);
        }

        const t = this;

        const obj = {
            lastFrame: t.lastFrame,
            fonColor: t.fonColor,
            fonWidth: t.fonWidth,
            fonHeight: t.fonHeight,
            answer: answer
        };

        return JSON.stringify(obj);
    }

    setPropertiesTextFieldsValues(layer, frame) {
        let obj = null;

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];
            if(image.name === layer) {
                obj = image;
                break;
            }
        }

        const xx = obj.frames[frame].x;
        const yy = obj.frames[frame].y;
        const ww = obj.frames[frame].w;
        const hh = obj.frames[frame].h;

        function get(s) {
            return document.getElementById(s.toString());
        }

        const xx_t = get("q5_t1");
        const yy_t = get("q5_t2");
        const ww_t = get("q5_t3");
        const hh_t = get("q5_t4");

        xx_t.value = xx;
        yy_t.value = yy;
        ww_t.value = ww;
        hh_t.value = hh;
    }

    setPropOfObjInFrame(xx,yy,ww,hh) {
        this.getSelectedLayerNumber();
        const layer = parseInt(this.selectedLayerNumber);
        const frame = parseInt(this.selectedFrame);

        let obj = null;

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];
            if(image.name === layer) {
                obj = image;
                break;
            }
        }

        xx = parseInt(xx);
        yy = parseInt(yy);
        ww = parseInt(ww);
        hh = parseInt(hh);

        console.log("Layer: " + layer);
        console.log("Frame: " + frame);
        console.log("Name number: " + obj.name);

        obj.frames[frame].marked = true;
        obj.frames[frame].x = xx;
        obj.frames[frame].y = yy;
        obj.frames[frame].w = ww;
        obj.frames[frame].h = hh;

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];

            const name = image.name;
            const x = image.frames[frame].x;
            const y = image.frames[frame].y;
            const w = image.frames[frame].w;
            const h = image.frames[frame].h;

            this.canvasManager.drawImage(name, x, y, w, h);
        }

        const currentImage = obj;
        currentImage.frames[frame].marked = true;
        currentImage.manager.initBoxContent(this.nowStartPosition);

        /********************************************************************/

        function changeProperties(currentImage, now, after) {
            const frameNumber = after - now - 1;

            if(frameNumber !== 0) {

                const valuesArr = [
                    "x", "y", "w", "h",
                ];

                for(let ind = 0; ind < valuesArr.length; ind++) {
                    const value = valuesArr[ind];

                    const dx = (currentImage.frames[after][value] - currentImage.frames[now][value]) / frameNumber;
                    let nowValue = currentImage.frames[now][value];

                    for (let i = now + 1; i <= after - 1; i++) {
                        nowValue += dx;
                        currentImage.frames[i][value] = parseInt(nowValue);
                    }
                }
            }
        }

        for(let i = 0; i < currentImage.frames.length; i++) {
            const frameNow = currentImage.frames[i];
            if(frameNow.marked === true) {
                const now = i;

                for(let j = now + 1; j < currentImage.frames.length; j++) {
                    const frameAfter = currentImage.frames[j];
                    if(frameAfter.marked === true) {
                        const after = j;
                        changeProperties(currentImage, now, after);
                        i = after - 1;
                        break;
                    }
                }
            }
        }

        /********************************************************************/
    }

    getSelectedLayerNumber() {
        const selectedLabel = "Выбранный слой";

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];
            if(document.getElementById('label_in_table_td_' + image.name).innerHTML === selectedLabel) {
                this.selectedLayerNumber = parseInt(image.name);
                return;
            }
        }
        this.selectedLayerNumber = 0;
    }

    setSelectedFrame(number) {
        this.selectedFrame = parseInt(number);
        this.setPropertiesTextFieldsValues(this.selectedLayerNumber, this.selectedFrame);

        const layer = parseInt(this.selectedLayerNumber);
        const frame = parseInt(this.selectedFrame);

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];

            const name = image.name;
            const x = image.frames[frame].x;
            const y = image.frames[frame].y;
            const w = image.frames[frame].w;
            const h = image.frames[frame].h;

            this.canvasManager.drawImage(name, x, y, w, h);
        }
    }

    addLayerHTML() {
        this.layersBox.innerHTML = "";
        let htmlContent = "";

        for(let i = this.imagesArr.length - 1; i >= 0; i--) {
            const image = this.imagesArr[i];
            htmlContent = htmlContent + "<tr class = 'trClass' id = '" + ("layer_td_" + image.name) + "'><td class = 'tdClass'>" + "<div style = 'background-color: white; width: 70px; height: 70px; padding: 10px; border: 2px solid gray; border-radius: 7px;'>" +"<img width = '70px' height = '70px' src = '" + image.content + "'>" + "</div>"  +"</td><td class = 'tdClass'>" + "<span id = '" + "label_in_table_td_" + image.name + "'></span>" + "</td><td class = 'tdClass'>" + "<div style = 'width: 520px;' id = '" + ("line_box_" + image.name) +"'></div>" + "</td</tr>";
        }

        htmlContent = "<table>" + htmlContent + "</table>";
        this.layersBox.innerHTML = htmlContent;

        function clearSelected(imagesArr) {
            for(let i = 0; i < imagesArr.length; i++) {
                const number = imagesArr[i].name;
                document.getElementById("label_in_table_td_" + number).innerHTML = "";
            }
        }

        const selectedLabel = "Выбранный слой";

        this.selectedLayerNumber = this.imagesArr.length - 1;
        document.getElementById("label_in_table_td_" + (this.selectedLayerNumber)).innerHTML = selectedLabel;

        for(let i = 0; i < this.imagesArr.length; i++) {
            const number = this.imagesArr[i].name;
            document.getElementById("layer_td_" + number).onclick = () => {
                clearSelected(this.imagesArr);
                document.getElementById("label_in_table_td_" + number).innerHTML = selectedLabel;
                this.selectedLayerNumber = number;
                this.setPropertiesTextFieldsValues(this.selectedLayerNumber, this.selectedFrame);
            }
        }

        this.nowStartPosition = 0;
        for(let i = 0; i < this.imagesArr.length; i++) {
            this.imagesArr[i].manager.initBoxContent(this.nowStartPosition);
        }
    }

    move(valueParam, type) {
        let value = 0;

        if(type === "LEFT") {
            value = parseInt(valueParam);
        }

        if(type === "RIGHT") {
            value = parseInt(valueParam) * (-1);
        }

        if(this.nowStartPosition - value >= 0) {
            console.log("Changed");
            this.nowStartPosition -= value;
            for (let i = 0; i < this.imagesArr.length; i++) {
                this.imagesArr[i].manager.initBoxContent(this.nowStartPosition);
            }
            return true;
        }

        return false;
    }

    addImage(loadedImage) {
        this.canvasManager.addImage(loadedImage, this.count);

        const content = loadedImage;
        const name = this.count;

        let frames = [];
        const framesNumber = 800;
        for(let i = 0; i < framesNumber; i++) {
            const frameObj = {
                x: 0,
                y: 0,
                w: 150,
                h: 150,
                marked: false,
            };
            frames.push(frameObj);
        }
        frames[0].marked = true;

        const image = {
            content: content,
            name: name,
            manager: new LineBoxManager("line_box_" + name, frames),
            frames: frames,
        };

        this.imagesArr.push(image);
        this.addLayerHTML();

        this.setPropertiesTextFieldsValues(this.count, 0);
        this.selectedFrame = 0;
        document.getElementById("q4_t1").value = "0";

        this.count++;
    }
}
