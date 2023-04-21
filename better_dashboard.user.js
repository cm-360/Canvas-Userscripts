// ==UserScript==
// @name         Canvas Better Dashboard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Condenses dashboard planner items and adds course links to a right sidebar for easy access
// @author       cm360
// @match        https://canvas.vt.edu/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vt.edu
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (window.self === window.top) {
        // styles
        var sheet = document.createElement("style");
        sheet.innerHTML = `
            .planner-day {
                margin-top: 12px !important;
            }
            .planner-grouping {
                margin-top: 8px !important;
            }
            .planner-item {
                padding: 8px !important; padding-left: 0 !important;
            }

            #wrapper {
                margin-right: 250px;
                max-width: unset;
            }

            #better-dashboard-sidebar {
                float: right;
                width: 250px;
                padding: 20px;
                position: sticky;
                top: 0;
            }
            #better-dashboard-sidebar ul {
                margin: 0;
                list-style: none;
                line-height: 1.15;
            }
            #better-dashboard-sidebar li {
                margin: 12px 0;
            }
        `;
        document.body.appendChild(sheet);


        const appWrapper = document.getElementById("application");
        const mainWrapper = document.getElementById("wrapper");

        const sidebar = document.createElement("div");
        sidebar.id = "better-dashboard-sidebar";


        // courses
        const coursesHeader = document.createElement("h3");
        coursesHeader.innerText = "Courses";
        sidebar.appendChild(coursesHeader);
        const coursesList = document.createElement("ul");
        sidebar.appendChild(coursesList);

        const courses = ENV.STUDENT_PLANNER_COURSES;
        for (const course of courses) {
            if (course.isFavorited) {
                const courseLink = document.createElement("a");
                courseLink.innerText = course.shortName;
                courseLink.href = course.href;
                const courseListItem = document.createElement("li");
                coursesList.appendChild(courseListItem);
                courseListItem.appendChild(courseLink);
            }
        }

        //

        appWrapper.insertBefore(sidebar, mainWrapper);
    }

})();
