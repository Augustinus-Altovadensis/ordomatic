function refresh_ordo(year) {
  content = "";

  christmas = get_christmas_date(year - 1);
  christmas_weekday = get_christmas_weekday(christmas);
  first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  year = first_sunday_of_advent.getFullYear();
  month = first_sunday_of_advent.getMonth();
  day_in_milliseconds = 24 * 3600 * 1000;
  day_in_ms = 24 * 3600 * 1000;

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
  content = content.concat(period(advent_duration, first_sunday_of_advent, 'adv_', 0, 0, 0));

  // Christmas time:
  christmas_time_duration = 19 - ((christmas_weekday + 5) % 7);
  content = content.concat(period(christmas_time_duration, christmas, 'christmas_', 0, 0, 0));

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

  // All variables to determine the correct dates
  tempus_per_annum_until_septuagesima = Math.floor((septuagesima - baptism) / (1000 * 3600 * 24));
  pentecost = new Date(easter.getTime() + (49 * day_in_ms));
  trinitas = new Date(easter.getTime() + (56 * day_in_ms));
  christmas_new = get_christmas_date(year + 1);
  advent_new = new Date(christmas_new.getTime() - ((get_christmas_weekday(christmas_new) + 21) * day_in_ms));
  tempus_per_annum_after_pentecost_duration = ((advent_new - pentecost) / day_in_ms);
  num_after_epiphany = Math.floor((tempus_per_annum_until_septuagesima -1 )/ 7) + 1;

  dominica_xxiij = new Date(trinitas.getTime() + ( 23 * 7 ) * day_in_ms);
  dominica_ultima = new Date(advent_new.getTime() - 7  * day_in_ms);
  num_after_dom_xxiij = Math.floor((dominica_ultima - dominica_xxiij) / day_in_ms) + 1;

  // Sum of Sundays after Epiphany. If it eq. 5, one is missing
  if ( num_after_epiphany < 6 && ( num_after_epiphany + (num_after_dom_xxiij / 7) == 5 )) extra_sunday = 1; else extra_sunday = 0; 

  // Tempus per Annum until Septuagesima:
  content = content.concat(period(tempus_per_annum_until_septuagesima, baptism, 'pe_', 0, 0, extra_sunday));

  // Septuagesima Period:
  content = content.concat(period(17, septuagesima, 'sept_', 0, 0, 0));

  // Lent:
  // Days after Ash wednesday:
  content = content.concat(period(4, ash_wednesday, 'ash_', 0, 3, 0));
  // Rest of Lent:
  content = content.concat(period(42, new Date(ash_wednesday.getTime() + (4 * day_in_milliseconds)), 'lent_', 0, 0, 0));

  // Paschaltide:
  content = content.concat(period(56, easter, 'tp_', 0, 0, 0));

  // Tempus per Annum after Pentecost (23 weeks):
  content = content.concat(period( 23 * 7, new Date(easter.getTime() + (56 * day_in_ms)), 'pa_', 0, 0, 0));

  // Remaining Sundays after Epiphany:
  content = content.concat(period(num_after_dom_xxiij, dominica_xxiij, 'pe_', num_after_epiphany + extra_sunday, 0, 0));
  
  // Dominica xxiv. et ultima post Pentecosten et hebdomada ejus:
  content = content.concat(period(((advent_new - dominica_ultima) / day_in_ms), dominica_ultima, 'pa_', 23, 0, 0));

  content = content.concat('<div class="body text-justify">num_after_epiphany = ' + num_after_epiphany + "  |  num_after_dom_xxiij = " + (num_after_dom_xxiij/7) + "  |  Sum of all days = " + (advent_duration + christmas_time_duration + tempus_per_annum_until_septuagesima + 280 + num_after_dom_xxiij + ((advent_new - dominica_ultima) / day_in_ms)) +'</div>');


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
