function weekday_human_readable(weekday) {
  return ['<span class="dominica">Dominica.</span>', 'Feria II.', 'Feria III.', 'Feria IV.', 'Feria V.', 'Feria VI.', 'Sabbato.'][weekday];
}

function weekday_human_short(weekday) {
  return ['<b>DOM.</b>', 'Fer. II.', 'Fer. III.', 'Fer. IV.', 'Fer. V.', 'Fer. VI.', 'Sabb.'][weekday];
}

function month_human_readable(month) {
  return ['Januarius', 'Februarius', 'Martius', 'Aprilis', 'Majus - Beatæ Mariæ Virgini consecratus', 'Junius - Sacratissimo Cordi D.N.J.C. consecratus', 'Julius', 'Augustus', 'September', 'October', 'November', 'December'][month];
}

function month_human_readable_genitive(month) {
  return ['Januarii', 'Februarii', 'Martii', 'Aprilis', 'Maji', 'Junii', 'Julii', 'Augusti', 'Septembris', 'Octobris', 'Novembris', 'Decembris'][month];
}

function liturgical_color(color) {
  if (color == "white" ) { return '<span class="outline">Alb.</span>';}
  if (color == "violet/white" ) { return '<font color="#9c29c1">Viol.</font>/<span class="outline">Alb.</span>';}
  if (color == "violet/red" ) { return '<font color="#9c29c1">Viol.</font>/<font color="red">Rub.</font>';}
  if (color == "red/violet" ) { return '<font color="red">Rub.</font>/<font color="#9c29c1">Viol.</font>';}
  if (color == "green" ) { return '<font color="green">Vir.</font>';}
  if (color == "violet" ) { return '<font color="#9c29c1">Viol.</font>';}
  if (color == "red" ) { return '<font color="red">Rub.</font>';}
  if (color == "black" || color == "black/black" ) { return '<font color="black">Nig.</font>';}
  if (color == "green/black" ) { return '<font color="green">Vir.</font>/<font color="black">Nig.</font>';}
  if (color == "white/black" ) { return '<span class="outline">Alb.</span>/<font color="black">Nig.</font>';}
  if (color == "red/black" ) { return '<font color="red">Rub.</font>/<font color="black">Nig.</font>';}
  if (color == "violet/black" ) { return '<font color="#9c29c1">Viol.</font>/<font color="black">Nig.</font>';}
  if (color == "black/green" ) { return '<font color="black">Nig.</font>/<font color="green">Vir.</font>';}
  if (color == "black/white" ) { return '<font color="black">Nig.</font>/<span class="outline">Alb.</span>';}
  if (color == "black/red" ) { return '<font color="black">Nig.</font>/<font color="red">Rub.</font>';}
  if (color == "black/violet" ) { return '<font color="black">Nig.</font>/<font color="#9c29c1">Viol.</font>';}
  if (color == "blue" ) { return '<font color="blue">Cær.</font>';}
  else { return '<font color="red">A</font><font color="green">li</font><font color="blue">a.</font>: ' + color; }
}

function is_leap_year(year) {
  if ( year % 4 == 0 && year % 100 != 0 ) { return true; }
  else if ( year % 100 == 0 && year % 400 == 0) { return true; }
  else return false;
}

function get_christmas_date(year) {
  return new Date(year, 11, 25);
}

function get_christmas_weekday(christmas) {
  if ( christmas.getDay() == 0 ) return 7;
  else return christmas.getDay();
}

Object.prototype.in = function() {
    for(var i=0; i<arguments.length; i++)
       if(arguments[i] == this) return true;
    return false;
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

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

function get_littera_dominicalis(year) {
  var letters = ["A","G","F","E","D","C","B","A"];
  new_year = new Date(year, 0, 1).getDay();
  if (is_leap_year(year)) return letters[new_year]+letters[new_year+1];
  else return letters[new_year];
}

function add_zero(number) {
  zero = '';
  if (number < 10) {
    zero = '0';
  }
  return zero;
}

const matchCount = (str, re) => {
    // str - string
    // re - RegEx
    return str?.match(re)?.length ?? 0;
    };

function getComm(str) {
  // str - string, usually laudes or vesperae
  // Function counts the "&" sign to determine, how many Comm. are present
  count = 0;
  if (str.match("Com. ")) count++;
  if (str.match("sine Com.")) return 0;
  for (ind = 0; ind < str.length; ind++) {
      if (str[ind] == "&") count++ }
  return count;
  };

function roman_upper_to_lower(str) {
  str = str.replaceAll("X","x");
  str = str.replaceAll("V","v");
  str = str.replaceAll("C","c");
  str = str.replaceAll("I","i"); 

  var pos = str.lastIndexOf('i');
  if (str.match("i")) str = str.substring(0,pos) + 'j' + str.substring(pos+1)

  return str;
  };

function translate_feria(ref_tempo, short) {
  roman_lowercase_numerals = ["j.","ij.","iij.","iv.","v.","vj.","vij.","viij.","ix.","x."];
  ref = ref_tempo.split("_");
  tempus = " ";
  tempus = ( ref[0] == "adv" ) ? " Adv." : tempus;
  tempus = ( ref[0] == "christmas" ) ? " Nat." : tempus;
  tempus = ( ref[0] == "lent" ) ? " Quadr." : tempus;
  tempus = ( ref[0] == "pe" ) ? " post Epiph." : tempus;
  tempus = ( ref_tempo.match("sept_1") ) ? " Septuag." : tempus;
  tempus = ( ref_tempo.match("sept_2") ) ? " Sexag." : tempus;
  tempus = ( ref_tempo.match("sept_3") ) ? " Quinquag." : tempus;
  tempus = ( ref_tempo.match("ash_1_3") ) ? " Cinerum." : tempus;
  tempus = ( ref_tempo.match(/ash_1_[456]/) ) ? " post Cineres." : tempus;
  tempus = ( ref_tempo.match(/lent_5/) ) ? " Passionis." : tempus;
  tempus = ( ref[0] == "tp" ) ? " Paschæ" : tempus;
  tempus = ( ref[0] == "pa" ) ? " post Pent." : tempus;
  if ( ref[0] == "sept" ) 
    feria_readable = "Fer. " + roman_lowercase_numerals[ref[2]] + " post Dom. " + tempus;
  else if ( ref[0] == "ash" ) 
    feria_readable = "Fer. " + roman_lowercase_numerals[ref[2]] + tempus;
  else if ( ref[0] == "lent" ) 
    feria_readable = "Fer. " + roman_lowercase_numerals[ref[2]] + " infra hebd. " + roman_lowercase_numerals[ref[1]-1] + tempus;
  else if ( ref[0].match(/quatember/) ) 
    feria_readable = "Fer. " + roman_lowercase_numerals[ref[2]] + " Quatuor Temporum"
  else if ( ref[0] == "tp" ) 
    feria_readable = "Fer. " + roman_lowercase_numerals[ref[2]] + " infra hebd. " + roman_lowercase_numerals[ref[1]-2] + tempus;
  else feria_readable = "Fer. " + roman_lowercase_numerals[ref[2]] + " post Dom. " + roman_lowercase_numerals[ref[1]-1] + tempus;
  if ( ref[2] == "0" ) feria_readable = "Dom. " + roman_lowercase_numerals[ref[1]-1] + tempus;
  feria_short = "Fer. " + roman_lowercase_numerals[ref[2]];

  feria_short = feria_short.replace("Fer. vij.","Sabb.");
  feria_readable = feria_readable.replace("Fer. vij.","Sabb.");
  feria_short = feria_short.replace("Fer. j.","Dom.");
  feria_readable = feria_readable.replace("Fer. j. post ","");
  if (ref_tempo.match(/tp_6_[123]/)) feria_readable = feria_readable.replace("infra hebd. v. Paschæ","Rogationum");

  if (short) return feria_short;
  else return feria_readable;
  }

function antiphon_sabb(sabb_mensis, month_sabb) {
  // sabb_mensis = Saturday in month (1 through 5)
  // month_sabb = month according to the Antiphonary. NB: January = 0!
  month_sabb++;
  // August:
  if (sabb_mensis == 1 && month_sabb == 8) return "Sapiéntia ædificávit.";
  else if (sabb_mensis == 2 && month_sabb == 8) return "Omnis sapiéntia.";
  else if (sabb_mensis == 3 && month_sabb == 8) return "Sapiéntia clámitat.";
  else if (sabb_mensis == 4 && month_sabb == 8) return "Atténde, fili mi.";
  else if (sabb_mensis == 5 && month_sabb == 8) return "Dóminus possédit me.";
  // September
  else if (sabb_mensis == 1 && month_sabb == 9) return "Cum audísset Job.";
  else if (sabb_mensis == 2 && month_sabb == 9) return "Quare detraxístis.";
  else if (sabb_mensis == 3 && month_sabb == 9) return "Ne reminiscáris.";
  else if (sabb_mensis == 4 && month_sabb == 9) return "Adónai.";
  else if (sabb_mensis == 5 && month_sabb == 9) return "Adónai."; // Nisi sit dimitténda eo quod proximior sit Kalendis Octobris.
  // October
  else if (sabb_mensis == 1 && month_sabb == 10) return "Adapériat.";
  else if (sabb_mensis == 2 && month_sabb == 10) return "Exáudiat Dóminus.";
  else if (sabb_mensis == 3 && month_sabb == 10) return "Ornavérunt.";
  else if (sabb_mensis == 4 && month_sabb == 10) return "Tu, Dómine universórum.";
  else if (sabb_mensis == 5 && month_sabb == 10) return "Tua est poténtia."; // Nisi sit dimitténda eo quod proximior sit Kalendis Novembris.
  // November
  else if (sabb_mensis == 1 && month_sabb == 11) return "Vidi Dóminum sedéntem.";
  else if (sabb_mensis == 2 && month_sabb == 11) return "Aspice Dómine.";
  else if (sabb_mensis == 3 && month_sabb == 11) return "Super muros tuos.";
  else if (sabb_mensis == 4 && month_sabb == 11) return "Muro tuo.";
  else if (sabb_mensis == 5 && month_sabb == 11) return "Qui coelórum cóntines thronos.";
  else return "alia Antiphona."
  }

function get_ref_sancto(offset)
  { 
    var date_temp = new Date(date.valueOf());
    date_temp.setDate(date_temp.getDate() + offset);

    day_temp = date_temp.getDate();
    month_temp = date_temp.getMonth() + 1;

    ref_sancto_n = add_zero(month_temp) + month_temp + '_' + add_zero(day_temp) + day_temp;

    return ref_sancto_n;
  }

function get_ref_tempo(offset, prefix_tempo, week_start, day_start, duration)
  { // Currently, this function works only about a month from the asking date
    // Variables used here can be found in "refresh.js"
    ref_tempo_n = prefix_tempo + (week_start + Math.ceil((i + 1 + day_start + offset) / 7)) + '_' + ((day_start + i + offset) % 7);

      ref_tempo_n = ( ref_tempo_n == "tp_9_0") ? "pa_1_0" : ref_tempo_n;
      if (ref_tempo_n.match("tp_9")) ref_tempo_n = ref_tempo_n.replace("tp_9", "pa_1");
      if (ref_tempo_n.match("tp_10")) ref_tempo_n = ref_tempo_n.replace("tp_10", "pa_2");
      if (ref_tempo_n.match("tp_11")) ref_tempo_n = ref_tempo_n.replace("tp_11", "pa_3");
      if (ref_tempo_n.match("tp_12")) ref_tempo_n = ref_tempo_n.replace("tp_12", "pa_4");

      if ( ref_tempo_n.match("lent_") && (i+offset) > (duration-2) )
        {
          jj = i + offset - duration + 2;

          if ( (i + offset) <= (duration + 56 - 2) )
            { ref_tempo_n = "tp_" + ( Math.ceil(jj / 7) ) + '_' + ((i + offset) % 7); }
          else { ref_tempo_n = "pa_" + ( Math.ceil((0 + jj + 1)/ 7)) + '_' + (jj % 7); } // not tested, probably wrong
        }

      if ( ref_tempo_n.match("ash_") && (i+offset) > (duration-2) )
        {
          jj = i + offset - duration + 2;

          if ( ((i + offset) <= (duration + 42 - 2)) )
            { ref_tempo_n = "lent_" + ( Math.ceil(jj / 7) ) + '_' + ((i + offset + 3) % 7); }
          else { ref_tempo_n = "tp_" + ( Math.ceil((0 + jj + 1)/ 7)) + '_' + (jj % 7); } // not tested, probably wrong
        }

      if ( ref_tempo_n.match("sept_") && (i+offset) > (duration-2) )
        {
          jj = i + offset - duration - 4 + 2;

          if ( (i + offset) < (duration + 4 - 1) ) // post Epiphaniam + Septuagesima
            { ref_tempo_n = "ash_1" + '_' + ((i+offset) % 7); }
          else if ( ((i + offset) >= (duration + 4 - 2)) && ((i + offset) <= (duration + 42 - 2)))
            { ref_tempo_n = "lent_" + ( Math.ceil(jj / 7) ) + '_' + ((i+offset) % 7); }
          else { ref_tempo_n = "tp_" + ( Math.ceil((0 + jj + 1)/ 7)) + '_' + (jj % 7); } // not tested, probably wrong
        }

      if ( ref_tempo_n.match("pe_") && (i+offset) > (duration-2) && month_usual_number < 9 )
        {
          jj = i + offset - duration + 1;

          if ( (i + offset) < (duration + 17 - 1) ) // post Epiphaniam + Septuagesima 
            { ref_tempo_n = "sept_" + ( Math.ceil((jj + 1)/ 7) ) + '_' + (jj % 7); }
          else if ( ((i + offset) >= (duration + 17 - 2)) && ((i + offset) <= (duration + 17 + 4 - 2))) // Septuagesima has 17 days
            { ref_tempo_n = "ash_1" + '_' + (jj % 7);}
          else { ref_tempo_n = "lent_" + ( Math.ceil((jj + 1 - tempus_per_annum_until_septuagesima)/ 7)) + '_' + (jj % 7); }
        }

      if ( ref_tempo_n.match("christmas_") && (i+offset) == (duration-2) ) weekday_end_c = ( ((day_start + i + offset) % 7))
      if ( ref_tempo_n.match("christmas_") && (i+offset) > (duration-2) )
        {
          if ( (i + offset) < (duration + tempus_per_annum_until_septuagesima - 2) ) { 
            jj = i + offset - duration + 2;
            ref_tempo_n = "pe_" + ( 0 + Math.ceil((jj + weekday_end_c + 1)/ 7) - 1) + '_' + ((weekday_end_c + jj) % 7); }
          else { 
            kk = i + offset - christmas_time_duration - tempus_per_annum_until_septuagesima + 1;
            ref_tempo_n = "sept_" + ( 0 + Math.ceil((jj + weekday_end_c + 1)/ 7) - 1) + '_' + ((weekday_end_c + kk) % 7); }
        }

      if ( ref_tempo_n.match("adv_") && (i+offset) == (duration-2) ) weekday_end_a = ( ((day_start + i + offset) % 7))
      if ( ref_tempo_n.match("adv_") && (i+offset) > (duration-2) )
        {
          jj = i + offset - duration + 2; // beginning of Christmas cycle from Advent
          ref_tempo_n = "christmas_" + ( 0 + Math.ceil((jj + day_start + weekday_end_a + 1)/ 7)) + '_' + ((weekday_end_a + jj) % 7);
        }

      if ( month_usual_number > 9 && ref_tempo_n.match("pe_")) ref_tempo_n = ref_tempo_n.replace("pe_7_", "pa_24_");

      //ref_tempo_n = ( ref_tempo_n == "ash_2_0") ? "lent_1_0" : ref_tempo_n;
      ref_tempo_n = ( ref_tempo_n == "lent_7_0") ? "tp_1_0" : ref_tempo_n;
      ref_tempo_n = ( ref_tempo_n == "pe_7_0" && month_usual_number > 9) ? "pa_24_0" : ref_tempo_n;
      ref_tempo_n = ( ref_tempo_n == "pa_25_0") ? "adv_1_0" : ref_tempo_n;

      return ref_tempo_n;
  }

function get_winner(ref_tempo, ref_sancto) {
  winner = days_tempo[ref_tempo];
  if ( !days_tempo[ref_tempo] ) { winner = days_sancto[ref_sancto]; }
  if (days_sancto[ref_sancto] && days_tempo[ref_tempo] && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force']) {
    winner = days_sancto[ref_sancto];
  }
  return winner;
}

function get_commemoratio(ref_tempo, ref_sancto) {
  // In Traditional Rites, after the winner is determined, the "loser" is commemorated. 
  // Only if the "loser" is a common Feria, we don't commemorate it.
  winner = days_tempo[ref_tempo];
  commemoratio = "";
  if (days_sancto[ref_sancto] && days_tempo[ref_tempo] && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force'])   {
    winner = days_sancto[ref_sancto]; }
  if (winner == days_sancto[ref_sancto] && days_tempo[ref_tempo]['force'] != 10) { commemoratio = days_tempo[ref_tempo]; }
  if (winner == days_tempo[ref_tempo]) { commemoratio = days_sancto[ref_sancto]; }
  return commemoratio;
}

////// Global Variables... \\\\\\

const lectiones = ["", "usque ad Circumcisionem legitur ex <i>Isaia</i>",
  "usque ad Dom. Septuagesima legitur ex <i>Epistolis S. Pauli</i>",
  "usque ad Dom. Passionis legitur ex <i>Genesi</i>, et libris sequentibus usque ad Libros <i>Regum</i>",
  "usque ad Pascha legitur ex Libro <i>Jeremiae</i> et <i>Baruch</i>",
  "usque ad Pentecosten legitur ex <i>Actibus Apostolorum, Apocalypsis</i> et <i>Epistulis Canonicis</i>. Quibus subjungi poterit quod superest de Libris <i>Moysi, Josue, Judicum</i> et <i>Ruth</i>",
  "usque ad Dom. primam Augusti legitur ex Libris <i>Regum, Paralipomenon</i> et <i>Esdrae</i>",
  "usque ad Dom. primam Septembris leguntur quinque Libri <i>Sapientiae</i>",
  "usque ad Dom. primam Octobris legitur ex Libris <i>Job, Tobias, Judith</i> et <i>Esther</i>",
  "usque ad Dom. primam Novembris legitur ex duobus Libris <i>Machabaeorum</i> et quatuor Libris <i>Evangeliorum</i>, omissis <i>Passionibus</i>",
  "usque ad Dom. primam Adventus legitur ex Libris <i>Ezechiel, Daniel</i> et duodecim <i>Prophetis</i>"];

/////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////---... Variables declared for every possibly translated feast ...---\\\\\
//||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//////////////////////////////////||\\

var translated_annivers = false;
var translated_matthias = false;
var quatember_septembris = false;
var moved = [];
var sabb_mensis = 0;
var vigil_novembris = 0;
var titulus_dom = "";
var noct_defunct_counter = 1;
var weekday_end_a = 0;  // Advent
var weekday_end_c = 0;  // Christmas

var off_mensis = false;
var off_feriale = false;
var off_s_bernardi = true;
var off_ss_sacramenti = true;

var OM_dates = [];
var date_s_bernardi = "";
var winter_hymns = true;

var check_next_new = "";
var check_next_tempo = "";

var lectio_ref = 0;
var lectio_ref_prev = 0;
var dominica_prima = false;
var tricenarium_requiem = false;
var pro_defunctis = true;

const roman_lc = ["nullus","j.","ij.","iij.","iv.","v.","vj.","vij.","viij.","ix.","x."];
const roman_uc = ["NULLUS","I.","II.","III.","IV.","V.","VI.","VII.","VIII.","IX.","X."];

// Days of Officium mensis throughout the years. If not present here, Officium mensis is not added.
OM_dates['2024'] = "2024,30,7,11,10,23,20,19,26,5,24,6,11;"
OM_dates['2025'] = "2025,29,7,11,10,23,20,19,26,5,30,28,2;" // draft for testing only


function period(duration, start, prefix_tempo, week_start, day_start, extra) {
  // This function returns the HTML code of a liturgical period (Advent, Lent, Per Annum, etc.).
  // duration (Integer): Number of days of the period.
  // start (Date): Start date of the period.
  // prefix_tempo (String): Prefix of the day_tempo to search. Week and day will be added incrementally to this prefix.
  //     E.g.: 'pa_1_0', 'pa_1_1', 'pa_1_2'… 'pa_2_0', 'pa_2_1', etc.
  // week_start (Integer): At which week to start the increment.
  //     E.g., for Tempus per annum after Pentecost, it can be 7 or 8 etc.
  // day_start (Integer): At which day to start the increment.
  //     E.g., for days after Ash, it will be 3.
  // extra: for now, an extra Sunday that may or may not come to Thursday before LXX
  html = "";
  year = start.getFullYear();
  month = start.getMonth();
  for (i = 0; i < (duration-1); i++) {
    date = new Date(start.getTime() + (i * 24 * 3600 * 1000));
    day = date.getDate();
    weekday = date.getDay();
    week_number = date.getWeek();
    month_usual_number = date.getMonth() + 1;
    ref_tempo = prefix_tempo + (week_start + Math.ceil((day_start + i + 1) / 7)) + '_' + ((day_start + i) % 7);
    ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    
    // zeroing moved feasts at the start of liturgical year.
    if (ref_tempo.match("adv_1_0")) moved = []; 

    // zeroing Officium feriale, S. Bernardi and SS. Sacramenti
    if (day == 1) {
      off_mensis = false;
      off_feriale = false;
      off_s_bernardi = true;
      off_ss_sacramenti = true; }


    ref_tempo_next = get_ref_tempo(1, prefix_tempo, week_start, day_start, duration);
    ref_sancto_next = get_ref_sancto(1);

    ///////// Quatuor Temporum Septembris (Quatember) \\\\\\\\\\
    if (weekday == 3 && month_usual_number == 9 && day > 14 && day < 22) {
      ref_tempo = 'quatember_septembris_3'; quatember_septembris = true; }
    if (weekday == 5 && quatember_septembris ) 
      ref_tempo = 'quatember_septembris_5';
    if (weekday == 6 && quatember_septembris ) 
      ref_tempo = 'quatember_septembris_6'; 

    if (weekday == 2 && month_usual_number == 9 && day > 13 && day < 21) {
      ref_tempo_next = 'quatember_septembris_3'; quatember_septembris = true; }
    if (weekday == 4 && quatember_septembris ) 
      ref_tempo_next = 'quatember_septembris_5';
    if (weekday == 5 && quatember_septembris ) 
      ref_tempo_next = 'quatember_septembris_6'; 

    /////  Vigilia S. Matthæi, if it falls on Sunday \\\\\
    if (ref_sancto == "09_19" && weekday == 6) { ref_sancto += "v"; }
    if (ref_sancto == "09_20" && weekday != 0) { ref_sancto += "v"; }

    /////  Vigilia S. Andreæ, if it falls on Sunday \\\\\
    if (ref_sancto == "11_28" && weekday == 6) { ref_sancto += "v"; }
    if (ref_sancto == "11_29" && weekday != 0) { ref_sancto += "v"; }

    /////  Beginning of Tricenarium solemne  \\\\\
    if (ref_sancto == "09_17" && weekday != 6) { ref_sancto_next += "tr"; }
    if (ref_sancto == "09_18" && weekday != 0) { ref_sancto += "tr"; }

    if (ref_sancto == "09_19" && weekday == 1) { ref_sancto_next = "09_18tr"; }
    if (ref_sancto == "09_20" && weekday == 2) { ref_sancto = "09_18tr"; }



    /////////////////////////////////////////////////////
    ///////////////  Let's find a WINNER  ///////////////
    /////////////////////////////////////////////////////

    commemoratio_next = get_commemoratio(ref_tempo_next, ref_sancto_next);
    commemoratio = get_commemoratio(ref_tempo, ref_sancto);
    
    winner_next = get_winner(ref_tempo_next, ref_sancto_next); 
    winner = get_winner(ref_tempo, ref_sancto);
    feria = days_tempo[ref_tempo];

    
      //////////////////////////////////////////////////////
     ////////////////    MOVABLE FEASTS   /////////////////
    //////////////////////////////////////////////////////

    translated = false;
    translated_vesperae_j = false;
    deleted_vesperae_j = false;
    trans_vesperae = "";
    martyrologium = "";
    comm_martyrologium = "";
    commemoratio_vesperae = "";
    commemoratio_add = [];
    comm_vesperae = "";
    comm_vesperae_j = "";
    comm_missa = "";
    secunda_comm = "";
    subtitulum = "";
    trans_before = "";
    after_ChR = "";
    no_comm_laudes = false;
    today_wins = true;
    tricenarium_vesperae = false;
    tricenarium = false;
    Christus_Rex = false;
    Christus_Rex_vespera = false;

    //////  Some special cases  \\\\\\
    // Around Christmas
    if (ref_sancto == "12_23" && weekday == 6) {
      winner_next = days_sancto["12_24s"]; commemoratio_next = ""; }

    if (ref_sancto == "12_24") {
      if (weekday == 0) winner = days_sancto["12_24s"]; 
      commemoratio = ""; }

    if (month_usual_number == 12 && day > 24 && !(day == 29 || day == 31) ) commemoratio = "";

    ////// Removing Commemorations during the Holy Week and Easter Octave

    // Translating feasts MM. maj. and higher during Holy Week and Easter Octave
    if ( commemoratio && ref_tempo.match(/lent_6_|tp_1/) && commemoratio['force'] > 50 )
      {
        moved.push(ref_sancto);
        trans_titulum = commemoratio['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Octavam Paschæ."
        commemoratio = "";
      }

    // Translating feasts MM. maj. and higher during Pentecost Octave
    if ( commemoratio && ref_tempo.match(/tp_7_6|tp_8|pa_1_0/) && commemoratio['force'] > 50 )
      {
        moved.push(ref_sancto);
        trans_titulum = commemoratio['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Octavam Pentecostes."
        commemoratio = "";
      }

    // Translating feasts MM. maj. on Ascension of Our Lord and Corpus Christi
    if ( commemoratio && ref_tempo.match(/tp_6_4|pa_1_4/) && commemoratio['force'] > 50 )
      {
        moved.push(ref_sancto);
        trans_titulum = commemoratio['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur in primam diem non impeditam."
        commemoratio = "";
      }

    // Octava Corporis Christi. See Ant. cist. II, p. 71
    // Only Sermones are celebrated, xij. Lect and MM. get translated, 
    // lower commemorated. Altovadum: only MM. maj. get translated.
    if ( commemoratio && ref_tempo.match(/pa_2_4/) && commemoratio['force'] > 60 && commemoratio['force'] < 90 )
      {
        moved.push(ref_sancto);
        trans_titulum = commemoratio['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur in primam diem non impeditam."
        commemoratio = "";
      }

    // Completely removing feasts iij. Lect. and lower during Holy Week and Monday and Tuesday of Easter Octave
    if ( commemoratio && ( ref_tempo.match(/lent_6_[3456]|tp_1_[012]|tp_6_4|tp_7_6|tp_8_[012]|pa_1_0|pa_1_4|pa_2_5/) ))
      { trans_titulum = commemoratio['header'].split(",", 1);
        trans_before = "Nihil fit hoc anno de festo " + trans_titulum + "."; 
        commemoratio = ""; }

    // Translating every feast higher than MM. min. that falls on Sunday
      if ( weekday == 0 && winner == days_sancto[ref_sancto] && winner['force'] > 60 && winner['force'] <= 80 && !ref_tempo.match(/christmas|pa_|pe_/i) && !ref_sancto.match(/12_08/))
      {
        moved.push(ref_sancto);
        trans_titulum = winner['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Dominicam."
        winner = feria;
        commemoratio = "";
      }  

    // Translating every feast higher than MM. maj. that falls on Sunday, that will overrank it
      if ( weekday == 0 && commemoratio && commemoratio['force'] > 60 && ref_tempo.match(/adv_|lent_/i) && !ref_sancto.match(/12_08/))
      {
        moved.push(ref_sancto);
        trans_titulum = commemoratio['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Dominicam."
        winner = feria;
        commemoratio = "";
      }  

    // Determining, whether we celebrate the Tricenarium magnum or not
    // On Sundays and Feast Days, no Vesperæ Defunctorum
    if ( ((day >= 18 && month_usual_number == 9)||(day < 18 && month_usual_number == 10)) && (winner_next['force'] < 30 || (ref_tempo_next.match("quatember_septembris") && winner_next['force'] < 40 )) && winner['force'] <= 30 ) tricenarium_vesperae = true;

    if ( ((day > 18 && month_usual_number == 9)||(day < 18 && month_usual_number == 10)) && (winner['force'] < 30 || (ref_tempo.match("quatember_septembris") && winner['force'] < 40)) ) { tricenarium = true; }


    // "Returning" translated feasts on Monday that is not in Holy Week and any Octave
    if ( weekday > 0 && moved.length > 0 && !ref_tempo.match(/lent_6_|tp_1_/) 
         && winner['force'] < 40 ) {
        top_moved = 0;
        for (j = 0; j < moved.length; j++)
          { // we need to find the highest ranking feast in moved[]
            if (j == 0) force_temp_prev = 0;
            win_temp = days_sancto[moved[j]];
            if ( win_temp['force'] > force_temp_prev ) {
              top_moved = j;
              force_temp_prev = win_temp['force']; }
          }
        if (winner['force'] != 10 ) commemoratio = winner;
        winner = days_sancto[moved[top_moved]]; 
        moved.splice(top_moved,1);
        translated = true;
        if (winner == days_sancto['anniversarium_dedicationis'] && days_sancto[ref_sancto]) 
            commemoratio = days_sancto[ref_sancto];
        } 

    // First Vespers (probably just copy previous function without splicing the "moved" Array)
    if ( moved.length > 0 && !ref_tempo.match(/lent_6_|tp_1_|tp_7_6|tp_8_/) 
         && winner_next['force'] < 40 ) {
        top_moved = 0;
        for (j = 0; j < moved.length; j++)
          {
            if (j == 0) force_temp_prev = 0;
            win_temp = days_sancto[moved[j]];
            if ( win_temp['force'] > force_temp_prev ) {
              top_moved = j;
              force_temp_prev = win_temp['force']; }
          }
        winner_next = days_sancto[moved[top_moved]]; 
        translated_vesperae_j = true;
        }

    // Anniversarium Dedicationis Ecclesiæ Altovadensis 1. 6. (pokud přijde do svatodušního Oktávu)

    if ( ref_sancto == "05_31" ) {
        if (ref_tempo.match(/tp_6_6|tp_7_6|tp_8_/)) {
          moved.push('anniversarium_dedicationis');
          trans_before = "Festum Dedicationis Ecclesiæ Altovadensis translatum post Octavam Pentecostes."; }
        else {
          winner_next = days_sancto['anniversarium_dedicationis'];
          commemoratio_next = days_sancto[ref_sancto_next]; }
        }
    if ( ref_sancto == "06_01" && !ref_tempo.match(/tp_7_0|tp_7_6|tp_8_/) ) {
          commemoratio = days_sancto[ref_sancto];
          winner = days_sancto['anniversarium_dedicationis']; }

    ////  Angeli Custodes in September (Sunday, main text) \\\\
    if ( weekday == 0 && (month_usual_number == 9 && day < 8) ) {
        // There is a bug, where the first of a month, the month number remains of the old month, and I don't want to fix it, as I don't know, what it may break...
        winner = days_sancto['angeli_custodes_sept'];
        commemoratio = days_sancto[ref_sancto]; 
        }

    ///////////  Sunday after Epiphany that doesn't fit:  ///////////
    // Sets the anticipated Sunday to previous Thursday
    if ( extra == 1 && i == (duration - 3) )
      {
        next_sunday = "pe_" + (1 + week_start + Math.ceil((i + 1) / 7)) + '_0';
        winner = days_tempo[next_sunday];
        commemoratio = days_sancto[ref_sancto]; 
      }
    
    ///// SS. Nominis Jesu // Day alone /////
    if ( ref_sancto == "01_02" && weekday < 3 ) { winner = days_tempo['nomen_jesu']; }
    if ( (ref_sancto == "01_03" || ref_sancto == "01_04" ) && weekday == 0 ) { winner = days_tempo['nomen_jesu']; }
    if ( ref_sancto == "01_05" && weekday == 0 ) { 
        winner = days_tempo['nomen_jesu']; 
        commemoratio = days_sancto['01_05']; }

    ////// S. Matthias ///////
    if ( ref_sancto == "02_24" && !is_leap_year(year) ) { winner = days_sancto['matthias']; commemoratio = days_tempo[ref_tempo];}
    if ( ref_sancto == "02_25" && is_leap_year(year) && weekday != 0 ) { winner = days_sancto['matthias']; commemoratio = days_tempo[ref_tempo];}
    if ( ((ref_sancto == "02_25" && is_leap_year(year)) || (ref_sancto == "02_24" && !is_leap_year(year))) && weekday == 0 ) {translated_matthias = true; trans_before = "Festum S. Matthiæ translatum in Feriam ij.";}
    if ( translated_matthias && weekday == 1 ) { winner = days_sancto['matthias']; commemoratio = days_tempo[ref_tempo]; translated_matthias = false; translated = true; }
    // second Vespers on translated feast: + St. Mechtildis: at the end of Vesper section

    //////  Vigiliæ: Translated if on Sunday  \\\\\\\

    vigilia_sabb = false; // do not delete, used further in the text

    saints_tomorrow = days_sancto[ref_sancto_next];
    if (weekday == 6 && saints_tomorrow && saints_tomorrow['header'].match(/Vig[ií]lia/i) && saints_tomorrow['force'] > winner['force'] && ref_sancto != "12_23" ) {
      commemoratio = days_sancto[ref_sancto];
      winner = days_sancto[ref_sancto_next]; vigilia_sabb = true;}

    if (weekday == 0 && commemoratio && commemoratio['header'].match(/Vig[ií]lia/i)) { commemoratio = ""; }

    // Let's find out, whether (translated) Vigilia falls on Saturday
    vigilia_sabb = false;
    after_tomorrow = days_sancto[get_ref_sancto(2)];
    if (after_tomorrow && after_tomorrow['header'].match(/Vig[ií]lia/i)) vigilia_sabb = true;

    // For Vigil of St. Peter and Paul, if it falls on Sunday, it will be translated to Saturday, but Comm. of St. Leo will remain on Sunday. Therefore following lines...

    if (ref_sancto == "06_28" && weekday != 0) {
        winner = days_sancto[ref_sancto + "v"];
        commemoratio = days_sancto[ref_sancto]; }
    if (ref_sancto == "06_27" && weekday == 6) {
        winner = days_sancto["06_28v"];
        commemoratio = days_sancto[ref_sancto]; }
    if (ref_sancto == "06_26" && weekday == 5) vigilia_sabb = true;

    /////  Vigilia S. Jacobi, if it falls on Sunday \\\\\
    if (ref_sancto == "07_23" && weekday == 6) {
        commemoratio = days_sancto['07_23v']; }

    /////  Vigilia S. Laurentii, if it falls on Sunday \\\\\
    if (ref_sancto == "08_08" && weekday == 6) { winner = days_sancto['08_08v']; }
    // To deal with S. Roman, if Vigil. S. Laurentii falls on Sunday
    if (ref_sancto == "08_09" && weekday != 0) { winner = days_sancto['08_09v']; }

    /////  Vigilia Assumptionis B.M.V., if it falls on Sunday \\\\\
    if (ref_sancto == "08_13" && weekday == 6) { winner = days_sancto['08_13v']; }
    // To deal with S. Eusebius, if Vigil. Assumpt. B.M.V. falls on Sunday
    if (ref_sancto == "08_14" && weekday != 0) { winner = days_sancto['08_14v']; }

    /////  Vigilia Imm. Conceptionis B.M.V., if it falls on Sunday \\\\\
    if (ref_sancto == "12_06" && weekday == 6) { winner = days_sancto['12_06v']; }

    if (ref_sancto.match(/08_07|08_12|10_29/) && weekday == 5) { vigilia_sabb = true; }


    /////////  Festum Domini Nostri Jesu Christi Regis (Dominica ultima Octobris)  \\\\\\\\

    if (weekday == 6 && month_usual_number == 10 && day >= 24 && day < 31 ) {
      Christus_Rex_vespera = true; 
      // Feasts lower than iij. Lect et M. (incl.) are suppressed
      if (commemoratio_next && commemoratio_next['force'] <= 30) {
        after_ChR = '<div class="small"><red>Nihil fit hoc anno de festo ' + commemoratio_next['header'].split(",", 1) + ".</red></div>" + after; 
        commemoratio_next = ""; }
      }
    if (weekday == 0 && month_usual_number == 10 && day >= 25 ) Christus_Rex = true;

    if (Christus_Rex && !commemoratio)
        {
          commemoratio = winner;
          winner = days_sancto['Christus_Rex'];
          Christus_Rex = false;
        }

    else if (Christus_Rex && commemoratio)
        {
          if (commemoratio['force'] > 30) commemoratio_add = commemoratio;
          commemoratio = winner;
          winner = days_sancto['Christus_Rex'];
        }

    ///////// Officium Votivum de Beata Sabbato \\\\\\\\\\
    
    if (weekday == 5 && winner_next['force'] < 35 && i != (duration-1) && !vigilia_sabb && ref_sancto != "11_01")
      { winner_next = days_sancto['votiva_bmv']; commemoratio_next = days_sancto[get_ref_sancto(1)]; tricenarium_vesperae = false;}
    if (weekday == 6 && winner['force'] < 35 && i != (duration-1) && ref_sancto != "11_02" && true)
      { if (day < 8) {
          winner = days_sancto['votiva_bmv_prima_sabb']; 
          commemoratio = days_sancto[ref_sancto]; }
        else { 
          winner = days_sancto['votiva_bmv']; 
          commemoratio = days_sancto[ref_sancto]; }
        if (ref_tempo.match("adv_")) {
          if (days_sancto[ref_sancto]) commemoratio_add = days_sancto[ref_sancto];
          commemoratio = days_tempo[ref_tempo]; }
        tricenarium = false;
      }

    ////////  Officium Votivum de SS. Sacramento  \\\\\\\\\

    // Check Officium Mensis...
    OM_dates_all = days_sancto['officium_mensis']['body'].match(/2024.*?\;/i) + "";
    OM_date = OM_dates_all.split(",");

    if (weekday == 3 && winner_next['force'] < 30 && off_ss_sacramenti 
      && day != (OM_date[month_usual_number]-1) && month_usual_number != 6 
      && !(month_usual_number == 12 && day >= 17) && !ref_tempo.match(/ash|lent/))
      { winner_next = days_sancto['votiva_sacramentum']; commemoratio_next = days_sancto[get_ref_sancto(1)]; tricenarium_vesperae = false;}
    if (weekday == 4 && winner['force'] < 30 && off_ss_sacramenti 
      && day != OM_date[month_usual_number] && month_usual_number != 6 
      && !(month_usual_number == 12 && day >= 17) && !ref_tempo.match(/ash|lent/))
      { 
        winner = days_sancto['votiva_sacramentum']; 
        commemoratio = days_sancto[ref_sancto]; 
        if (ref_tempo.match("adv_")) {
          if (days_sancto[ref_sancto]) commemoratio_add = days_sancto[ref_sancto];
          commemoratio = days_tempo[ref_tempo]; }
        tricenarium = false;
        off_ss_sacramenti = false;
      }

    ////////  Officium Votivum de S. Bernardo  \\\\\\\\\

    check_next_new = "";

    if (weekday == 1 && day < 8) {
      date_s_bernardi = "";
      for (j = 0; j <= 5; j++) {
        temp_bernardi = get_ref_sancto((j*7)+1);
        temporale_bernardi = get_ref_tempo((j*7)+1, prefix_tempo, week_start, day_start, duration);

        check_next_new += "j = " + j + ", date = " + temp_bernardi 
        //+ ", temp. = " + temporale_bernardi 
        + ". ";
        if ( (!days_sancto[temp_bernardi] || days_sancto[temp_bernardi]['force'] < 30 )
          && !temporale_bernardi.match("lent") && days_tempo[temporale_bernardi] && days_tempo[temporale_bernardi]['force'] < 30
          && (day+(j*7)) != OM_date[month_usual_number] && temp_bernardi.match(month_usual_number + "_")  
          && !(month_usual_number == 12 && temp_bernardi.replace("12_","") >= 17) ) 
            date_s_bernardi = temp_bernardi; }
        check_next_new += "Date S. Bernardi: " + date_s_bernardi;
      }

    if (weekday == 1 && date_s_bernardi == ref_sancto_next && month_usual_number != 8)
      { winner_next = days_sancto['votiva_bernardi']; commemoratio_next = days_sancto[get_ref_sancto(1)]; tricenarium_vesperae = false;}
    if (weekday == 2 && date_s_bernardi == ref_sancto && month_usual_number != 8)
      { 
        winner = days_sancto['votiva_bernardi']; 
        commemoratio = days_sancto[ref_sancto]; 
        if (ref_tempo.match("adv_")) {
          if (days_sancto[ref_sancto]) commemoratio_add = days_sancto[ref_sancto];
          commemoratio = days_tempo[ref_tempo]; }
        tricenarium = false;
      }

    
    /////////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ////.. Let's load the working variables with content ..\\\\
    //||\\\\\\\\\\\\\\\\\\\\\\\\\|//////////////////////////||\\
    if (!winner) {winner = commemoratio; subtitulum = "---- NOT A WINNER ----";} // this shouldn't happen!
    before = winner['before'];
    color = winner['color'];
    header = winner['header'];
    rank = winner['rank']; 
    laudes = winner['laudes']; 
    missa = winner['missa']; 
    vesperae = winner['vesperae'];  // this strange placement is 
    after = winner['after'];        // to enable following section
    laudes_post = winner['laudes_post'];
    missa_post = winner['missa_post'];
    vesperae_post = winner['vesperae_post'];
    martyrologium = winner_next['martyrologium'];
    vesperae_j = winner_next['vesperae_j'];

    if (subtitulum != "") subtitulum = subtitulum + "<br>" + winner['subtitulum'];
    else subtitulum = winner['subtitulum'];
    if (trans_before != "") before = before + '<div class="small_pg"><font color="red">' + trans_before + '</div></font>';

    if (commemoratio) {
      comm_laudes = commemoratio['laudes']; 
      comm_laudes_post = commemoratio['laudes_post'];
      //comm_missa = commemoratio['missa']; 
      comm_vesperae = commemoratio['vesperae']; }

    if (commemoratio_next) {
      comm_vesperae_j = commemoratio_next['vesperae_j']; 
      comm_martyrologium = commemoratio_next['martyrologium']; }

    if (martyrologium || comm_martyrologium) { 
      if (martyrologium && !comm_martyrologium) laudes_post += martyrologium; 
      if (!martyrologium && comm_martyrologium) laudes_post += comm_martyrologium;
      if (martyrologium && comm_martyrologium) {
        comm_martyrologium = comm_martyrologium.replace("1o", "2o");
        comm_martyrologium = comm_martyrologium.replace(/in Capit\.:/, "");
        laudes_post += martyrologium + comm_martyrologium;  }
      martyrologium = ""; }

    if (!translated_vesperae_j) vesperae_j = vesperae_j.replace(" (translatum)", "");

    if (winner == days_sancto[ref_sancto] && winner['force'] < 40 && !vesperae ) // && feria['vesperae']
        vesperae = translate_feria(ref_tempo, 1); // feria['vesperae'];

    ///////// Missa Votiva de Beata \\\\\\\\\\
    /// Replacements done for "missa":
    if (winner == days_sancto['votiva_bmv'] 
    ||  winner == days_sancto['votiva_bmv_prima_sabb']) {
      if (ref_tempo.match("pa_")) missa = missa.replace("Glo.", "Glo. - 2a de Sp. Sancto. 3a Ecclésiae vel pro Papa.");
    if (ref_tempo.match("adv_")) missa = missa.replace("Glo.", "<blue><i>Rorate</i></blue> - Glo. - 2a de Dominica. 3a de Sp. Sancto.");
      if (commemoratio) {
        comm_missa = commemoratio['missa'];
        comm_missa = comm_missa.replace(/A cunctis\.?/i, "de Sp. Sancto.") }
      }

    /////  Vigilia S. Jacobi, if it falls on Sunday \\\\\
    if (ref_sancto == "07_24" && weekday == 0) {
        comm_laudes_post = "";
        comm_missa = commemoratio['missa'];
        comm_missa = comm_missa.replace(/2a Vigilia.*? 3a/i, "2a") }

    /////  Vigilia S. Bartholomæi, if it falls on Sunday \\\\\
    if (ref_sancto == "08_23" && weekday == 0) { commemoratio = ""; 
        before += '<div class="small">¶ <red>Nihil fit hoc anno de Vigilia S. Bartholomæi Apostoli.</red></div>'; }

    //////////  Vigilia S. Matthæi in Quatuor Tempora Septembris  \\\\\\\\\\\
    if (ref_sancto == "09_19v" && quatember_septembris) 
      { comm_laudes = days_sancto['09_19']['laudes_commemoratio']; }
    if (ref_sancto == "09_20v" && quatember_septembris) 
      { comm_laudes = days_sancto['09_20']['laudes']; }

    ////  Angeli Custodes in September (adding Sunday texts) \\\\
    if ( weekday == 0 && (month_usual_number == 9 && day < 8) ) {
        // There is a bug, where the first of a month, the month number remains of the old month, and I don't want to fix it, as I don't know, what it may break...
        laudes = days_tempo[ref_tempo]['laudes_commemoratio'];
        missa = missa.replace("Glo.", "Glo. - 2a de " + days_tempo[ref_tempo]['vesperae'] + " ");

        vesperae += " - Com. " + days_tempo[ref_tempo]['vesperae_commemoratio'];
        }

    /////////// Label PARS HIEMALIS \\\\\\\\\\\\
    if (ref_tempo == "pa_24_6") missa_post += '<div class="centered, pars"><red>PARS HIEMALIS</red></div><div class="small"><red>A Dom. I. Adventus usque ad Vigil. Nativitatis exclusive organum non pulsatur nisi in Festis et Dom. Gaudete.</red></div>';

    ////////////////////////////////////////\\\\\\\
    //// Deleting first Vespers of moved Feasts \\\\
    //\\\\\\\\\\\\\\\\\\\\\/////////////////////////

    if ( weekday == 6 && winner_next == days_sancto[ref_sancto_next] && winner_next['force'] > 60 && winner_next['force'] < 90 && ref_tempo.match(/ash|lent|tp/) )
      {
      winner_next = days_tempo[ref_tempo_next];
      vesperae_j = winner_next['vesperae_j'];
      comm_vesperae_j = "";
      }

      // Translating every feast higher than MM. maj. that falls on Sunday: First Vespers
      if ( weekday == 6 && commemoratio_next && commemoratio_next['force'] > 60 && ref_tempo_next.match(/adv_|lent_/i) && !ref_sancto_next.match(/12_08/))
      {
        comm_vesperae_j = "";
      }  

    if (ref_tempo.match(/lent_5_6|lent_6_|tp_1_[01]/)) {vesperae_j = ""; comm_vesperae_j = ""; comm_vesperae = ""; }
    // TO DO (maybe): can we find a more elegant way to determine First Vespers of translated feasts?

    // Before Ascensione Domini, we don't need any Sanctoral feasts.
    // Either they are transferred, or deleted, so there is no Sanctoral.
    // Same for surrounding of Pentecost.
    if ( ref_tempo.match(/tp_6_3|tp_7_6|tp_8_[016]|pa_1_3|pa_2_4/) )
      {
      comm_vesperae_j = "";
      }

    // Octave Corp. Christi is strange, it allows Comm. of iij. Lect. 
    // and lower, transfers xij. Lect. and MM, and yields to Serm.
    // ALTOVADUM: only MM. maj. get translated
    if (ref_tempo.match(/pa_2_3/) && commemoratio_next
        && commemoratio_next['force'] > 60 && commemoratio_next['force'] < 90)
      {
      comm_vesperae_j = "";
      }

    // Tricenarium solemne (1)
    if (commemoratio_next == days_sancto['09_18tr']) comm_vesperae_j = "";
    if (winner_next == days_sancto['09_18tr']) vesperae_j = "";

    if (commemoratio == days_sancto['09_18tr']) {comm_laudes = ""; comm_missa = "";}
    if (winner == days_sancto['09_18tr']) {laudes = "";}


    /////////////////////////////////////
    ///  Vigiliae: dies non impedita  ///
    /////////////////////////////////////

    vigiliae = winner['vigiliae'];

    vigil_newyear = ['<i>Christus natus</i> iij. Lect.<font color="red">(Prima Die non impedita)</font> <i>Justificáti ergo.</i>',
      'iij. Lect. <font color="red">(Secunda Die non impedita; ut die 3. Jan.)</font> <i>An ignorátis fratres.</i>',
      'iij. Lect. <font color="red">(Tertia Die non impedita; ut die 3. Jan.)</font> <i>Fratres, debitóres sumus.</i>'];
    if (ref_sancto == "01_02") { vigil_newyear_counter = 0; }
    if (month_usual_number == 1 && day > 1 && day < 5 )
      { if ( winner['force'] < 50 ) { vigiliae = vigil_newyear[vigil_newyear_counter]; vigil_newyear_counter++; }} 

    vigil_epiphania = ['<font color="red">Prima Die non impedita post Epiph.</font> <i>Veritátem dico.</i>','<font color="red">Secunda die</font> <i>Paulus vocátus.</i>','<font color="red">Tertia die</font> <i>Et ego.</i>','<font color="red">Quarta die</font> <i>Omníno audítur.</i>','<font color="red">Quinta die</font> <i>Audet aliquis.</i>','<font color="red">Sexta die</font>'];
    if (ref_sancto == "01_07") { vigil_epiphania_counter = 0; }
    if (month_usual_number == 1 && day > 6 && day < 13 )
      { if ( winner['force'] < 50 ) { vigiliae = vigil_epiphania[vigil_epiphania_counter]; vigil_epiphania_counter++; }} 

    vigil_lent = ['1,2,3','4,5,6','7,8,9','10,11,12','1,2,3','4,5,6','7,8,9','10,11,12'];
    if (ref_tempo == "ash_1_4") { vigil_lent_counter = 1; }
    if (ref_tempo.match("lent") && weekday == 1) { vigil_lent_counter = 0; }
    if (ref_tempo.match(/lent|ash/) )
      { if ( winner['force'] < 40 ) { vigiliae = '<b>iij. Lect. <font color="red">℟.℟.</b> de Dominica: ' + vigil_lent[vigil_lent_counter] + '</font>'; vigil_lent_counter++; }} 

    vigil_novembris_1 = ['<font color="red">Prima Die non impedita infra Hebd. Dominicae j. Novembris</font> <i>De Ezechiéle Prophéta. Et audívi.</i> <font color="red">cum Responsoriis suis;</font>','<font color="red">Secunda die</font> <i>Et dixit ad me.</i>','<font color="red">Tertia die</font> <i>Et factus est sermo... Finis venit.</i>','<font color="red">Quarta die</font> <i>Et factus est sermo... Audíte verbum Dómini.</i>','<font color="red">Quinta die</font>'];
    vigil_novembris_2 = ['<font color="red">Prima Die</font> <i>Et factus... Terra cum indúxero.</i>','<font color="red">Secunda die</font> <i>Et factus... Væ pastóribus Israël.</i>','<font color="red">Tertia die</font> <i>Proptérea pastóres.</i>','<font color="red">Quarta die</font>','<font color="red">Quinta die</font>'];
    vigil_novembris_3 = ['<font color="red">Prima Die</font> <i>Tu rex vidébas.</i>','<font color="red">Secunda die</font> <i>Respóndit Baltásar.</i>','<font color="red">Tertia die</font> <i>In anno primo Daríi.</i>','<font color="red">Quarta die</font>','<font color="red">Quinta die</font>'];
    vigil_novembris_4 = ['<font color="red">Prima Die</font> <i>Verbum Dómini.</i>','<font color="red">Secunda die</font> <i>Verba Amos.</i>','<font color="red">Tertia die</font>','<font color="red">Quarta die</font>','<font color="red">Quinta die</font>'];
    vigil_novembris_5 = ['<font color="red">Prima Die</font> <i>Onus Nínive.</i>','<font color="red">Secunda die</font> <i>Onus, quod vídit Hábacuc.</i>','<font color="red">Tertia die</font> <i>Verbum Dómini.</i>','<font color="red">Quarta die</font>','<font color="red">Quinta die</font>'];

    if ((month_usual_number == 11 && weekday > 0 ) || (month_usual_number == 10 && day > 20 && sabb_mensis == 1))
      { 
        if (sabb_mensis == 1) vigil_buffer = vigil_novembris_1;
        if (sabb_mensis == 2) vigil_buffer = vigil_novembris_2;
        if (sabb_mensis == 3) vigil_buffer = vigil_novembris_3;
        if (sabb_mensis == 4) vigil_buffer = vigil_novembris_4;
        if (sabb_mensis == 5) vigil_buffer = vigil_novembris_5;

        if (weekday == 1) vigil_novembris = 0

        if ( (winner['force'] < 30 || winner['header'].match("Vigilia")) && !(sabb_mensis == 5 && day < 10)) { vigiliae += "iij. Lect. " + vigil_buffer[vigil_novembris]; 
          if (sabb_mensis >= 3) vigiliae += ' <font color="red">℟.℟.</b> de Dominica: ' + vigil_lent[vigil_novembris] + '</font>';
          vigil_novembris++; }} 

    if (ref_tempo.match("adv_") && day < 24)
      {
      if (weekday == 0) adv_vigil_counter = 0;
      if (!vigiliae && winner['header'].match("Vigilia")) vigiliae = feria['vigiliae'];
      if (vigiliae && winner['header'].match(/Vigilia|de ea/i) && !winner['header'].match(/Quatuor Temporum/i)) {
        vigiliae += ' <font color="red">℟.℟.</b> de Dominica: ' + vigil_lent[adv_vigil_counter] + '</font>';
        adv_vigil_counter++;
        }
      }


    ////////////////////////////////////////////////
    ////// Saturday's Vespers from August on \\\\\\\
    ////////////////////////////////////////////////

    if (weekday == 6 && month_usual_number >= 7 && month_usual_number < 12 && !ref_tempo.match(/pa_24_6/))
      { 
        month_sabb = month;
        if (day >=27 || day == 1) month_sabb++;
        if (month_usual_number >= 7 && day >= 28 || month_usual_number >= 8) sabb_mensis++;
        if ((month_usual_number.in(7,8,10) && day >=28 ) 
         || (month_usual_number.in(8,10) && day <=3 )
         || (month_usual_number.in(9) && day >=27 )
         || (month_usual_number.in(9,11) && day <4 )) // was: day <=4
            sabb_mensis = 1;

        // If there are only 4 Sundays in November, the second week is skipped (see rubric on Sabb. ante Dom. ij. et iij. Novembris). This happens only on Dominical number A, i.e. if second Sabb. mensis falls on 4.11.
        if (month_usual_number == 11 && sabb_mensis == 2 && day != 4) {
            sabb_mensis++;
            missa_post += '<div class="small">¶ <red>November hoc anno tantum quatuor habet Dominicas, sequitur vero statim Dominica iij. Novembris.</red>'; }

        if (sabb_mensis && winner_next == days_tempo[ref_tempo_next] ) 
          vesperae_j = "Sabb. ante Dom. " + roman_lc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb) + " <i>" + antiphon_sabb(sabb_mensis, month_sabb) + "</i>";
        else if (sabb_mensis) comm_vesperae_j = "Com. Sabb. ante Dom. " + roman_lc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb) + " <i>" + antiphon_sabb(sabb_mensis, month_sabb) + "</i>";
        titulus_dom = roman_uc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb);

        // First Sabbath of August, following remark is displayed in "after":
        if (month_sabb == 7 && sabb_mensis == 1)
        after += '<div class="small">¶ <red>Dicitur autem j. Dominica mensis, quæ est in Kalendis, vel proximior Kalendis illius mensis: ita ut si Kalendæ fuerint ij. iij. vel iv. Feria, tunc j. Dominica mensis, in quo liber Scripturæ inchoandus ponitur, est ea quæ præcedit Kalendas. Sin autem Kalendæ fuerint v. vj. vel Sabbato, prima Dominica est ea quæ sequitur, et in Sabbato præcedenti Antiphona ad Magnificat ponatur illius historiæ, omissis aliis, quæ forte occurrerent.</red> <blue>(<i>„Kalendæ“</i> primam diem mensis designant.)</blue></div>';
      }
    if (month_usual_number == 12) sabb_mensis = 0;

    // Adding the O Antiphones to Vespers
    O_ant = ["<i>O Sapiéntia.</i> <red>ad quam stamus extra stalla, non tamen ad collectam.</red>","<i>O Adonái.</i>","<i>O radix Jesse.</i>","<i>O clavis David.</i>","<i>O Óriens.</i>","<i>O Rex géntium.</i>","<i>O Emmánuel.</i>"];

    if (month_usual_number == 12 && day >= 17 && day <=23 ) {
      if (winner == days_tempo[ref_tempo] && weekday != 6) {
        if (vesperae.match("Adv.")) vesperae = vesperae.replace(/Adv\./, "Adv. Aña Mag. " + O_ant[day-17]);
        else vesperae += " Aña Mag. " + O_ant[day-17];
        }
      if (day == 21 && weekday == 0) 
        laudes = laudes.replace(/Aña Ben\. <i>.*<\/i>/, "Aña Ben. <i>Nolíte timére.</i>")
      if (day == 23) {
        laudes = laudes.replace(/Ben\. <i>.*<\/i>/, "Ben. <i>Ecce compléta sunt.</i> <red>(Ultimo die ante Vigiliam Nat.)</red>")
        if (!laudes) laudes = "Aña Ben. <i>Ecce compléta sunt.</i> <red>(Ultimo die ante Vigiliam Nat.)</red>"; }  
      }
    // The Commemorationes are being changed in the Commemoratio section.

    ///////////////////////////////////////////////////////////
   ///////////  First Vespers to standard feasts  ////////////
  ///////////////////////////////////////////////////////////

    if ( vesperae_j ) {
      if ( winner['force'] > winner_next['force'] && !winner['header'].match(/Quatt?uor Temp/i)) {
        // today wins
        if (winner_next['vesperae_j_commemoratio']) vesperae_j = winner_next['vesperae_j_commemoratio'];
        commemoratio_vesperae = vesperae_j;
        today_wins = true; 
        }
      else if ( winner['force'] == winner_next['force'] && winner['force'] > 35 ) {
        // a capitulo de sequenti, ut in 28. & 29.8.
        vesperae_j = "";
        commemoratio_vesperae = winner_next['vesperae_j'];
        today_wins = true; 
        }
      else { 
        // tomorrow wins
        if (winner['vesperae_commemoratio'] && !vesperae.match(/Feria/i)) vesperae = winner['vesperae_commemoratio'];
        else vesperae = "";
        commemoratio_vesperae = vesperae;
        vesperae = vesperae_j; 
        today_wins = false;
        }
      }

    if (vesperae.match(/Feria/i) && ref_tempo.match("lent") && winner['vesperae_commemoratio'])
      {
        vesperae = vesperae.replace(/Feria/i, feria['vesperae_commemoratio'].replace("Com. ", ""));
        comm_vesperae = ""; commemoratio_vesperae = "";
      }

    // O Antiphons for first Vespers of St. Thomas and other Comm.
    if (commemoratio_vesperae && month_usual_number == 12 && day >= 17 && day <=23 ) {
      commemoratio_vesperae = commemoratio_vesperae.replace(/Adv\. <i>.*<\/i>/, "Adv. " + O_ant[day-17]);
      }

    commemoratio_vesperae = commemoratio_vesperae.replace("Com. ", "");
    if (vesperae) dash = " - "; else dash = "";
    if (commemoratio_vesperae) vesperae = vesperae.replace(/(?: - )?sine Com\.?/, "");
    if ( vesperae.match("Com.") && commemoratio_vesperae ) {
      if ((today_wins && winner_next['force'] < 30) || (vesperae.match("Dom") && winner_next['force'] < 60) || ref_sancto.match('08_01') || (today_wins && winner['force'] == winner_next['force'])) vesperae += " & " + commemoratio_vesperae;
      else vesperae = vesperae.replace("Com.", "Com. " + commemoratio_vesperae + " & ");
      }
    else if (commemoratio_vesperae) vesperae += dash + "Com. " + commemoratio_vesperae;


    //////////////////////////////////////////////////////////
    /////////   Let's modify the HEADER (if needed)  /////////
    //////////////////////////////////////////////////////////

    if (translated) { header = header + " (translatum)"; translated = false; }
    if ( extra == 1 && i == (duration - 3) ) header = "Dominica " + header + " (anticipata)";
    if ( winner['rank'].match(/Commemoratio/i)) {
        header = "De ea"; rank = ""; }
    if (commemoratio == days_tempo[ref_tempo] && ref_tempo.match(/tp_7_4/)) header += " atque " + commemoratio['header'].replace(/.*Oct/i, "Oct");
    if (weekday == 0 && sabb_mensis && winner == days_tempo[ref_tempo]) header = header.replace(/\.$/, " simul " + titulus_dom);

      ////////////////////////////////////////////////////////
     ///////////  First Vespers to moved feasts  ////////////
    ////////////////////////////////////////////////////////

    /////  First Vespers SS. Nominis Jesu  //////////
    if ( ref_sancto == "01_01" && ( weekday < 2 || weekday == 6 ) ) { vesperae = vesperae + ' - Com. SS. Nominis Jesu <i>Fecit mihi magna</i>'; }
    if ( (ref_sancto == "01_02" || ref_sancto == "01_03" ) && weekday == 6 ) { vesperae = "SS. Nominis Jesu - sine Com."; }
    if ( ref_sancto == "01_04" && weekday == 6 ) { vesperae = "SS. Nominis Jesu - Com. S. Telesphori Papæ et Martyris Iste sanctus"; }

    ///// Martyrologium of moved Annuntiatio \\\\\\
    if ( ref_sancto == "03_24" && ref_tempo.match(/lent_5_6|lent_6_|tp_1/) )
      { martyrologium = '<li><div class="small">– <u>in Capit.:</u> <red>In Martyr. 1o loco:</red> <ib>Apud Názareth Civitátem Galiléae * Annunciátio Domínica. ✝ - <blue>Ve městě Nazaret v Galileji Zvěstování Páně. ✝</blue></ib> <red>Hodie <b>non</b> dicitur</red> <ib>Ave Maria.</ib></div></li>';
        laudes_post += martyrologium;
      }

    ///// First Vespers of moved Anniversary Feast (1. Junii)
    if ( ref_tempo == "pa_1_0" && translated_annivers )
      comm_vesperae = "Anniversarium Dedicationis Ecclesiæ Altovadensis (translatum) ℟. maj. Terríbilis" + comm_vesperae;

    ////// S. Matthias ///////

    // Vigilia
    if ((( ref_sancto == "02_23" && !is_leap_year(year) ) || ( ref_sancto == "02_24" && is_leap_year(year) )) && weekday != 0 ) 
        {
        if (ref_tempo.match(/ash|lent/)) 
        comm_missa = "2a Vig. S. Mathiae Ap. & 3a A cunctis - Praef. Quadr.";
        missa = missa.replace(/Pr(ae|æ)f\. Quadr\./, "Praef. Quadr. - <red>In fine Missæ Evangelium <b>Vigiliae</b> S. Mathiae Apost.</red>");
        }

    // TO DO: finish this: the Collect needs to be added to the Mass

    // First Vespers
    if (winner['vesperae_commemoratio']) dash = " - "; else dash = "";
    if ( ref_sancto == "02_23" && !is_leap_year(year) ) { vesperae = "de seq." + dash + winner['vesperae_commemoratio'];}
    if ( ref_sancto == "02_24" && is_leap_year(year) && weekday != 6 ) { vesperae = "de seq." + dash + winner['vesperae_commemoratio'];}
    if ( ref_sancto == "02_25" && is_leap_year(year) && weekday == 0 ) { vesperae = "de seq. - " + winner['vesperae_commemoratio'];}

     ////////////|\\\\\\\\\\\\
    /////  Special Cases  \\\\\
   //////////////|\\\\\\\\\\\\\\

    // Feria iij. Rogationum - gets commemorated in the Office only on Festa Commemorationum.
    // However, in the Holy Mass, it gets commemorated anyway.
    // Also, in Feasts iij. Lect. et lower, Vespers are still from Fer. iij. Rogationum!
    if (ref_tempo == "tp_6_2" && winner['force'] > 10) { no_comm_laudes = true; }
    if (ref_tempo == "tp_6_2" && winner['force'] > 10 && winner['force'] < 40 ) 
      { comm_laudes = ""; vesperae = feria['vesperae']; comm_vesperae = ""; }

    ///// Missa votiva de SSmo Corde Jesu on first Friday in month \\\\\
    if (weekday == 5 && day < 8 && winner['force'] < 40) missa = days_sancto["votiva_ssmi_cordis"]["missa"];

    ///// Missa votiva de Angelis on Oct 2. \\\\\
    if (ref_sancto == "10_02" && winner['force'] < 30) missa = days_sancto["votiva_de_angelis"]["missa"];

    ////////////////////////////////////////////////////////

    // Sundays' Adorations: Tantum ergo et Mane nobiscum //
    if ( weekday == 0 ) 
       {  tantum_ergo = ["9","5","6a","6b","7","8"]; 
          mane_nobiscum = ["IV","I","II","III"];
          if ( day < 8 ) litaniae = "Litaniae S. Cordis –";
          else litaniae = "";
          after = "✠ Adoratio: " + litaniae + " Tantum ergo p. " + tantum_ergo[(week_number-1) % 6] + " – Mane nobiscum " + mane_nobiscum[week_number % 4] + ". (Laudes Vesp.)<br>" + after; 
        }
    
    // Fridays in Lent: unless 12-Lesson feast impedes (Wackarz, p. 178, par. 3), Processio poenitentialis is made:

    if ( weekday == 5 && ref_tempo.match(/lent|ash/) && winner['force'] < 40) 
      missa_post += '<div class="small">¶ <font color="red">Post <s>Capitulum</s> <blue>Tertiam</blue> fit Processio cum 7 Psalmis pœnit. cum cruce discooperta, et sine</font> <ib>Glória Patri</ib>, <font color="red">nisi in fine ultimi Psalmi, sed absque inclinatione; porro Cantor incipit Litanias cum Collectis in fine.</font> (Rit. Cist.) </div>';


    ////////////////////////////////////////////////
    /////////  The COMMEMORATIONS Section  /////////
    ////////////////////////////////////////////////

    //winner['body'] = "";
    comm_head = "";
    comm_sabbato = "";
    com_force = 0;

    //--- Diagnostic listing, usually not needed ---\\
    if (commemoratio) {com_force = commemoratio['force'];}
    if (!commemoratio) comm_header_check = '<font color="black">N/A</font>';
    else comm_header_check = "<i><b>" + commemoratio['header'] + "</i></b>";

    if (commemoratio_next) {com_force = commemoratio_next['force'];}
    if (!commemoratio_next) comm_next_header_check = '<font color="black">N/A</font>';
    else comm_next_header_check = "<i><b>" + commemoratio_next['header'] + "</i></b>";

    j = 1;

    check_next = '<div class="fuchsia body"><u>ref_tempo</u> = \'<b>' + ref_tempo + "'</b> -> '" + ref_tempo_next + "' + <u>ref_sancto</u> = <b>'" + ref_sancto + "'</b> -> '" + ref_sancto_next + ".<br>Winner = <i><b>" + winner['header'] + "</i></b> + Commemoratio = " + comm_header_check + ' Commemoratio_add = "' + commemoratio_add['header'] + '" '
      + ".<br>Winner_next = <i><b>" + winner_next['header'] + "</i></b> + commemoratio_next = " + comm_next_header_check 
      + ".<br>force: " +  winner['force'] + " (" + com_force  + ") -> force_next: " +  winner_next['force']    
      + " extra_sunday = " + extra + "  --- i = " + i + "/" + duration // + '. <br>'
      //+ 'Feria = "' + feria['header'] + '", &emsp;Vesperæ: "' + feria['vesperae'] + '".<br>'
      //+ 'Moved feasts [0] "' + moved[0] + '" [1] "' + moved[1] + '" [2] "' + moved[2] + '" [3] "' + moved[3] + '". Length = "' + moved.length
      //+ '.<br>Sacérdos et Pontifex: "' + matchCount(vesperae,/Sacérdos et Póntifex/) + '" - Fíliæ Jerúsalem: "' + matchCount(vesperae,/F[íi]li(æ|ae) Jer[úu]salem/);
      //+ " - Day = " + day + ", Month = " + month + ". Header + a week: " + get_ref_sancto(j*7) + " - "

      //if (days_sancto[get_ref_sancto(j*7)]) check_next += days_sancto[get_ref_sancto(j*7)]['header'];
      //else check_next += get_ref_sancto(j*7) + " doesn't exist.";
      check_next += "<br>Display format = " + display_format;

      if (check_next_new) check_next += "<br>" + check_next_new
      //if (check_next_tempo) {check_next += "<br>" + check_next_tempo; check_next_tempo = "";}
      //check_next += '<br>ref_tempo + 1: "' + get_ref_tempo(1, prefix_tempo, week_start, day_start, duration) + '", + 2: "' + get_ref_tempo(2, prefix_tempo, week_start, day_start, duration) + '", + 3: "' + get_ref_tempo(3, prefix_tempo, week_start, day_start, duration) + '", + 4: "' + get_ref_tempo(4, prefix_tempo, week_start, day_start, duration) + '", + 5: "' + get_ref_tempo(5, prefix_tempo, week_start, day_start, duration) + '", + 6: "' + get_ref_tempo(6, prefix_tempo, week_start, day_start, duration) + '", + 7: "' + get_ref_tempo(7, prefix_tempo, week_start, day_start, duration) + '", + 8: "' + get_ref_tempo(8, prefix_tempo, week_start, day_start, duration) + '",<br> + 28: "' + get_ref_tempo(28, prefix_tempo, week_start, day_start, duration) + '". '
      //+ ". j = 2: " + (day+(j*7)) + "_" + month_usual_number
      check_next += '".</div>';
    //\\\---- end of diagnostics -----///\\

    if (winner_next) {
        titulum_next = winner_next['header'].split(",", 1) + "";
        titulum_next = winner_next['header'].split("+", 1) + "";
        }

    ////////////////////////////////////////
    /////  Commemoratio First Vespers  /////
    ////////////////////////////////////////

    if (comm_vesperae_j) 
            { 
              vesperae = vesperae.replace(/ - sine Com\.|sine Com\./, "");
              if (vesperae) dash = " - "; else dash = "";
              if (commemoratio_next['vesperae_j_commemoratio']) comm_vesperae_j = commemoratio_next['vesperae_j_commemoratio'];
              comm_vesperae_j = comm_vesperae_j.replaceAll("Com. ", "")
              if (vesperae.match("Com.")) {
                if (commemoratio_next['force'] > winner['force']) vesperae = vesperae.replace("Com. ", "Com. " + comm_vesperae_j + " & ");
                else vesperae += " & " + comm_vesperae_j;
                }
              else vesperae += dash + "Com. " + comm_vesperae_j;
            }

    if (commemoratio)
      { titulum = commemoratio['header'].split("+", 1);
        titulum_missa = commemoratio['header'].split(",", 1);
        titulum_missa += "";
        if ( commemoratio['header'].match(/\+/) ) titulum_missa = commemoratio['header'].split("+", 1) + "";
        if ( commemoratio['header'].match(/De ea/i) ) { 
            titulum_missa = translate_feria(ref_tempo); 
            if (ref_tempo.match("adv_")) titulum_missa = "Dom. " + roman_lc[ref_tempo.substring(4,5)] + " Adv."; }
        if ( commemoratio['header'].match(/ Oct\.|Octav|De ea/i) ) { titulum = ""; titulum_missa += ""; 
          titulum_missa = titulum_missa.replace(/.*Oct/i, "Oct"); 
          titulum_missa = titulum_missa.replace(/Octavam/i, "de Octava");}

        titulum_missa = titulum_missa.replace(/Dominica/i, "Dom."); 
        titulum_missa = titulum_missa.replace(/Pentecoste./i, "Pent"); 

        if (titulum_missa.match("Dom.")) 
        {
          //number = titulum_missa.match(/Dom\. .*? post/) + "";
          number = titulum_missa.match(/(?<=Dom\.\s).*(?=\spost)/) + "";
          number = roman_upper_to_lower(number);
          number = number.replace("Ultjma", "Ultima")
          titulum_missa = titulum_missa.replace(/Dom\. .*? post/, "Dom. " + number + " post");
        }

      // merging various commentaries, in case of both winner and commemoratio have one
      if (commemoratio['before']) 
        { if (winner['before'])
            { br = '<br>';
              if (winner['before'].match('</div>')) br = "";
              before = winner['before'] + br + commemoratio['before'];}
          else { before = commemoratio['before'];}  }

      if (commemoratio['after']) 
        { if (winner['after'])
            after = after + winner['after'] + " - " + commemoratio['after'];
          else { after = commemoratio['after'];}    }

      if (comm_laudes_post) // before: if (commemoratio['laudes_post'])
        { if (winner['laudes_post']) laudes_post = winner['laudes_post'] + " – " + commemoratio['laudes_post'];
          else laudes_post = commemoratio['laudes_post']; }

      if (commemoratio['missa_post']) 
        { if (winner['missa_post']) missa_post = winner['missa_post'] + " – " + commemoratio['missa_post'];
          else missa_post = commemoratio['missa_post']; }

      if (commemoratio['vesperae_post']) 
        { if (winner['vesperae_post']) vesperae_post = winner['vesperae_post'] + " – " + commemoratio['vesperae_post'];
          else vesperae_post = commemoratio['vesperae_post']; }
      //\\ end of merged commentaries //\\

      /////////////////////////////////
      /////  Commemoratio Laudes  /////
      /////////////////////////////////

      if ((commemoratio['laudes'] || commemoratio['laudes_commemoratio'] || comm_laudes) && !no_comm_laudes)
        { 
          comm_laudes = comm_laudes.replace(/- sine Com\.|sine Com\./, "");
          laudes = laudes.replace(/- sine Com\.|sine Com\./, "");
          comm_laudes = comm_laudes.replace("Com\. ", "");
          comm = commemoratio['laudes_commemoratio'];
          comm = comm.replace("Com\. ", "");
          comm = ( comm == "C1") ? "Dum stetéritis " : comm;
          comm = ( comm == "C1a") ? "Isti sunt duæ " : comm;
          comm = ( comm == "C2") ? "Qui vult " : comm;
          comm = ( comm == "C2a") ? "Qui odit " : comm;
          comm = ( comm == "C3") ? "Fulgébunt justi " : comm;
          comm = ( comm == "C4") ? "Euge, serve bone " : comm;
          comm = ( comm == "C5") ? "Similábo eum " : comm;
          comm = ( comm == "C6") ? "Símile est ... sagénæ " : comm;
          comm = ( comm == "C7") ? "Símile est ... sagénæ " : comm; // not an error
          comm = ( comm == "C8") ? "Zachæe " : comm;

          // Glossary:
          // comm_laudes = commemoratio['laudes'];
          // comm = commemoratio['laudes_commemoratio'];
          // titulum = commemoratio['header']

          // Advent changes on certain dates, only if in Commemoratio
          if (winner == days_sancto[ref_sancto] && month_usual_number == 12 && day >= 17 && day <=23 ) {
            if (day == 21) comm = comm.replace(/Adv\. <i>.*<\/i>/, "Adv. <i>Nolíte timére.</i>")
            if (day == 23) comm = comm.replace(/Adv\. <i>.*<\/i>/, "Adv. <i>Ecce compléta sunt.</i>") }

          et = " & ";
          dash = " – ";
          if ( !titulum ) et = "";
          if ( !comm_laudes ) et = "";
          if ( !laudes ) dash = "";

          if (laudes.match(/Feria/i) && ref_tempo.match("lent"))
             {
              laudes = laudes.replace(/Feria\.?/i, comm);
              comm = "";
             }
          else if (laudes.match(/^Com\. | - Com\./) && comm) 
            { // we need to sort the commemorations according to their force
             if (commemoratio['force'] > 30 ) {
              if (!laudes.match(/Tu es pastor/i)) laudes = laudes.replace("Com.", "Com. " + comm + " & ");}
              else laudes += " & " + comm; 
              comm = "";}
          else {
          if ( commemoratio['laudes_commemoratio'].match(/^Com\. /) && comm )
            { 
              if (laudes.match(/^Com\. | - Com\./)) laudes = laudes + " & " + comm;
              else if (laudes) laudes += " - Com. " + comm;
              else laudes = "Com. " + comm;
            }
          else if ( commemoratio['laudes_commemoratio'].length > 3 && comm ) { 
              laudes = laudes + dash + "Com. " + titulum + et + comm;}
          else if ( commemoratio['laudes_commemoratio'] && commemoratio['laudes_commemoratio'].length <= 3 && comm ) {
            if ( !comm_laudes ) et = "";
            laudes = laudes + dash + "Com. " + titulum + " " + comm + et + comm_laudes; }
          else if ( laudes.match(/^Com\. | - Com\./) ) laudes = laudes + et + comm_laudes;
          else if ( commemoratio['laudes'].match("Com. ") ) laudes = laudes + dash + "Com. " + comm_laudes;
          else if (comm) laudes = laudes + dash + "Com. " + comm;
          }

          if (commemoratio_add) {
              if (commemoratio_add['laudes_commemoratio']) laudes += " & " + commemoratio_add['laudes_commemoratio'].replace(/Com\. /i,"");
              else if (commemoratio_add['laudes']) laudes += " & " + commemoratio_add['laudes'];
            }

          //BACKUP else laudes = laudes + dash + "Com. " + titulum + " " + comm + et + comm_laudes;

          if ( winner['force'] > 49 ) { laudes.replace("& B.M.V.", "");}
          comm = null;
        }
      
      /////////////////////////////////
      /////  Commemoratio Missa   /////
      /////////////////////////////////
      
      if (commemoratio['missa']) 
        { 
          if (!comm_missa) comm_missa = commemoratio['missa'];
          
          // Replacing the word "Feria" in [missa] field to keep other commemorations, while only the Feria is commemorated (like at feasts of St. Peter and Paul in Lent)
          if (missa.match(/Feria/i) && !ref_tempo.match(/lent/) )
              missa = missa.replace(/.a Feria\.? -/i, "-" );
          else if (missa_post.match(/Feria/i) && !ref_tempo.match(/lent/) )
              missa_post = missa_post.replace(/.a Feria\.? -/i, "-" );
          //else if (missa.match(/Feria/i) && ref_tempo.match(/lent|adv/) && commemoratio == days_tempo[ref_tempo])
          else if (missa.match(/Feria/i) && ref_tempo.match(/lent/))
              missa = missa.replace(/Feria/i, translate_feria(ref_tempo, 1));
          else if (missa_post.match(/Feria/i) && commemoratio == days_tempo[ref_tempo])
              missa_post = missa_post.replace(/Feria/i, translate_feria(ref_tempo, 1));

          else if (missa.match(/Dominica/i) && ref_tempo.match(/adv/i)) 
              missa = missa.replace(/Dominica/ig, "Dom. " + roman_lc[ref_tempo.substring(4,5)] + " Adv.");

          // Sorting out Commemoratio -vel-
          else if (missa.match(/Commemoratio -vel-/i) ) {
              secunda_comm = missa.match(/-vel-.*? -/i) + "";
              if (missa.match("3a non dicitur")) missa = missa.replace(/Commemoratio -vel-.*? -/i, titulum_missa + " <u>3a non dicitur</u> - ");
              else if (missa.match(/3a Commemoratio -vel-/i) ) missa = missa.replace(/Commemoratio -vel-.*? -/i, titulum_missa + " - "); 
              else missa = missa.replace(/Commemoratio -vel-.*? -/i, titulum_missa + " 3a " + secunda_comm.replace(/-vel- /i, "")); }
          else if (missa_post.match(/Commemoratio -vel-/i) ) {
              secunda_comm = missa_post.match(/-vel-.*? -/i) + "";
              if (missa_post.match("3a non dicitur")) missa_post = missa_post.replace(/Commemoratio -vel-.*? -/i, titulum_missa + " <u>3a non dicitur</u> - ");
              else if (missa_post.match(/3a Commemoratio -vel-/i) ) missa_post = missa_post.replace(/Commemoratio -vel-.*? -/i, titulum_missa + " - ");
              else missa_post = missa_post.replace(/Commemoratio -vel-.*? -/i, titulum_missa + " 3a " + secunda_comm.replace(/-vel- /i, "")); }

          // Sorting out Commemoratio et M., so the Comm. work as supposed, while Missa is taken from the Comm.
          else if (commemoratio['rank'].match(/Commemoratio et M/i) && winner['force'] == 10) missa = commemoratio['missa'];
            
          else 
          {
          comm_missa = comm_missa.match(/2a.*? -/) + ""; // looks stupid, but converts the variable into a string that the replace function can take

          // if we commemorate something, apart from lent, we don't commemorate the Ferias
          if (!ref_tempo.match(/(lent|ash)/)) {
            if (comm_missa.match(/de feria/i)) comm_missa = comm_missa.replace(/a de feria\. 3/i,""); 
            if (comm_missa.match(/de feria/i)) comm_missa = comm_missa.replace(/.a de feria\./i,""); 
            if (comm_missa.match(/de (Off\.|Officio) diei/i)) comm_missa = comm_missa.replace(/a de (Off\.|Officio) diei\. 3/i,""); 
            if (comm_missa.match(/de (Off\.|Officio) diei/i)) comm_missa = comm_missa.replace(/.a de (Off\.|Officio) diei\./i,""); }

          if (commemoratio['force'] != 9 && (winner != days_sancto['votiva_bmv'] || winner != days_sancto['votiva_bmv_prima_sabb'])) {
            comm_missa = comm_missa.replace(/3a.*/,""); 
            comm_missa = comm_missa.replace("2a", "3a"); 
            if (ref_tempo.match("adv_") && winner == days_sancto[ref_sancto]) de = "de "; else de = "";
            if (comm_missa.length > 5) comm_missa = "2a " + de + titulum_missa + ". " + comm_missa; else comm_missa = "2a " + titulum_missa + ". ";
            }
          comm_missa = comm_missa.replace(/-.*/, ""); 

          var comm_temp = "";
          if (true && (commemoratio['missa'].match(/4a /i) || (commemoratio['missa'].match(/3a S\./i) && commemoratio['force'] != 9) )) {
            comm_temp = commemoratio['missa'].match(/3a.*? -/) + "";
            comm_temp = comm_temp.replace(" -", ""); 
            comm_temp = comm_temp.replace("4a", "5a"); 
            comm_temp = comm_temp.replace("3a", "4a"); 
            comm_temp = comm_temp.replace("2a", "3a"); 
            }

          if (comm_temp) comm_missa += " " + comm_temp;

          // On Votiva S.P.N.Bernardi, and everywhere, where there is no comm. in winner['missa'], multiple comm. were rendered incorrectly...
          if (false && winner == days_sancto['votiva_bernardi']) {
            comm_missa = commemoratio['missa'].match(/2a.*? -/) + ""; 
            comm_missa = comm_missa.replace(" -", ""); }
          // probably not needed anymore
          
          win_missa = missa;
          if (win_missa.match("2a") && winner['force'] > 40 && win_missa.match(/2a S\. /i)) 
            { 
            win_missa_com = win_missa.match(/2a.*? -/) + "";
            win_missa_com = win_missa_com.replace(" -", "") + "";
            } else win_missa_com = "";
          if (win_missa_com) {
            comm_missa = comm_missa.replace(/3a.*/,""); 
            comm_missa = comm_missa.replace("2a", "3a"); 
            comm_missa = win_missa_com + comm_missa; }

          win_missa = win_missa.replace(/2a.*? - /,"");
          win_missa_post = winner['missa_post'];
          win_missa_post = win_missa_post.replace(/2a.*? - /,""); // non-greedy modifier "?"

          // Sometimes, a lower feast is comm. on Sunday, and we need to add "3a de Beata"
          if (commemoratio['force'] >= 40 && winner['force'] < 70 && !winner['header'].match(/B\.M\.V\.|B\. M\. V\./) && !comm_missa.match("3a")) comm_missa += " 3a A cunctis. ";

          // We have to check, whether the missa field exists.
          // Sometimes, in order to add exceptions, only missa_post exists
          // with differences between missa privata and conventualis
          if (winner['missa']) {
            if (winner['missa'].match("Glo.</b>"))
              missa = win_missa.replace("Glo.</b>", "Glo.</b> – " + comm_missa);
            else if (winner['missa'].match("Glo."))
              missa = win_missa.replace("Glo.", "Glo. – " + comm_missa);
            //else missa = comm_missa + " - " + win_missa; }
            else missa = missa.replace(/2.*? - /, comm_missa + " - "); }
          else if (winner['missa_post']) {
            if (winner['missa_post'].match("Glo."))
              missa_post = win_missa_post.replace("Glo.", "Glo. – " + comm_missa);
            else missa_post = comm_missa + " - " + win_missa_post; }
          }

          // If Sunday yields to another Feast with Comm., it needs to be added.
          if (weekday == 0 && commemoratio == days_tempo[ref_tempo]) {
            if (!missa.match("Asperges")) missa = missa.replace("Glo.", "Asperges - Glo.");
            missa = missa.replace(/Duo Acolythi\.?(?: -)?/, "");
            missa = missa.replace(/Cum incenso ad oblata\.?(?: - )?/i, "");
            if (!missa.match("Processio")) missa = 'Processio per Ecclesiam - ' + missa; // orig. Claustrum
            if (!missa.match("In fine Miss")) missa += ' - <red>In fine Missæ Evangelium Dominicæ.</red>';
            if (winner['laudes'].match("Com.") && !winner['laudes'].match("sine Com."))
              { 
                tertia_oratio = winner['missa'].match(/2a.*? -/i);
                tertia_oratio += "";
                tertia_oratio = tertia_oratio.replace("2a", "3a");
                missa = missa.replace(/2a.*? -/i, "2a " + titulum_missa + " " + tertia_oratio)
              }
            laudes_post = "<li>- <red>non dicitur </red><i>Quicúmque.</i></li>" + laudes_post;
            }

          // If we need to fill in current Sunday, e.g. on Officium mense...
          if (missa.match(/-De Dominica-/i) ) {
            dominica = ref_tempo.slice(0, -1) + '0';
            missa = missa.replace(/-De Dominica-/i, days_tempo[dominica]['vesperae']);
            }

          // Cleanup:
          missa = missa.replace("  ", " "); missa = missa.replace("..", ".");
          if ( !ref_tempo.match(/(lent|ash|sept)/) ) missa = missa.replace("- Tractus ", ""); // Quatember???

          missa = missa.replace(/- (Ora\.|Oratio) unica/i, "");

          if (winner['missa'] && winner == days_tempo[ref_tempo] && !winner['missa'].match("Glo.") && commemoratio['missa'] && ref_tempo.match("lent")) missa = translate_feria(ref_tempo) + " - " + missa;
        }

      /////////////////////////////////
      ///// Commemoratio Vesperæ  /////
      /////////////////////////////////

      // Glossary:
      // vesperae = winner['vesperae']; 
      // comm_vesperae = commemoratio['vesperae']; 
      // vesperae_j = winner_next['vesperae_j'];
      // comm_vesperae_j = commemoratio_next['vesperae_j']; 
      // commemoratio_vesperae = pokud dojde k souběhu j. a ij. Nešpor, tohle je to, co prohrálo

      if ( comm_vesperae || commemoratio_vesperae || comm_vesperae_j ) 
        { 
          if (ref_tempo.match(/lent_5_6/)) comm_vesperae = ""; 

          vesperae = vesperae.replace(/- sine Com\.|sine Com\./, "");
          comm_vesperae = comm_vesperae.replace(/- sine Com.|sine Com./, "");

          comm = commemoratio['vesperae_commemoratio'];
          comm = ( comm == "C1") ? "Ecce ego mitto vos " : comm;
          comm = ( comm == "C12") ? "Beáti eritis " : comm;
          comm = ( comm == "C2") ? "Beátur vir " : comm;
          comm = ( comm == "C2a") ? "Iste Sanctus " : comm;
          comm = ( comm == "C22") ? "Hic est vere Martyr " : comm;
          comm = ( comm == "C3") ? "Isti sunt Sancti " : comm;
          comm = ( comm == "C32") ? "Tradidérunt " : comm;
          comm = ( comm == "C4") ? "Sacérdos et Póntifex " : comm;
          comm = ( comm == "C42") ? "Amávit eum Dóminus " : comm;
          comm = ( comm == "C42a") ? "Dum esset summus Póntifex " : comm;
          comm = ( comm == "C4d") ? "O Doctor óptime " : comm;
          comm = ( comm == "C5") ? "Iste cognóvit " : comm;
          comm = ( comm == "C52") ? "Iste Sanctus " : comm;
          comm = ( comm == "C6") ? "Veni, sponsa Christi " : comm;
          comm = ( comm == "C62") ? "Quinque prudéntes Vírgines " : comm;
          comm = ( comm == "C7") ? "Símile est ... hómini " : comm;
          comm = ( comm == "C8") ? "Pax ætérna " : comm;
          comm = ( comm == "C82") ? "O quam metuéndus " : comm;

          // O Antiphons in comm. 
          if (winner == days_sancto[ref_sancto] && month_usual_number == 12 && day >= 17 && day <=23 ) {
            comm = comm.replace(/Adv\. <i>.*<\/i>/, "Adv. " + O_ant[day-17]); }

          if (vesperae.match(/Feria/i) && ref_tempo.match("lent"))
             {
              vesperae = vesperae.replace(/Feria/i, comm.replace("Com. ", ""));
              comm = ""; comm_vesperae = "";
             }

          if ( comm.length > 3 ) comm_vesperae = comm;
          if ( comm && comm.length <= 3 ) comm_vesperae = titulum + " " + comm;
          comm_vesperae = comm_vesperae.replace("Com. ", "");

          if (vesperae.match("Com.") && comm_vesperae) 
            { // we need to sort the commemorations according to their force
             if (commemoratio['force'] < winner['force'] ) 
             {
                if (commemoratio['force'] > winner_next['force'] )
                    vesperae = vesperae.replace("Com.", "Com. " + comm_vesperae + " & ");
                else vesperae += " & " + comm_vesperae;
             }
             else if (commemoratio['force'] > 30 && !ref_sancto.match(/06_30/)) vesperae = vesperae.replace("Com.", "Com. " + comm_vesperae + " & ");
             // For 30.6.2024, Comm. of St. Peter should always go first and MM.maj. supersedes the Sunday, but not Pretiosissimum Sanguinem...
             else if ((commemoratio['force'] <= commemoratio_next['force']) || ref_sancto.match(/06_30/)) vesperae += " & " + comm_vesperae;
             else vesperae = vesperae.replace("Com.", "Com. " + comm_vesperae + " & ");
            }
          else if (comm_vesperae) vesperae += " - Com. " + comm_vesperae;

          comm = null;
        }
    }

      //////////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     /////////////////  Finis Commemorationum  \\\\\\\\\\\\\\\\\\\
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\|////////////////////////////|\

    if (commemoratio) {
      if (comm_head.match(/De ea/i)) comm_head = translate_feria(ref_tempo);
      else comm_head = comm_header_check;
      //if ( weekday == 0 && winner != days_tempo[ref_tempo] ) comm_head = "<i>Dominica </i>" + comm_head; 
      }

    ////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /////////////    Postprocessing of Laudes/Vesperae   \\\\\\\\\\\\\\
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////\\

    // sometimes, we need to replace Com. festum with Com. de seq.
    next_com_title = "Com. " + winner_next['header'];
    next_et_title = "&  " + winner_next['header']; // the Com. doesn't need to be as first
    if ( vesperae.match(next_com_title) ) vesperae = vesperae.replace(next_com_title, "Com. de seq.")
    if ( vesperae.match(next_et_title) ) vesperae = vesperae.replace(next_et_title, "& de seq.")

    // Sometimes, a Sabb. or Dom. Comm. gets stuck behind a Comm. from a higher Feast. To remedy this, we need to swap /Dom./ and /(Com.)/

    var all_new_vesp = [];

    if ((weekday == 0 || weekday == 6 ) && true && vesperae.match(/\(Com\.\)|\(Com\. et M\.\)|\(.ij\. Lect\. et M\.\)/)) 
      {
        if (vesperae.match(/^Com\./)) {
          all_comm_vesp = vesperae.split("&"); }
        else { vesperae_parts = vesperae.split(" - Com. "); 
        all_comm_vesp = (vesperae_parts[1] + "").split("&"); }
        // Let's push all "xij. Lect." Comms. to the end
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match("(xij. Lect. et M.)")) { 
                all_new_vesp.push(temp_comm); } 
            temp_comm = null; }
        // Now all "iij. Lect." Comms. to the end
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match("(iij. Lect. et M.)")) { 
                all_new_vesp.push(temp_comm); } 
            temp_comm = null; }
        // And now all "Com. et M."
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match(/\(Com\. et M\.\)/)) {
                all_new_vesp.push(temp_comm); }
            temp_comm = null; }
        // And now all "Com."
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match(/\(Com\.\)/)) { 
                all_new_vesp.push(temp_comm); }
            temp_comm = null; }
        // And now we need to delete all of the above from the original array,
        // otherwise if we splice an element from the array, the for cycle 
        // won't repeat the "0" element, but the "1" element doesn't exist anymore.
        for (k = (all_comm_vesp.length-1); k >= 0; k--) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match(/\(Com\.\)|\(Com\. et M\.\)|\(iij\. Lect\. et M\.\)|\(xij\. Lect\. et M\.\)/)) { 
                all_comm_vesp.splice(k,1);}
            temp_comm = null; }
          vesperae = vesperae_parts[0] + " - Com. ";
        //for (k = (all_comm_vesp.length-1); k >= 0; k--)
        for (k = 0; k < all_comm_vesp.length; k++)
          {
          //vesperae += 'all [' + k + ']' + all_comm_vesp[k];
          vesperae += all_comm_vesp[k];
          if (k < all_comm_vesp.length-1) vesperae += " & ";
          }
        if (all_new_vesp) {
          if (all_comm_vesp.length > 0) vesperae += " & ";
            for (k = 0; k < all_new_vesp.length; k++)
              { 
              //vesperae += 'new [' + k + ']' + all_new_vesp[k];
              vesperae += all_new_vesp[k];
              if (k < all_new_vesp.length-1) vesperae += " & ";
              } 
          }
      }

    ////  Angeli Custodes in September (Saturday, first Vesper) \\\\
    if ( weekday == 6 && ((month == 7 && (day == 1)|| (day == 31)) || (month == 8 && day < 7)) ) {
        vesperae = days_sancto['angeli_custodes_sept']['vesperae_j'] + " - Com. " + vesperae.replace("- Com.", "&"); laudes_post += days_sancto['angeli_custodes_sept']['martyrologium']; }

    // For (translated) Anniversary (1.6.1259), that happens to fall into the Octave of Corporis Christi or Ascens., the Octave Comm. from unused temporale must be filled in

    if (winner == days_sancto['anniversarium_dedicationis'] && ref_tempo.match(/pa_1_[56]|pa_2_[01234]/i) && commemoratio == days_sancto[ref_sancto])
    {
      if (!laudes.match("Com."))  
        laudes += " - Com. Oct. Corp. Chr. <ib>Ego sum panis.</ib>";
      else laudes = laudes.replace("Com.", "Com. Oct. Corp. Chr. <ib>Ego sum panis.</ib> &");
      if (!vesperae.match("Com.")) 
        vesperae += " - Com. Oct. Corp. Chr. <ib>O Sacraméntum.</ib>"; 
      else if (vesperae.match("Cognovérunt omnes."))
        vesperae = vesperae.replace("Cognovérunt omnes.</ib>", "Cognovérunt omnes.</ib> & Oct. Corp. Chr. <ib>Magníficat.</ib>"); 
      else vesperae = vesperae.replace("Com.", "Com. Oct. Corp. Chr. <ib>O Sacraméntum.</ib> &");
      if (missa) {
          missa = missa.replace(/3a.*? -/,"");
          missa = missa.replace("2a", "3a");
          missa = missa.replace(/Glo\.? [-–]/, "Glo - 2a de Oct. Corp. Christi.");
          missa = missa.replace(/(?:-)? Cre/, "- Cre");
          }
    }

    if (winner == days_sancto['anniversarium_dedicationis'] && ref_tempo.match(/tp_6_[56]|tp_7_[01234]/i) && commemoratio == days_sancto[ref_sancto])
    {
      if (!laudes.match("Com."))  
        laudes += " - Com. Oct. Ascensionis <ib>Ascéndo.</ib>";
      else laudes = laudes.replace("Com.", "Com. Oct. Ascensionis <ib>Ascéndo.</ib> &");
      if (!vesperae.match("Com.")) 
        vesperae += " - Com. Oct. Ascensionis <ib>O Rex glóriae.</ib>"; 
      else if (vesperae.match("Sabb. ante Dom. infra oct. Ascensionis."))
        vesperae = vesperae.replace("Sabb. ante Dom. infra oct. Ascensionis.", "Sabb. ante Dom. infra oct. Ascensionis <ib>Cum vénerit.</ib> & Oct. Corp. Chr. <ib>Pater, manifestávi.</ib>"); 
      else vesperae = vesperae.replace("Com.", "Com. Oct. Ascensionis <ib>O Rex glóriae.</ib> &");
      if (missa) {
          missa = missa.replace(/3a.*? -/,"");
          missa = missa.replace("2a", "3a");
          missa = missa.replace(/Glo\.? [-–]/, "Glo. - 2a de Oct. Ascensionis.");
          missa = missa.replace(/(?:-)? Cre/, "- Cre");
          }
    }

    // some antiphons change at Easter
     if ( ref_tempo.match("tp") ) {
        // Commune Confessoris non Pontificis
        vesperae = vesperae.replace(/Iste cogn[óo]vit/,"Beátus vir");
        laudes = laudes.replace(/Simil[áa]bo eum/,"Qui manet in me");

       // Commune Unius Martyris
         vesperae = vesperae.replace(/Be[aá]tus vir\.?|Iste Sanctus\.?/i,"Fíliæ Jerúsalem.");
         laudes = laudes.replace(/Qui vult ven[ií]re post me|Qui vult ven[ií]re|Qui vult|Qui odit/,"Lux perpétua");

       // Commune Martyrum
          vesperae = vesperae.replace(/Isti sunt Sancti|Isti sunt/i,"Fíliæ Jerúsalem");
          laudes = laudes.replace(/Fulg[ée]bunt justi/,"Lux perpétua");

       // Sabbato B.M.V. 
          vesperae = vesperae.replace('de seq. <ib>Beátam me dicent.</ib>','de seq. <ib>Regína cœli lætáre.</ib>');
        } // finis T.P.

      if (ref_tempo.match("adv")) 
        {
          missa = missa.replace("A cunctis", "Deus qui de beatæ")
        }

      check_next += '.<br>Sacérdos et Póntifex: "' + matchCount(vesperae,/Sac[ée]rdos et P[óo]ntifex/) + '" - Fíliæ Jerúsalem: "' + matchCount(vesperae,/F[íi]li(æ|ae) Jer[úu]salem/g)
      + '.<br>Comm. in Laudibus: "' + getComm(laudes) + '" - et in Vesperis: "' + getComm(vesperae)
      //+ '".</div>';

      if ( matchCount(vesperae,/F[íi]li(æ|ae) Jer[úu]salem/g) == 2 ) { t = 0;
        vesperae = vesperae.replace(/F[íi]li(æ|ae) Jer[úu]salem/g, match => ++t == 2 ? "Lux perpétua" : match); }
      if ( matchCount(laudes,/Lux perp[ée]tua/g) == 2 ) { t = 0;
        laudes = laudes.replace(/Lux perp[ée]tua/g, match => ++t == 2 ? "Fíliæ Jerúsalem" : match); }

      if ( matchCount(vesperae,/Sac[ée]rdos et P[óo]ntifex/) == 1 ) { t = 0;
        vesperae = vesperae.replace(/Sac[ée]rdos et P[óo]ntifex/g, match => ++t == 2 ? "Euge serve bone" : match); }
      if ( matchCount(laudes,/Euge,? serve bone|Euge,? serve|Euge/) == 1 ) { t = 0;
        laudes = laudes.replace(/Euge,? serve bone|Euge,? serve|Euge/g, match => ++t == 2 ? "Sacérdos et Póntifex" : match); }


    /// Final commemoration of B.M.V. on Festa xij. Lect. et M. and lower \\\
    laudes_bmv = " B.M.V.";
    vesperae_bmv = " B.M.V.";
    et = " &"
    et1 = " &"
    dash = " – ";
    if ( laudes == "" ) dash = "";
    if ( laudes.match("B.M.V.") ) { laudes_bmv = ""; et = "";}
    if ( winner['header'].match("B.M.V.") ) { laudes_bmv = ""; et = ""; et1 = "";}
    if ( laudes.match(/Com\. /) ) et1 = " &";
    
    // Com. B.M.V. ad Laudes 
    if ( winner['force'] < 41 && !header.match(/Infra Oct/i) && getComm(laudes) < 3) // !header.match(/Infra Oct/i)
      {
      laudes = laudes.replace(/(?: - )?sine Com\.?/, "");
      if ( weekday == 2 && getComm(laudes) < 2 ) laudes_bmv += " & B. B. R.";
      if ( weekday == 3 && getComm(laudes) < 2 ) laudes_bmv += " & S. Joseph";
      if ( weekday == 6 && getComm(laudes) < 2 ) laudes_bmv += et1 + " De Pace";

      if ( laudes.match("& B.M.V. ") ) laudes = laudes.replace("B.M.V. ", "B.M.V. " + laudes_bmv + " ");
      else if ( laudes.match(/Com\. /) ) laudes = laudes + et + laudes_bmv;
      else laudes = laudes + dash + "Com. " + laudes_bmv;
      }

    if (winner == days_sancto['votiva_bernardi']) laudes = laudes.replace("B. B. R.", "B. R. <red>(nomen S. Bernardi hic omittitur)</red>");

    // Com. B.M.V. ad Vesperas
    et = " &"
    dash = " – ";
    if ( vesperae == "" ) dash = "";
    if ( vesperae.match("B.M.V.") || weekday == 6) { vesperae_bmv = ""; et = "";}
    if ( weekday == 5 && winner_next['force'] < 35 && !vigilia_sabb ) { vesperae_bmv = ""; et = ""; }

    if ( winner_next['force'] < 41 && winner['force'] < 41 && !header.match(/Infra Oct/i) && getComm(vesperae) < 3) // && !header.match(/Infra Oct/i)
      {
      vesperae = vesperae.replace(/(?: - )?sine Com\.?/, "");
      if ( weekday == 1 && getComm(vesperae) < 2 ) vesperae_bmv += et + " B. B. R.";
      if ( weekday == 2 && getComm(vesperae) < 2 ) vesperae_bmv += " & S. Joseph"; 
      if ( weekday == 5 && getComm(vesperae) < 2 ) vesperae_bmv += et + " De Pace";

      if ( vesperae.match("& B.M.V. ") ) vesperae = vesperae.replace("B.M.V. ", "B.M.V. " + vesperae_bmv + " ");
      else if ( vesperae.match(/Com\. /) && vesperae_bmv ) vesperae += " &" + vesperae_bmv;
      //else if ( vesperae.match(/Com\. /) ) vesperae += vesperae_bmv;
      else if (vesperae_bmv) vesperae = vesperae + dash + "Com. " + vesperae_bmv;
      }

    if (winner_next == days_sancto['votiva_bernardi']) vesperae = vesperae.replace("B. B. R.", "B. R. <red>(nomen S. Bernardi hic omittitur)</red>");

    // TO DO: cite the Antiphon and verse first time they change
    if ( ref_sancto.match(/02_0[345]/) ) 
      { laudes = laudes.replace("B.M.V.", "B.M.V. <red>℣. <ib>D</red>ignáre me.</ib> Ora. <ib><red>C</red>oncéde misericors.</ib>");
        vesperae = vesperae.replace("B.M.V.", "B.M.V. <ib><red>A</red>ve Regína cœlórum</ib> <red>℣. <ib>D</red>ignáre me.</ib> Ora. <ib><red>C</red>oncéde misericors.</ib>"); }

    check_next += '.<br>Comm. in Laudibus: "' + getComm(laudes) + '" - et in Vesperis: "' + getComm(vesperae)
      + '".</div>';

    /////////  Getting rid of unused "Feria"  \\\\\\\\\\\\\
    if (!ref_tempo.match("lent") || weekday == 0) {
      //laudes = laudes.replace(/Feria(?: & )?/, "");
      //vesperae = vesperae.replace(/Feria(?: & )?/, ""); }
      laudes = laudes.replace(/Feria & /, "");
      vesperae = vesperae.replace(/Feria & /, ""); }

    /////////  Reminder of Ferial Hymn change after All Saints  \\\\\\\\\\\\\
    if (winter_hymns && day > 1 && day < 8 && month_usual_number == 11 && winner == days_tempo[ref_tempo])
      { 
        if (laudes.match(/^Com\.|^sine Com\./)) minus = "- "; else minus = "";
        vigiliae = "Hymn. <i>Ætérne rerum cónditor;</i> " + vigiliae;
        laudes = "Hymn. <i>Splendor patérnæ glóriæ;</i> " + minus + laudes;
        winter_hymns = false;
      }

    /////  Vigilia Omnium Sanctorum: martyrologium  \\\\\
    if (ref_sancto == "10_30" && weekday == 6) laudes_post = days_sancto["11_01"]['martyrologium'].replace("Festívitas", "Vigília Festivitátis").replace("Slavnost", "Vigilie slavnosti").replace(" - Ave Maria.", "") + laudes_post;

    //// Postprocessing \\\\
    vesperae = vesperae.replace("(et M.)", "(Com. et M.)"); // to be removed, hopefully. For some reason, the code doesn't work without replaceAll("Com. ","") in line 814 (Comm. of first Vesper) and I'm too tired to find out why.
    laudes = laudes.replaceAll(/\(Com\.\) |\(Com\. et M\.\) |\(iij\. Lect\. et M\.\) /g, "");

    laudes = laudes.replace('- Com. + <u>Vesp. Def.', " + <u>Vesp. Def.");
    vesperae = vesperae.replace('- Com. + <u>Vesp. Def.', " + <u>Vesp. Def.");

    vesperae = vesperae.replace(/de seq\. \(.ij\. Lect\. et M\.\)/, "de seq.");

    missa = missa.replace("  ", " ");

    if ( ref_sancto.match(/09_20v|09_19v/) && quatember_septembris ) 
      {
        laudes = laudes.replace("Vigiliæ S. Matthæi, Ap. et Evang. & ", "")
        laudes += ' <red>De Vigilia S. Matthæi in Laudibus nihil fit.</red>';
      }

    if (false && tricenarium_vesperae) // original, cycling the j., ij. and iij. Noct.
      {
      vesperae += " " + days_sancto['tricenarium']['vesperae_j'];
      if (noct_defunct_counter % 3 == 2) vesperae = vesperae.replace('<u>j. Noct.</u>', "<u>ij. Noct.</u>");
      else if (noct_defunct_counter % 3 == 0) vesperae = vesperae.replace('<u>j. Noct.</u>', "<u>iij. Noct.</u>");
      noct_defunct_counter++;
      }

    if (tricenarium_vesperae)
      {
      vesperae += " " + days_sancto['tricenarium']['vesperae_j'];
      if (weekday == 1 || weekday == 4) vesperae = vesperae.replace('<u>j. Noct.</u>', "<u>ij. Noct.</u>");
      else if (weekday == 2 || weekday == 5) vesperae = vesperae.replace('<u>j. Noct.</u>', "<u>iij. Noct.</u>");
      }

    if (day == 1) pro_defunctis == true;
    no_off_mensis = true;
    if (weekday == 1 && ((day > 18 && month_usual_number == 9)
                       ||(day < 18 && month_usual_number == 10)) ) {
      off_feriale = true;
      if (OM_dates[year]) OM_date = OM_dates[year].split(",");
      for (ii = 0; ii < 7; ii++) {
        if ( OM_date[month_usual_number] == (day+ii) ) no_off_mensis = false }
      }

    if (ref_sancto.match(/09_17|09_18|09_19|10_18/)) off_feriale = false;

    if (tricenarium)
      {
      laudes += " " + days_sancto['tricenarium']['laudes'];
      // for 20.9.
      missa = missa.replace("3a SS. Eustachii", "3a pro defunctis <i>Deus véniæ.</i> 4a SS. Eustachii") 
      missa = missa.replace("de officio diei", "pro defunctis <i>Deus véniæ</i>")

      if (ref_sancto.match("09_19") && weekday == 6) missa = missa.replace("5a", "5a pro defunctis <i>Deus véniæ</i>. 6a");

      // For Feria, Comm. and Comm. et M., Ora. "Deus véniæ." is inserted before "A cunctis."
      if (true && (winner['force'] < 20 || winner['header'].match(/Quatt?uor/i)) && !missa.match(/Deus v(é|e)ni(æ|ae)/)) {
        missa = missa.replace("5a", "6a");
        missa = missa.replace("4a", "5a");
        missa = missa.replace("3a", "4a");
        missa = missa.replace("2a", "3a");
        missa = missa.replace("3a", "2a pro defunctis <i>Deus véniæ.</i> 3a");
        if (!missa.match(/4a (S|V)/)) missa = missa.replace(/4a .*? -/i, "-")
        }
      if (!pro_defunctis) missa = missa.replace("pro defunctis", "pro def."); 
      if (missa.match("pro defunctis")) pro_defunctis = false;

      // Before:
      if (no_off_mensis && off_feriale && winner['header'].match(/de ea/i) && winner['force'] < 20 && ( !commemoratio || (commemoratio && commemoratio['rank'] != "Commemoratio et M.") ) ) 
        { missa_post = "<li>- <u>in Missa Conv.:</u> Missa Quotidiana Defunct. (Req. 4) - 1a <i>Deus véniae.</i> 2a <i>Deus cui proprium.</i> 3a <i>Fidélium Deus.</i> - Praef. Def.</li> <li>- <u>in Miss. priv.:</u> " + missa + '</li>' + missa_post; missa = ""; off_feriale = false; color = "black/" + color; } 
      }

    if (weekday == 6 && quatember_septembris ) quatember_septembris = false; 

    /////////  Festum Domini Nostri Jesu Christi Regis (Dominica ultima Octobris)  \\\\\\\\
    if (Christus_Rex_vespera) {
      vesperae = vesperae.replace(/de festo/i, winner['vesperae_commemoratio'].replace(/^Com\. /, ""));
      vesperae = vesperae.replace(/de seq\./, winner['vesperae_j_commemoratio']);
      vesperae = vesperae.replace(/^Com\. /, "");
      vesperae = vesperae.replace(/ - Com\. /, " & ");
      vesperae = days_sancto['Christus_Rex']['vesperae_j'] + " - Com. " + vesperae;
      Christus_Rex_vespera = false;
      if (after_ChR) after = after_ChR + after;
      }

    if (Christus_Rex) {
      if (commemoratio_add['missa']) missa = missa.replace("- Cre.", "3a " + commemoratio_add['header'].replace(/,.*/,"") + ". - Cre.");
      Christus_Rex = false;
      }

    /////  All Souls Day - Commemoratio Omnium Fidelium Defunctorum  \\\\\
    // Usually 2.11., unless it falls on Sunday, then 3.11.
    if (ref_sancto == "11_01" && weekday != 6 || ref_sancto == "11_02" && weekday == 0) vesperae += days_sancto['all_souls']['vesperae_j'];

    if (ref_sancto == "11_02" && weekday != 0 || ref_sancto == "11_03" && weekday == 1)
      {
        header = days_sancto['all_souls']['header'];
        color = days_sancto['all_souls']['color'];
        laudes += days_sancto['all_souls']['laudes'];
        laudes_post += days_sancto['all_souls']['laudes_post'];
        missa = days_sancto['all_souls']['missa'];
      }


    /////  Commemoratio Parentum et Fratrum Nostrorum Defunctorum  \\\\\
    // Usually 20.11., unless it falls on Sunday, then 24.11.
    if (ref_sancto == "11_19" && weekday != 6 || ref_sancto == "11_23" && weekday == 3) vesperae += days_sancto['parentes_et_fratres_defuncti']['vesperae_j'];

    if (ref_sancto == "11_20" && weekday != 0 || ref_sancto == "11_24" && weekday == 4)
      {
        header = days_sancto['parentes_et_fratres_defuncti']['header'];
        color = days_sancto['parentes_et_fratres_defuncti']['color'];
        laudes += days_sancto['parentes_et_fratres_defuncti']['laudes'];
        if (laudes_post.match("1o ")) {
          laudes_post = laudes_post.replace('</li>', '');
          laudes_post += days_sancto['parentes_et_fratres_defuncti']['laudes_post'].replace('<li><u>- in Capit.:</u>', '').replace("in Martyrologio 1o ", "2o "); }
        else laudes_post += days_sancto['parentes_et_fratres_defuncti']['laudes_post'];
        missa = days_sancto['parentes_et_fratres_defuncti']['missa'];
      }

    ////  Adding the green "&" sign \\\\
    laudes = laudes.replaceAll("& ", '<font color="green">&</font> ');
    missa = missa.replaceAll("& ", '<font color="green">&</font> ');
    vesperae = vesperae.replaceAll("& ", '<font color="green">&</font> ');

    ///////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ////////    Postprocessing Missa   \\\\\\\\\\\
    //\\\\\\\\\\\\\\\\\/////////////////////////\\

      /// Processio vs. Sub tuum. After Exalt. S. Crucis (14.9.), it is Sub tuum.
      if (weekday == 0 && ((day > 14 && month_usual_number == 9) || month_usual_number > 9)) missa = missa.replace(/Processio (–|-)|Processio per Ecclesiam (–|-)/, "Sub tuum -");

      /// Praefationes
      if (ref_tempo.match("lent")) 
        missa = missa.replace(/Pr(ae|æ)f\. Comm\./, "Præf. Quadr.");
      if (!ref_tempo.match(/ash|lent|adv/))
        missa = missa.replace(/.a Feria\.? -/i, "-" );
      if (ref_tempo.match("lent_5")) missa = missa.replace(/Pr(ae|æ)f\. Quadr\./, "Præf. de S. Cruce.");
      if (ref_tempo.match("tp_")) missa = missa.replace(/Pr(ae|æ)f\. Comm\.|Pr(ae|æ)f\. Quadr\./, "Præf. Pasch.");

      // Removing "Commemoratio -vel-"
      if (missa.match(/Commemoratio -vel-/i) && !commemoratio)
          missa = missa.replace(/Commemoratio -vel-/i, "" );
      else if (missa_post.match(/Commemoratio -vel-/i) && !commemoratio)
          missa_post = missa_post.replace(/Commemoratio -vel-/i, "" );

      if (ref_sancto == "07_23" && weekday == 6) {
        missa += " - <red>Evangelium Vigiliæ in fine.</red>"; }

      if ( commemoratio && commemoratio['header'].match(/Vigilia/i) ) missa += " - <red>Evangelium Vigiliæ in fine.</red>";

      if ( commemoratio && commemoratio['header'].match(/Quatuor Temporum/i) ) missa += " - <red>Evangelium Feriæ Quatuor Temp. in fine.</red>";

      if (commemoratio_add && (winner == days_sancto['votiva_bmv'] || winner == days_sancto['votiva_bmv_prima_sabb']) && ref_tempo.match("adv_")) {
          if (commemoratio_add['missa']) missa = missa.replace("de Sp. Sancto", commemoratio_add['header'].replace(/,.*/,"")); }

      ///  Rorate Mass: adding Miss. priv. in Feria \\\
      if (ref_tempo.match("adv_") && winner['force'] == 25)
        {
        tertia = "de Sp. Sancto"
        if (commemoratio) tertia = titulum_missa;
        missa_post = "<li>- <u>in Missa Conv.</u> <blue><i>Rorate</i></blue> - sine Glo. - 2a de Dominica. 3a " + tertia + ". - Praef. B.M.V. <i>Et Te in veneratione.</i></li><li>- <u>in Miss. priv.</u> " + missa + "</li>" + missa_post
        missa = "";
        }

      ///  Rorate Mass: adding Miss. priv. in Off. SS. Sacramento \\\
      if (ref_tempo.match("adv_") && winner == days_sancto['votiva_sacramentum'])
        {
        missa_post = "<li>- <u>in Missa Conv.</u> " + missa + "</li><li>- <u>in Miss. priv.</u> De. SS. Sacramento <red>ut supra</red> (vel <blue><i>Rorate</i></blue> ante ortum solis, id est 7.55!)</li>" + missa_post
        missa = "";
        }

      ///  Rorate Mass: adding Miss. priv. in Off. S. Bernardi \\\
      if (ref_tempo.match("adv_") && winner == days_sancto['votiva_bernardi'])
        {
        missa_post = "<li>- <u>in Missa Conv.</u> " + missa + "</li><li>- <u>in Miss. priv.</u> De. S. Bernardo <red>ut supra</red> (vel <blue><i>Rorate</i></blue> ante ortum solis, id est 7.55!)</li>" + missa_post
        missa = "";
        }

      if ((missa.match(/Dominica/i) || missa_post.match(/Dominica/i)) && ref_tempo.match(/adv/i)) {
          missa = missa.replace(/Dominica/ig, "Dom. " + roman_lc[ref_tempo.substring(4,5)] + " Adv.");
          missa_post = missa_post.replace(/Dominica/ig, "Dom. " + roman_lc[ref_tempo.substring(4,5)] + " Adv");}

      // If there is no Comm. in Advent Sunday, it takes Comm. as usual for Ferias
      if (ref_tempo.match(/adv/i) && weekday == 0 && missa.match("Glo. - Cre."))
        missa = missa.replace("Glo. - Cre.", "Glo. - 2a De S. Maria <i>Deus, qui de beátæ.</i> 3a <i>Ecclesiæ tuæ.</i> vel pro Papa - Cre.")
      missa = missa.replace("..", ".");

    ////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\
    //////////     Officium Defunctorum    \\\\\\\\\\
    //----------------------------------------------\\
    
    /// Officium mensis \\\
    //-------------------\\\

    // Variables containing individual dates of O.M. are declared before this function

    if (OM_dates[year]) 
    {
      OM_date = OM_dates[year].split(",");

      if ( day == (OM_date[month_usual_number]-1) ) {
        vesperae += " " + days_sancto['officium_mensis']['vesperae_j'];
        noct_defunct_counter++;
      }
    
      if ( day == OM_date[month_usual_number]) {
        color = days_sancto['officium_mensis']['color'] + '/' + color;
        laudes += " " + days_sancto['officium_mensis']['laudes'];
        missa_post = days_sancto['officium_mensis']['missa'] + missa; missa = "";
        if (header.match(/de ea/i)) header = days_sancto['officium_mensis']['header'];
        else header += " atque " + days_sancto['officium_mensis']['header'];
        off_mensis = true;
      }
    }

    // Officium feriale: find a day
    if (false && off_mensis && weekday == 0) {off_feriale = true; off_mensis = false;}

    // Implement the Off. feriale
    if ( winner_next['force'] < 30 && off_feriale && day != (OM_date[month_usual_number]-1) )
      { vesperae += " " + days_sancto['officium_mensis']['vesperae_j']; noct_defunct_counter++;}
    if ( winner['force'] < 30 && off_feriale && day != OM_date[month_usual_number] )
      { 
        color = days_sancto['officium_mensis']['color'] + '/' + color;
        laudes += " " + days_sancto['officium_mensis']['laudes'];
        missa_post = days_sancto['officium_mensis']['missa'] + missa; missa = "";
        missa_post = missa_post.replace("Anniv. Def. (3. Req.)", "Missa Quotidiana Defunct. (4. Req.)");
        if (header.match(/de ea/i)) header = days_sancto['officium_mensis']['header'];
        else header += " atque " + days_sancto['officium_mensis']['header'];
        header = header.replace(/mensis/i, "Feriale");
        off_feriale = false;
      }

    // Tricenarium solemne (1)
    if (winner_next == days_sancto['09_18tr'] || commemoratio_next == days_sancto['09_18tr']) { vesperae += " " + days_sancto['09_18tr']['vesperae_j']; noct_defunct_counter++;}

    if (winner == days_sancto['09_18tr'] || commemoratio == days_sancto['09_18tr']) { 
      laudes += " " + days_sancto['09_18tr']['laudes']; 
      if (commemoratio == days_sancto['09_18tr']) {
        missa = missa.replace("2a Commemoratio Fratrum", "2a pro defunctis <i>Deus véniæ.</i> 3a A cunctis");
        missa += "<li>- <u>in Miss. priv.:</u> Anniv. Def. (3. Req.) - <red>Oratio unica</red> <i>Deus véniæ.</i> – Praef. Def. ";
        pro_defunctis = false; }
      }

    if (commemoratio == days_sancto['09_18tr']) header += '<span class="header text-justify ms-1"><b> atque ' + commemoratio['header'] + '</b></span>';

    /////////////////////|\\\\\\\\\\\\\\\\\\\\\\
    /////////  Lectiones in Refectorio  \\\\\\\\\
    //||\\\\\\\\\\\\\\\\\|///////////////////////
    // Wackarz: Rit. Cist. p. 257-260
    if ( ref_tempo == "adv_1_0") 
      { lectio_ref = 1; lectio_ref_prev = 0; dominica_prima = false; }
    if ( ref_sancto == "01_01") lectio_ref++;
    if ( ref_tempo == "sept_1_0") lectio_ref++;
    if ( ref_tempo == "lent_5_0") lectio_ref++;
    if ( ref_tempo == "tp_1_0") lectio_ref++;
    if ( ref_tempo == "tp_8_0") lectio_ref++;
    if ( weekday == 0 && sabb_mensis == 1 ) {dominica_prima = true; lectio_ref++;}

    if ((lectio_ref > lectio_ref_prev) || (month_usual_number >= 7 && dominica_prima)) {
        missa_post = missa_post + '<div class="small">¶ <font color="red">In Refectorio ab hodierna die ' + lectiones[lectio_ref] + ', prout Cæremoniarius indicat</font> (Rit. Cist. p. 257-260)</div>'; 
        lectio_ref_prev++;
        dominica_prima = false; }

    //// Winter and Summer Daylight Saving Time \\\\
    ////////////////////////////////////////////////
    if (month == 9 && weekday == 6 && (day > 23 && day < 31)) after += '<div class="small">¶ <red>Hæc Dominica una hora longior erit, quia Tempus Hiemale introducitur.</red></div>';
    if (month == 2 && weekday == 6 && (day > 23 && day < 31)) after += '<div class="small">¶ <red>Hæc Dominica una hora brevior erit, quia Tempus Æstivale introducitur.</red></div>';
    
    
    /////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //////  Replacement section (HTML tags) and output  \\\\\\\
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////////////////\\

    before = addtags(before);
    header = addtags(header);
    vigiliae = addtags(vigiliae);
    laudes = addtags(laudes); 
    missa = addtags(missa); 
    vesperae = addtags(vesperae);
    after = addtags(after);
    laudes_post = addtags(laudes_post);
    missa_post = addtags(missa_post);
    vesperae_post = addtags(vesperae_post);
    subtitulum = addtags(subtitulum);
    
    ////  OUTPUT  \\\\
    html = html.concat(component(
      date,
      year,
      month,
      day,
      weekday,
      before,
      color,
      header,
      rank,
      comm_head,
      subtitulum,
      vigiliae,
      laudes,
      laudes_post,
      missa,
      missa_post,
      vesperae,
      vesperae_post,
      winner['body'],
      after,
      check_next,
    ));
    
    commemoratio = null;
    year = date.getFullYear();
    month = date.getMonth();
  }

  return html;
}

function component(date, year, month, day, weekday, before, color, header, rank, comm_header, subtitulum, vigiliae, laudes, laudes_post, missa, missa_post, vesperae, vesperae_post, body, after, check) {
  // This function returns a component, that is a piece of HTML code representing a line of the Ordo.

  // New year? new month?:
  if (date.getFullYear() != year) {
    year = date.getFullYear();
    block_new_year = '<div class="year brown mt-5"><font color="red">A</font>nnus <font color="red">D</font>omini ' + year + '</div>';
    if (day == 1) {
      month = date.getMonth();
      block_new_month = '<div class="month blue mb-3">Januarius</div>';
    }
  } else {
    block_new_year = '';
    if (day == 1 ) {
      month = date.getMonth();
      // !!!!!!! Officium mensis must be solved (computed?) !!!!!!!
      off_mensis_text = "";
      if (OM_date[(month+1)]) off_mensis_text = '<div class="body blue">O. M. ' + OM_date[(month+1)] + '</div>';
      block_new_month = '<div class="month blue my-3">' + month_human_readable(month) + off_mensis_text + '</div>';
    } else {
      block_new_month = '';
    }
  }

  // Blocks 'before' and 'after'?:
  if (before) {
    block_before = '<div class="body text-justify"><ul>' + before + '</ul></div>';
  } else { block_before = ''; }
  if (after) {
    block_after = '<span class="body text-justify ms-1"><ul>' + after + '</ul></span>';
  } else { block_after = ''; }

  // Blocks that can also be empty: Rank, Subtitulum, Vigiliae, Laudes, Missa, Vesperae and texts between them:

  if (rank) {
    rank = rank.replace(" ", " ");
    //block_rank = '<b> – ' + rank + '</b>';
    block_rank = ' – ' + rank + '</b>';
    block_rank = block_rank.replace("  ", " "); // for some reason, font color doesn't work here, unless preceded by a space. This deletes it.
  } else { block_rank = ''; }

  header = header.replace("+","");
  if ( !header.match(/De ea|De ea./i) ) header = '<span class="header text-justify ms-1"><b>' + header + '</b></span>';

  if (comm_header && false) {
    comm_header = comm_header.replace("+","");
    if (comm_header.match(/De ea\./i)) comm_header = titulum_missa;
    block_commemoratio = '<div class="body text-justify"><ul><font color="black"><i>Commemoratio:</i></font><font color="Fuchsia"><b> ' + comm_header + '</b></font></ul></div>';
  } else { block_commemoratio = ''; }

  if (subtitulum) {
    block_subtitulum = '<div class="body text-justify"><ul>' + subtitulum + '</ul></div>';
  } else { block_subtitulum = ''; }

  if (vigiliae) {
    block_vigiliae = '<div class="body text-justify"><ul><li>– <u>ad Vigil.:</u> ' + vigiliae + '</li></ul></div>';
  } else { block_vigiliae = ''; }

  if (laudes) {
    block_laudes = '<div class="body text-justify"><ul><li>– <u>in Laud.:</u> ' + laudes + ' </li></ul></div>';
  } else { block_laudes = ''; }

  if (missa) {
    block_missa = '<div class="body text-justify"><ul><li>– <u>in Missa:</u> ' + missa + '</li></ul></div>';
  } else { block_missa = ''; }

  if (vesperae) {
    block_vesperae = '<div class="body text-justify"><ul><li>– <u>in Vesp.:</u> ' + vesperae + '</li></ul></div>';
  } else { block_vesperae = ''; }

////////////////   Texts between them   /////////////////////

if (laudes_post) {
    block_laudes_post = '<div class="body text-justify"><ul>' + laudes_post + '</ul></div>';
  } else { block_laudes_post = ''; }

  if (missa_post) {
    block_missa_post = '<div class="body text-justify"><ul>' + missa_post + '</ul></div>';
  } else { block_missa_post = ''; }

  if (vesperae_post) {
    block_vesperae_post = '<div class="body text-justify"><ul>' + vesperae_post + '</ul></div>';
  } else { block_vesperae_post = ''; }

  ///////////////  Special days  ///////////////////

  if (ref_tempo.match(/tp_6_[123]/) && winner == days_tempo[ref_tempo]) addition = " Rogationum";
  else addition = "";

  /////////////   jejunatur   ///////////////////////////////

  if ((weekday == 3 || weekday == 5) && winner['force'] < 90 && !ref_tempo.match(/tp/)) {
    block_jejunium = ' – <font color="red">jejunatur</font>';
  } else if ( ref_tempo == "ash_1_3" || ref_tempo == "lent_6_5" ) { 
    block_jejunium = ' – <font color="red">jejunatur</font> <font color="blue">(den přísného postu)</font>';
  } else if ( ref_tempo.match(/adv|lent|ash/) && winner['force'] < 100 ) {
    block_jejunium = ' – <font color="red">jejunatur</font>';
  } else if ( ref_tempo.match(/lent_6_[123]/)) {
    block_jejunium = ' – <font color="red">jejunatur</font>';
  } else if ( laudes_post.match(/[Vv]ig[ií]l[íi]a/) && winner['force'] < 90 ) {
    block_jejunium = ' – <font color="red">jejunatur</font>';
  } else if ( header.match(/[Vv]ig[ií]l[íi]a|Quatuor Temporum/i)) {
    block_jejunium = ' – <font color="red">jejunatur</font>';
  //} else if (winner_next['force'] >= 100 && weekday != 0) {
  //  block_jejunium = ' – <font color="red">jejunatur</font>';
  } else { block_jejunium = ''; }

  ////////  Output format  \\\\\\\\\
  if (display_format == "output") 
    {
    if (missa) missa = missa.replaceAll(/<\/?li>/g, "");
    if (missa_post) missa_post = missa_post.replaceAll(/<\/?li>/g, "");
    if (laudes_post) laudes_post = laudes_post.replaceAll(/<\/?li>/g, "");

    if (block_jejunium && subtitulum) block_jejunium += " – ";
    if (subtitulum) block_subtitulum = '<span class="body text-justify">' + subtitulum + ' ';
    else block_subtitulum = '<span class="body text-justify"> '; 

    if (vigiliae) block_vigiliae = '– <u>ad Vigil.:</u> ' + vigiliae + ' ';
      else block_vigiliae = '';
    if (laudes) block_laudes = '– <u>in Laud.:</u> ' + laudes + ' ';
      else block_laudes = '';
    if (missa) block_missa = '– <u>in Missa:</u> ' + missa + ' ';
      else block_missa = '';
    if (vesperae) block_vesperae = '– <u>in Vesp.:</u> ' + vesperae + ' ';
      else block_vesperae = '';

    if (laudes_post) block_laudes_post = laudes_post + ' ';
      else block_laudes_post = ''; 
    if (missa_post) block_missa_post = missa_post + ' ';
      else block_missa_post = '';
    if (vesperae_post) block_vesperae_post = vesperae_post + ' ';
      else block_vesperae_post = ''; 
    }

  // if we have narrower screen, we want to take up more space
  //if (window.innerWidth/screen.width < 0.9 || window.innerWidth < 1300) width = "75"; else width = "50"; 
  width = "75";
//////////////////////////////////////////////////////////////

  // Result:
  if (display_format == "output") { 
    // output for Ordo version
    return (
     block_new_year
     + block_new_month
     + '<div class="d-flex flex-column w-' + width + ' mb-2">' // w-50 was here originally
     + block_before
     + '<span class="body text-justify">'  + add_zero(day) + day + "." 
     + " – <b>" + liturgical_color(color) + "</b> – " 
     + weekday_human_short(weekday) + addition + ' – '
     + header 
     + block_rank 
     + block_jejunium 
     + block_subtitulum
     + block_vigiliae
     + block_laudes
     + block_laudes_post
     + block_missa
     + block_missa_post
     + block_vesperae
     + block_vesperae_post
     + block_after
     + '</span></div>'
    );
  }
  // Debugging version with the "check" variable active
  else if (display_format == "debug")
    return (
    block_new_year
    + block_new_month
    + '<div class="d-flex flex-column w-' + width + ' mb-2">' // w-50 was here originally
    + block_before
    + '<div class="head d-flex mb-0">'
    + '<span class="body text-justify">'  + add_zero(day) + day + "." 
    + " – <b>" + liturgical_color(color) + "</b> – " 
    + weekday_human_short(weekday) + addition + ' – '
    + header 
    + block_rank 
    + block_jejunium + '</span>'
    + '</div>'
    + block_commemoratio 
    + block_subtitulum
    + block_vigiliae
    + block_laudes
    + block_laudes_post
    + block_missa
    + block_missa_post
    + block_vesperae
    + block_vesperae_post
    //+ '</div>'
    //+ '<div class="body blue text-justify ms-1">' + body + '</div>'
    + block_after
    + '</div>'
    + check // switch off and on here
  );
  // standard output version
  else return (
    block_new_year
    + block_new_month
    + '<div class="d-flex flex-column w-' + width + ' mb-2">' // w-50 was here originally
    + block_before
    + '<div class="head d-flex mb-0">'
    + '<span class="body text-justify">'  + add_zero(day) + day + "." 
    + " – <b>" + liturgical_color(color) + "</b> – " 
    + weekday_human_short(weekday) + addition + ' – '
    + header 
    + block_rank 
    + block_jejunium + '</span>'
    + '</div>'
    + block_commemoratio 
    + block_subtitulum
    + block_vigiliae
    + block_laudes
    + block_laudes_post
    + block_missa
    + block_missa_post
    + block_vesperae
    + block_vesperae_post
    //+ '</div>'
    //+ '<div class="body blue text-justify ms-1">' + body + '</div>'
    + block_after
    + '</div>'
    //+ check // switch off and on here
  );
}
