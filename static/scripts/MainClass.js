"use strict";

import CanvasManager from "./CanvasManager";
import ProcessController from "./ProcessController";
import AlertWindow from "./AlertWindow";
import NumberControl from "./NumberControl";

class MainClass {
    constructor() {
        console.log("Create MainClass");
        this.canvasManager = new CanvasManager();
        this.processController = new ProcessController(this.canvasManager);
        this.alertWindow = new AlertWindow();
    }

    isNumb(stringParam) {
        return NumberControl.isIntegerNumber(stringParam);
    }

    static addEventsToMenuButtons() {
        const contentMenuBoxes = document.getElementsByClassName("contentOfMenu");

        function hideAllContentOfMenuBoxes(contentMenuBoxes) {
            for(let i = 0; i < contentMenuBoxes.length; i++) {
                const box = contentMenuBoxes[i];
                box.hidden = true;
            }
        }

        const buttons = document.getElementsByClassName("menuElementClass");

        for(let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const number = parseInt(button.id.toString().split("b").join(""));
            const contentBox = document.getElementById("x" + number);

            button.onclick = function() {
                hideAllContentOfMenuBoxes(contentMenuBoxes);
                contentBox.hidden = false;
            }
        }
    }

    addEventToSetRolicPropBtn() {
        const btn = document.getElementById("q1_b1");

        const fon_t = document.getElementById("q1_t1");
        const width_t = document.getElementById("q1_t2");
        const height_t = document.getElementById("q1_t3");

        btn.onclick = () => {
            if(fon_t.value === "") {
                this.alertWindow.showMessage("Поле ввода цвета заднего фона пусто.");
                return;
            }

            if(width_t.value === "") {
                this.alertWindow.showMessage("Поле ввода ширины ролика пусто.");
                return;
            }

            if(height_t.value === "") {
                this.alertWindow.showMessage("Поле ввода высоты ролика пусто.");
                return;
            }

            if(this.isNumb(width_t.value) === false) {
                this.alertWindow.showMessage("Поле ввода ширины ролика должно содержать целое положительное число.");
                return;
            }

            if(this.isNumb(height_t.value) === false) {
                this.alertWindow.showMessage("Поле ввода высоты ролика должно содержать целое положительное число.");
                return;
            }

            const fon_value = "#" + fon_t.value;
            const width_value = parseInt(width_t.value);
            const height_value = parseInt(height_t.value);

            if(width_value > 910) {
                this.alertWindow.showMessage("Значение ширины ролика не должно превышать 910 пикселей.");
                return;
            }

            if(width_value <= 0) {
                this.alertWindow.showMessage("Значение ширины ролика должно иметь положительное значение.");
                return;
            }

            if(height_value > 560) {
                this.alertWindow.showMessage("Значение высоты ролика не должно превышать 560 пикселей.");
                return;
            }

            if(height_value <= 0) {
                this.alertWindow.showMessage("Значение высоты ролика должно иметь положительное значение.");
                return;
            }

            this.processController.setFonParams(width_value, height_value, fon_value);
            this.canvasManager.drawWalls(width_value, height_value, fon_value);
        };

        btn.click();
    }

    addEventsToAddLayerButtons() {
        const hiddenGetFileBtn = document.getElementById("loadFilesBtn");
        const shownGetFileBtn = document.getElementById("q2_b1");

        const b3 = document.getElementById("b3");
        const b4 = document.getElementById("b4");
        const b5 = document.getElementById("b5");

        shownGetFileBtn.onclick = function() {
            hiddenGetFileBtn.click();
        };

        const t = this;

        hiddenGetFileBtn.onchange = function() {
            const file = this.files[0];

            b3.hidden = false;
            b4.hidden = false;
            b5.hidden = false;

            const myReader = new FileReader();
            myReader.readAsDataURL(file);

            myReader.onload = function(e) {
                const loadedImage = e.target.result;
                t.processController.addImage(loadedImage);
            }
        }
    }

    addEventsToMoveTimeLineButtons() {
        const textField = document.getElementById("q3_t1");

        function controlField(textField, t) {
            let value = textField.value;

            if(value === "") {
                t.alertWindow.showMessage("Поле ввода количества шагов пусто.");
                return false;
            }

            if(t.isNumb(value) === false) {
                t.alertWindow.showMessage("Поле ввода количества шагов должно содержать целое положительное число.");
                return false;
            }

            value = parseInt(value);

            if(value > 50) {
                t.alertWindow.showMessage("Количество шагов не должно превышать 50 единиц.");
                return false;
            }

            if(value <= 0) {
                t.alertWindow.showMessage("Количество шагов должно быть целым положительным числом.");
                return false;
            }

            return true;
        }

        const leftBtn = document.getElementById("q3_b1");
        const rightBtn = document.getElementById("q3_b2");

        const t = this;

        leftBtn.onclick = () => {
            if(controlField(textField, t) === true) {
                const value = parseInt(textField.value);
                const result = this.processController.move(value, "LEFT");
                if(result === false) {
                    t.alertWindow.showMessage("Невозможно осуществить сдвиг.");
                    return;
                }
            }
        };

        rightBtn.onclick = () => {
            if(controlField(textField, t) === true) {
                const value = parseInt(textField.value);
                this.processController.move(value, "RIGHT");
            }
        }
    }

    addEventToChooseFrameBtn() {
        const textField = document.getElementById("q4_t1");
        const btn = document.getElementById("q4_b1");

        btn.onclick = () => {
            if(textField.value === "") {
                this.alertWindow.showMessage("Поле ввода номера кадра пусто.");
                return;
            }

            if(this.isNumb(textField.value) === false) {
                this.alertWindow.showMessage("Номер кадра должен быть целым положительным числом или нулём.");
                return;
            }

            const value = parseInt(textField.value);

            if(value < 0) {
                this.alertWindow.showMessage("Номер кадра должен быть целым положительным числом или нулём.");
                return;
            }

            if(value > 799) {
                this.alertWindow.showMessage("Номер кадра не должен превышать значение 799.");
                return;
            }

            this.processController.setSelectedFrame(value);
        }
    }

    addEventsToSetPropOfElementBtn() {
        function get(s) {
            return document.getElementById(s.toString());
        }

        const xx_t = get("q5_t1");
        const yy_t = get("q5_t2");
        const ww_t = get("q5_t3");
        const hh_t = get("q5_t4");
        const btn = get("q5_b1");

        btn.onclick = () => {
            if(xx_t.value === "") {
                this.alertWindow.showMessage("Поле ввода позиции X пусто.");
                return;
            }

            if(yy_t.value === "") {
                this.alertWindow.showMessage("Поле ввода позиции Y пусто.");
                return;
            }

            if(ww_t.value === "") {
                this.alertWindow.showMessage("Поле ввода ширины пусто.");
                return;
            }

            if(hh_t.value === "") {
                this.alertWindow.showMessage("Поле ввода высоты пусто.");
                return;
            }

            const xx = parseInt(xx_t.value);
            const yy = parseInt(yy_t.value);
            const ww = parseInt(ww_t.value);
            const hh = parseInt(hh_t.value);
            this.processController.setPropOfObjInFrame(xx,yy,ww,hh);
        }
    }

    addEventsToProjectButtons() {
        const lastFrameTextField = document.getElementById("q6_t1");
        const btnWatchRolic = document.getElementById("q6_b1");

        btnWatchRolic.onclick = () => {
            let value = lastFrameTextField.value;

            if(value === "") {
                this.alertWindow.showMessage("Поле ввода последнего кадра пусто.");
                return;
            }

            if(this.isNumb(value) === false) {
                this.alertWindow.showMessage("Значение последнего кадра должно быть целым положительным числом.");
                return;
            }

            value = parseInt(value);

            if(value <= 0) {
                this.alertWindow.showMessage("Значение последнего кадра должно быть целым положительным числом.");
                return;
            }

            if(value > 799) {
                this.alertWindow.showMessage("Значение последнего кадра не должно превышать 799.");
                return;
            }

            const lastFrame = value;

            const answer = this.processController.getRolicInfo(lastFrame);
            console.log("----------------------------------------------");
            console.log(answer);
            console.log("----------------------------------------------");
        }
    }
}

window.onload = function() {
    const mainClass = new MainClass();
    MainClass.addEventsToMenuButtons();
    mainClass.addEventToSetRolicPropBtn();
    mainClass.addEventsToAddLayerButtons();
    mainClass.addEventsToMoveTimeLineButtons();
    mainClass.addEventToChooseFrameBtn();
    mainClass.addEventsToSetPropOfElementBtn();
    mainClass.addEventsToProjectButtons();
};
