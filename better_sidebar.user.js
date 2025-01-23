// ==UserScript==
// @name         Canvas Better Sidebar
// @namespace    http://tampermonkey.net/
// @version      2024-11-08
// @description  Adds buttons to collapse/show the course sidebar from anywhere on the page
// @author       cm360
// @match        https://canvas.vt.edu/*
// @icon         https://icons.duckduckgo.com/ip2/vt.edu.ico
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  if (window.self !== window.top) {
    return;
  }

  const menuToggleButton = document.getElementById("courseMenuToggle");

  if (!menuToggleButton) {
    return;
  }

  function toggleLeftSidebar() {
    menuToggleButton.click();
  }

  // Add sidebar collapse button

  GM_addStyle(`
    .better-sidebar-collapse {
      position: absolute;
      top: 10px;
      right: 0
    }
  `);

  const leftSidebarContainer = document.querySelector("#left-side #sticky-container");

  if (leftSidebarContainer) {
    const collapseButton = document.createElement("button");
    collapseButton.className = "better-sidebar-collapse Button Button--link";
    collapseButton.title = "Hide Sidebar";
    collapseButton.addEventListener("click", () => toggleLeftSidebar());

    const collapseIcon = document.createElement("i");
    collapseIcon.className = "icon-x";
    collapseButton.appendChild(collapseIcon);

    leftSidebarContainer.insertBefore(collapseButton, leftSidebarContainer.firstChild);
  }

  // Add sidebar expansion handle

  // Expand handle wrapper/button
  GM_addStyle(`
    .better-sidebar-expand-wrapper {
      display: none;
      height: 100%;
      position: absolute
    }
    #left-side[style*="display: none"] + .better-sidebar-expand-wrapper {
      display: block
    }
    .better-sidebar-expand {
      position: sticky;
      top: calc(50vh - 72px)
    }
  `);

  const leftSidebar = document.querySelector("#left-side");

  if (leftSidebar) {
    const expandHandleWrapper = document.createElement("div");
    expandHandleWrapper.className = "better-sidebar-expand-wrapper";

    const expandHandle = document.createElement("button");
    expandHandle.className = "better-sidebar-expand Button Button--link";
    expandHandle.title = "Show Sidebar";
    expandHandle.addEventListener("click", () => toggleLeftSidebar());
    expandHandleWrapper.appendChild(expandHandle);

    const expandIcon = document.createElement("i");
    expandIcon.className = "icon-arrow-right";
    expandHandle.appendChild(expandIcon);

    leftSidebar.parentNode.insertBefore(expandHandleWrapper, leftSidebar.nextSibling);
  }
})();
