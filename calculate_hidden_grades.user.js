// ==UserScript==
// @name         Canvas Calculate Hidden Grades
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Calculate final grades even when the professor marks them as hidden
// @author       cm360
// @match        https://canvas.vt.edu/courses/*/grades
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
    #right-side {
      position: sticky;
      top: 24px;
    }
  `);

  const rightSide = document.getElementById("right-side");

  function getSubmission(id) {
    for (const submission of ENV.submissions) {
      if (submission.assignment_id == id) {
        return submission;
      }
    }
  }

  function calcGrades() {
    const gradesTable = document.getElementById("grades_summary");
    for (const group of ENV.assignment_groups) {
      console.log(group);
      // calculate point totals for group
      let pointsAwarded = 0;
      let pointsPossible = 0;
      for (const assignment of group.assignments) {
        console.log(assignment);
        const gradedSubmission = getSubmission(assignment.id);
        // skip missing or ungraded submissions
        if (gradedSubmission && gradedSubmission.score) {
          pointsPossible += assignment.points_possible;
          pointsAwarded += gradedSubmission.score;
        }
      }
      // update results row
      const groupRow = document.getElementById("submission_group-" + group.id);
      const gradeContainer = groupRow.querySelector(".grade");
      if (pointsPossible) {
        gradeContainer.innerText = `${((pointsAwarded / pointsPossible) * 100).toFixed(2)}%`;
      } else {
        gradeContainer.innerText = "N/A";
      }
      const detailsContainer = groupRow.querySelector(".details span");
      detailsContainer.innerText = `${pointsAwarded.toFixed(2)} / ${pointsPossible.toFixed(2)}`;
    }
  }

  // calculate button
  const calcBtn = document.createElement("button");
  calcBtn.className = "btn btn-secondary";
  calcBtn.innerText = "Re-calculate";
  calcBtn.addEventListener("click", calcGrades);
  rightSide.appendChild(calcBtn);
})();
