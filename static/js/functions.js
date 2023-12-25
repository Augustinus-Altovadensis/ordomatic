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

function element(day, weekday, hat, color, header, body) {
  return (
    '<div class="element d-flex flex-column w-50 mb-2">'
    + '<div class="hat fst-italic ms-3">' + hat + '</div>'
    + '<div class="head d-flex m-0">'
    + '<span class="fas fa-square ' + color + '"></span>'
    + '<span class="day brown fw-bold ms-2">' + day + '</span>'
    + '<span class="weekday brown fw-bold ms-1 text-nowrap">' + weekday_human_readable(weekday) + ' -</span>'
    + '<span class="header text-justify ms-1">' + header + '</span>'
    + '</div>'
    + '<div class="body text-justify">' + body + '</div>'
    + '</div>'
  );
}
