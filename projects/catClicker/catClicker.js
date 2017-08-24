// Cat Clicker Premium
// developed using a Model-View-Octopus structure 

//dictionary of cat pics by cat name
var cats = {
                'Tux and Saturn' : 'Tux&Sat.jpg',
                'Chao Yun' : 'ChaoYun.jpg',
                'Harry' : 'Harry.jpg',
                'Baxter' : 'Baxter.jpg',
                'Lady' : 'Lady.jpg',
                'Snow Ball' : 'Snowball.jpg'
            };

$(function(){
    // MODEL
    var model = {
        //initialize an object for storing cat objects
        catObjs: {},
        //cat constructor
        Cat: function Cat(name) {
            this.name = name;
            this.url = cats[name];
            this.click_count = 0;
        },
        init: function(){
            //create new cat object for each cat in the dictionary
            for (cat in cats){
                var ID = cat.replace(/ /g,"_");
                this.catObjs[ID] = new this.Cat(cat);
            }
        },
        //gets the latest version of data for all cat objects 
        all_catData: function(){
            return this.catObjs; 
        },
        //gets object data for a cat by ID
        catData: function(ID){
            var all_cats = model.all_catData();
            return all_cats[ID];
        },
        //updates click_count property for a cat
        clicks: function(ID){
            var cat_data = model.catData(ID);
            var clicks = cat_data.click_count;
            clicks += 1;
            cat_data.click_count = clicks;
            return clicks;
        }
    };

    // OCTOPUS: messenger between the model and the views
    var octopus = {
        //triggers initialize functions for the model and the views
        init: function(){
            model.init();
            listview.init();
            catview.init();
        },
        //triggers getting object data for a cat object in the model by ID
        get_catData: function(ID){
            return model.catData(ID);
        },
        //triggers getting the latest version of data for all cat objects in the model
        get_all_catData: function(){
            return model.all_catData();
        },
        //triggers update to click_count property for cat in the model
        updateClicks: function(ID){
            return model.clicks(ID);
        }
    };

    //VIEW 1: navigation
    var listview = {
        init: function(){
            //get all cat objects from the model (via octopus)
            var all_cat_data = octopus.get_all_catData();
            //list each cat in the DOM
            for (cat_by_ID in all_cat_data){
                var name = all_cat_data[cat_by_ID].name;
                var listItem = $('<li></li>').attr('id',cat_by_ID).html(name);
                $('.nav').append(listItem);
            }
            //when list item is clicked, update the list and trigger an update to cat display
            $('li').click(function(){
                $('li').removeClass('active');
                $(this).addClass('active');
                var listID = $(this).attr('id');
                catview.render(listID);
            })
        }
    };

    //VIEW 2: cat display
    var catview = {
        init: function(){
            var liFirst = $('li:first');
            var firstItem_ID = liFirst.attr('id');
            catview.render(firstItem_ID);
        },
        render: function(ID){
            //convert HTML ID string to cat ID string
            var catID = ID.replace(/#/g,"");
            //get cat object from the model (via octopus)
            var cat_data = octopus.get_catData(catID);
            //extract and store cat obj data
            var name = cat_data.name;
            var url = cat_data.url;
            var click_count = cat_data.click_count;
            //elements containing cat data
            var catName = $('<p></p>').html(name).addClass('catName');
            var img = $('<img>').attr('src',url);
            var clicks = $('<p></p>').html(click_count).addClass('clicks');
            //containers for elements
            var clickUnit = $('<p></p>').addClass('clickUnit').html("clicks");
            var counter = $('<div></div>').addClass('counter').append(clicks,clickUnit);
            var catStats = $('<div></div>').addClass('catStats').append(catName,counter);
            var catDisplay = $('<div></div>').addClass('catDisplay').append(img, catStats);
            //update cat display
            $('#catClicker').fadeOut('fast',function(){
                $('#catClicker').empty();
                $('#catClicker').append(catDisplay);
                $('#catClicker').fadeIn('fast');
            })
            //update counter when cat image is clicked
            img.click(function(){
                //update click count for cat object in the model (via octopus)
                var click_count_updated = octopus.updateClicks(ID);
                //update counter element in the DOM
                clicks.html(click_count_updated);
                if (click_count_updated == 1){
                        clickUnit.html('click');
                    }
                    else {
                        clickUnit.html('clicks');
                    }
            })
        }

    };

octopus.init();

});