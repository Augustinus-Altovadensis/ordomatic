function refresh_ordo(year, display_format) {
  content = "";

  christmas = get_christmas_date(year - 1);
  christmas_weekday = get_christmas_weekday(christmas);
  xmas_weekday = christmas.getDay(); // getting real Christmas weekday to get correct starting day
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
  //content = content.concat(
  //  '<div class="subtitle text-center fw-bold w-100">Cyclus liturgicus <span id="cyclus"></span></div>'
  //);

  // Littera Dominicalis:
  content = content.concat(
    '<div class="subtitle text-center fw-bold w-100">Littera Dominicalis: A. D. ' + (year) + ': <font color="red">' + get_littera_dominicalis(year) + '</font> – A. D. ' + (year+1) + ': <font color="red">' + get_littera_dominicalis(year+1) + '</font></div>'
  );

  // Date of Pascha:
  content = content.concat(
    '<div class="subtitle text-center fw-bold w-100 pb-3">Resurrectio D. N. J. C. celebratur die <span id="pascha"></span></div>'
  );

  // Year:
  content = content.concat(
    '<div class="year brown"><font color="red">A</font>nno <font color="red">D</font>omini ' + year + '</div>'
  );

  first_day = new Date(first_sunday_of_advent.getTime() - (1 * day_in_ms));

  // Month (November or December):
  if (first_day.getDate() != 1)
  content = content.concat(
    '<nav class="navbar sticky-top sticky-top-2"><div class="navbar-brand month blue">' + month_human_readable(first_day.getMonth()) + " " + year + '</div></nav>'
  );

  //////////////////////////////|||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //  All the temporal variables to determine the correct dates  \\
  //////////////////////////////|||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // Anvent and Christmas:
  advent_duration = 21 + christmas_weekday;
  christmas_time_duration = 19 - ((christmas_weekday + 5) % 7);
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

  // Last piece of the year
  christmas_new = get_christmas_date(year + 1);
  christmas_new_weekday = get_christmas_weekday(christmas_new);
  xmas_new_weekday = christmas_new.getDay();

  advent_new = new Date(christmas_new.getTime() - ((get_christmas_weekday(christmas_new) + 21) * day_in_ms));
  advent_new_duration = 21 + christmas_new_weekday;
  christmas_new_time_duration = 19 - ((christmas_new_weekday + 5) % 7);

  tempus_per_annum_after_pentecost_duration = ((advent_new - pentecost) / day_in_ms);
  num_after_epiphany = Math.floor((tempus_per_annum_until_septuagesima -1 )/ 7) + 1;

  dominica_xxiij = new Date(trinitas.getTime() + ( 23 * 7 ) * day_in_ms);
  dominica_ultima = new Date(advent_new.getTime() - 7  * day_in_ms);
  num_after_dom_xxiij = Math.floor((dominica_ultima - dominica_xxiij) / day_in_ms) + 1;

  // Sum of Sundays after Epiphany. If it eq. 5, one is missing
  if ( num_after_epiphany < 6 && ( num_after_epiphany + (num_after_dom_xxiij / 7) == 5 )) extra_sunday = 1; else extra_sunday = 0; 

  ///////////////////|\\\\\\\\\\\\\\\\\
  //// Creating the actual content  \\\\
  //////////////////|||\\\\\\\\\\\\\\\\\\

  // Advent:
  content = content.concat(period(2, new Date(first_sunday_of_advent.getTime() - (1 * day_in_ms)), 'pa_', 23, 6, 0));

  content = content.concat(period(advent_duration+1, first_sunday_of_advent, 'adv_', 0, 0, 0));

  // Christmas time:
  content = content.concat(period(christmas_time_duration+1, christmas, 'christmas_', 0, xmas_weekday, 0));

  // Tempus per Annum until Septuagesima:
  content = content.concat(period(tempus_per_annum_until_septuagesima+1, baptism, 'pe_', 0, 0, extra_sunday));

  // Septuagesima Period:
  content = content.concat(period(17+1, septuagesima, 'sept_', 0, 0, 0));

  // Lent:
  // Days after Ash wednesday:
  content = content.concat(period(4+1, ash_wednesday, 'ash_', 0, 3, 0));
  // Rest of Lent:
  content = content.concat(period(42+1, new Date(ash_wednesday.getTime() + (4 * day_in_milliseconds)), 'lent_', 0, 0, 0));

  // Paschaltide:
  content = content.concat(period(56+1, easter, 'tp_', 0, 0, 0));

  // Tempus per Annum after Pentecost (23 weeks):
  content = content.concat(period( 23 * 7 + 1, new Date(easter.getTime() + (56 * day_in_ms)), 'pa_', 0, 0, 0));

  // Remaining Sundays after Epiphany:
  content = content.concat(period(num_after_dom_xxiij+1, dominica_xxiij, 'pe_', num_after_epiphany + extra_sunday, 0, 0));
  
  // Dominica xxiv. et ultima post Pentecosten et hebdomada ejus:
  content = content.concat(period(((advent_new - dominica_ultima) / day_in_ms)+1, dominica_ultima, 'pa_', 23, 0, 0));

  // New Advent time
  content = content.concat(period(advent_new_duration+1, advent_new, 'adv_', 0, 0, 0));

  // New Christmas time:
  content = content.concat(period(christmas_new_time_duration+1, christmas_new, 'christmas_', 0, xmas_new_weekday, 0));

  content = content.concat('<div class="body text-justify">num_after_epiphany = ' + num_after_epiphany + "  |  num_after_dom_xxiij = " + (num_after_dom_xxiij/7) + "  |  extra Sunday = " + extra_sunday + "  |  Sum of all days = " + (advent_duration + christmas_time_duration + tempus_per_annum_until_septuagesima + 280 + num_after_dom_xxiij + ((advent_new - dominica_ultima) / day_in_ms)) + "<br>Window inner width = " + window.innerWidth + ", Screen width = " + screen.width + ", Ratio = " + (window.innerWidth/screen.width).toFixed(2) + ". " + '</div>');


  $('#ordo').html(content);

  replace();
}

