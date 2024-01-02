function refresh_ordo(year) {
  // $('#content').html('');
  var content = "";

  var christmas = get_christmas_date(year - 1);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  var year = first_sunday_of_advent.getFullYear();
  var month = first_sunday_of_advent.getMonth();

  // Title:
  content = content.concat(
    '<div class="title text-center orange w-100">Ordo ' + first_sunday_of_advent.getFullYear() + '-<span id="year">' + (first_sunday_of_advent.getFullYear() + 1) + '</span></div>'
  );

  // Liturgical cycle:
  content = content.concat(
    '<div class="subtitle text-center fw-bold w-100">Cyclus liturgicus <span id="cyclus"></span></div>'
  );

  // Date of Pascha:
  content = content.concat(
    '<div class="subtitle text-center fw-bold w-100 pb-3">Sanctum Pascha celebrabitur die <span id="pascha"></span></div>'
  );

  // Year:
  content = content.concat(
    '<div class="year blue">' + year + '</div>'
  );

  // Month:
  content = content.concat(
    '<div class="month green">' + month_human_readable(month) + '</div>'
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
    content = content.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['body'],
      winner['after'],
    ));
    month = date.getMonth();
  }

  // Christmas time:
  var christmas_time_duration = 19 - ((christmas_weekday + 5) % 7);
  for (var i = 0; i < christmas_time_duration; i++) {
    var date = new Date(christmas.getTime() + (i * 24 * 3600 * 1000));
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'christmas_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    content = content.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['body'],
      winner['after'],
    ));
    year = date.getFullYear();
    month = date.getMonth();
  }
  var baptism = new Date(date.getTime() + (24 * 3600 * 1000));

  // Ash Wednesday:
  var easter = get_easter_date(year);
  var ash_wednesday = new Date(easter.getTime() - (46 * 24 * 3600 * 1000));
  ash_wednesday = new Date(ash_wednesday.getTime() - (ash_wednesday.getTimezoneOffset() * 60 * 1000));

  // Tempus per Annum until Ash Wednesday:
  var tempus_per_annum_until_ash_duration = (ash_wednesday - baptism) / (1000 * 3600 * 24) - 1;

  for (var i = 0; i < tempus_per_annum_until_ash_duration; i++) {
    var date = new Date(baptism.getTime() + (i * 24 * 3600 * 1000));
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'pa_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    content = content.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['body'],
      winner['after'],
    ));
    month = date.getMonth();
  }

  // Lent:
  // Days after Ash wednesday:
  for (var i = 0; i < 4; i++) {
    var date = new Date(ash_wednesday.getTime() + (i * 24 * 3600 * 1000));
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'lent_0_' + (i + 3);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    content = content.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['body'],
      winner['after'],
    ));
    month = date.getMonth();
  }
  // Rest of Lent:
  for (var i = 0; i < 42; i++) {
    var date = new Date(ash_wednesday.getTime() + ((i + 4) * 24 * 3600 * 1000));
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'lent_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    content = content.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['body'],
      winner['after'],
    ));
    month = date.getMonth();
  }

  // Paschaltide:
  for (var i = 0; i < 50; i++) {
    var date = new Date(ash_wednesday.getTime() + ((i + 46) * 24 * 3600 * 1000));
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'tp_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    content = content.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['body'],
      winner['after'],
    ));
    month = date.getMonth();
  }
  var pentecost = new Date(date.getTime() + (24 * 3600 * 1000));

  // Tempus per Annum after Pentecost:
  christmas = get_christmas_date(year);
  var advent = new Date(christmas.getTime() - ((christmas.getDay() + 21) * 24 * 3600 * 1000));
  var tempus_per_annum_after_pentecost_duration = ((advent - pentecost) / (1000 * 3600 * 24)) - 6;
  var num_per_annum_of_pentecost = Math.floor(34 - (tempus_per_annum_after_pentecost_duration / 7));
  // Days after Pentecost:
  for (var i = 0; i < 6; i++) {
    var date = new Date(pentecost.getTime() + (i * 24 * 3600 * 1000));
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'pa_' + num_per_annum_of_pentecost + '_' + ((i + 1) % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    var winner = get_winner(ref_tempo, ref_sancto);
    content = content.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['body'],
      winner['after'],
    ));
    month = date.getMonth();
  }
  // Rest of Tempus per Annum:
  for (var i = 0; i < tempus_per_annum_after_pentecost_duration; i++) {
    var date = new Date(pentecost.getTime() + ((i + 6) * 24 * 3600 * 1000));
    var day = date.getDate();
    var weekday = date.getDay();
    var month_usual_number = date.getMonth() + 1;
    var ref_tempo = 'pa_' + (num_per_annum_of_pentecost + Math.ceil((i + 1) / 7)) + '_' + (i % 7);
    var ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    switch (i) {
      case 0:
        winner = days_tempo['trinity'];
        break;
      case 4:
        winner = days_tempo['corpus'];
        break;
      case 12:
        winner = days_tempo['cor_jesu'];
        break;
      case 13:
        winner = days_tempo['cor_immaculatum'];
        break;
      default:
        winner = get_winner(ref_tempo, ref_sancto);
    }
    content = content.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      winner['before'],
      winner['color'],
      winner['header'],
      winner['body'],
      winner['after'],
    ));
    month = date.getMonth();
  }

  $('#content').html(content);

  replace();
}
