// select dir function
function loadFile() {
    var path = document.getElementById("dir").value
    var url = "http://" + document.getElementById("ip").getAttribute("ip") + ":5500"
    loadFileAjax(url, path)
}

// Enter dir function
function loadFile1() {
    var path = document.getElementById("dir1").value + ":/"
    var url = "http://" + document.getElementById("ip").getAttribute("ip") +":5500"
    loadFileAjax(url, path)
}

// Ajax req function
function loadFileAjax(url, path) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == 200) {
            document.getElementById("main").innerHTML = this.response;
        }
    }
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "path=" + path 
    xhr.send(data)
}