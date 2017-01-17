// WEB150 WN17 - Week 2, Pig Latin Translator Assignment
// 01/12/2017 Ron Nims

var reloadPage = function reloadPage() {
    // restarts translation process
    location.reload();
}

var getSentance = function getSentance(promptText) {
    // gets user input for sentance to be tranlated
    // validates non-empty result
    sentance = prompt(promptText);

    //if no user input then insert error message
    if (!sentance) {
        sentance = "Error no input to translate";
    }
}

var translatePigLatin = function translatePigLatin(textToTranslate) {
    // function to translate a simple sentance into Pig Latin
    const VOWELS = 'aeiou';
    var words = textToTranslate.split(" ");

    // loop through the array of words translating each word
    for (i = 0; i < words.length; i++) {
        // Check to see if the first character is a vowel
        if (VOWELS.indexOf(words[i].substring(0,1)) < 0) {
            // the first character is a consonent
            // so loop though all consonents 
            while (VOWELS.indexOf(words[i].substring(0,1)) < 0) {
                // move the consonant to the end of the string
                words[i] = words[i].substring(1) + words[i].substring(0,1);
            }
            //now all consonants have been moved, append "ay"
            words[i] += "ay";
        } else {
            //first character is vowel so just append "way"
            words[i] += "way";        
        }    
        //console.log(words[i]);
    }
    //insert the translated sentance in the correct section of webpage
    translatedText = words.join(" ");
    document.getElementById("translation").innerHTML = translatedText;
};




