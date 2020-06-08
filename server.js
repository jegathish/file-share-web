const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const os = require('os')
const fs = require('fs')

const app = express()
app.set('view-engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

// finding ip
var ifaces = os.networkInterfaces()
var ipValue 
for(var i in ifaces) {
    var temp = i.replace(/[^a-z]/ig,'').toLowerCase()
    if(temp == 'wifi') {
        for(var j in ifaces[i]) {
            if(ifaces[i][j].family == 'IPv4') {
                ipValue = ifaces[i][j].address
            }
        }
    }
}
// download route
app.post("/download", (req, res) => {
    var path = req.body.path + req.body.fileName
    res.download(path)
})

// home route
app.get("/", (req, res) => {
    res.render("home.ejs", {ip: ipValue})
})

// file directory load route handling
app.post("/", (req, res) => {
    if (req.body.path == '/'){
        res.redirect("/")
      } else {
        fs.readdir(req.body.path, (err, data) => {
            if(data) {
                var dir=[]
                var file=[]
                data.forEach(val => {
                  var loc = req.body.path + val
                  
                  try{
                    var stats = fs.statSync(loc);
                    if(stats.isFile()) {
                      file.push(val)
                    } else {
                      dir.push(val)
                    }
                  } catch(e){
                  } 
                })      
                res.render('view.ejs',{curr: req.body.path, file: file, dir: dir})
            } else {
                res.render('view.ejs', {curr: req.body.path, file: [], dir: []})
            }
        })
    }
})

//server 
if(ipValue) {
    app.listen(5500, (err) => {
        if(err){
            console.log(err)
        } else {
            console.log("server started running successfully!")
            console.log(`you can access with\n http://${ipValue}:5500`)
        }
    })
} else {
    console.log("server failed to start running!")
    console.log("Ensure thet your system is connected with WiFi network..")
}

