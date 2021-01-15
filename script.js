$( "input" ).focus(function() {
  $( this ).parent().find( "label").addClass("focus");
  $( this ).parent().addClass(" focus-span");
});

$( "input" ).focusout(function() {
  $( this ).parent().find( "label").removeClass("focus");
  $( this ).parent().removeClass(" focus-span");
});
var savedAnswers = [];
var correct = 0;
var pos = 0;
var choice;
var allQuestions = [{
    question: "Lorem ipsum dolor sit amet?",
    choices: ["Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh."],
    answer: "A",
    imageLeft:"images/left-image-one.png",
    imageRight:"images/right-image-one.png",
    imageClass:"odd"
}, {
    question: "Lorem ipsum dolor sit amet, consec tetuer adipiscing elit, sed diam?",
    choices: ["Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh."],
    answer: "A",
    imageLeft:"images/right-image-two.png",
    imageRight:"images/left-image-two.png",
    imageClass:"even"
}, {
    question: "Lorem ipsum dolor sit amet?",
    choices: ["Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh."],
    answer: "A",
    imageLeft:"images/left-image-three.png",
    imageRight:"images/right-image-three.png",
    imageClass:"odd"
}, {
    question: "Lorem ipsum dolor sit amet?",
    choices: ["Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.","Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh."],
    answer: "A",
    imageLeft:"images/right-image-two.png",
    imageRight:"images/left-image-two.png",
    imageClass:"even"
}
];

function getID(x) {
    return document.getElementById(x)
}

function renderQuestions() {
    getID("top-cover").style.display = "none";
    var testStatus = getID("test_status");
    var test = getID("test");
    var photo = getID("photo");
    var result = getID("result");
    if (pos >= allQuestions.length) {
        testStatus.innerHTML = "Test Completed";
        result.innerHTML = "<div class=''><h2>Your Results Here</h2><h3>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh</h3><img src=\"images/results.png\"><button type='button' class='start-button'>TAKE THE QUIZ AGAIN <span><img class='arrow' src=\"images/right-arrow.png\"></span></button></div>";
        pos = 0;
        return false
    };
    testStatus.innerHTML = (pos + 1) + " / " + allQuestions.length;

    var A = allQuestions[pos].choices[0];;
    var B = allQuestions[pos].choices[1];;
    var C = allQuestions[pos].choices[2];;
    var D = allQuestions[pos].choices[3];
    photo.innerHTML = '<div class="'+ allQuestions[pos].imageClass +'"><img class="left-image" src="'+ allQuestions[pos].imageLeft + '"/> <img class="right-image"src="'+ allQuestions[pos].imageRight + '"/></div>';

    test.innerHTML = '<h2>' + allQuestions[pos].question + '</h2>';

    for (var j = 0; j < 4; j++) {
        var letter = null;
        var letterOp = null;
        switch (j) {
            case 0:
                letter = "A";
                letterOp = A;
                break;
            case 1:
                letter = "B";
                letterOp = B;
                break;
            case 2:
                letter = "C";
                letterOp = C;
                break;
            case 3:
                letter = "D";
                letterOp = D;
                break;
        }
        if (savedAnswers[pos] == j) {
            test.innerHTML += '<label class="checked"> <span>' + letter +'. </span><br><input type="radio" checked="true" value="' + letter + '" name="answerChoice" /><br><div> ' + letterOp + '</div></label>';
        } else {
            test.innerHTML += '<label> <span>' + letter +'. </span><br><input type="radio" value="' + letter + '" name="answerChoice" /> <br><div>' + letterOp + '</div></label>';
        }
    }

    //test.innerHTML += '<input type="radio" value="A" name="answerChoice" /> ' + A + '<br />';
    //test.innerHTML += '<input type="radio" value="B" name="answerChoice" /> ' + B + '<br />';
    //test.innerHTML += '<input type="radio" value="C" name="answerChoice" /> ' + C + '<br /><br />';
    if (pos == allQuestions.length - 1) {
        test.innerHTML += '<input type="button" id="prev" onclick="prevAnswer()" value="&#8592"> ';
        test.innerHTML += '<input type="button" id="next" onclick="checkAnswer()" value="Submit"> ';
    } else if (pos >= 1) {
        test.innerHTML += '<input type="button" id="prev" onclick="prevAnswer()" value="&#8592"> ';
        test.innerHTML += '<input type="button" id="next" onclick="checkAnswer()" value="Next"> ';
    } else {
        test.innerHTML += '<input type="button" id="next" onclick="checkAnswer()" value="Next"> ';
    }

    test.innerHTML += '<br /><br /><p id="error"></p>'
}

choice = document.getElementsByName("answerChoice");
var checkedAnswer = null;

function checkAnswer() {
    var num = null;
    choice = document.getElementsByName("answerChoice");
    var checkedAnswer = null;
    for (var i = 0; i < choice.length; i++) {
        if (choice[i].checked) {
            checkedAnswer = choice[i].value;
            num = i;
        }
    }

    if (checkedAnswer !== null) {
        savedAnswers[pos] = num;
    } else {
        document.getElementById("error").innerHTML = 'Please select an answer'
        return false;
    }
    if (checkedAnswer == allQuestions[pos].answer) {
        correct++;

    }

    pos++;
    renderQuestions();
}

function prevAnswer() {
    pos--;
    renderQuestions();
}
