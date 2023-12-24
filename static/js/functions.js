function weekday_human_readable(weekday) {
  return ['Dominica', 'Feria II', 'Feria III', 'Feria IV', 'Feria V', 'Feria VI', 'Sabbato'][weekday];
}

function month_human_readable(month) {
  return ['Ianuarii', 'Februarii', 'Martii', 'Aprilis', 'Maii', 'Iunii', 'Iulii', 'Augusti', 'Septembris', 'Octobris', 'Novembris', 'Decembris'][month];
}

function get_christmas_date(year) {
  return new Date(year, 11, 25);
}

function get_christmas_weekday(christmas) {
  return christmas.getDay();
}

function get_first_sunday_of_advent(christmas, christmas_weekday) {
  return new Date(christmas - ((21 + christmas_weekday) * 24 * 3600 * 1000));
}

function element(ref) {
  return (
    '<div class="element">'
    + '<span class="weekday">' + weekday_human_readable(first_sunday_of_advent.getDay()) + '</span>'
    + ' '
    + '<span class="day">' + first_sunday_of_advent.getDate() + '</span>'
    + '<span class="header">' + days.ref['header'] + '</span>'
    + '</div>'
    + '<div class="body">' + days.ref['body'] + '</div>'
  );
}

function refresh_ordo(year) {
  $('#content').html('');
  var christmas = get_christmas_date(year - 1);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  $('#content').append(
    '<div class="title"> Ordo ' + first_sunday_of_advent.getFullYear() + ' - ' + (first_sunday_of_advent.getFullYear() + 1) + '</div>'
  );
  $('#content').append(
    '<div class="year">' + first_sunday_of_advent.getFullYear() + '</div>'
  );
  $('#content').append(
    '<div class="month">' + month_human_readable(first_sunday_of_advent.getMonth()) + '</div>'
  );
  $('#content').append(
    element('adv_1_0')
  );
}