var http = require('http');
var fs = require('fs');


var allProjects = fs.readdirSync('./projects')
console.log(allProjects);

var projects = allProjects.map((currentFolderName) => {

    var currentProjectFiles = fs.readdirSync('./projects/' + currentFolderName);
    console.log(currentProjectFiles);

    var projectTitle = null;
    var projectDescription = null;
    var projectTextData = null;


    if (fs.existsSync('./projects/' + currentFolderName + '/title')) {
        projectTitle = fs.readFileSync('./projects/' + currentFolderName + '/title', 'utf8');
        console.log(projectTitle);
    }

    if (fs.existsSync('./projects/' + currentFolderName + '/description')) {
        projectDescription = fs.readFileSync('./projects/' + currentFolderName + '/description', 'utf8');
        console.log(projectDescription);
    }

    if (fs.existsSync('./projects/' + currentFolderName + '/textData')) {
        var textFiles = fs.readdirSync('./projects/' + currentFolderName + '/textData');
        console.log(textFiles);

       projectTextData = textFiles.map((currentTextFile) => {
            var currentText = fs.readFileSync('./projects/' + currentFolderName + '/textData/' + currentTextFile, 'utf8');
            console.log(currentText);
            return currentText;
        });
    }

    return {
        title: projectTitle,
        description: projectDescription,
        textData: projectTextData
      };

});

console.log(projects);

var server = http.createServer((req, res) => {

    if (req.url == "/projects") {
        res.write(JSON.stringify(projects));
    }
    else {
        res.write("Try asking for '/projects'!!!!!!")
    }
    res.end();
});

server.listen(3000);