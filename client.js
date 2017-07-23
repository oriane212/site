
var all_DOMlayouts = [];
window.onload = function() {

      
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

        //this.coverImage = $("<div></div>").addClass('featured_img').append('<img src="'+this.coverImagePath+'">');

        this.coverImage = $("<div></div>").addClass('featured_img').css({'background-image': 'url("'+this.coverImagePath+'")'});
            this.coverImage.addClass('col-xs-12 col-sm-8');
    
        this.dataFromServer = projectObject;

        //make sure it brings you back to the top of the page to view the expanded project
        //how to fix grey background gap above the expanded project
        //fix 'More Projects' 
        //expanded project isn't centered
        //collapse project if anything else is clicked and re-sort
        clickHandler = function(event){
            //console.log(this);
            
            $('#project_covers').fadeOut('slow', function(){
                    //$('.visible').empty();

                    //$('section .projectHTML :visible').
                    //$('#').prepend(this.project_container);
                    //more = $('<div class="w3-container w3-center" id="more_projects"><h4><b>More Projects</b></h4></div>');
                    //this.project_container.append(more);
                    //need to take this More Projects away, maybe show/hide
                    //this.htmlsection.fadeIn('slow');
                    //this.htmlsection.addClass('visible');
                    
                    $('#project_html').empty();
                    $('#project_html').append(this.projectHTML);
                    $('#project_html').show();
                    /*this.projectHTML.fadeIn('slow',function(){
                        $('#project_covers').fadeIn('slow');
                    });*/
                    //$('#project_covers').fadeIn('slow');
                    $('#more_projects').show();
                    $('#project_covers').fadeIn();
                    $('.featured_section').show();
                    this.featured_section.hide();
                    //also need to anchor page back to top!!

            }.bind(this))
        };
        
        /*
        clickHandler = function(event){
            //console.log(this);
            $('section .cover').fadeOut('fast', function(){
                //console.log(this);
                $('.a_project').addClass('hide');
                this.htmlsection.fadeIn('slow');
            }.bind(this))
        };
        */
        

        this.DOMlayout =  function() {
            
            //new container for project
            this.featured_section = $('<div></div>').addClass('featured_section').attr('id', this.projectTitleText);
            //this.a_project = $("<div></div>").addClass('a_project');
            //this.title_description = $('<div></div>').addClass('title_description');
            //this.htmlsection = $('<section></section>').addClass('projectHTML');
            //this.coversection = $('<section></section>').addClass('cover');
            this.row = $('<div></div>').addClass('row');
            this.coverText = $('<div></div>').addClass('featured_text col-xs-12 col-sm-4').append(this.projectTitle,this.projectDescription);
            /*
            //append all divs
            this.project_container.append(this.coversection, this.htmlsection);
            this.coversection.append(this.a_project);
            this.a_project.append(this.title_description, this.coverImage);
            this.title_description.append(this.projectTitle, this.projectDescription);
            //this.htmlsection.append(this.projectHTML).hide();
            */

            this.featured_section.append(this.row);
            this.row.append(this.coverImage,this.coverText);


            //this.addHandlers();
            this.featured_section.click(clickHandler.bind(this));
            

            $('#project_covers').append(this.featured_section);
            //$('#project_html').append(this.projectHTML).hide();
            //console.log('projectText: ' + this.projectDescriptionText);
        }

        this.getRoot = function() {
            return this.featured_section;
        }

        this.DOMlayout();
    }


    $.get("/projects", function (data, status){
        
        var dataFromServer = JSON.parse(data); 

        var allProjects = dataFromServer.map(function(currentProjectObject) {
            all_DOMlayouts.push(new ProjectElementFromObject(currentProjectObject));
        });

        //need way to re-sort projects back to original order - maybe with an array?
        $('#projects').click(function(){
            $('#project_html').fadeOut("slow", function(){
                $('#project_html').empty();
                $('.featured_section').show();
                $('#project_covers').fadeIn('slow');
                
                //var section1 = $('.visible').siblings();
                //console.log(section1);
                //section1.fadeIn("slow");
            });
            $('#more_projects').fadeOut('slow');
        });
        
        /*
        $('#projects').click(function(){
            $('.projectHTML').fadeOut("fast", function(){
                $('section .cover').fadeIn("slow", function(){
                    $('.a_project').removeClass('hide');
                });
            });
        });
        */

    });

};
