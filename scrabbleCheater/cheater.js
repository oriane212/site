// Scrabble Cheater Demo

var letters_user = ['d', 'e', 'e', 'q', 'o', 'j', 'e'];
var nextSpaceIDs = [];
var words_C_4 = 'code';

$(function(){

    //MODEL 1
    var boardModel = {
        //dictionary of letters and scores
        letters: {"a": 1, "b": 3, "c": 3, "d": 2, "e": 1, "f": 4, "g": 2, "h": 4, "i": 1, "j": 8, "k": 5, "l": 1, "m": 3, "n": 1, "o": 1, "p": 3, "q": 10, "r": 1, "s": 1, "t": 1, "u": 1, "v": 4, "w": 4, "x": 8, "y": 4, "z": 10},
        //dictionary of cell types for each row 
        rows : {
            A : {
                '3W' : [0,7,14],
                '2L' : [3,11]
            },
            B : {
                '2W' : [1,13],
                '3L' : [5,9]
            },
            C : {
                '2W' : [2,12],
                '2L' : [6,8]
            },
            D : {
                '2L' : [0,7,14],
                '2W' : [3,11]
            },
            E : {
                '2W' : [4,10]
            },
            F : {
                '3L' : [1,5,9,13]
            },
            G : {
                '2L' : [2,6,8,12]
            },
            center : {
                '3W' : [0,14],
                '2L' : [3,11],
                '*': [7]  
            }
        },
        
        init:function(){

        },

        all_rows: function(){
            return boardModel.rows;

        }

    }

    //OCTOPUS
    var octopus = {
        init:function(){
            boardModel.init();
            lettersView.init();
            boardView.init();
            resultsView.init();
            letterMenuView.init();

        },
        get_rows:function(){
            return boardModel.all_rows();
        },
        get_letters:function(){
            return boardModel.letters;
        },
        get_letters_user: function(){
            return letters_user;
        }
    }

    //VIEW 1
    var lettersView = {
        init: function(){
            var lettersLC = octopus.get_letters_user();
            lettersView.render(lettersLC);
        },
        render: function(letters){
            for (letter in letters){
                var letterDiv = $('<div></div>').addClass('letters').html(letters[letter]);
                $('#letters').append(letterDiv);
            }
        }
    }

    //VIEW 2
    var boardView = {
        init:function(){
            //create an empty board
            var rowClasses = ['A','B','C','D','E','F','G'];
            var table = $('<table></table>');
            //var emptyRows = [];
            var count = 0;
            var cellNum = 1;
            while (count < 15) {
                if (count == 7){
                    var emptyRow = $('<tr></tr>').addClass('center');
                }
                else if (count < 7){
                    var emptyRow = $('<tr></tr>').addClass(rowClasses[count]);
                }
                else {
                    var emptyRow = $('<tr></tr>').addClass(rowClasses[rowClasses.length-(count-rowClasses.length)]);
                }
                var sub_count = 0;
                while (sub_count < 15){
                    var emptyCell = $('<td></td>').addClass('board_cell').attr('id',cellNum);
                    emptyRow.append(emptyCell);
                    sub_count += 1;
                    cellNum += 1;
                }
                //emptyRows.push(emptyRow);
                table.append(emptyRow);
                count += 1;
            }

            var rows = octopus.get_rows();

            boardView.render(table,rows);
            

        },

        render:function(table,rows){
            $('#board').append(table);
            for (i in rows){
                for (j in rows[i]){
                    var indices = rows[i][j];
                    for (index in indices){
                        var n = indices[index]+1;
                        var current_child = $('.'+i + ' td:nth-child('+n+')');
                        current_child.html(j).addClass(j);
                    }
                }
            }
        },

        word_scores: function(word_at_index){
            var letter_scores = octopus.get_letters();
            var score = letter_scores[word_at_index];
            return score;
        }


    }

    //VIEW 3
    var resultsView = {
        init:function(){
            $('td:not(.board_cell_selected)').click(function(){
                var item = $(this);
                //var selectedID = $(this).attr('id');
                letterMenuView.render(item);
            })
        },
        clear:function(spaceID){
            //change back any previously selected cell
                    if ( $('#'+spaceID).hasClass('2L') == true ){
                        $('#'+spaceID).html('2L');
                    }
                    else if ( $('#'+spaceID).hasClass('2W') == true ){
                        $('#'+spaceID).html('2W');
                    }
                    else if ( $('#'+spaceID).hasClass('3L') == true ){
                        $('#'+spaceID).html('3L');
                    }
                    else if ( $('#'+spaceID).hasClass('3W') == true ){
                        $('#'+spaceID).html('3W');
                    }
                    else {
                        $('#'+spaceID).html(' ');
                    }
               
        },
        
        render:function(item){
            
                if (nextSpaceIDs.length != 0){
                    for (ID in nextSpaceIDs){
                        resultsView.clear(nextSpaceIDs[ID]);
                    }
                    var previousSelectID = $('.board_cell_selected').attr('id');
                    resultsView.clear(previousSelectID);
                }
                
                $('td').removeClass('board_cell_selected');
                item.addClass('board_cell_selected');

                $('td').removeClass('word');
                nextSpaceIDs = [];

                var final_score_total = 0;
                var dubWord = 0;
                var tripWord = 0;
                var word_length = 4;
                var i = 1;
                var next_space = item.next();
                while (i < word_length){
                    //adjacent_spaces.push(next_space);
                    var spaceID = next_space.attr('id');
                    nextSpaceIDs.push(spaceID);

                    var word_ch = words_C_4[i];
                    var score = boardView.word_scores(word_ch);
                    var final_score = score;

                        if ( $('#'+spaceID).hasClass('2L') == true ){
                            final_score = 2*score;
                        }
                        else if ( $('#'+spaceID).hasClass('2W') == true ){
                            dubWord += 1;
                        }
                        else if ( $('#'+spaceID).hasClass('3L') == true ){
                            final_score = 3*score;
                        }
                        else if ( $('#'+spaceID).hasClass('3W') == true ){
                            tripWord += 1;
                        }

                    final_score_total += final_score;
                    $('#'+spaceID).html(word_ch).addClass('word');

                    next_space = next_space.next();
                    i += 1;
                }
   
                var word_ch_starting = words_C_4[0];
                var start_score = boardView.word_scores(word_ch_starting);
                final_score_total += start_score;

                //TRIPLE AND DOUBLE WORD SCORE
                if (dubWord == 1){
                    final_score_total = 2*final_score_total;
                }
                if (tripWord == 1){
                    final_score_total = 3*final_score_total;
                }
                
                console.log(final_score_total);

                var winning_word = $('<div></div>').html(words_C_4).addClass('winning_word');
                var pointVal = $('<div></div>').html(final_score_total + ' points').addClass('pointVal');
                var result_row = $('<div></div>').addClass('result_row').append(winning_word, pointVal);
                $('#results').empty();
                $('#results').append(result_row);

        }

    }

    //VIEW 4
    var letterMenuView = {
        init: function(){
            //modal menu for selecting a letter
            var letters = octopus.get_letters();
            var menuContainer = $('<div></div>').attr('id','menuContainer');
            for (letter in letters) {
                var letterStr = letter;
                var letterUC = letterStr.toUpperCase();
                var letter_div = $('<div></div>').addClass('menu_letter');
                if (letterUC == 'C'){
                    letter_div.addClass('demo_highlight').attr('id','demo');
                }
                letter_div.html(letterUC);
                menuContainer.append(letter_div);
                $('.modal-body').append(menuContainer);
            }

        },

        render: function(item){
                $('#letterMenu').modal({backdrop: false});
                
                $('.demo_highlight').click(function(){
                    var selected_letter = $(this).html();
                    //store cellType as the ID and set html to selected_letter
                    item.html(selected_letter);
                    //close modal
                    $('#letterMenu').modal('hide');
                    $('.letter').html("'"+selected_letter+"'");
                    resultsView.render(item);
                    
                })

        }

    }

octopus.init();

});
