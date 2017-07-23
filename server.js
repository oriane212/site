var http = require('http');
var fs = require('fs');

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
    res.end();
});

server.listen(3000);