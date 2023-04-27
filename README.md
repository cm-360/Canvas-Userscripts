# Canvas-Userscripts

A colleciton of userscripts to make different areas of the Canvas UI suck a little less. All scripts were made and tested using the [TamperMonkey](https://www.tampermonkey.net/) browser extension, so that is the only one I can say for sure they work on. For these to work with your institution's Canvas pages, you may need to change the `@match` clauses' domain.


## Better Quiz UI

[Install](https://github.com/cm-360/Canvas-Userscripts/raw/main/better_quiz_ui.user.js)

Makes the right sidebar on the quiz taking page sticky, and allows the questions list to use a bit more (up to 60%) of the available screen height. Also adds an alternative submit button to this sidebar, along with a last save indicator.


## Better Dashboard

[Install](https://github.com/cm-360/Canvas-Userscripts/raw/main/better_dashboard.user.js)

Condenses the items on the dashboard list view, and adds a sidebar with links to your courses' homepages. I mainly use the list view, so the sidebar looks a bit strange on the others, but is still unobtrusive and usable.


## Calculate Hidden Grades

[Install](https://github.com/cm-360/Canvas-Userscripts/raw/main/calculate_hidden_grades.user.js)

Calculates grades for assignment categories, even when the instructor has them marked as unposted. Note: this does not account for drop policies and will include all submissions!
