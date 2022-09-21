var len;
var results = '';

function searchClick() {
    apiSearch();
    document.getElementById("query").value = " ";
}

function currentTimeClick() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    $('#time').css("visibility", "visible");
    $('#time').html(time);
    $('#time').dialog();
}

function apiSearch() {
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };



    $.ajax({
        url: 'https://api.bing.microsoft.com/' + "/v7.0/search?" + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "d31ce81557844877942177fd31b299d6");
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;
            results = "";
            for (i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
            }


            $('#searchResults').css("visibility", "visible");
            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert("error");
        });
}