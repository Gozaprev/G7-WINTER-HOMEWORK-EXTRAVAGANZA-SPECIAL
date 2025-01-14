const input = document.querySelector("input");
const placeholderText = input.getAttribute("placeholder");

const computedStyle = getComputedStyle(input);
// Determine actual width of placeholder text
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
context.font = computedStyle.fontSize + " " + computedStyle.fontFamily;
const textWidth = context.measureText(placeholderText).width;

input.style.width =
    textWidth +
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight) +
    "px";
canvas.remove();






const units = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const scales = ["", "thousand", "million"];

document.getElementById('convertButton').addEventListener('click', convertNumber);

function convertNumber() {
    const num = Number(document.getElementById('numberInput').value);
    const output = document.getElementById('output');

    if (!isNumeric(num)) {     // I ne mora, ako se stavi input type da e number
        output.textContent = 'Error: Please enter a valid number.'; 
        return;
    }

    const number = parseInt(num, 10); //10 za da se znae deka se raboti za decimalen sistem

    if (number < 0 || number > 1000000) {
        output.textContent = 'Error: Number must be between 0 and 1,000,000.';
        return;
    }

    output.textContent = numberToWords(number);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function numberToWords(num) {
    if (num === 0) return units[0];

    let words = '';

    if (num === 1000000) {
        return 'one million';
    }

    let remainder = num;
    let scale = 0;

    while (remainder > 0) {
        let chunk = remainder % 1000;

        if (chunk > 0) {
            let chunkWords = chunkToWords(chunk);
            if (scale > 0) {
                chunkWords += ' ' + scales[scale];
            }
            words = chunkWords + ' ' + words;
        }

        remainder = Math.floor(remainder / 1000);
        scale++;
    }

    return words.trim();
}

function chunkToWords(chunk) {
    let words = '';

    if (chunk >= 100) {
        words += units[Math.floor(chunk / 100)] + ' hundred';
        chunk %= 100;
        if (chunk > 0) words += ' ';
    }

    if (chunk >= 20) {
        words += tens[Math.floor(chunk / 10)];
        chunk %= 10;
        if (chunk > 0) words += '-';
    } else if (chunk >= 10) {
        words += teens[chunk - 10];
        chunk = 0;
    }

    if (chunk > 0) {
        words += units[chunk];
    }

    return words;
}

