var saveRecord = function () {
    var x, text;
    x = document.getElementById("username").value;
    // If x is Not a Number or less than one or greater than 10
    if (x.length > 5) {
        text = "Invalid";
    } else {
        text = x;
    }

    var score = document.getElementById("score").innerText;
    document.getElementById("showname").innerHTML = text + ": " + score;
    save(text, ": " + score)
}

var save = function (filename, data) {
    var blob = new Blob([filename + "   " + data], {type: 'text/json'});
    e = document.createEvent('MouseEvents');
    a = document.createElement('a');
    a.download = filename + ".txt";
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0,
        0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}