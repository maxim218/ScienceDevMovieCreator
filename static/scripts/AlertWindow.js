"use strict";

export default class AlertWindow {
    static writeOK() {
        console.log("Click OK");
    }

    constructor() {
        console.log("Create AlertWindow");

        this.backGroundFonBox = document.getElementById("backGroundFonBox");
        this.alertMessageBox = document.getElementById("messageAlertBox");
        this.parag = document.getElementById("messageContentParag");

        document.getElementById("closeAlertBtn").onclick = () => {
            AlertWindow.writeOK();
            this.backGroundFonBox.hidden = true;
            this.alertMessageBox.hidden = true;
        }
    }

    showMessage(textParam) {
        this.parag.innerHTML = textParam.toString();
        this.backGroundFonBox.hidden = false;
        this.alertMessageBox.hidden = false;

        document.getElementById("closeAlertBtn").onclick = () => {
            AlertWindow.writeOK();
            this.backGroundFonBox.hidden = true;
            this.alertMessageBox.hidden = true;
        }
    }

    showMessageWithCallback(textParam, callback) {
        this.parag.innerHTML = textParam.toString();
        this.backGroundFonBox.hidden = false;
        this.alertMessageBox.hidden = false;

        document.getElementById("closeAlertBtn").onclick = () => {
            AlertWindow.writeOK();
            this.backGroundFonBox.hidden = true;
            this.alertMessageBox.hidden = true;
            callback();
        }
    }
}
