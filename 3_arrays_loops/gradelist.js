// WEB150 WN17 - Week 3, Grading list generator
// 01/19/2017 Ron Nims


var grades = "jim|25, sue|32, mary|34, ann|22, ted|28, frank|15, lisa|19, mike|30, ahn|26, vishaya|27";
var gradeMin = 100;
var gradeMax = 0;

var gradeAverage = 0;

var listGrades = function listGrades() {
    // function to list students name and grade from grades
    // sorted by student name, first letter capitalized
    
    // create a sorted array of student name|grade values
    var gradelist = grades.split(", ");
    gradelist.sort();
    
    // transfer gradelist to array of student objects with name and grade properties
    // capitalize only first letter of name

    var student = [];
    var gradeTotal = 0;
    for (var id in gradelist) {
        student[id] = {name:gradelist[id].split("|")[0], grade:gradelist[id].split("|")[1]};
        student[id].name = student[id].name[0].toUpperCase() + student[id].name.substr(1).toLowerCase();

        // establish gradeMin, gradeMax values
        var intGrade = parseInt(student[id].grade);
        if (intGrade < gradeMin) {
            gradeMin = intGrade;
        }
        if (intGrade > gradeMax) {
            gradeMax = intGrade;
        }
        // accumulate grade totals to calc average
        gradeTotal += intGrade;
    }
    gradeAverage = gradeTotal/student.length;
    
    // build html for table
    var tableData = "<tr class='titles'><td>Student</td><td>Grade</td></tr>"
    for (var id in student) {
        if (parseInt(student[id].grade) == gradeMin) {
            tableData += "<tr class='min'><td>" + student[id].name + "</td><td>" + student[id].grade + "</td></tr>"
        }
        else if (parseInt(student[id].grade) == gradeMax) {
            tableData += "<tr class='max'><td>" + student[id].name + "</td><td>" + student[id].grade + "</td></tr>"
        }
        else {
            tableData += "<tr><td>" + student[id].name + "</td><td>" + student[id].grade + "</td></tr>"
        }
    }
    document.getElementById("gradeChart").innerHTML = tableData;

}


