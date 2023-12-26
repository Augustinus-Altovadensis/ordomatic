function refresh_ordo(year) {
  $('#content').html('');

  var christmas = get_christmas_date(year - 1);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  var year = first_sunday_of_advent.getFullYear();
  var month = first_sunday_of_advent.getMonth();

  // Title:
  $('#content').append(
    '<div class="title text-center orange w-100"> Ordo ' + first_sunday_of_advent.getFullYear() + '-' + (first_sunday_of_advent.getFullYear() + 1) + '</div>'
  );

  // Year:
  $('#content').append(
    '<div class="year text-center fw-bold blue w-100 p-1">' + year + '</div>'
  );

  // Month:
  $('#content').append(
    '<div class="month text-center fw-bold green w-100 mb-3 p-1">' + month_human_readable(month) + '</div>'
  );

  // Advent:
  var advent_duration = 21 + christmas_weekday;
  for (var i = 0; i < advent_duration; i++) {
    var date = new Date(first_sunday_of_advent.getTime() + (i * 24 * 3600 * 1000));
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'adv_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    $('#content').append(element(
      day,
      weekday,
      winner['hat'],
      winner['color'],
      winner['header'],
      winner['body'],
    )
    );
  }

  // Christmas time:
  var christmas_time_duration = 19 - ((christmas_weekday + 5) % 7);
  for (var i = 0; i < christmas_time_duration; i++) {
    var date = new Date(christmas.getTime() + (i * 24 * 3600 * 1000));
    if (date.getFullYear() != year) {
      year = date.getFullYear();
      $('#content').append(
        '<div class="year text-center fw-bold blue w-100 p-1">' + year + '</div>'
      );
    }
    if (date.getMonth() != month) {
      month = date.getMonth();
      $('#content').append(
        '<div class="month text-center fw-bold green w-100 mb-3 p-1">' + month_human_readable(month) + '</div>'
      );
    }
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'christmas_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    $('#content').append(element(
      day,
      weekday,
      winner['hat'],
      winner['color'],
      winner['header'],
      winner['body'],
    )
    );
  }
  var baptism = new Date(date.getTime() + (24 * 3600 * 1000));

  // Easter:
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
  easter = new Date(easter.getTime() - (easter.getTimezoneOffset() * 60 * 1000));

  // Ash Wednesday:
  var ash_wednesday = new Date(easter.getTime() - (46 * 24 * 3600 * 1000));
  ash_wednesday = new Date(ash_wednesday.getTime() - (ash_wednesday.getTimezoneOffset() * 60 * 1000));

  // Tempus per Annum until Ash Wednesday:
  var first_tempus_per_annum_duration = (ash_wednesday - baptism) / (1000 * 3600 * 24) - 1;
  for (var i = 0; i < first_tempus_per_annum_duration; i++) {
    var date = new Date(baptism.getTime() + (i * 24 * 3600 * 1000));
    if (date.getMonth() != month) {
      month = date.getMonth();
      $('#content').append(
        '<div class="month text-center fw-bold green w-100 mb-3 p-1">' + month_human_readable(month) + '</div>'
      );
    }
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'pa_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    $('#content').append(element(
      day,
      weekday,
      winner['hat'],
      winner['color'],
      winner['header'],
      winner['body'],
    )
    );
  }

  // Lent:
  // Days after Ash wednesday:
  for (var i = 0; i < 4; i++) {
    var date = new Date(ash_wednesday.getTime() + (i * 24 * 3600 * 1000));
    if (date.getMonth() != month) {
      month = date.getMonth();
      $('#content').append(
        '<div class="month text-center fw-bold green w-100 mb-3 p-1">' + month_human_readable(month) + '</div>'
      );
    }
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'lent_0_' + (i + 3);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    $('#content').append(element(
      day,
      weekday,
      winner['hat'],
      winner['color'],
      winner['header'],
      winner['body'],
    )
    );
  }
  // Rest of Lent:
  for (var i = 0; i < 42; i++) {
    var date = new Date(ash_wednesday.getTime() + ((i + 4) * 24 * 3600 * 1000));
    if (date.getMonth() != month) {
      month = date.getMonth();
      $('#content').append(
        '<div class="month text-center fw-bold green w-100 mb-3 p-1">' + month_human_readable(month) + '</div>'
      );
    }
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'lent_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    $('#content').append(element(
      day,
      weekday,
      winner['hat'],
      winner['color'],
      winner['header'],
      winner['body'],
    )
    );
  }

  // Paschaltide:
  for (var i = 0; i < 49; i++) {
    var date = new Date(ash_wednesday.getTime() + ((i + 46) * 24 * 3600 * 1000));
    if (date.getMonth() != month) {
      month = date.getMonth();
      $('#content').append(
        '<div class="month text-center fw-bold green w-100 mb-3 p-1">' + month_human_readable(month) + '</div>'
      );
    }
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'tp_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    $('#content').append(element(
      day,
      weekday,
      winner['hat'],
      winner['color'],
      winner['header'],
      winner['body'],
    )
    );
  }
}
