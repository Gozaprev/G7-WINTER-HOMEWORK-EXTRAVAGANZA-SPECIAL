function numberToWords(num) {
    if (num < 0 || num > 1000000 || isNaN(num)) {
        return "Please enter a valid number between 0 and 1,000,000.";
    }

    if (num === 0) return "zero";
    if (num === 1000000) return "one million";

    const belowTwenty = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    function convertToWords(n) {
        if (n < 20) return belowTwenty[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + belowTwenty[n % 10] : "");
        if (n < 1000) return belowTwenty[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + convertToWords(n % 100) : "");
        if (n < 1000000) return convertToWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + convertToWords(n % 1000) : "");
    }

    return convertToWords(num);
}

// Input 
const inputField = document.getElementById("numberInput");
const outputField = document.getElementById("output");

inputField.addEventListener("input", () => {
    const num = parseInt(inputField.value);
    outputField.textContent = numberToWords(num);
});


/*inputField.addEventListener("input", function() { 
    const num = parseInt(inputField.value);
    outputField.textContent = numberToWords(num);
});
*/