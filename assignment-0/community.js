// WEB150 WN17 - Week 10 - Javascript Open source project presentation
// 03/15/2017 Ron Nims


var refreshTable = function refreshTable() {
    // set all rows with no background, then set odd rows with beige background
    $("tr:visible").css("background-color", "white");    
    $("tr:visible:even  ").css("background-color", "#eee");    
};

var processPage = function processPage() {

    _.templateSettings.variable = "groupsObj";

    var template = _.template(
        $( "script.template" ).html()
    );
    
    var groupsUrl = "https://data.seattle.gov/resource/y7iv-rz67.json?community_commercial=community&$order=neighborhood";
    
    // request community groups JSON data from data.seattle.gov 
    $.getJSON(groupsUrl, function (groupList, status) {
        if (status === "success") {
            // handle successful request
        
            $( "#groupsBody" ).html(
                template( groupList )
            );
       } else {
            // request failed
            console.out(status);
            alert("Request for Seattle Community Groups data failed. Response status: " + status);
        }
    });
   
}