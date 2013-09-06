// JavaScript Slide Presentation software.
// Copyright 2003-2007 by Akkana Peck.
// This software is licensed under the GNU public license --
// Share and enjoy!

// See a presentation on how to use this at
// http://shallowsky.com/linux/presentations/

//
// Slide navigation. List your slides here, in order.
//
var slides = new Array ( "index.html",
                         "le-web-design.html",
                         "le-web-designer.html",
                         "les-outils.html",
                         "les-tendances.html",
                         "les-technologies.html", 
			 "recherche.html",
			 "identite-visuelle.html",
                         "conclusion.html" );

//
// Add the event listener.
// This actually only has to be done for the first slide.
if (document.addEventListener)		// DOM way
  document.addEventListener("keypress", onKeyPress, false);
else if (document.all)			// IE way
  document.attachEvent("onkeypress", onKeyPress);

//
// Keypress navigation
function onKeyPress(e)
{
  // IE doesn't see the event argument passed in, so get it this way:
  if (window.event) e = window.event;

  // Mozilla uses charCode for printable characters, keyCode for unprintables:
  if (e.charCode) {
    switch (e.charCode) {
      case 32:
        nextSlide();
        e.preventDefault();
        return;
      // The Logitech Presenter sends a period from the "blank screen" btn
      case 46:
        blankScreen();
        e.preventDefault();
        return;
    }
  }

  //alert("key press, char code " + e.charCode + ", key code " + e.keyCode );

  if (e.shiftKey == 1) {
    switch (e.keyCode) {
      case 33:    // e.DOM_VK_PAGE_UP:
      case 33:    // e.DOM_VK_PAGE_UP:
        tableOfContents();
        e.preventDefault();
        return;
    }
    return;
  }
  if (e.ctrlKey == 1) {
    return;
  }

  // Use numeric values rather than DOM_VK_* so that non-mozilla browsers
  // might work.
  switch (e.keyCode) {
    case 32:    // e.DOM_VK_SPACE:
    case 34:    // e.DOM_VK_PAGE_DOWN:
    case 39:    // e.DOM_VK_RIGHT:
      nextSlide();
      e.preventDefault();
      return;
    case 8:     // e.DOM_VK_BACK_SPACE:
    case 33:    // e.DOM_VK_PAGE_UP:
    case 37:    // e.DOM_VK_LEFT:
      prevSlide();
      e.preventDefault();
      return;
    case 36:    // e.DOM_VK_HOME:
    //case 38:    // e.DOM_VK_UP:
      firstSlide();
      e.preventDefault();
      return;
    case 35:    // e.DOM_VK_END:
      lastSlide();
      e.preventDefault();
      return;
    // The Logitech Presenter's F5/ESC button sometimes sends ESC,
    // sometimes F5. I can't figure out the rule, so treat them the same:
    case 27:     // e.DOM_VK_ESC:
    case 116:    // e.DOM_VK_F5:
      firstSlide();
      e.preventDefault();
      return;
  }
}

//
// Initialize anything needed to show points one by one.
// To use this, set up an ol or ul with id="points"
// and in the HTML body, call onload="initPoints()".
//
var points;
var curPoint = 0;
var lastPoint;
function initPoints()
{
  // Set up the point nav:
  pointList = document.getElementById("points");
  if (pointList) {
    points = pointList.getElementsByTagName("li");
    // Make the first point visible (they should all be invisible initially)
    points[curPoint].style.visibility = "visible";
  }
}

function indexOfPage() {
  var url = document.URL;
  var lastslash = document.URL.lastIndexOf("/");
  var filename = url.substring(lastslash+1, url.length);
//alert(filename);

  // JS 1.6 has Array.indexOf, but that doesn't work in Opera/Konq/etc.
  if (slides.indexOf) return slides.indexOf(filename);
  var i;
  for (i=0; i<slides.length; ++i) {
    if (slides[i] == filename) return i;
  }
  return 0;
}

function nextSlide() {
  // If there are multiple points on this slide, show the next point:
  if (points && curPoint < points.length - 1) {
    curPoint = curPoint + 1;
    points[curPoint].style.visibility = "visible";
    return;
  }

  // No next point -- go to the next slide instead.
  var i = indexOfPage();
  if (i >= slides.length - 1) {    // last slide
    //window.alert("That's the last slide");
    return;
  }
  window.location = slides[i+1];
}

function firstSlide() {
  window.location=slides[0];
}

function lastSlide() {
  window.location=slides[slides.length-1];
}

/* Toggle the screen black or not */
function blankScreen() {
  var allblack = document.getElementById("allblack");
  if (allblack) {
    var vis = allblack.style.visibility;
    if (vis == "hidden") {
      allblack.style.visibility = "visible";
    }
    else {
      allblack.style.visibility = "hidden";
    }
  }
  else {
    var body = document.getElementsByTagName("body")[0];
    allblack = document.createElement("div");
    allblack.id = "allblack";
    allblack.style.position = "absolute";
    allblack.style.left = "0";
    allblack.style.top = "0";
    allblack.style.width = "100%";
    allblack.style.height = "100%";
    allblack.style.background = "black";
    allblack.style.zIndex = 100;
    allblack.style.visibility = "visible";
    body.appendChild(allblack);
  }
}

function tableOfContents() {
  // First make a list of all our slides:
  var text = "<h2>Table of Contents</h2>\n<small>\n";
  var i;
  for (i=0; i<slides.length; ++i)
    text += '<a href="' + slides[i] + '">' + slides[i] + '</a><br>\n'
  text += "</small>\n"
  body = document.getElementsByTagName("body")[0];
  body.innerHTML = text;
}

function prevSlide() {
  i = indexOfPage();
  if (i <= 0) {    // last slide
    //window.alert("Already on the first slide");
    return;
  }
  window.location = slides[i-1];
}

