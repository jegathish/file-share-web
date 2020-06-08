// looking into directory handling
function getFile(e) {
    var path = document.getElementById("curr").getAttribute("path")  + e.getAttribute("name") + "/"
    var url = "http://" + document.getElementById("ip").getAttribute("ip") + ":5500"
    getFileAjax(path, url)
}

// back button handling
function goBack() {
    var path = document.getElementById("curr").getAttribute('path').split("/")
    if(path.length>2) {
        path.pop()
        path.pop()
        path = path.join("/") + "/"
    } else {
        path = "/"
    }
    var url = "http://" + document.getElementById("ip").getAttribute("ip") + ":5500"
    getFileAjax(path, url)
}

// Ajax request functions

function getFileAjax(path, url) {
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
