const body = document.querySelector("body")

// создание формы для ввода текста
const form = document.createElement("form");

const monitor = document.createElement("textarea");
monitor.id ="monitor";
monitor.classList.add("input-from-keyboard")
body.append(monitor);


// создание тела клавиатуры
let keyboard = document.createElement("div");
keyboard.id = "keyboard";

body.append(keyboard);

const keyboardKeycapsID = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", "backspace"],
    ["tab", 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, "delete"],
    ["capslock", 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, "Enter"],
    ["shiftLeft", 122, 120, 99, 118, 98, 110, 109, 44, 46, 47,  "shiftRight"],
    ["ctrlleft", "command", "altleft", "spacebar", "altright", "ctrlright", "left", "up", "down", "right",]
];

const keyboardKeycapsClass = [
    [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, "backspace"],
    ["Tab", 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, "alt", "alt", "alt", "DELETE"],
    ["CapsLock", 97, 115, 100, 102, 103, 104, 106, 107, 108, "alt", "alt", "Enter"],
    ["ShiftLeft", 122, 120, 99, 118, 98, 110, 109, "alt", "alt", "alt",  "ShiftRight"],
    ["Ctrlleft", "Command", "Altleft", "spacebar", "Altright", "Ctrlright", "left", "up","down", "right",]
];


const keyboardEnLayoutShift = [
    ["<b>~</b>", "<b>!</b>", "<b>@</b>", "<b>#</b>", "<b>$</b>", "<b>%</b>", "<b>^</b>", "<b>&amp;</b>", "<b>*</b>", "<b>(</b>", "<b>)</b>", "<b>_</b>", "<b>+</b>", ""],
    [...new Array(11).fill(""), "<b>{</b>", "<b>}</b>", "<b>|</b>", "",""],
    [ "<b></b>", ...new Array(9).fill(""),  "<b>:</b>", '<b>"</b>',""],
    [...new Array(8).fill(""), "<b>&lt;</b>", "<b>&gt;</b>",  "<b>?</b>",""],
    new Array(10).fill("")
];


const keyboardEnLayout = [
    [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, "backspace"],
    ["Tab", 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, "delete"],
    ["Caps Lock", 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, "Enter"],
    ["Shift", 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, "Shift"],
    ["Ctrl", "command", "Alt", "32", "Alt", "Ctrl", "<span>&#x25C0;</span>",  "&#x25B2;", "&#x25BC;", "&#x25B6;"]
];

const keyboardROWS = ["numbers",
                      "qwerty",
                      "asdfg",
                      "zxcvb",
                      "bottomrow"]

// добавление клавиш на клавиатуру
// сначала создаем ряды
for (let y = 0; y < 5; y++) {
    const keyrow = document.createElement('ul');
    keyboard.append(keyrow);
    keyrow.id = keyboardROWS[y];
    
    keyrow.classList.add("keyrow");


    // наполняем ряд кнопками и записываем буквы
    for (let i = 0; i < keyboardEnLayout[y].length; i++) {
        const keycaps = document.createElement('li');
        keyrow.append(keycaps);
        keycaps.id = ("" + keyboardKeycapsID[y][i]).toLowerCase();
        keycaps.classList.add("keycaps", `${(keyboardKeycapsClass[y][i] + "").toLowerCase()}`);
        keycaps.innerHTML = `${keyboardEnLayoutShift[y][i]} <span> ${typeof keyboardEnLayout[y][i] === "number" 
                                    ? String.fromCharCode(keyboardEnLayout[y][i]) 
                                    : keyboardEnLayout[y][i]} </span>` ;
        keycaps.setAttribute("data", ""+keyboardEnLayout[y][i]);
        keycaps.classList.add("key");
    }
}

document.onkeypress = () => {
    document.querySelector(`#keyboard .keycaps[data="${event.keyCode}"]`)
            .classList.add("keydown");
}

document.onkeyup = () => {
  document.querySelectorAll(`#keyboard .keycaps`)
          .forEach((el)=>el.classList.remove("keydown"));
}



document.querySelectorAll(`#keyboard .keycaps`).forEach((el)=> {
    el.onmousedown = function (event) {
        let code = this.getAttribute("data");

        //This is it!
        document.querySelector(".input-from-keyboard").innerHTML +=  String.fromCharCode(code);

    }
});
