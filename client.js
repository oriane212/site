
var all_DOMlayouts = [];
var background_col = '#eceff1';
var delayTime = 500;

window.onload = function () {


    function ProjectElementFromObject(projectObject) {
        // properties storing jQuery objects for title, description, cover image and html from project object

        this.projectHTML = $('<div></div>').html(projectObject.projectHTML);

        // gets h1 title from projectHTML
        this.projectTitleText = this.projectHTML.children('h1').text();

        // puts that title text into a project title div
        this.projectTitle = $('<div></div>').addClass('projectTitle').text(this.projectTitleText);

        // gets description from projectHTML 
        this.projectDescriptionText = this.projectHTML.children('p:first').text();

        // puts that description text into a project description div
        this.projectDescription = $('<div></div>').addClass('projectDescription').text(this.projectDescriptionText);

        this.coverImagePath = '/projects/' + projectObject.currentFolderName + '/imageData/cover.png';

        this.coverImage = $("<div></div>").addClass('featured_img').css({ 'background-image': 'url("' + this.coverImagePath + '")' });
        this.coverImage.addClass('col-xs-12 col-sm-8');

        this.dataFromServer = projectObject;
        
        
        clickHandler = function (event) {

            $('#project_container').empty();
            $('#project_container').hide();
            $('#about').fadeOut('fast');

            $('#project_covers').fadeOut('slow', function () {

                $('#project_html').css({ 'margin': '40px', 'height':'100%' });

                $('#project_container').append(this.projectHTML);
                window.scrollTo(0, 0);
                $('#project_container').fadeIn('slow');
                //$('#about').delay(500).fadeIn('slow');


            }.bind(this));

        };


        this.DOMlayout = function () {

            //new container for project
            this.featured_section = $('<div></div>').addClass('featured_section').attr('id', this.projectTitleText);

            if (background_col == '#eceff1') {
                this.featured_section.css({ 'background-color': background_col });
                background_col = '#FFFFFF';
            }
            else {
                this.featured_section.css({ 'background-color': background_col });
                background_col = '#eceff1';
            }


            this.row = $('<div></div>').addClass('row');
            this.coverText = $('<div></div>').addClass('featured_text col-xs-12 col-sm-4').append(this.projectTitle, this.projectDescription);

            this.featured_section.append(this.row);
            this.row.append(this.coverImage, this.coverText);

            this.featured_section.click(clickHandler.bind(this));

            this.featured_section.hide();

            $('#project_covers').append(this.featured_section);

            this.featured_section.delay(delayTime).fadeIn('slow');
            delayTime += 500;

        }

        this.getRoot = function () {
            return this.featured_section;
        }

        this.DOMlayout();
    }


    $('#projects').click(function () {
        $('#project_container').fadeOut('slow');
        $('#project_container').empty();
        $('#project_covers').fadeIn('slow');
        $('#about').fadeOut('fast');
    });

    
    $('#aboutLink').click(function () {
        $('#project_container').fadeOut('fast');
        $('#project_container').empty();
        //$('#project_covers').fadeOut('fast');
        $('#about').fadeIn('slow');
    });
    

    $('#about').hide();
    //$('#project_covers').hide();


    $.get("/projects", function (data, status) {

        var dataFromServer = JSON.parse(data);

        var allProjects = dataFromServer.map(function (currentProjectObject) {
            all_DOMlayouts.push(new ProjectElementFromObject(currentProjectObject));
        });

        /*
        $('#project_covers').fadeIn('slow', function(){
            $('#about').fadeIn('slow');
        });    
        */    

        $('body').scrollTop(10);
        $('#about').delay(2000).fadeIn('slow');
        

    });

};
