function refresh_ordo(year) {
  content = "";

  christmas = get_christmas_date(year - 1);
  christmas_weekday = get_christmas_weekday(christmas);
  first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  year = first_sunday_of_advent.getFullYear();
  month = first_sunday_of_advent.getMonth();
  day_in_milliseconds = 24 * 3600 * 1000;

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
  advent_duration = 21 + christmas_weekday;
  content = content.concat(period(advent_duration, first_sunday_of_advent, 'adv_', 0, 0));

  // Christmas time:
  christmas_time_duration = 19 - ((christmas_weekday + 5) % 7);
  content = content.concat(period(christmas_time_duration, christmas, 'christmas_', 0, 0));

  baptism = new Date(christmas.getTime() + (christmas_time_duration * day_in_milliseconds));

  // Septuagesima:
  easter = get_easter_date(year + 1);
  septuagesima = new Date(easter.getTime() - (63 * day_in_milliseconds));
  septuagesima = new Date(septuagesima.getTime() - (septuagesima.getTimezoneOffset() * 60 * 1000));

  // Ash Wednesday:
  easter = get_easter_date(year + 1);
  ash_wednesday = new Date(easter.getTime() - (46 * day_in_milliseconds));
  ash_wednesday = new Date(ash_wednesday.getTime() - (ash_wednesday.getTimezoneOffset() * 60 * 1000));

  // Tempus per Annum until Ash Wednesday: ORIGINAL
  tempus_per_annum_until_ash_duration = (ash_wednesday - baptism) / (1000 * 3600 * 24) - 1;
  //content = content.concat(period(tempus_per_annum_until_ash_duration, baptism, 'pa_', 0, 0));

  // Tempus per Annum until Septuagesima:
  tempus_per_annum_until_septuagesima = (septuagesima - baptism) / (1000 * 3600 * 24) - 1;
  content = content.concat(period(tempus_per_annum_until_septuagesima, baptism, 'pe_', 0, 0));

  // Septuagesima Period:
  content = content.concat(period(17, septuagesima, 'sept_', 0, 0));

  // Lent:
  // Days after Ash wednesday:
  content = content.concat(period(4, ash_wednesday, 'ash_', 0, 3));
  // Rest of Lent:
  content = content.concat(period(42, new Date(ash_wednesday.getTime() + (4 * day_in_milliseconds)), 'lent_', 0, 0));

  // Paschaltide:
  content = content.concat(period(56, easter, 'tp_', 0, 0));

  pentecost = new Date(easter.getTime() + (49 * day_in_milliseconds));

  trinitas = new Date(easter.getTime() + (56 * day_in_milliseconds));

  // function period(duration, start, prefix_tempo, week_start, day_start)

  // Tempus per Annum after Pentecost (23 weeks):
  content = content.concat(period( 23 * 7, new Date(easter.getTime() + (56 * day_in_milliseconds)), 'pa_', 0, 0));

  christmas = get_christmas_date(year + 1);
  advent = new Date(christmas.getTime() - ((get_christmas_weekday(christmas) + 21) * day_in_milliseconds));
  tempus_per_annum_after_pentecost_duration = ((advent - pentecost) / day_in_milliseconds);
  num_after_epiphany = Math.floor(tempus_per_annum_until_septuagesima / 7);

  dominica_xxiij = new Date(trinitas.getTime() + ( 23 * 7 ) * day_in_milliseconds);
  dominica_ultima = new Date(advent.getTime() - 7  * day_in_milliseconds);

  // Remaining Sundays after Epiphany:
  content = content.concat(period((dominica_ultima - dominica_xxiij) / day_in_milliseconds, dominica_xxiij, 'pe_', num_after_epiphany + 1, 0));
  
  // Dominica xxiv. et ultima post Pentecosten et hebdomada ejus:
  content = content.concat(period(((advent - dominica_ultima) / day_in_milliseconds), dominica_ultima, 'pa_', 23, 0));


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
