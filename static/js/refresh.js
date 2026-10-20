function refresh_ordo(year, display_format) {
  content = "";

  christmas = get_christmas_date(year - 1);
  christmas_weekday = get_christmas_weekday(christmas);
  xmas_weekday = christmas.getDay(); // getting real Christmas weekday to get correct starting day
  first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  year = first_sunday_of_advent.getFullYear();
  month = first_sunday_of_advent.getMonth();
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
  baptism = new Date(christmas.getTime() + (christmas_time_duration * day_in_ms));

  // Septuagesima:
  easter = get_easter_date(year + 1);
  septuagesima = new Date(easter.getTime() - (63 * day_in_ms));
  septuagesima = new Date(septuagesima.getTime() - (septuagesima.getTimezoneOffset() * 60 * 1000));

  // Ash Wednesday:
  easter = get_easter_date(year + 1);
  ash_wednesday = new Date(easter.getTime() - (46 * day_in_ms));
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
  content = content.concat(period(christmas_time_duration+1, christmas, 'christmas_', 0, xmas_weekday, extra_sunday));

  // Tempus per Annum until Septuagesima:
  content = content.concat(period(tempus_per_annum_until_septuagesima+1, baptism, 'pe_', 0, 0, extra_sunday));

  // Septuagesima Period:
  content = content.concat(period(17+1, septuagesima, 'sept_', 0, 0, 0));

  // Lent:
  // Days after Ash wednesday:
  content = content.concat(period(4+1, ash_wednesday, 'ash_', 0, 3, 0));
  // Rest of Lent:
  content = content.concat(period(42+1, new Date(ash_wednesday.getTime() + (4 * day_in_ms)), 'lent_', 0, 0, 0));

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
  content = content.concat(period(7+1, christmas_new, 'christmas_', 0, xmas_new_weekday, 0));

  content = content.concat('<div class="body text-justify">num_after_epiphany = ' + num_after_epiphany + "  |  num_after_dom_xxiij = " + (num_after_dom_xxiij/7) + "  |  extra Sunday = " + extra_sunday + "  |  Sum of all days = " + (advent_duration + christmas_time_duration + tempus_per_annum_until_septuagesima + 280 + num_after_dom_xxiij + ((advent_new - dominica_ultima) / day_in_ms)) + "<br>Window inner width = " + window.innerWidth + ", Screen width = " + screen.width + ", Ratio = " + (window.innerWidth/screen.width).toFixed(2) + ". " + '</div>');


  $('#ordo').html(content);

  replace();
}

/////////////////////////////////////////////////////
//////    New gen_temporale function     ////////////
/////////////////////////////////////////////////////

function period_gen(duration, start, prefix_tempo, week_start, day_start, extra, output, trans_count) {

    let exaltatio = false;

    for (let i = 0; i < duration - 1; i++) {

        const date = new Date(start.getTime() + i * 24 * 3600 * 1000);

        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth() + 1;

        let ref_tempo =
            prefix_tempo +
            (week_start + Math.ceil((day_start + i + 1) / 7)) +
            '_' +
            ((day_start + i) % 7);

        const ref_sancto =
            String(month).padStart(2, '0') + '_' +
            String(day).padStart(2, '0');

        const trans = /adv_1_0|lent_1_0|lent_6_|tp_1|tp_2_0|tp_6_4|tp_7_6|tp_8_|pa_1_0|pa_1_4|pa_2_5/

        if ((trans.test(ref_tempo)
          && days_sancto[ref_sancto]
          && days_sancto[ref_sancto]['force'] > 60)
        || (trans.test(ref_tempo) && ref_sancto == "06_01")
        || (/lent_5_5/.test(ref_tempo)  
          && /03_(19|20|24)/.test(ref_sancto)))
          // If Dolorosa falls on St. Joseph, it moves to St. Joachim
          // and translates him. Similarly it moves other MM. maj. feasts.
          { 
            trans_count.value++; 
          }

        if (ref_tempo.match(/adv_1_[12]|tp_2_[1-6]|pa_1_[1-6]/) 
          && trans_count.value)
          { // only here the translated feasts are "released"
            trans_count.value--; 
          }

        if (ref_sancto == "09_14") exaltatio = true;
        if (/pa_.._[356]/.test(ref_tempo) && exaltatio) 
          ref_tempo = ref_tempo.replace(/pa_../, "quatember_septembris");
        if (ref_tempo == "quatember_septembris_6") exaltatio = false;

        output[year] ??= {};
        output[year][ref_sancto] = {
          ref_tempo: ref_tempo, 
          translated: trans_count.value
        };
    }
}

function gen_temporale(year) {
  const christmas = get_christmas_date(year - 1);
  const christmas_weekday = get_christmas_weekday(christmas);
  const xmas_weekday = christmas.getDay(); 
  const first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);

  year = first_sunday_of_advent.getFullYear();

  const month = first_sunday_of_advent.getMonth();
  const day_in_ms = 24 * 3600 * 1000;

    
  //////////////////////////////|||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  //  All the temporal variables to determine the correct dates  \\
  //////////////////////////////|||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // Anvent and Christmas:
  const advent_duration = 21 + christmas_weekday;
  const christmas_time_duration = 19 - ((christmas_weekday + 5) % 7);
  const baptism = new Date(christmas.getTime() + (christmas_time_duration * day_in_ms));

  // Septuagesima:
  let easter = get_easter_date(year + 1);
  let septuagesima = new Date(easter.getTime() - (63 * day_in_ms));
  septuagesima = new Date(septuagesima.getTime() - (septuagesima.getTimezoneOffset() * 60 * 1000));

  // Ash Wednesday:
  easter = get_easter_date(year + 1);
  let ash_wednesday = new Date(easter.getTime() - (46 * day_in_ms));
  ash_wednesday = new Date(ash_wednesday.getTime() - (ash_wednesday.getTimezoneOffset() * 60 * 1000));

  // Tempus per Annum until Ash Wednesday: ORIGINAL
  const tempus_per_annum_until_ash_duration = (ash_wednesday - baptism) / (1000 * 3600 * 24) - 1;

  // All variables to determine the correct dates
  const tempus_per_annum_until_septuagesima = Math.floor((septuagesima - baptism) / (1000 * 3600 * 24));
  const pentecost = new Date(easter.getTime() + (49 * day_in_ms));
  const trinitas = new Date(easter.getTime() + (56 * day_in_ms));

  // Last piece of the year
  const christmas_new = get_christmas_date(year + 1);
  const christmas_new_weekday = get_christmas_weekday(christmas_new);
  const xmas_new_weekday = christmas_new.getDay();

  const advent_new = new Date(christmas_new.getTime() - ((get_christmas_weekday(christmas_new) + 21) * day_in_ms));
  const dvent_new_duration = 21 + christmas_new_weekday;
  const christmas_new_time_duration = 19 - ((christmas_new_weekday + 5) % 7);

  const tempus_per_annum_after_pentecost_duration = ((advent_new - pentecost) / day_in_ms);
  const num_after_epiphany = Math.floor((tempus_per_annum_until_septuagesima -1 )/ 7) + 1;

  const dominica_xxiij = new Date(trinitas.getTime() + ( 23 * 7 ) * day_in_ms);
  const dominica_ultima = new Date(advent_new.getTime() - 7  * day_in_ms);
  const num_after_dom_xxiij = Math.floor((dominica_ultima - dominica_xxiij) / day_in_ms) + 1;

  // Sum of Sundays after Epiphany. If it eq. 5, one is missing
  if ( num_after_epiphany < 6 && ( num_after_epiphany + (num_after_dom_xxiij / 7) == 5 )) extra_sunday = 1; else extra_sunday = 0; 

  ///////////////////|\\\\\\\\\\\\\\\\\
  //// Creating the actual content  \\\\
  //////////////////|||\\\\\\\\\\\\\\\\\\

  const output = {};
  //trans_count = 0;
  let trans_count = { value: 0 };

  // Advent:
  period_gen(2, new Date(first_sunday_of_advent.getTime() - (1 * day_in_ms)), 'pa_', 23, 6, 0, output, trans_count);
  
  //console.log("trans_count Adv.", first_sunday_of_advent.getFullYear(), "=", trans_count.value);

  period_gen(advent_duration+1, first_sunday_of_advent, 'adv_', 0, 0, 0, output, trans_count);

  // Christmas time:
  period_gen(christmas_time_duration+1, christmas, 'christmas_', 0, xmas_weekday, extra_sunday, output, trans_count);

  // Tempus per Annum until Septuagesima:
  period_gen(tempus_per_annum_until_septuagesima+1, baptism, 'pe_', 0, 0, extra_sunday, output, trans_count);

  // Septuagesima:
  period_gen(17+1, septuagesima, 'sept_', 0, 0, 0, output, trans_count);

  // Ash Wednesday:
  period_gen(4+1, ash_wednesday, 'ash_', 0, 3, 0, output, trans_count);

  // Lent:
  period_gen(42+1, new Date(ash_wednesday.getTime() + 4 * day_in_ms), 'lent_', 0, 0, 0, output, trans_count);

  //console.log("trans_count Lent", date.getFullYear(), "=", trans_count.value);

  // Paschaltide:
  period_gen(56+1, easter, 'tp_', 0, 0, 0, output, trans_count);

  //console.log("trans_count Pascha", date.getFullYear(), "=", trans_count.value);

  // After Pentecost:
  period_gen(23*7+1, new Date(easter.getTime() + 56 * day_in_ms), 'pa_', 0, 0, 0, output, trans_count);

  // Remaining Sundays after Epiphany:
  period_gen(num_after_dom_xxiij+1, dominica_xxiij, 'pe_', num_after_epiphany + extra_sunday, 0, 0, output, trans_count);

  // Last Sunday after Pentecost:
  period_gen(((advent_new - dominica_ultima) / day_in_ms)+1, dominica_ultima, 'pa_', 23, 0, 0, output, trans_count);

  // New Advent:
  period_gen(advent_new_duration+1, advent_new, 'adv_', 0, 0, 0, output, trans_count);

  // New Christmas:
  period_gen(7+1, christmas_new, 'christmas_', 0, xmas_new_weekday, 0, output, trans_count);

  return output;
}
