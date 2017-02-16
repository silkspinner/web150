// WEB150 WN17 - Week 6, Potterific - Hogwarts directory
// 02/11/2017 Ron Nims
// Populate a table with Hogwarts characters
// include buttons to filter list by house

var buildTable = function buildTable() {
    
    // list of characters
    var characters = [
    {name:"Albus Dumbledore", role:"staff", house:"Gryffindor",gender:"m",alignment:"good"},    
    {name:"Nymphadora Tonks", role:"", house:"Hufflepuff",gender:"f",alignment:"good"},    
    {name:"Ron Weasley", role:"student", house:"Gryffindor",gender:"m",alignment:"good"},    
    {name:"Ginny Weasley", role:"student", house:"Gryffindor",gender:"f",alignment:"good"},    
    {name:"Hermione Granger", role:"student", house:"Gryffindor",gender:"f",alignment:"good"},    
    {name:"Mad-eye Moody", role:"staff", house:"",gender:"m",alignment:"good"},    
    {name:"Prof McGonagall", role:"staff", house:"Gryffindor",gender:"f",alignment:"good"},    
    {name:"Harry Potter", role:"student", house:"Gryffindor",gender:"m",alignment:"good"},    
    {name:"Draco Malfoy", role:"student", house:"Slytherin",gender:"m",alignment:"evil"},    
    {name:"Hagrid", role:"staff", house:"Gryffindor",gender:"m",alignment:"good"},    
    {name:"Luna Lovegood", role:"student", house:"Ravenclaw",gender:"f",alignment:"good"},    
    {name:"Voldemort", role:"", house:"Slytherin",gender:"m",alignment:"evil"},    
    {name:"Bellatrix Lestrange", role:"", house:"Slytherin",gender:"f",alignment:"evil"},           
    {name:"Severus Snape", role:"staff", house:"Slytherin",gender:"m",alignment:"?"}
    ];
    
    // array for houses
    var houses = [];
    
    // start building table with column headers
    var tableHtml = '<tr id="colhead"><th>Name</th><th>Role</th><th>House</th><th>M / F</th><th>Alignment</th></tr>';
    
    for (var char in characters) {
        // build table of characters
        tableHtml += "<tr><td>" + characters[char].name + "</td>";
        tableHtml += "<td>" + characters[char].role + "</td>";
        tableHtml += "<td>" + characters[char].house + "</td>";
        tableHtml += "<td>" + characters[char].gender + "</td>";
        tableHtml += "<td>" + characters[char].alignment + "</td></tr>";
        // collect unique houses
        if(houses.indexOf(characters[char].house) < 0 & characters[char].house.length > 0) {
            // does not exist
            houses.push(characters[char].house);
        } 
    }
    // insert table information
    $("#directory").html(tableHtml);
    
    // <button onclick="toggleHouse('clearAll')">Show All</button>
    // build button row for each house

    var functionHtml = "resetAll()";
    var onclickHtml = 'onclick="' + functionHtml + '"';
    var buttonHtml = "<button id='reset' " + onclickHtml + ">Show All</button>";

    for (var house in houses) {
        // add a button for each house in houses
        functionHtml = "toggleHouse('" + houses[house] + "')";
        onclickHtml = 'onclick="' + functionHtml + '"';
        buttonHtml += "<button id='" +  houses[house] + "' "+ onclickHtml + ">" + houses[house] + "</button>";
        // console.log("Build button" + buttonHtml);
    }
    // show table with alternating row colors
    refreshTable();
    
    // insert buttons
    $("#buttonRow").html(buttonHtml);
};

var toggleHouse = function toggleHouse(house) {
    // toggle visibility of house rows
    $("tr").hide();
    $("tr:contains(" + house + ")").show();
    refreshTable();
};

var resetAll = function resetAll() {
    // toggle visibility of house rows
    $("tr").show();
    refreshTable();
    
};

var refreshTable = function refreshTable() {
    // set all rows with no background, then set odd rows with beige background
    $("tr:visible").css("background-color", "");    
    $("tr:visible:even  ").css("background-color", "beige");    
};
