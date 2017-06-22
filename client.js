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
        var responsive = $('<div></div>');
        responsive.addClass('responsive');

        var a_project = $("<div></div>");
        a_project.addClass('a_project');

        var title_description = $('<div></div>');
        title_description.addClass('title_description');

        var projectTitle = $('<div></div>');
        projectTitle.addClass('projectTitle');
        projectTitle.text(projectObject.title);

        var projectDescription = $('<div></div>');
        projectDescription.addClass('projectDescription');
        projectDescription.text(projectObject.description);

        responsive.append(a_project);
        a_project.append(title_description);
        title_description.append(projectTitle);
        title_description.append(projectDescription);

        return responsive;


    }

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



};