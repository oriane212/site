$(document).ready(function () {
    $('.projectTitle').hover(function () {
        $(this).addClass('active');
    }, function () {
        $(this).removeClass('active');
    }
    );

});

/**
 * returns an HTML element at the root of the
 * projectElement
 */
function ProjectElementFromObject(projectObject) {

}

var dataFromServer = [{}, {}];


var htmlElements = dataFromServer.map((currentItem) => {
    return ProjectElementFromObject(currentItem);
});

htmlElements.forEach((elememnt)=>{
    document.body.appendChild(element);
})