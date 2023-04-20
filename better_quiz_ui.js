// ==UserScript==
// @name         Canvas Better Quiz UI
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes the question list taller and stick to the top of the screen, and adds an alternate submit quiz button
// @author       You
// @match        https://canvas.vt.edu/courses/*/quizzes/*/take
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vt.edu
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (window.self === window.top) {
        // styles
        var sheet = document.createElement('style');
        sheet.innerHTML += "#right-side {position: sticky; top: 24px;}";
        sheet.innerHTML += "#question_list {max-height: 60vh !important}";
        sheet.innerHTML += ".better-quiz-ui-item {width: 100%; margin: 5px 0;}";
        document.body.appendChild(sheet);

        const rightSide = document.getElementById("right-side");

        // info bar
        const realSaveIndicator = document.getElementById("last_saved_indicator");
        const altSaveIndicator = document.createElement("div");
        altSaveIndicator.className = "better-quiz-ui-item";
        const saveObserver = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                altSaveIndicator.innerText = mutation.target.innerText;
            }
        });
        saveObserver.observe(realSaveIndicator, { childList: true });
        rightSide.appendChild(altSaveIndicator);

        // alternate submit button
        const realSubmitBtn = document.getElementById("submit_quiz_button");
        const altSubmitBtn = document.createElement("button");
        altSubmitBtn.className = "btn btn-secondary better-quiz-ui-item";
        altSubmitBtn.innerText = "Submit Quiz";
        altSubmitBtn.addEventListener("click", e => realSubmitBtn.click());
        rightSide.appendChild(altSubmitBtn);
    }

})();
