$(document).ready(function () {
  // On loading, display the liturgical year of the current date in the select_year:
  var year = get_liturgical_year(new Date());
  $('#select_year').val(year);
  refresh_ordo(year);

  // On selecting a new year, refresh the ordo:
  $('#select_year').change(function () {
    refresh_ordo($(this).val());
  });
});


function weekday_human_readable(weekday) {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekday];
}

function month_human_readable(month) {
  return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
}

function get_liturgical_year(date) {
  var year = date.getFullYear();
  var christmas = get_christmas_date(year);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_advent = get_first_sunday_advent(christmas, christmas_weekday);
  if (date > first_sunday_advent) {
    year += 1;
  }
  return year;
}

function get_christmas_date(year) {
  return new Date(year, 11, 25);
}

function get_christmas_weekday(christmas) {
  return christmas.getDay();
}

function get_first_sunday_advent(christmas, christmas_weekday) {
  return new Date(christmas - ((21 + christmas_weekday) * 24 * 3600 * 1000));
}

function refresh_ordo(year) {
  $('#content').html('');
  var christmas = get_christmas_date(year - 1);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_advent = get_first_sunday_advent(christmas, christmas_weekday);
  $('#content').append(
    '<div class="year">' + first_sunday_advent.getFullYear() + '</div>'
  );
  $('#content').append(
    '<div class="month">' + month_human_readable(first_sunday_advent.getMonth()) + '</div>'
  );
  $('#content').append(
    '<div class="line">'
    + '<span class="weekday">' + weekday_human_readable(first_sunday_advent.getDay()) + '</span>'
    + ' '
    + '<span class="day">' + first_sunday_advent.getDate() + '</span>'
    + '<span class="header">First Sunday of Advent</span>'
    + '</div>'
    + '<div class="body">Ad Vigilias dicitur Resp. <i>Aspiciens</i>.</div>'
  );
}