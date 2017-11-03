
var all_DOMlayouts = [];
var background_col = '#FFFFFF';
var delayTime = 1000;
var featureID = '';
var pHTML_ID = 0;

window.onload = function () {

    $('#contactForm').on('submit', function (evt) {
        evt.preventDefault();
        var name = $('#contactName').val();
        var email = $('#contactEmail').val();
        var message = $('#contactMessage').val();
        //send POST request
        $.post("submit",
            { name: name, email: email, message: message }
        )
            .done(() => { $('#message_sent').modal();$('input').val('');$('textarea').val(''); })
            .fail(() => { $('#message_error').modal() });
         
    })



    function ProjectElementFromObject(projectObject) {
        // properties storing jQuery objects for title, description, cover image and html from project object
        
        this.projectHTML = $('<div></div>').html(projectObject.projectHTML).css({ 'margin': '40px', 'height': '100%' });

        // gets h1 title from projectHTML
        this.projectTitleText = this.projectHTML.children('h1').text();

        // puts that title text into a project title div
        this.projectTitle = $('<div></div>').addClass('projectTitle').text(this.projectTitleText);

        this.f_ID = this.projectTitleText.replace(/ /g, "_");

        this.pHTML_ID = pHTML_ID;

        // gets description from projectHTML 
        this.projectDescriptionText = this.projectHTML.children('p:first').text();


        // puts that description text into a project description div
        this.projectDescription = $('<div></div>').addClass('projectDescription').text(this.projectDescriptionText);

        this.coverImagePath = '/projects/' + projectObject.currentFolderName + '/imageData/cover.png';

        this.coverImage = $("<div></div>").addClass('featured_img').css({ 'background-image': 'url("' + this.coverImagePath + '")' });
        this.coverImage.addClass('col-xs-12 col-sm-8');

        this.dataFromServer = projectObject;


        clickHandler = function (event) {
            if (featureID.length != 0) {
                $('#' + featureID).delay(1000).fadeIn('slow');
            }

            $('.project_container').fadeOut('slow');

            this.featured_section.fadeOut('slow', function () {
                this.projectContainer.fadeIn('slow');
                featureID = this.featured_section.attr('id');
               
                $('#' + this.pHTML_ID).fadeIn('slow');
                
                window.scrollTo(0, 700);

            }.bind(this));

        };


        this.DOMlayout = function () {

            //new container for project
            this.featured_section = $('<div></div>').addClass('featured_section').attr('id', this.f_ID);

            if (background_col == '#FFFFFF') {
                this.featured_section.css({ 'background-color': background_col });
                background_col = '#FFFFFF';
            }

            else {
                this.featured_section.css({ 'background-color': background_col });
                background_col = '#FFFFFF';
            }


            this.row = $('<div></div>').addClass('row');
            this.coverText = $('<div></div>').addClass('featured_text col-xs-12 col-sm-4').append(this.projectTitle, this.projectDescription);

            this.featured_section.append(this.row);
            this.row.append(this.coverImage, this.coverText);

            this.featured_section.click(clickHandler.bind(this));

            this.featured_section.hide();

            $('#project_covers').append(this.featured_section);
            
            this.projectContainer = $('<div></div>').addClass('project_container').append(this.projectHTML).attr('id', this.pHTML_ID);
            $('#project_html').append(this.projectContainer);

            this.featured_section.delay(delayTime).fadeIn('slow');
            //delayTime += 500;

            pHTML_ID += 1;
        }

        this.getRoot = function () {
            return this.featured_section;
        }

        this.DOMlayout();
    }


    $('#about').hide();
    $('#methods').hide();
    $('#tools').hide();
    $('#project_covers').hide();
    $('#contact').hide();
    


    $.get("/projects", function (data, status) {

        var dataFromServer = JSON.parse(data);

        var allProjects = dataFromServer.map(function (currentProjectObject) {
            all_DOMlayouts.push(new ProjectElementFromObject(currentProjectObject));
        });

        $('.project_container').hide();
        $('body').scrollTop(10);
        $('#about').fadeIn('slow');
        $('#methods').delay(500).fadeIn('slow');
        $('#tools').delay(500).fadeIn('slow');
        $('#project_covers').delay(1000).fadeIn('slow');
        $('#contact').delay(1000).fadeIn('slow');

    });

};
