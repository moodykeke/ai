var initialise = function (training_class_names) {
    var speech_recognizer = new JsSpeechRecognizer();
    speech_recognizer.openMic();
    var train_on = function (class_name, info_text) {
        speech_recognizer.startTrainingRecording(class_name);
        info_text.innerHTML = " Release the button when finished speaking";       
    };
    var train_off =
        function (class_name, info_text) {
            var recordingId = speech_recognizer.stopRecording();
            // regenerate the model
            speech_recognizer.generateModel();
            if (typeof info_text.count !== 'number') {
                info_text.count = 1;
                info_text.innerHTML = " " + info_text.count + " example trained";
            } else {
                info_text.count++;
                info_text.innerHTML = " " + info_text.count + " examples trained";
            }
    };
    create_training_buttons(training_class_names, train_on, train_off);
    create_test_button(training_class_names, speech_recognizer);
};

var create_test_button = function (training_class_names, speech_recognizer) {
    const help = document.createElement('h3');
    help.innerHTML = "Hold down the <b>test</b> button and release when finished speaking";
    const button = document.createElement('button');
    button.innerText = "Test";
    button.className = "testing-button";
    const results_div = document.createElement('div');
    document.body.appendChild(help);
    document.body.appendChild(button);
    document.body.appendChild(results_div);
    var button_down = function () {
        speech_recognizer.startRecognitionRecording();
    };
    var button_up = function () {
        speech_recognizer.stopRecording();
        var result = speech_recognizer.getTopRecognitionHypotheses(1); // top result only
        // Format and display results
        results_div.innerHTML = "";
        if (result[0].confidence > 0) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].confidence > 0) {
                    results_div.innerHTML +=
                        result[i].match + " " + (result[i].confidence*100).toFixed(0) + "% confidence<br>";
                }            
            }
        } else {
            results_div.innerHTML = "No matches.";
        }
    };
    button.addEventListener('mousedown',  button_down);
    button.addEventListener('touchstart', button_down);
    button.addEventListener('mouseup',    button_up);
    button.addEventListener('touchend',   button_up);
};

// tell Snap! this is loaded
window.addEventListener('DOMContentLoaded', 
                        function (event) {
                            if (window.opener) {
                                window.opener.postMessage("Loaded", "*");
                            }
                        },
                        false);
// receive class names
window.addEventListener("message",
                        function (event) {
                            if (typeof event.data.training_class_names !== 'undefined') {
                                initialise(event.data.training_class_names);
                                event.source.postMessage("Ready", "*");
                            } else if (typeof event.data.new_introduction !== 'undefined') {
                                var introduction = document.getElementById("introduction");
                                introduction.innerHTML = event.data.new_introduction;
                                introduction.setAttribute("updated", true);
                            }
                        },
                        false);

 // for testing
window.addEventListener('DOMContentLoaded', 
                        function (event) {
                            initialise(["yes", "no"]);
                        });