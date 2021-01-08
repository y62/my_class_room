$(function(){
        $('button').on("click", function (){
            const url = "https://raw.githubusercontent.com/y62/nodejs_exam_project/master/routes.js"

            $.ajax(url, {
                dataType: "html",
                method: "GET",
                success: function (response) {
                    $("div.main").html(response);
                    $('button').fadeOut(3000);
                }
            });

            //  $("div.main").load(url);
            // $('button').fadeOut(3000);
        });
    });