function myFunction() {
  // define calendar IDs to get events from
  var sourceCalendarIDs = ["21F_ENGS-89-90", "21F_GEOG_08.01"];

  // define calendar ID to place events into
  var destinationCalendarID = "SHARED"
  destCal = CalendarApp.getCalendarsByName(destinationCalendarID)[0];

  // today's date
  var today = new Date()

  // one week ago
  // d = number of days to subtract
  var d = 7;
  var startDate = new Date(today.getTime()-d*(24*3600*1000));

  // one week ahead
  // d = number of days to subtract
  var d = 7;
  var endDate = new Date(today.getTime()+d*(24*3600*1000));

  // delete events in destination calendar
  eventsToDelete = destCal.getEvents(startDate, endDate);
  for (e of eventsToDelete) {
    e.deleteEvent();
  }

  // loop over calendars and copy events
  for (cal of sourceCalendarIDs) {
    // initiate source calendar
    sourceCal = CalendarApp.getCalendarsByName(cal)[0];

    // get events to copy
    eventsToCopy = sourceCal.getEvents(startDate, endDate);

    // copy events
    for (e of eventsToCopy) {
      // create a new event
      newEvent = destCal.createEvent(e.getTitle(), e.getStartTime(), e.getEndTime());
    }
  }
}
