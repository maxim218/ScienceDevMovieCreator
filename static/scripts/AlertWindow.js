"use strict";

export default class AlertWindow {
    constructor() {
        console.log("Create AlertWindow");

        this.backGroundFonBox = document.getElementById("backGroundFonBox");
        this.alertMessageBox = document.getElementById("messageAlertBox");
        this.parag = document.getElementById("messageContentParag");

        this.addEventToCloseBtn();
    }

    addEventToCloseBtn() {
        document.getElementById("closeAlertBtn").onclick = () => {
            this.backGroundFonBox.hidden = true;
            this.alertMessageBox.hidden = true;
        }
    }

    showMessage(textParam) {
        this.parag.innerHTML = textParam.toString();
        this.backGroundFonBox.hidden = false;
        this.alertMessageBox.hidden = false;
    }
}
