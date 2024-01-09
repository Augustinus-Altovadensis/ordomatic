function refresh_ordo(year) {
  var content = "";

  var christmas = get_christmas_date(year - 1);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  var year = first_sunday_of_advent.getFullYear();
  var month = first_sunday_of_advent.getMonth();
  var day_in_milliseconds = 24 * 3600 * 1000;

  // Title:
  content = content.concat(
    '<div class="title text-center orange w-100">Ordo ' + year + '-<span id="year">' + (first_sunday_of_advent.getFullYear() + 1) + '</span></div>'
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

  // Month (November or December):
  content = content.concat(
    '<div class="month green">' + month_human_readable(month) + '</div>'
  );

  // Advent:
  var advent_duration = 21 + christmas_weekday;
  content = content.concat(period(advent_duration, first_sunday_of_advent, 'adv_', 0, 0));

  // Christmas time:
  var christmas_time_duration = 19 - ((christmas_weekday + 5) % 7);
  content = content.concat(period(christmas_time_duration, christmas, 'christmas_', 0, 0));

  var baptism = new Date(christmas.getTime() + (christmas_time_duration * day_in_milliseconds));

  // Ash Wednesday:
  var easter = get_easter_date(year + 1);
  var ash_wednesday = new Date(easter.getTime() - (46 * day_in_milliseconds));
  ash_wednesday = new Date(ash_wednesday.getTime() - (ash_wednesday.getTimezoneOffset() * 60 * 1000));

  // Tempus per Annum until Ash Wednesday:
  var tempus_per_annum_until_ash_duration = (ash_wednesday - baptism) / (1000 * 3600 * 24) - 1;
  content = content.concat(period(tempus_per_annum_until_ash_duration, baptism, 'pa_', 0, 0));

  // Lent:
  // Days after Ash wednesday:
  content = content.concat(period(4, ash_wednesday, 'ash_', 0, 3));
  // Rest of Lent:
  content = content.concat(period(42, new Date(ash_wednesday.getTime() + (4 * day_in_milliseconds)), 'lent_', 0, 0));

  // Paschaltide:
  content = content.concat(period(50, easter, 'tp_', 0, 0));

  var pentecost = new Date(easter.getTime() + (49 * day_in_milliseconds));

  // Tempus per Annum after Pentecost:
  christmas = get_christmas_date(year + 1);
  var advent = new Date(christmas.getTime() - ((christmas.getDay() + 21) * day_in_milliseconds));
  var tempus_per_annum_after_pentecost_duration = ((advent - pentecost) / day_in_milliseconds);
  var num_per_annum_of_pentecost = Math.floor(34 - (tempus_per_annum_after_pentecost_duration / 7));
  // // 1. Days after Pentecost:
  content = content.concat(period(6, new Date(pentecost.getTime() + day_in_milliseconds), 'pa_', num_per_annum_of_pentecost, 1));
  // // 2. Rest of Tempus per Annum:
  content = content.concat(period(tempus_per_annum_after_pentecost_duration - 7, new Date(pentecost.getTime() + 7 * day_in_milliseconds), 'pa_', num_per_annum_of_pentecost + 1, 0));

  //   TODO:
  //   switch (i) {
  //     case 0:
  //       winner = days_tempo['trinity'];
  //       break;
  //     case 4:
  //       winner = days_tempo['corpus_domini'];
  //       break;
  //     case 12:
  //       winner = days_tempo['cor_jesu'];
  //       break;
  //     case 13:
  //       winner = days_tempo['cor_mariæ_immaculatum'];
  //       break;

  $('#ordo').html(content);

  replace();
}
