var topLvlRule = "bSentence";
var rules = erratic.parse(spec);
$(window).load(function(){
    console.log("hello world");
    console.log("parsing up grammar");

    console.log("adding on click evets");
    addOnClickHandler();

});

function addSentence(){
    clearSentences();
    console.log("generating a new sentence");
    var outputarea = document.getElementById('sentence-output');
    var sentence = erratic.generate(rules, topLvlRule);
    console.log(sentence);
    var child = document.createElement("P");
        child.innerText = sentence;
    outputarea.appendChild(child);

}

function clearSentences(){
    console.log("clearing output area");
    document.getElementById("sentence-output").innerHTML = '';
}

function addOnClickHandler(){
    $('#generateSentenceButton').click(function () {
        addSentence();
    });
}

