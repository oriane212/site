var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var nodemailer = require('nodemailer');

var imgDict = {};

var allProjects = fs.readdirSync('./projects')
//console.log(allProjects);

//foreach file name in /projects, call fs.statSync and check if isDirectory is true - if it's true, then pass it out.

var filteredProjects = allProjects.filter(function(currentFile){
    return fs.statSync('./projects/' + currentFile).isDirectory();
    });

var projects = filteredProjects.map(function(currentFolderName){
    
    var currentProjectFiles = fs.readdirSync('./projects/' + currentFolderName);
    //console.log(currentProjectFiles);

    //var projectTitle = null;  
    //var projectDescription = null;
    var projectHTML = null;
    var imageData = null;

    /*
    if (fs.existsSync('./projects/' + currentFolderName + '/title')) {
        projectTitle = fs.readFileSync('./projects/' + currentFolderName + '/title', 'utf8');
        //console.log(projectTitle);
    }

    if (fs.existsSync('./projects/' + currentFolderName + '/description')) {
        projectDescription = fs.readFileSync('./projects/' + currentFolderName + '/description', 'utf8');
        //console.log(projectDescription);
    }
    */


    if (fs.existsSync('./projects/' + currentFolderName + '/project.html')) {
        projectHTML = fs.readFileSync('./projects/' + currentFolderName + '/project.html', 'utf8');
    }

    if (fs.existsSync('./projects/' + currentFolderName + '/imageData')) {
        var imageFiles = fs.readdirSync('./projects/' + currentFolderName + '/imageData');

       projectImgData = imageFiles.map((currentImgFile) => {
            var currentPath = '/projects/' + currentFolderName + '/imageData/' + currentImgFile;
            var currentImg = fs.readFileSync("."+currentPath);
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

//console.log(projects);

var server = http.createServer(function(req, res) {

        console.log(req.url);

    if (imgDict[req.url] != null){
        res.write(imgDict[req.url]);
    }
    else if (req.url == "/profilepic1.jpg") {
        res.write(fs.readFileSync('./profilepic1.jpg'));
    }
    else if (req.url == "/projects") {
        res.write(JSON.stringify(projects));
    }
    else if (req.url == "/"){
        res.write(fs.readFileSync('./index.html','utf-8'));
    }
    else if (req.url == "/client.js"){
        res.write(fs.readFileSync('./client.js','utf-8'));
    }
    else if (req.url == "/styles.css"){
        res.write(fs.readFileSync('./styles.css','utf-8'));
    }
    else if (req.url == "/node_modules/@material/button/dist/mdc.button.css"){
        res.write(fs.readFileSync('./node_modules/@material/button/dist/mdc.button.css','utf-8'));
    }
    else if (req.url == "/submit"){
        let body = [];
        let stringbody = '';
        req.on('data', function(chunk){
            body.push(chunk);
        });
        req.on('end', function(){
            stringbody = Buffer.concat(body).toString();
            console.log(stringbody);
            let jsonBody = qs.parse(stringbody);
            console.log(jsonBody);
            //create email
            var email = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: 'New contact form message',
                text: JSON.stringify(jsonBody)
              };            
            //send email using dataFromClient...
            transporter.sendMail(email, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        });
        
    }

    res.end();
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS
    }
  });


server.listen(process.env.PORT || 3000);
