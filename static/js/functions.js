function weekday_human_readable(weekday) {
  return ['<span class="dominica">Dominica.</span>', 'Feria II.', 'Feria III.', 'Feria IV.', 'Feria V.', 'Feria VI.', 'Sabbato.'][weekday];
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
  if (color == "black" ) { return '<font color="black">Nig.</font>';}
  if (color == "blue" ) { return '<font color="blue">Cær.</font>';}
  else { return '<font color="red">A</font><font color="gree">li</font><font color="blue">a.</font>'; }
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
  else if (sabb_mensis == 1 && month_sabb == 9) return "Cum audísse Job.";
  else if (sabb_mensis == 2 && month_sabb == 9) return "Quare detraxístis.";
  else if (sabb_mensis == 3 && month_sabb == 9) return "Ne reminiscáris.";
  else if (sabb_mensis == 4 && month_sabb == 9) return "Adónai.";
  else if (sabb_mensis == 5 && month_sabb == 9) return "Adónai."; // Nisi sit dimitténda eo quod proximior sit Kalendis Octobris.
  // October
  else if (sabb_mensis == 1 && month_sabb == 10) return "Adapériat";
  else if (sabb_mensis == 2 && month_sabb == 10) return "Exáudiat Dóminus.";
  else if (sabb_mensis == 3 && month_sabb == 10) return "Ornavérunt.";
  else if (sabb_mensis == 4 && month_sabb == 10) return "Tu, Dómine universórum.";
  else if (sabb_mensis == 5 && month_sabb == 10) return "Tua est poténtia."; // Nisi sit dimitténda eo quod proximior sit Kalendis Novembris.
  // November
  else if (sabb_mensis == 1 && month_sabb == 11) return "Vidi Dóminum sedéntem";
  else if (sabb_mensis == 2 && month_sabb == 11) return "Aspice Dómine.";
  else if (sabb_mensis == 3 && month_sabb == 11) return "Super muros tuos.";
  else if (sabb_mensis == 4 && month_sabb == 11) return "Muro tuo.";
  else if (sabb_mensis == 5 && month_sabb == 11) return "Qui coelórum cóntines thronos.";
  else return "alia Antiphona."
  }

function get_ref_sancto(offset)
  { 
    ref_sancto_next = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day + offset) + (day + offset);

      ref_sancto_next = ref_sancto_next.replace("010", "10");

      ref_sancto_next = ( ref_sancto_next == "12_32") ? "01_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "01_32") ? "02_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "02_30" && is_leap_year(year) ) ? "03_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "02_29" && !is_leap_year(year) ) ? "03_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "03_32") ? "04_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "04_31") ? "05_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "05_32") ? "06_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "06_31") ? "07_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "07_32") ? "08_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "08_32") ? "09_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "09_31") ? "10_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "10_32") ? "11_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "11_31") ? "12_01" : ref_sancto_next;

      return ref_sancto_next;
  }

function get_ref_tempo(offset)
  { 
    ref_tempo_next = prefix_tempo + (week_start + Math.ceil((i + 2) / 7)) + '_' + (day_start + ((i+1) % 7));

      ref_tempo_next = ( ref_tempo_next == "tp_9_0") ? "pa_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "adv_5_0") ? "christmas_1_0" : ref_tempo_next;
      ref_tempo_next = ( prefix_tempo == "adv_" && i == (duration-2)) ? "christmas_1_0" : ref_tempo_next;
      ref_tempo_next = ( prefix_tempo == "pe_" && i == (duration-2) && month_usual_number < 9) ? "sept_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "sept_3_3") ? "ash_1_3" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "ash_1_7") ? "lent_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "lent_7_0") ? "tp_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "pe_7_0" && month_usual_number > 9) ? "pa_24_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "pa_35_0") ? "adv_1_0" : ref_tempo_next;

      return ref_tempo_next;
  }

function get_winner(ref_tempo, ref_sancto) {
  winner = days_tempo[ref_tempo];
  if ( !days_tempo[ref_tempo] ) { winner = days_sancto[ref_sancto]; }
  //days_tempo[ref_tempo]['force'] = 10;
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
var moved = [];
var sabb_mensis = 0;
var titulus_dom = "";
const roman_lc = ["nullus","j.","ij.","iij.","iv.","v.","vj.","vij.","viij.","ix.","x."];
const roman_uc = ["NULLUS","I.","II.","III.","IV.","V.","VI.","VII.","VIII.","IX.","X."];


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
    ref_tempo = prefix_tempo + (week_start + Math.ceil((i + 1) / 7)) + '_' + (day_start + (i % 7));
    ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;
    
    // zeroing moved feasts at the start of liturgical year.
    if (ref_tempo.match("adv_1_0")) moved = []; 

    ref_tempo_next = prefix_tempo + (week_start + Math.ceil((i + 2) / 7)) + '_' + (day_start + ((i+1) % 7));
    ref_sancto_next = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + (day + 1);

      ref_sancto_next = ref_sancto_next.replace("010", "10");

      ref_sancto_next = ( ref_sancto_next == "12_32") ? "01_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "01_32") ? "02_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "02_30" && is_leap_year(year) ) ? "03_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "02_29" && !is_leap_year(year) ) ? "03_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "03_32") ? "04_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "04_31") ? "05_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "05_32") ? "06_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "06_31") ? "07_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "07_32") ? "08_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "08_32") ? "09_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "09_31") ? "10_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "10_32") ? "11_01" : ref_sancto_next;
      ref_sancto_next = ( ref_sancto_next == "11_31") ? "12_01" : ref_sancto_next;

      ref_tempo_next = ( ref_tempo_next == "tp_9_0") ? "pa_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "adv_5_0") ? "christmas_1_0" : ref_tempo_next;
      ref_tempo_next = ( prefix_tempo == "adv_" && i == (duration-2)) ? "christmas_1_0" : ref_tempo_next;
      ref_tempo_next = ( prefix_tempo == "pe_" && i == (duration-2) && month_usual_number < 9) ? "sept_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "sept_3_3") ? "ash_1_3" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "ash_1_7") ? "lent_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "lent_7_0") ? "tp_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "pe_7_0" && month_usual_number > 9) ? "pa_24_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "pa_35_0") ? "adv_1_0" : ref_tempo_next;

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
    comm_vesperae = "";
    comm_vesperae_j = "";
    comm_missa = "";
    secunda_comm = "";
    subtitulum = "";
    trans_before = "";
    no_comm_laudes = false;
    today_wins = true;

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
    if ( commemoratio && ( ref_tempo.match(/lent_6_[3456]|tp_1_[012]|tp_6_4|tp_7_6|tp_8_[012]|pa_1_0|pa_1_4/) ))
      { trans_titulum = commemoratio['header'].split(",", 1);
        trans_before = "Nihil fit hoc anno de festo " + trans_titulum + "."; 
        commemoratio = ""; }

    // Translating every feast higher than MM. min. that falls on Sunday
      if ( weekday == 0 && winner == days_sancto[ref_sancto] && winner['force'] > 60 && winner['force'] < 80 && !ref_tempo.match(/christmas|pa_/i))
      {
        moved.push(ref_sancto);
        trans_titulum = winner['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Dominicam."
        winner = feria;
        commemoratio = "";
      }  

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
    if (weekday == 6 && saints_tomorrow && saints_tomorrow['header'].match(/Vig[ií]lia/i)) {
      commemoratio = days_sancto[ref_sancto];
      winner = days_sancto[ref_sancto_next]; }

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

    if (ref_sancto.match(/08_07|08_12/) && weekday == 5) { vigilia_sabb = true; }


    ///////// Officium Votivum de Beata Sabbato \\\\\\\\\\
    if (weekday == 5 && winner_next['force'] < 35 && i != (duration-1) && !vigilia_sabb)
      { winner_next = days_sancto['votiva_bmv']; commemoratio_next = days_sancto[get_ref_sancto(1)]; }
    if (weekday == 6 && winner['force'] < 35 && i != (duration-1))
      { if (day < 8) {
          winner = days_sancto['votiva_bmv_prima_sabb']; 
          commemoratio = days_sancto[ref_sancto]; }
        else { 
          winner = days_sancto['votiva_bmv']; 
          commemoratio = days_sancto[ref_sancto]; }
      }

    
    /////////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ////.. Let's load the working variables with content ..\\\\
    //||\\\\\\\\\\\\\\\\\\\\\\\\\|//////////////////////////||\\
    if (!winner) {winner = commemoratio; subtitulum = "---- NOT A WINNER ----";} // this shouldn't happen!
    before = winner['before'];
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

    ////////////////////////////////////////\\\\\\\
    //// Deleting first Vespers of moved Feasts \\\\
    //\\\\\\\\\\\\\\\\\\\\\/////////////////////////

    if ( weekday == 6 && winner_next == days_sancto[ref_sancto_next] && winner_next['force'] > 60 && winner_next['force'] < 100)
      {
      winner_next = days_tempo[ref_tempo_next];
      vesperae_j = winner_next['vesperae_j'];
      comm_vesperae_j = "";
      }

    if (ref_tempo.match(/lent_5_6|lent_6_|tp_1_[01]/)) {vesperae_j = ""; comm_vesperae_j = ""; comm_vesperae = ""; }
    // TO DO (maybe): can we find a more elegant way to determine First Vespers of translated feasts?

    // Before Ascensione Domini, we don't need any Sanctoral feasts.
    // Either they are transferred, or deleted, so there is no Sanctoral.
    // Same for surrounding of Pentecost.
    if ( ref_tempo.match(/tp_6_3|tp_7_6|tp_8_[016]|pa_1_3/) )
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
         || (month_usual_number.in(9,11) && day <=4 ))
            sabb_mensis = 1;

        if (sabb_mensis && winner_next == days_tempo[ref_tempo_next] ) 
          vesperae_j = "Sabb. ante Dom. " + roman_lc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb) + " <ib>" + antiphon_sabb(sabb_mensis, month_sabb) + "</ib>";
        else if (sabb_mensis) comm_vesperae_j = "Com. Sabb. ante Dom. " + roman_lc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb) + " <ib>" + antiphon_sabb(sabb_mensis, month_sabb) + "</ib>";
        titulus_dom = roman_uc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb);

        // First Sabbath of August, following remark is displayed in "after":
        if (month_sabb == 7 && sabb_mensis == 1)
        after += '<div class="small">¶ <red>Dicitur autem j. Dominica mensis, quæ est in Kalendis, vel proximior Kalendis illius mensis: ita ut si Kalendæ fuerint ij. iij. vel iv. Feria, tunc j. Dominica mensis, in quo liber Scripturæ inchoandus ponitur, est ea quæ præcedit Kalendas. Sin autem Kalendæ fuerint v. vj. vel Sabbato, prima Dominica est ea quæ sequitur, et in Sabbato præcedenti Antiphona ad Magnificat ponatur illius historiæ, omissis aliis, quæ forte occurrerent.</red> <blue>(<i>„Kalendæ“</i> primam diem mensis designant.)</blue></div>';
      }
    if (month_usual_number == 12) sabb_mensis = 0;

    ///////////////////////////////////////////////////////////
   ///////////  First Vespers to standard feasts  ////////////
  ///////////////////////////////////////////////////////////

    if ( vesperae_j ) {
      if ( winner['force'] > winner_next['force'] ) {
        // today wins
        if (winner_next['vesperae_j_commemoratio']) vesperae_j = winner_next['vesperae_j_commemoratio'];
        commemoratio_vesperae = vesperae_j;
        today_wins = true; 
        }
      else if ( winner['force'] == winner_next['force'] ) {
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
    if ( ref_sancto == "01_01" && ( weekday < 2 || weekday == 6 ) ) { vesperae = vesperae + ' - Com. SS. Nominis Jesu <b><i>Fecit mihi magna</i></b>'; }
    if ( (ref_sancto == "01_02" || ref_sancto == "01_03" ) && weekday == 6 ) { vesperae = "SS. Nominis Jesu - sine Com."; }
    if ( ref_sancto == "01_04" && weekday == 6 ) { vesperae = "SS. Nominis Jesu - Com. S. Telesphori Papæ et Martyris Iste sanctus"; }

    ///// Workaround for First Vespers S. Familiae //////
    if ( ref_tempo_next.match("christmas") && i == (duration-1) ) 
      {  if ( winner['force'] > 100 ) 
          vesperae = winner['vesperae'] + " – " + 'Com. seq. <i><b>Verbum caro.</i></b>';
          else vesperae = 'Sanctæ Familiæ: Jesu, Mariæ et Joseph <font color="red">(supple. bre. Cist. 1965)</font>'; 
          after = 'Officium et Missa Sanctæ Familiæ: Jesu, Mariæ et Joseph (suppl. brev. Cist. 1965) Oratio. <ib>Dómine Jesu Christe, qui, Maríae et Joseph súbditus, § domésticam vitam ineffabílibus virtútibus consecrásti: * fac nos, utriúsque auxílio, Famíliæ sanctae tuae exémplis ínstrui; § et consórtium cónsequi sempitérnum. Qui vivis et regnas cum Deo Patre in unitáte Spiritus Sancti, Deus: * per...</ib>'; }

    ///// Martyrologium of moved Annuntiatio \\\\\\
    if ( ref_sancto == "03_24" && ref_tempo.match(/lent_5_6|lent_6_|tp_1/) )
      { martyrologium = '<li><div class="small"><u>in Capit.:</u> <red>In Martyr. 1o loco:</red> <ib>Apud Názareth Civitátem Galiléae * Annunciátio Domínica. ✝ - <blue>Ve městě Nazaret v Galileji Zvěstování Páně. ✝</blue></ib> <red>Hodie <b>non</b> dicitur</red> <ib>Ave Maria.</ib></div></li>';
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

    /////////////////////////////////////
    ///  Vigiliae: dies non impedita  ///
    /////////////////////////////////////

    vigiliae = winner['vigiliae'];

    vigil_newyear = ['<i><b>Christus natus</i></b> iij. Lect.<font color="red">(Prima Die non impedita)</font> <i><b>Justificáti ergo.</i></b>',
      'iij. Lect. <font color="red">(Secunda Die non impedita; ut die 3. Jan.)</font> <i><b>An ignorátis fratres.</i></b>',
      'iij. Lect. <font color="red">(Tertia Die non impedita; ut die 3. Jan.)</font> <i><b>Fratres, debitóres sumus.</i></b>'];
    if (ref_sancto == "01_02") { vigil_newyear_counter = 0; }
    if (month_usual_number == 1 && day > 1 && day < 5 )
      { if ( winner['force'] < 50 ) { vigiliae = vigil_newyear[vigil_newyear_counter]; vigil_newyear_counter++; }} 

    vigil_epiphania = ['<font color="red">Prima Die non impedita post Epiph.</font> <i><b>Veritátem dico.</i></b>','<font color="red">Secunda die</font> <i><b>Paulus vocátus.</i></b>','<font color="red">Tertia die</font> <i><b>Et ego.</i></b>','<font color="red">Quarta die</font> <i><b>Omníno audítur.</i></b>','<font color="red">Quinta die</font> <i><b>Audet aliquis.</i></b>','<font color="red">Sexta die</font>'];
    if (ref_sancto == "01_07") { vigil_epiphania_counter = 0; }
    if (month_usual_number == 1 && day > 6 && day < 13 )
      { if ( winner['force'] < 50 ) { vigiliae = vigil_epiphania[vigil_epiphania_counter]; vigil_epiphania_counter++; }} 

    vigil_lent = ['1,2,3','4,5,6','7,8,9','10,11,12','1,2,3','4,5,6','7,8,9','10,11,12'];
    if (ref_tempo == "ash_1_4") { vigil_lent_counter = 1; }
    if (ref_tempo.match("lent") && weekday == 1) { vigil_lent_counter = 0; }
    if (ref_tempo.match(/lent|ash/) )
      { if ( winner['force'] < 40 ) { vigiliae = '<b>iij. Lect. <font color="red">℟.℟.</b> de Dominica: ' + vigil_lent[vigil_lent_counter] + '</font>'; vigil_lent_counter++; }} 

    ///// if 16.1. comes to Sunday - and ceases to be "dies non impedita" \\\\\
    //if (ref_sancto == "01_16" && weekday == 0 ) { comm_missa = "2a S. Marcelli. 3a de Beata" }

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

    check_next = '<div class="fuchsia body"><u>ref_tempo</u> = \'<b>' + ref_tempo + "'</b> -> '" + ref_tempo_next + "' + <u>ref_sancto</u> = <b>'" + ref_sancto + "'</b> -> '" + ref_sancto_next + ".<br>Winner = <i><b>" + winner['header'] + "</i></b> + Commemoratio = " + comm_header_check 
      + ".<br>Winner_next = <i><b>" + winner_next['header'] + "</i></b> + commemoratio_next = " + comm_next_header_check 
      + ".<br>force: " +  winner['force'] + " (" + com_force  + ") -> force_next: " +  winner_next['force']    
      //+ " extra_sunday = " + extra + "  --- i = " + i + "/" + duration + '. <br>'
      //+ 'Feria = "' + feria['header'] + '", &emsp;Vesperæ: "' + feria['vesperae'] + '".<br>'
      //+ 'Moved feasts [0] "' + moved[0] + '" [1] "' + moved[1] + '" [2] "' + moved[2] + '" [3] "' + moved[3] + '". Length = "' + moved.length
      //+ '.<br>Sacérdos et Pontifex: "' + matchCount(vesperae,/Sacérdos et Póntifex/) + '" - Fíliæ Jerúsalem: "' + matchCount(vesperae,/F[íi]li(æ|ae) Jer[úu]salem/);
      //+ '".</div>';
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
              if (vesperae.match("Com.")) vesperae += " & " + comm_vesperae_j;
              else vesperae += dash + "Com. " + comm_vesperae_j;
            }

    if (commemoratio)
      { titulum = commemoratio['header'].split("+", 1);
        titulum_missa = commemoratio['header'].split(",", 1);
        titulum_missa += "";
        if ( commemoratio['header'].match(/\+/) ) titulum_missa = commemoratio['header'].split("+", 1) + "";
        if ( commemoratio['header'].match(/De ea/i) ) { titulum_missa = translate_feria(ref_tempo); }
        if ( commemoratio['header'].match(/ Oct\.|Octav|De ea/i) ) { titulum = ""; titulum_missa += ""; 
          titulum_missa = titulum_missa.replace(/.*Oct/i, "Oct"); 
          titulum_missa = titulum_missa.replace(/Octavam/i, "de Octava");}

        titulum_missa = titulum_missa.replace(/Dominica/i, "Dom."); 
        titulum_missa = titulum_missa.replace(/Pentecoste./i, "Pent"); 

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

      if ((commemoratio['laudes'] || commemoratio['laudes_commemoratio'] ) && !no_comm_laudes)
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
          else if (laudes.match("Com.") && comm) 
            { // we need to sort the commemorations according to their force
             if (commemoratio['force'] > 30 ) {
              if (!laudes.match(/Tu es pastor/i)) laudes = laudes.replace("Com.", "Com. " + comm + " & ");
              else laudes += " & " + comm; }
              comm = "";}
          else {
          if ( commemoratio['laudes_commemoratio'].match(/^Com\. /) && comm )
            { 
              if (laudes.match(/Com\. /)) laudes = laudes + " & " + comm;
              else if (laudes != "") laudes += " - Com. " + comm;
              else laudes = "Com. " + comm;
            }
          else if ( commemoratio['laudes_commemoratio'].length > 3 && comm ) { 
              laudes = laudes + dash + "Com. " + titulum + et + comm;}
          else if ( commemoratio['laudes_commemoratio'] && commemoratio['laudes_commemoratio'].length <= 3 && comm ) {
            if ( !comm_laudes ) et = "";
            laudes = laudes + dash + "Com. " + titulum + " " + comm + et + comm_laudes; }
          else if ( commemoratio['laudes'].match("Com. ") ) laudes = laudes + dash + "Com. " + comm_laudes;
          else if (comm) laudes = laudes + dash + "Com. " + comm;
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
          if (missa.match(/Feria/i) && !ref_tempo.match("lent") )
              missa = missa.replace(/.a Feria\.? -/i, "" );
          else if (missa_post.match(/Feria/i) && !ref_tempo.match("lent") )
              missa_post = missa_post.replace(/.a Feria\.? -/i, "" );
          else if (missa.match(/Feria/i) && ref_tempo.match("lent") && commemoratio == days_tempo[ref_tempo])
              missa = missa.replace(/Feria/i, translate_feria(ref_tempo, 1));
          else if (missa_post.match(/Feria/i) && commemoratio == days_tempo[ref_tempo])
              missa_post = missa_post.replace(/Feria/i, translate_feria(ref_tempo, 1));

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

          comm_missa = comm_missa.replace(/3a.*/,""); 
          comm_missa = comm_missa.replace("2a", "3a"); 
          if (comm_missa.length > 5) comm_missa = "2a " + titulum_missa + ". " + comm_missa; else comm_missa = "2a " + titulum_missa + ". ";
          comm_missa = comm_missa.replace(/-.*/, ""); 
          win_missa = winner['missa'];
          win_missa = win_missa.replace(/2a.*? - /,"");
          win_missa_post = winner['missa_post'];
          win_missa_post = win_missa_post.replace(/2a.*? - /,""); // non-greedy modifier "?"

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
            missa = missa.replace("Glo.", "Asperges - Glo.");
            missa = missa.replace(/Duo Acolythi\.?(?: -)?/, "");
            missa = missa.replace(/Cum incenso ad oblata\.?(?: - )?/, "");
            if (!missa.match("Processio")) missa = 'Processio per Claustrum - ' + missa;
            missa += ' - <red>In fine Missæ legitur Evangelium Dominicae.</red>';
            if (winner['laudes'].match("Com.") && !winner['laudes'].match("sine Com."))
              { 
                tertia_oratio = winner['missa'].match(/2a.*? -/i);
                tertia_oratio += "";
                tertia_oratio = tertia_oratio.replace("2a", "3a");
                missa = missa.replace(/2a.*? -/i, "2a " + titulum_missa + " " +tertia_oratio)
              }
            }

          // Cleanup:
          missa = missa.replace("  ", " "); missa = missa.replace("..", ".");
          if ( !ref_tempo.match(/(lent|ash|sept)/) ) missa = missa.replace("- Tractus ", ""); // Quatember???

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
                vesperae += " & " + comm_vesperae;
             else if (commemoratio['force'] > 30 && !ref_sancto.match(/06_30/)) vesperae = vesperae.replace("Com.", "Com. " + comm_vesperae + " & ");
             // For 30.6.2024, Comm. of St. Peter should always go first and MM.maj. supersedes the Sunday, but not Pretiosissimum Sanguinem...
             else if ((commemoratio['force'] <= commemoratio_next['force']) || ref_sancto.match(/06_30/)) vesperae += " & " + comm_vesperae;
             else vesperae = vesperae.replace("Com.", "Com. " + comm_vesperae + " & ");
            }
          else if (comm_vesperae) vesperae += " - Com. " + comm_vesperae;

          comm = null;
        }
    }
    ////////////////// Finis Commemorationum //////////////////

    if (commemoratio) {
      if (comm_head.match(/De ea/i)) comm_head = translate_feria(ref_tempo);
      else comm_head = comm_header_check;
      if ( weekday == 0 && winner != days_tempo[ref_tempo] ) comm_head = "<i>Dominica </i>" + comm_head; }

    ////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /////////////    Postprocessing of Laudes/Vesperae   \\\\\\\\\\\\\\
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////\\

    // sometimes, we need to replace Com. festum with Com. de seq.
    next_com_title = "Com. " + winner_next['header'];
    if ( vesperae.match(next_com_title) ) {
       vesperae = vesperae.replace(next_com_title, "Com. de seq.")
      }

    // Sometimes, a Sabb. or Dom. Comm. gets stuck behind a Comm. from a higher Feast. To remedy this, we need to swap /Dom./ and /(Com.)/

    if ((weekday == 0 || weekday == 6 ) && vesperae.match(/\(Com\.\)|\(Com\. et M\.\)/)) 
      {
        if (vesperae.match(/^Com\./)) {
          all_comm_vesp = vesperae.split("&"); }
        else { vesperae_parts = vesperae.split(" - Com. "); 
        all_comm_vesp = (vesperae_parts[1] + "").split("&"); }
        // Let's push all "iij. Lect." Comms. to the end
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match("(iij. Lect. et M.)")) { 
                all_comm_vesp.splice(k,1);
                all_comm_vesp.push(temp_comm); } }
        // And now all "Com."
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match("(Com.)")) { 
                all_comm_vesp.splice(k,1);
                all_comm_vesp.push(temp_comm); } }
          temp_comm = null;
          vesperae = vesperae_parts[0] + " - Com. ";
        //for (k = (all_comm_vesp.length-1); k >= 0; k--)
        for (k = 0; k < all_comm_vesp.length; k++)
          {
          vesperae += all_comm_vesp[k];
          if (k < all_comm_vesp.length-1) vesperae += " & ";
          }
      }

    // For (translated) Anniversary (1.6.1259), that happens to fall into the Octave
    // Corporis Christi or Ascens., the Octave Comm. from unused temporale must be filled in

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
      if ( weekday == 2 && getComm(laudes) < 3 ) laudes_bmv += " & B. B. R.";
      if ( weekday == 3 && getComm(laudes) < 3 ) laudes_bmv += " & S. Joseph";
      if ( weekday == 6 && getComm(laudes) < 3 ) laudes_bmv += et1 + " De Pace";

      if ( laudes.match("& B.M.V. ") ) laudes = laudes.replace("B.M.V. ", "B.M.V. " + laudes_bmv + " ");
      else if ( laudes.match(/Com\. /) ) laudes = laudes + et + laudes_bmv;
      else laudes = laudes + dash + "Com. " + laudes_bmv;
      }

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

    //// Postprocessing \\\\
    vesperae = vesperae.replace("(et M.)", "(Com. et M.)"); // to be removed, hopefully. For some reason, the code doesn't work without replaceAll("Com. ","") in line 814 (Comm. of first Vesper) and I'm too tired to find out why.

    ////  Adding the green "&" sign \\\\
    laudes = laudes.replaceAll("& ", '<font color="green"><b>&</b></font> ');
    missa = missa.replaceAll("& ", '<font color="green"><b>&</b></font> ');
    vesperae = vesperae.replaceAll("& ", '<font color="green"><b>&</b></font> ');

    ///////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ////////    Postprocessing Missa   \\\\\\\\\\\
    //\\\\\\\\\\\\\\\\\/////////////////////////\\

      /// Praefationes
      if (ref_tempo.match("lent")) 
        missa = missa.replace(/Pr(ae|æ)f\. Comm\./, "Præf. Quadr.");
      if (!ref_tempo.match("lent"))
        missa = missa.replace(/.a Feria\.? -/i, "" );
      if (ref_tempo.match("lent_5")) missa = missa.replace(/Pr(ae|æ)f\. Quadr\./, "Præf. de S. Cruce.");
      if (ref_tempo.match("tp_")) missa = missa.replace(/Pr(ae|æ)f\. Comm\.|Pr(ae|æ)f\. Quadr\./, "Præf. Pasch.");

      // Removing "Commemoratio -vel-"
      if (missa.match(/Commemoratio -vel-/i) && !commemoratio)
          missa = missa.replace(/Commemoratio -vel-/i, "" );
      else if (missa_post.match(/Commemoratio -vel-/i) && !commemoratio)
          missa_post = missa_post.replace(/Commemoratio -vel-/i, "" );

      if (ref_sancto == "07_23" && weekday == 6) {
        missa += " - <red>Evangelium Vigiliæ in fine.</red>"; }

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
        dominica_prima = false;
        }
    
    
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
      winner['color'],
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
    block_new_year = '<div class="year brown mt-5">' + year + '</div>';
    if (day == 1) {
      month = date.getMonth();
      block_new_month = '<div class="month blue mb-3">Januarius</div>';
    }
  } else {
    block_new_year = '';
    if (day == 1 && month != 11) {
      month = date.getMonth();
      block_new_month = '<div class="month blue my-3">' + month_human_readable(month) + '</div>';
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
    block_rank = '<b> – ' + rank + '</b>';
    block_rank = block_rank.replace("  ", " "); // for some reason, font color doesn't work here, unless preceded by a space. This deletes it.
  } else { block_rank = ''; }

  header = header.replace("+","");
  if ( !header.match(/De ea|De ea./i) ) header = '<span class="header text-justify ms-1">' + header + '</span>';

  if (comm_header) {
    comm_header = comm_header.replace("+","");
    if (comm_header.match(/De ea\./i)) comm_header = titulum_missa;
    block_commemoratio = '<span class="body text-justify"><ul><font color="black"><i>Commemoratio:</i></font><font color="Fuchsia"><b> ' + comm_header + '</b></font></ul></span>';
  } else { block_commemoratio = ''; }
  //block_commemoratio = ''; // this should be enabled by default, used for debugging only

  if (subtitulum) {
    block_subtitulum = '<div class="body text-justify"><ul>' + subtitulum + '</ul></div>';
  } else { block_subtitulum = ''; }

  if (vigiliae) {
    block_vigiliae = '<div class="body text-justify"><ul><li><u>ad Vigil.:</u> ' + vigiliae + '</li></ul></div>';
  } else { block_vigiliae = ''; }

  if (laudes) {
    block_laudes = '<div class="body text-justify"><ul><li><u>in Laud.:</u> ' + laudes + '</li></ul></div>';
  } else { block_laudes = ''; }

  if (missa) {
    block_missa = '<div class="body text-justify"><ul><li><u>in Missa:</u> ' + missa + '</li></ul></div>';
  } else { block_missa = ''; }

  if (vesperae) {
    block_vesperae = '<div class="body text-justify"><ul><li><u>in Vesp.:</u> ' + vesperae + '</li></ul></div>';
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
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font></span>';
  } else if ( ref_tempo == "ash_1_3" || ref_tempo == "lent_6_5" ) { 
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font> <font color="blue">(den přísného postu)</font></span>';
  } else if ( ref_tempo.match(/adv|lent|ash/) && winner['force'] < 100 ) {
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font></span>';
  } else if ( ref_tempo.match(/lent_6_[123]/)) {
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font></span>';
  } else if ( laudes_post.match(/[Vv]ig[ií]l[íi]a/) && winner['force'] < 90 ) {
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font></span>';
  } else if ( header.match(/[Vv]ig[ií]l[íi]a/)) {
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font></span>';
  } else if (winner_next['force'] >= 100 && weekday != 0) {
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font></span>';
  } else { block_jejunium = ''; }

  // if we have narrower screen, we want to take up more space
  if (window.innerWidth/screen.width > 0.9) width = "75"; else width = "50";
//////////////////////////////////////////////////////////////

  // Result:
  return (
    block_new_year
    + block_new_month
    + '<div class="d-flex flex-column w-' + width + ' mb-2">' // w-50 was here originally
    + block_before
    + '<div class="head d-flex m-0">'
    + '<span class="first_line"><b>'  + add_zero(day) + day + "." 
    + " – " + liturgical_color(color) + " – " 
    + weekday_human_readable(weekday) + addition + ' – </b>'
    + header 
    + block_rank 
    + block_jejunium + '</span>'
    + '</div>'
    + block_commemoratio
    //+ '</div>'
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
    // + check // switch off and on here
  );
}
