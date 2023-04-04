$(document).ready(function () {

    function getPointIndex(num) {
        for (i = 0; i < num.length; i++) {
            if (num[i] === '.') {
                return i
            }
        }

        return -1;
    }

    function getLength(num) {
        numLength = 0;
        for (i = 0; i < num.length; i++) {
            if (num[i] >= '0' && num[i] <= '9') {
                numLength++;
            }
        }

        return numLength;
    }

    function extend(num, desiredLength) {
        var toAdd = desiredLength - getLength(num);
        var zeros = ""
        for (i = 0; i < toAdd; i++) {
            zeros = zeros.concat('0')
        }

        return zeros + num;
    }

    function standardizePoint(num) {
        num = num.slice(0, 1) + '.' +
            num.slice(1, getPointIndex(num)) +
            num.slice(getPointIndex(num) + 1, num.length);

        return num;
    }

    function getBinary(num) {
        var temp = parseInt(num);
        var result = ""
        while (temp != 0) {
            if (temp % 2 == 0) {
                result = result.concat('0');
            }
            else {
                result = result.concat('1');
            }

            temp = Math.floor(temp / 2);
        }

        result = result.split("");
        result = result.reverse();
        result = result.join("");

        return result;
    }

    // TODO 
    function toBCD(num) {
        var digit0 = extend(getBinary(num[0]), 4);
        var digit1 = extend(getBinary(num[1]), 4);
        var digit2 = extend(getBinary(num[2]), 4);

        var a = digit0[0];
        var e = digit1[0];
        var i = digit2[0];

        var aei = a + e + i;

        var bcd = 0000000000;

        if (aei === '000') {
            bcd = digit0.slice(1, digit0.length) +
                digit1.slice(1, digit1.length) +
                '0' +
                digit2.slice(1, digit2.length);
        }
        else if (aei === '001') {
            bcd = digit0.slice(1, digit0.length) +
                digit1.slice(1, digit1.length) +
                '100' + digit2[3];
        }
        else if (aei === '010') {
            bcd = digit0.slice(1, digit0.length) +
                digit2.slice(1, 3) + digit1[3] +
                '101' + digit2[3];
        }
        else if (aei === '011') {
            bcd = digit0.slice(1, digit0.length) +
                '10' + digit1[3] +
                '111' + digit2[3];
        }
        else if (aei === '100') {
            bcd = digit2.slice(1, 3) + digit0[3] +
                digit1.slice(1, digit1.length) +
                '110' + digit2[3];

        }
        else if (aei === '101') {
            bcd = digit1.slice(1, 3) + digit0[3] +
                '01' + digit1[3] +
                '111' + digit2[3];
        }
        else if (aei === '110') {
            bcd = digit2.slice(1, 3) + digit0[3] +
                '00' + digit1[3] +
                '111' + digit2[3];
        }
        else if (aei === '111') {
            bcd = '00' + digit0[3] +
                '11' + digit1[3] +
                '111' + digit2[3];
        }

        return bcd;
    }

    $("#submit").click(function () {

        var num = parseFloat($("#num").val())
        var exp = parseInt($("#exponent").val())

        if (!$("#num").val()) {
            num = 0;
            $("#num").val('0');
        }

        if (!$("#exponent").val()) {
            exp = 0;
            $("#exponent").val('0');
        }

        var isPositive = true;

        // perform steps 
        // get sign 
        if (num < 0) {
            isPositive = false;
        }

        num = Math.abs(num);
        num = num.toString();

        var numLength = getLength(num);

        // standardize 
        // extend 0's if needed 
        if (numLength < 7) {
            num = extend(num, 7);
        }

        var pointIndex = getPointIndex(num);
        var digitAfterPoint = 1;

        // move decimal point if needed
        if (pointIndex != -1 && pointIndex >= 1) {
            var numToMove = pointIndex - 1;
            exp = exp + numToMove;
            // move point 
            num = standardizePoint(num); // TODO change to remove point 
            digitAfterPoint = 2;
        }

        // get MSD
        var msd = extend(getBinary(num[0]), 4);

        // get E 
        var ePrime = exp + 101;
        ePrime = extend(getBinary(ePrime.toString()), 8);

        // get BCD 

        var bcd1 = toBCD(num.slice(digitAfterPoint, digitAfterPoint + 3));
        var bcd2 = toBCD(num.slice(digitAfterPoint + 3, num.length));

        if (isPositive) {
            $("#sign").text("0");
        }
        else {
            $("#sign").text("1");
        }

        if (msd[0] === '0') {
            var combinationField = ePrime.slice(0, 2) + msd.slice(1, msd.length);
        }
        else {
            var combinationField = '11' + ePrime.slice(0, 2) + msd[3];
        }

        var exponentContinuation = ePrime.slice(2, ePrime.length);

        $("#combination-field").text(combinationField);
        $("#exponent-continuation").text(exponentContinuation);
        $("#bcd1").text(bcd1);
        $("#bcd2").text(bcd2);
    })

    $("#export").click(function () {
        var inputNum = document.getElementById("num").value;
        var inputExp = document.getElementById("exponent").value;
        var outputSign = document.getElementById("sign").innerHTML;
        var outputComb = document.getElementById("combination-field").innerHTML;
        var outputExp = document.getElementById("exponent-continuation").innerHTML;
        var outputBCD1 = document.getElementById("bcd1").innerHTML;
        var outputBCD2 = document.getElementById("bcd2").innerHTML;
        var outputHex = document.getElementById("hex").innerHTML;

        var data = "";
        data += "IEEE-754 Decimal-32 Floating-Point Converter" + "\n"
        data += "---------------------------------------------------------------------" + "\n";

        data += "Input: " + inputNum + " x10^ " + inputExp + "\n";
        data += "\n";

        data += "Sign: " + outputSign + "\n";
        data += "Combination Field: " + outputComb + "\n";
        data += "Exponent Continuation: " + outputExp + "\n";
        data += "First 10 BCD: " + outputBCD1 + "\n";
        data += "Last 10 BCD: " + outputBCD2 + "\n";
        data += "\n";

        data += "Hexadecimal Equivalent: " + outputHex;

        const link = document.createElement("a");
        const file = new Blob([data], { type: "text/plain" });

        link.href = URL.createObjectURL(file);
        link.download = 'DecimalToText.txt';
        link.click();
        URL.revokeObjectURL(link.href);
    })
})