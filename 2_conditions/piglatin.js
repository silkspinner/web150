// WEB150 WN17 - Week 2, Pig Latin Translator Assignment
// 01/12/2017 Ron Nims

var reloadPage = function reloadPage() {
    // restarts translation process
    location.reload();
}

var getSentance = function getSentance(promptText) {
    // gets user input for sentance to be tranlated
    // validates non-empty result
    sentance = prompt(promptText).trim();

    //if no user input then insert error message
    if (!sentance) {
        sentance = "Error no input to translate";
    }
}

var translatePigLatin = function translatePigLatin(textToTranslate) {
    // function to translate a simple sentance into Pig Latin
    // preserve capitalization after translation, so "Pig Latin" = "Igpay Atinlay"
    // ignore punctuation within words
    // preserve trailing punctuation, so "apple, banana and peach." = "appleway, ananabay andway eachpay."
    
    const PUNCTUATION = '.,;:!?'
    const VOWELS = 'aeiou';
    var words = textToTranslate.split(" ");

    // loop through the array of words translating each word
    for (var word in words) {
        // first check if word is uppercase
        var isUppercase = ( /[A-Z]/.test( words[word][0] ) );

        // then remove any uppercase before translating
        words[word] = words[word].toLowerCase();

        // now preserve trailing punctuation
        var suffix = '';
        if ( PUNCTUATION.indexOf( words[word].substr(words[word].length-1,1) ) >= 0) {
            suffix = (words[word].substr(words[word].length-1,1));
            words[word] = words[word].substr(0,words[word].length-1);
        }
        
        // Check to see if the first character is a vowel
        if (VOWELS.indexOf(words[word].substring(0,1)) < 0) {
            // the first character is a consonent
            // so loop though all consonents 
            while (VOWELS.indexOf(words[word].substring(0,1)) < 0) {
                // move the consonant to the end of the string
                words[word] = words[word].substring(1) + words[word].substring(0,1);
            }
            //now all consonants have been moved, append "ay"
            words[word] += "ay";
        } else {
            //first character is vowel so just append "way"
            words[word] += "way";        
        }
        // put back uppercase
        if (isUppercase === true) {
            words[word] = words[word].substr(0,1).toUpperCase() + words[word].substr(1);
        }
        
        // put back trailing punctuation
        words[word] += suffix;       
        //console.log(words[word]);
    }
    //insert the translated sentance in the correct section of webpage
    translatedText = words.join(" ");
    document.getElementById("translation").innerHTML = translatedText;
};




