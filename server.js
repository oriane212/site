var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var nodemailer = require('nodemailer');

var imgDict = {};

var allProjects = fs.readdirSync('./projects')

//foreach file name in /projects, call fs.statSync and check if isDirectory is true - if it's true, then pass it out.

var filteredProjects = allProjects.filter(function (currentFile) {
    return fs.statSync('./projects/' + currentFile).isDirectory();
});

var projects = filteredProjects.map(function (currentFolderName) {

    var currentProjectFiles = fs.readdirSync('./projects/' + currentFolderName);
    var projectHTML = null;
    var imageData = null;


    if (fs.existsSync('./projects/' + currentFolderName + '/project.html')) {
        projectHTML = fs.readFileSync('./projects/' + currentFolderName + '/project.html', 'utf8');
    }

    if (fs.existsSync('./projects/' + currentFolderName + '/imageData')) {
        var imageFiles = fs.readdirSync('./projects/' + currentFolderName + '/imageData');

        projectImgData = imageFiles.map((currentImgFile) => {
            var currentPath = '/projects/' + currentFolderName + '/imageData/' + currentImgFile;
            var currentImg = fs.readFileSync("." + currentPath);
            imgDict[currentPath] = currentImg;
            //console.log("our dict",imgDict);
            return currentPath;
        });
    }

    return {
        currentFolderName: currentFolderName,
        //title: projectTitle,
        //description: projectDescription,    
        projectHTML: projectHTML,
        imageData: projectImgData
    };

});


var server = http.createServer(function (req, res) {

    console.log(req.url);

    var body = [];
    var stringbody = '';
    req.on('data', function (chunk) {
        body.push(chunk);
        console.log(chunk);
    });
    req.on('error', function (error) {
        console.error('Error ' + error);
    });

    if (imgDict[req.url] != null) {
        res.write(imgDict[req.url]);
        res.end();
    }
    else if (req.url == "/profilepic1.jpg") {
        res.write(fs.readFileSync('./profilepic1.jpg'));
        res.end();
    }
    else if (req.url == "/projects") {
        res.write(JSON.stringify(projects));
        res.end();
    }
    else if (req.url == "/") {
        res.write(fs.readFileSync('./index.html', 'utf-8'));
        res.end();
    }
    else if (req.url == "/client.js") {
        res.write(fs.readFileSync('./client.js', 'utf-8'));
        res.end();
    }
    else if (req.url == "/styles.css") {
        res.write(fs.readFileSync('./styles.css', 'utf-8'));
        res.end();
    }
    else if (req.url == "/node_modules/@material/button/dist/mdc.button.css") {
        res.write(fs.readFileSync('./node_modules/@material/button/dist/mdc.button.css', 'utf-8'));
        res.end();
    }
    else if (req.url == "/submit") {

        console.log("w are in the submit handler");

        req.on('end', function () {
            stringbody = Buffer.concat(body).toString();
            console.log(stringbody);
            var jsonBody = qs.parse(stringbody);
            console.log(jsonBody);
            //create email
            var email = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: 'New contact form message',
                text: JSON.stringify(jsonBody)
            };
            //send email using dataFromClient...
            transporter.sendMail(email, function (error, info) {
                if (error) {
                    console.log(error);
                    res.end();
                } else {
                    console.log('Email sent: ' + info.response);
                    res.end();
                }
            });
        });

    }

   
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    }
});

console.log("listening");
server.listen(process.env.PORT || 3000);
