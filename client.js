$(document).ready(function () {
    $('.projectTitle').hover(function () {
        $(this).addClass('active');
    }, function () {
        $(this).removeClass('active');
    }
    );

});

window.onload = () => {

    var testProject =
        {
            title: 'THE TITLE OF PROJECT 1',
            description: 'THE DESCRIPTION OF PROJECT 1',
            textData:
            ['aksjhfjkahgljaghk;ajehglaehgkjaehgjkhajkghAJKghjakghjahgjahkjghakj',
                'uiaehtiu23y5823748327489237\n8497923749832749273894738924782937\n4892374982748394789327498237498237498',
                'ASKJFHAKSJFHSKJSAJKFHAJKSHFKJASHFK\nAKSJDHASKJHDJHASKJDHSAJKHDSAJDHSAJK\nASJDHKASHDKJHASKJDHKAJSHKDHAHSKJDKHSAJD'
            ]
        };

    /**
     * returns an HTML element at the root of the
     * projectElement
     */
    function ProjectElementFromObject(projectObject) {
        var responsive = $('<div></div>').addClass('responsive');

        var a_project = $("<div></div>").addClass('a_project');

        var coverImagePath = '/projects/' + projectObject.currentFolderName + '/imageData/cover.png';
        
        var image = $("<div></div>").append('<img src="'+coverImagePath+'">');

        var title_description = $('<div></div>').addClass('title_description');

        var projectTitle = $('<div></div>').addClass('projectTitle').text(projectObject.title);

        var projectDescription = $('<div></div>').addClass('projectDescription').text(projectObject.description);

        var textData = $('<div></div>').addClass('paragraph').text(projectObject.textData);
        /*
        var textDataMapped = textData.map(){
            var textPiece = $('<div></div>');
            if textData[i] begins with a capital and ends with '/n'{
                var textPiece.addClass('sectionTitle'); 
            }
            else if textData[i] is all caps{
                var textPiece.addClass('sectionSubtitle'); 
            }
            else if textData[i] begins with '[' and ends with ']'{
                var textPiece.addClass('caption'); 
            }
            else{
                var textPiece.addClass('paragraph');
            }
            textPiece.text(textData[i]);
            textData.append(textPiece);
        }
        */

        //jQuery.HTML(projectObject.projectPage) 

        responsive.append(a_project);
        a_project.append(title_description, image);
        title_description.append(projectTitle, projectDescription);

        return responsive;


    }

    /*
    function ProjectPageElements(projectObject.projectPage) {
        var $p = $("p").html("testing! testing!");
        return $p;
    }*/
    


    $.get("/projects", function (data, status) {
        alert("Data: " + data + "\nStatus: " + status);
        var dataFromServer = JSON.parse(data);


        var htmlElements = dataFromServer.map((currentItem) => {
            return ProjectElementFromObject(currentItem);
        });

        htmlElements.forEach((element) => {
            $('body').append(element);
        })
    });

    /*$.get("/projects/project_1/SampleProjectPage", function (data, status) {
        alert("Data: " + data + "\nStatus: " + status);
        var dataFromServer = JSON.parse(data);


        var htmlElements = dataFromServer.map((currentItem) => {
            return ProjectPageElements(currentItem);
        });

        htmlElements.forEach((element) => {
            $('body').append(element);
        })
    });*/
    


};