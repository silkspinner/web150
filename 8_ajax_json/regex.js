// WEB150 WN17 - Week 8 - Regular Expressions
// 03/06/2017 Ron Nims
// Build the Answers element with query results
    /*
    Use regular expressions, JavaScript & jQuery to:
    - Count & display # of words
    - Count & display # of occurrences of 'tax' or 'taxes' (exact match)
    - Display all phone #'s
    - Display all IRS forms & publications
    - Display all web addresses, with full urls
    */

var buildAnswers = function  buildAnswers() {
    // Assemble the query answers in a text string then append to ID answers element    
    var answerText = "<ol>"
    answerText += "<li>The number of words in content is <b>"
       + $("#content").text().match(/\w/g).length + "</b></li>";
    answerText += "<li>The number of occurrences of 'tax' or 'taxes' (exact match) is <b>"
       + $("#content").text().match(/\stax[\s\.]|\staxes[\s\.]/ig).length + "</b></li>";
    answerText += "<li>The phone numbers in content are: <b>"
       + $("#content").text().match(/1[- ]\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})/g) + "</b></li>";
    answerText += "<li>The IRS Forms & Publications mentioned are: <b>"
       + $("#content").text().match(/form\s([0-9]{4,5})|publication\s([0-9]{4,5})/ig) + "</b></li>";
    var urlList = $("#content").text().match(/www\.?[A-Za-z]+\.?(com|org)/ig)
    for (var url in urlList) {
        urlList[url] = "http://" + urlList[url];
    }
    answerText += "<li>The web addresses mentioned (with full URLs) are: <b>"
       + urlList + "</b></li>";
    answerText += "</ol>";

    $("#answers").append(answerText);
    // now replace the full URLs in content
    $("#content").text($("#content").text().replace(/(www\.?[A-Za-z]+\.?(com|org))/ig, 'http://$1'))
    
};

