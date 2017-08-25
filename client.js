
var all_DOMlayouts = [];

function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
};

var background_col = '#eceff1';

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

        //this.coverImage = $("<div></div>").addClass('featured_img').append('<img src="'+this.coverImagePath+'">');

        this.coverImage = $("<div></div>").addClass('featured_img').css({ 'background-image': 'url("' + this.coverImagePath + '")' });
        this.coverImage.addClass('col-xs-12 col-sm-8');
        
        //this.navItems = $('<ul></ul>').addClass('navbar-nav mr-auto mt-2 mt-md-0').attr('id','projectNavItems');

        //this.brand = $('<a></a>').addClass("navbar-brand").append(this.projectTitleText);

        /*
        //for each img in imageData, create a list and link item
        this.h2_sections = [];
        var that = this;
        this.projectHTML.children('h2').each(function(){
            that.h2_sections.push($(this).text().replace(/ /g,"_"));
            $(this).attr('id',$(this).text().replace(/ /g,"_"));
        });
        console.log(this.h2_sections);
        for (header in this.h2_sections){
            console.log('/projects/' + projectObject.currentFolderName + '/imageData/' + this.h2_sections[header] + '.png');
            listItem = $('<li></li>').addClass('nav-item');
            linkItem = $('<a></a>').addClass('nav-link').attr('href', '#' + this.h2_sections[header]);
            linkItem.attr('id',this.h2_sections[header]+'_link');
            linkItem.append(this.h2_sections[header]);
            listItem.append(linkItem);
            this.navItems.append(listItem);
        }
        */

        //this.nav = ('<nav></nav>').addClass('navbar fixed-bottom navbar-light bg-faded')

                //item1 = this.projectHTML.children('h3:first').text();
                //this.projectHTML.children('h3:first').attr('id', item1);
                //list_item1 = $('<li></li>').addClass('nav-item');
                //link_item1 = $('<a></a>').addClass('nav-link').attr('href', '#' + item1 + '');
                //link_item1.attr('id', item1 + '_item');
                //link_item1.append(item1);
                //list_item1.append(link_item1);
                //$('#projectNavLinks').append(list_item1);



        this.dataFromServer = projectObject;

        //make sure it brings you back to the top of the page to view the expanded project
        //how to fix grey background gap above the expanded project
        //fix 'More Projects' 
        //expanded project isn't centered
        //collapse project if anything else is clicked and re-sort
        clickHandler = function (event) {
            //console.log(this);

            $('#project_container').empty();
            $('#project_container').hide();
            $('#about').fadeOut('slow');

            $('#project_covers').fadeOut('slow', function () {

                $('#project_html').css({'margin':'40px'});

                $('#project_container').append(this.projectHTML); 
                window.scrollTo(0, 0);
                $('#project_container').fadeIn('slow');


                //$('#project_col').empty();
                //$('#projectNav').empty();

                //$('#projectNav').append(this.brand);
                //$('#projectNav').append(this.navItems);
                //$('#project_container').css({ 'background': 'url(" ' + this.coverImagePath + ' ") no-repeat fixed left', 'background-size': '50% auto' });
                //$('#project_col').append(this.projectHTML);
                
                //$('#project_container').attr('data-spy','scroll');
                //$('#project_container').attr('data-target','#projectNav');
                //$('body').scrollspy({ target: '#projectNav' });
                
                //$('#project_html').scrollspy('refresh');

                //$('#project_html').empty(); 
                //instead I can just empty the project-col div and the project nav


                //this.projectHTML_inner = $('<div></div>').css({ 'background': 'url(" ' + this.coverImagePath + ' ") no-repeat fixed left', 'background-size': '50% auto' });

                //this.projectHTML_inner.attr('id','inner');
                
                //$('#project_html').css({ 'background': 'url(" ' + this.coverImagePath + ' ") no-repeat fixed left', 'background-size': '50% auto' });


                //var myimg = this.projectHTML.children('img:first').val();
                //newCover = $("<div></div>").addClass('featured_img').append('<img src="'+this.coverImagePath+'">');
                //imgDiv = $("<div></div>").addClass('col-sm-6').css( { 'background-image':'url(" '+myimg+' ")' } );
                //imgDiv = $("<div></div>").addClass('col-sm-6').attr('id', 'imgDiv');
                //imgDiv.append(newCover);

                //new: this.projectHTML.addClass('col-sm-6').attr('id', 'project-col');



                //new: rowDiv = $("<div></div>").addClass('row').attr('id', 'rowDiv').append(imgDiv, this.projectHTML);

                //new: this.projectHTML_inner.append(rowDiv);

                //new: $('#project_html').append(this.projectHTML_inner);



            
                }.bind(this));

                //$('#project_html').scrollspy('refresh');
                
                //$('#project_html').attr('data-offset','30');



/*
                $(window).scroll(function () {
                    console.log("hey it works!!!");
                    
                    
                    this.h2_sections.forEach(function(header){
                        if (isScrolledIntoView($('#'+header).get(0))){
                            $('#'+header+'_link').addClass('active');
                        }
                        else {
                            $('#'+header+'_link').removeClass('active');
                        }
                    })
                    
                    
                    
                    if ($('#Sprint1_link').attr('class') == 'nav-link active') {
                        console.log('hey it works');
                        $('#project_container').css({ 'background': 'url("/projects/LanguageLearning/imageData/diverge_1.png") no-repeat fixed left', 'background-size': '50% auto' });

                        //$('#project_html').attr('background','url("ScreenShot2.png") no-repeat fixed left');
                    }
                    else {
                        console.log($('#Sprint1_link').attr('class'));
                        $('#project_container').css({ 'background': 'url(" ' + this.coverImagePath + ' ") no-repeat fixed left', 'background-size': '50% auto' });
                        }

                
                //$('#project_html').scrollspy('refresh');


            }.bind(this))
*/


            //this.projectHTML.scroll(function(){
            //$("#imgDiv").addClass('responsive');
            //});



            /*
            
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
                                
                                //this.projectHTML.fadeIn('slow',function(){
                                  //  $('#project_covers').fadeIn('slow');
                                //});
                                //$('#project_covers').fadeIn('slow');
                                $('#more_projects').show();
                                $('#project_covers').fadeIn();
                                $('.featured_section').show();
                                this.featured_section.hide();
                                //also need to anchor page back to top!!
                                window.scrollTo(0, 0);
            
                        }.bind(this))
            */


        };


        this.DOMlayout = function () {

            

            //new container for project
            this.featured_section = $('<div></div>').addClass('featured_section').attr('id', this.projectTitleText);

            if (background_col =='#eceff1'){
                this.featured_section.css({'background-color':background_col});
                background_col = '#FFFFFF';
            }
            else {
                this.featured_section.css({'background-color':background_col});
                background_col = '#eceff1';
            }

            //this.a_project = $("<div></div>").addClass('a_project');
            //this.title_description = $('<div></div>').addClass('title_description');
            //this.htmlsection = $('<section></section>').addClass('projectHTML');
            //this.coversection = $('<section></section>').addClass('cover');
            this.row = $('<div></div>').addClass('row');
            this.coverText = $('<div></div>').addClass('featured_text col-xs-12 col-sm-4').append(this.projectTitle, this.projectDescription);
            /*
            //append all divs
            this.project_container.append(this.coversection, this.htmlsection);
            this.coversection.append(this.a_project);
            this.a_project.append(this.title_description, this.coverImage);
            this.title_description.append(this.projectTitle, this.projectDescription);
            //this.htmlsection.append(this.projectHTML).hide();
            */

            //this.projectHTML.css({'background': 'url("'+this.coverImagePath+'") no-repeat center fixed', 'background-size': 'contain' });


            this.featured_section.append(this.row);
            this.row.append(this.coverImage, this.coverText);


            //this.addHandlers();
            this.featured_section.click(clickHandler.bind(this));


            $('#project_covers').append(this.featured_section);
            //$('#project_html').append(this.projectHTML).hide();
            //console.log('projectText: ' + this.projectDescriptionText);


            //SCROLLSPY NAV FOR PROJECT HTML
            //take each h2 and put it into a nav, which could be hidden later.

            //then add scrollspy to the nav and the projectHTML
            //when that's working, add a function that does something when scrollspy activates a given item
            //when that's working, then figure out how it will show and hide images properly

        }

        this.getRoot = function () {
            return this.featured_section;
        }

        this.DOMlayout();
    }






    $.get("/projects", function (data, status) {

        var dataFromServer = JSON.parse(data);

        var allProjects = dataFromServer.map(function (currentProjectObject) {
            all_DOMlayouts.push(new ProjectElementFromObject(currentProjectObject));
        });

        $('body').scrollTop(10);

        //$('.featured_section').click(function(){

        //background_css = $('#projectNav').attr('class');
        //if (background_css == 'nav-link.active'){

        //});

        //}

        $('#projects').click(function () {
            $('div .featured_section').removeAttr("style");
            $('#project_html').fadeOut("fast");
            $('#project_html').css({'margin':'none'});
            $('#project_covers').fadeOut('fast');

            //$('.featured_section').show();

            $('#more_projects').fadeOut('fast', function () {
                $('body').scrollTop(0);
                $('#project_covers').fadeIn('fast');

            });

            //var section1 = $('.visible').siblings();
            //console.log(section1);
            //section1.fadeIn("slow");

            //window.scrollTo(0, 0);
            $('#project_html').empty();

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
