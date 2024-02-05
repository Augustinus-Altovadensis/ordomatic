function weekday_human_readable(weekday) {
  return ['<span class="dominica">Dominica</span>', 'Feria II', 'Feria III', 'Feria IV', 'Feria V', 'Feria VI', 'Sabbato'][weekday];
}

function month_human_readable(month) {
  return ['Januarius', 'Februarius', 'Martius', 'Aprilis', 'Majus - Beatæ Mariæ Virgini consecratus', 'Junius - Sacratissimo Cordi D.N.J.C. consecratus', 'Julius', 'Augustus', 'September', 'October', 'November', 'December'][month];
}

function month_human_readable_genitive(month) {
  return ['Januarii', 'Februarii', 'Martii', 'Aprilis', 'Maji', 'Junii', 'Julii', 'Augusti', 'Septembris', 'Octobris', 'Novembris', 'Decembris'][month];
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
  v1 = year - 1900;
  v2 = v1 % 19;
  v3 = Math.floor(((v2 * 7) + 1) / 19);
  v4 = ((v2 * 11) + 4 - v3) % 29;
  v5 = Math.floor(v1 / 4);
  v6 = (v1 + v5 + 31 - v4) % 7
  v7 = 25 - v4 - v6
  if (v7 > 0) { easter_day = v7; } else { easter_day = 31 + v7; }
  if (v7 > 0) { easter_month = 3 } else { easter_month = 2 }
  easter = new Date(year, easter_month, easter_day);
  return (new Date(easter.getTime() - (easter.getTimezoneOffset() * 60 * 1000)));
}

function add_zero(number) {
  zero = '';
  if (number < 10) {
    zero = '0';
  }
  return zero;
}

function get_winner(ref_tempo, ref_sancto) {
  winner = days_tempo[ref_tempo];
  if (days_sancto[ref_sancto] && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force']) {
    winner = days_sancto[ref_sancto];
  }
  return winner;
}

function get_commemoratio(ref_tempo, ref_sancto) {
  winner = days_tempo[ref_tempo];
  if (days_sancto[ref_sancto] && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force'])   {
    winner = days_sancto[ref_sancto]; }
  if (winner == days_sancto[ref_sancto] && days_tempo[ref_tempo]['force'] > 10) { commemoratio = days_tempo[ref_tempo]; }
  if (winner == days_tempo[ref_tempo]) { commemoratio = days_sancto[ref_sancto]; }
  return commemoratio;
}

function period(duration, start, prefix_tempo, week_start, day_start) {
  // This function returns the HTML code of a liturgical period (Advent, Lent, Per Annum, etc.).
  // duration (Integer): Number of days of the period.
  // start (Date): Start date of the period.
  // prefix_tempo (String): Prefix of the day_tempo to search. Week and day will be added incrementally to this prefix.
  //     E.g.: 'pa_1_0', 'pa_1_1', 'pa_1_2'… 'pa_2_0', 'pa_2_1', etc.
  // week_start (Integer): At which week to start the increment.
  //     E.g., for Tempus per annum after Pentecost, it can be 7 or 8 etc.
  // day_start (Integer): At which day to start the increment.
  //     E.g., for days after Ash, it will be 3.
  html = "";
  year = start.getFullYear();
  month = start.getMonth();
  for (i = 0; i < duration; i++) {
    date = new Date(start.getTime() + (i * 24 * 3600 * 1000));
    day = date.getDate();
    weekday = date.getDay();
    month_usual_number = date.getMonth() + 1;
    ref_tempo = prefix_tempo + (week_start + Math.ceil((i + 1) / 7)) + '_' + (day_start + (i % 7));
    ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    commemoratio = get_commemoratio(ref_tempo, ref_sancto);
    winner = get_winner(ref_tempo, ref_sancto);
    html = html.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['rank'],
      winner['body'],
      winner['after'],
    ));
    if (commemoratio) {
      html = html.concat( '<span class="header blue text-justify ms-1">' + commemoratio['header'] + '</span>' + '<div class="body blue text-justify">' + commemoratio['body'] + '</div>'
      );
    }
    year = date.getFullYear();
    month = date.getMonth();
  }

  return html;
}

function component(date, year, month, day, weekday, before, color, header, rank, body, after) {
  // This function returns a component, that is a piece of HTML code representing a line of the Ordo.
  // New year? new month?:
  if (date.getFullYear() != year) {
    year = date.getFullYear();
    block_new_year = '<div class="year brown mt-5">' + year + '</div>';
    if (date.getMonth() != month) {
      month = date.getMonth();
      block_new_month = '<div class="month blue mb-3">Januarius</div>';
    }
  } else {
    block_new_year = '';
    if (date.getMonth() != month) {
      month = date.getMonth();
      block_new_month = '<div class="month blue my-3">' + month_human_readable(month) + '</div>';
    } else {
      block_new_month = '';
    }
  }

  // Blocks 'before' and 'after'?:
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
    + '<span class="header text-justify ms-1">' + header + " " + rank + '</span>'
    + '</div>'
    + '<div class="body text-justify">' + body + '</div>'
    + block_after
    + '</div>'
  );
}
