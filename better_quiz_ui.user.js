// ==UserScript==
// @name         Canvas Better Quiz UI
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Taller and sticky right sidebar, secondary submit quiz button, scrollable attempt list
// @author       cm360
// @match        https://canvas.vt.edu/courses/*/quizzes/*
// @icon         https://icons.duckduckgo.com/ip2/vt.edu.ico
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  if (window.self !== window.top) {
    return;
  }

  // styles
  GM_addStyle(`
    #quiz-submission-version-table {
      margin-top: 0;
    }
    #right-side {
      position: sticky;
      top: 24px;
    }
    #question_list {
      max-height: 60vh !important;
    }
    .better-quiz-ui-item {
      width: 100%;
      margin: 5px 0;
    }
    .better-quiz-ui-scoller {
      overflow: scroll;
      max-height: 500px;
      margin: 10px 0;
    }
  `);

  // scrollable attempt list
  const attemptTable = document.getElementById("quiz-submission-version-table");
  if (attemptTable) {
    const attemptScroller = document.createElement("div");
    attemptScroller.className = "better-quiz-ui-scoller";
    attemptTable.parentNode.insertBefore(attemptScroller, attemptTable);
    attemptScroller.appendChild(attemptTable);
  }

  const rightSide = document.getElementById("right-side");

  // info bar
  const realSaveIndicator = document.getElementById("last_saved_indicator");
  if (realSaveIndicator) {
    const altSaveIndicator = document.createElement("div");
    altSaveIndicator.className = "better-quiz-ui-item";
    const saveObserver = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        altSaveIndicator.innerText = mutation.target.innerText;
      }
    });
    saveObserver.observe(realSaveIndicator, { childList: true });
    rightSide.appendChild(altSaveIndicator);
  }

  // alternate submit button
  const realSubmitBtn = document.getElementById("submit_quiz_button");
  if (realSubmitBtn) {
    const altSubmitBtn = document.createElement("button");
    altSubmitBtn.className = "btn btn-secondary better-quiz-ui-item";
    altSubmitBtn.innerText = "Submit Quiz";
    altSubmitBtn.addEventListener("click", (e) => realSubmitBtn.click());
    rightSide.appendChild(altSubmitBtn);
  }
})();
