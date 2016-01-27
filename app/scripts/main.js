var timeline = {};
var timelineMarkers = {};
var events = {};

var getData = function() {
  
  timelineMarkers = document.querySelectorAll('.timeline-marker');

  events = document.querySelectorAll('.event');

};

var positionEvents = function() {

  var i,
      curMarker;

  for (i = 0; i < timelineMarkers.length; i += 1) {
    curMarker = timelineMarkers[i];
    if (curMarker.dataset && curMarker.dataset.year) {
      timeline[curMarker.dataset.year] = {
        position: curMarker.offsetLeft,
        width: curMarker.offsetWidth
      }
    }
  }

  var curEvent,
      year,
      newPos,
      monthPos;
  for (i = 0; i < events.length; i += 1) {
    curEvent = events[i];
    if (curEvent.dataset && curEvent.dataset.year) {
      year = curEvent.dataset.year;
      month = curEvent.dataset.month || 1;
      if (timeline[year]) {
        newPos = timeline[year].position;
        newPos += Math.ceil(month / 12 * timeline[year].width);
        curEvent.style.left = newPos + 'px';
      }
    }
  }

}

document.addEventListener("DOMContentLoaded", function() {
  getData();
  positionEvents();
});

window.onresize = positionEvents;
