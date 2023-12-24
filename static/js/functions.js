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
    '<div class="element">'
    + '<div class="hat">' + hat + '</div>'
    + '<div class="head"  >'
    + '<span class="fas fa-square ' + color + '"></span>'
    + '<span class="day">' + day + '</span>'
    + '<span class="weekday">' + weekday_human_readable(weekday) + '</span>'
    + '<span class="header">' + header + '</span>'
    + '</div>'
    + '<div class="body">' + body + '</div>'
    + '</div>'
  );
}

function refresh_ordo(year) {
  $('#content').html('');
  var christmas = get_christmas_date(year - 1);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  $('#content').append(
    '<div class="title"> Ordo ' + first_sunday_of_advent.getFullYear() + '-' + (first_sunday_of_advent.getFullYear() + 1) + '</div>'
  );
  $('#content').append(
    '<div class="year">' + first_sunday_of_advent.getFullYear() + '</div>'
  );
  $('#content').append(
    '<div class="month">' + month_human_readable(first_sunday_of_advent.getMonth()) + '</div>'
  );
  for (let week = 1; week < 4; week++) {
    for (let day = 0; day < 7; day++) {
      const ref = 'adv_' + week + '_' + day;
      $('#content').append(element(
        first_sunday_of_advent.getDate() + (week * day),
        day,
        days[ref]['hat'],
        days[ref]['color'],
        days[ref]['header'],
        days[ref]['body'],
      )
      );
    }
  }
}
