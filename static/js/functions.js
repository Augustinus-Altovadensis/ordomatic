function weekday_human_readable(weekday) {
  return ['<span class="dominica">Dominica</span>', 'Feria II', 'Feria III', 'Feria IV', 'Feria V', 'Feria VI', 'Sabbato'][weekday];
}

function month_human_readable(month) {
  return ['Ianuarius', 'Februarius', 'Martius - Sancto Ioseph consecratus', 'Aprilis', 'Maius - Beatæ Mariæ Virgini consecratus', 'Iunius - Sacratissimo Iesu Cordi consecratus', 'Iulius', 'Augustus', 'September', 'October - Sanctis Angelis consecratus', 'November - Fidelibus defunctis consecratus', 'December'][month];
}

function month_human_readable_genitive(month) {
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
  var zero = '';
  if (number < 10) {
    zero = '0';
  }
  return zero;
}

function get_winner(ref_tempo, ref_sancto) {
  var winner = days_tempo[ref_tempo];
  if (days_sancto[ref_sancto] && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force']) {
    winner = days_sancto[ref_sancto];
  }
  return winner;
}

function component(date, year, month, day, weekday, before, color, header, body, after) {
  // New year, new month:
  var block_new_year, block_new_month;
  if (date.getFullYear() != year) {
    year = date.getFullYear();
    block_new_year = '<div class="year blue mt-5">' + year + '</div>';
    if (date.getMonth() != month) {
      month = date.getMonth();
      block_new_month = '<div class="month green mb-3">Ianuarius</div>';
    }
  } else {
    block_new_year = '';
    if (date.getMonth() != month) {
      month = date.getMonth();
      block_new_month = '<div class="month green my-3">' + month_human_readable(month) + '</div>';
    } else {
      block_new_month = '';
    }
  }

  // Blocks 'before' and 'after':
  if (before != "") {
    block_before = '<div class="before">' + before + '</div>';
  } else {
    block_before = '';
  }
  if (after != "") {
    block_after = '<div class="after">' + after + '</div>';
  } else {
    block_after = '';
  }

  // Result:
  return (
    block_new_year
    + block_new_month
    + '<div class="d-flex flex-column w-50 mb-2">'
    + block_before
    + '<div class="head d-flex m-0">'
    + '<span class="fas fa-square ' + color + '"></span>'
    + '<span class="day brown fw-bold ms-2">' + day + '</span>'
    + '<span class="weekday brown fw-bold ms-1 text-nowrap">' + weekday_human_readable(weekday) + ' -</span>'
    + '<span class="header text-justify ms-1">' + header + '</span>'
    + '</div>'
    + '<div class="body text-justify">' + body + '</div>'
    + block_after
    + '</div>'
  );
}
