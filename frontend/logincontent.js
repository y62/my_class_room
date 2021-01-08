$(function(){
    $('button').on("click", function (){
        const url = "https://raw.githubusercontent.com/y62/nodejs_exam_project/master/frontend/logincontent.html"
        $("div.main").load(url);
    });
});

