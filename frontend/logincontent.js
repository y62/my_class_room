$(function(){
    $('#btn_1').on("click", function () {
        const url = "https://raw.githubusercontent.com/y62/nodejs_exam_project/test/frontend/logincontent.html"

      $.ajax(url, {
         dataType: "html",
         method: "GET",
         success: function (response) {
             $("div.main").html(response);
             $('#btn_1').fadeOut(3000);
         },
          error: function (request, errorType, errorMsg) {
             alert("ERROR: NO AJAX CALL: " + errorMsg);
          }
      });
    });
});

