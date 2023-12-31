function weekday_human_readable(weekday) {
  return ['<span class="small-caps">Dominica</span>', 'Feria II', 'Feria III', 'Feria IV', 'Feria V', 'Feria VI', 'Sabbato'][weekday];
}

function month_human_readable(month) {
  return ['Ianuarius', 'Februarius', 'Martius - Sancto Ioseph consecratus', 'Aprilis', 'Maius - Beatæ Mariæ Virgini consecratus', 'Iunius - Sacratissimo Iesu Cordi consecratus', 'Iulius', 'Augustus', 'September', 'October - Sanctis Angelis consecratus', 'November - Fidelibus defunctis consecratus', 'December'][month];
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

function get_easter_date(year) {
  var v1 = year - 1900;
  var v2 = v1 % 19;
  var v3 = Math.floor(((v2 * 7) + 1) / 19);
  var v4 = ((v2 * 11) + 4 - v3) % 29;
  var v5 = Math.floor(v1 / 4);
  var v6 = (v1 + v5 + 31 - v4) % 7
  var v7 = 25 - v4 - v6
  var easter_day;
  if (v7 > 0) { easter_day = v7; } else { easter_day = 31 + v7; }
  var easter_month;
  if (v7 > 0) { easter_month = 3 } else { easter_month = 2 }
  var easter = new Date(year, easter_month, easter_day);
  return (new Date(easter.getTime() - (easter.getTimezoneOffset() * 60 * 1000)));
}

function add_zero(number) {
  let zero = '';
  if (number < 10) {
    zero = '0';
  }
  return zero;
}

function get_winner(ref_tempo, ref_sancto) {
  let winner = days_tempo[ref_tempo];
  if (days_sancto[ref_sancto] && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force']) {
    winner = days_sancto[ref_sancto];
  }
  return winner;
}

function element(day, weekday, before, color, header, body, after) {
  return (
    '<div class="element d-flex flex-column w-50 mb-2">'
    + '<div class="before fst-italic fw-bold text-center brown">' + before + '</div>'
    + '<div class="head d-flex m-0">'
    + '<span class="fas fa-square ' + color + '"></span>'
    + '<span class="day brown fw-bold ms-2">' + day + '</span>'
    + '<span class="weekday brown fw-bold ms-1 text-nowrap">' + weekday_human_readable(weekday) + ' -</span>'
    + '<span class="header text-justify ms-1">' + header + '</span>'
    + '</div>'
    + '<div class="body text-justify">' + body + '</div>'
    + '<div class="after fst-italic fw-bold text-center brown">' + after + '</div>'
    + '</div>'
  );
}
