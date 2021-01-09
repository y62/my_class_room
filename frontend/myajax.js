$(document).ready(function () {
    $('button').on("click", function (){
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/usersapi"
    }).done(function( data ) {
        for(var i = 0; i < data.length; i++) {
            $('#content').append(data[i].id + " " + data[i].name + " " +data[i].age + " " +data[i].height + '<br>')
        }
    });
    });
})