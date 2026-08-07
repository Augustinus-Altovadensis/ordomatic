function weekday_human_readable(weekday) {
  return ['<span class="dominica">Dominica.</span>', 'Feria II.', 'Feria III.', 'Feria IV.', 'Feria V.', 'Feria VI.', 'Sabbato.'][weekday];
}

function weekday_human_short(weekday) {
  return ['<b>DOM.</b>', 'Fer. II.', 'Fer. III.', 'Fer. IV.', 'Fer. V.', 'Fer. VI.', 'Sabb.'][weekday];
}

function month_human_readable(month) {
  return ['Januarius', 'Februarius', 'Martius', 'Aprilis', 'Majus', 'Junius', 'Julius', 'Augustus', 'September', 'October', 'November', 'December'][month];
}

function month_human_readable_uc(month) {
  return ['JANUARIUS', 'FEBRUARIUS', 'MARTIUS', 'APRILIS', 'MAJUS', 'JUNIUS', 'JULIUS', 'AUGUSTUS', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'][month];
}

function month_human_readable_genitive(month) {
  return ['Januarii', 'Februarii', 'Martii', 'Aprilis', 'Maji', 'Junii', 'Julii', 'Augusti', 'Septembris', 'Octobris', 'Novembris', 'Decembris'][month];
}

function get_date_from_sancto(ref_sancto_input) {
  if (ref_sancto_input) return ref_sancto_input[3].replace(/^0/, "") + ref_sancto_input[4] + ". " + month_human_readable_genitive((ref_sancto_input.replace(/_.*/, ""))-1);
}

function liturgical_color(color) {
  if (color == "white" ) { return '<span class="outline">Alb.</span>';}
  if (color == "violet/white" ) { return '<font color="#9c29c1">Viol.</font>/<span class="outline">Alb.</span>';}
  if (color == "violet/red" ) { return '<font color="#9c29c1">Viol.</font>/<font color="red">Rub.</font>';}
  if (color == "pink" ) { return '<font color="pink">Ros.</font>';}
  if (color == "pink/violet" ) { return '<font color="pink">Ros.</font>/<font color="#9c29c1">Viol.</font>';}
  if (color == "red/violet" ) { return '<font color="red">Rub.</font>/<font color="#9c29c1">Viol.</font>';}
  if (color == "green" ) { return '<font color="green">Vir.</font>';}
  if (color == "violet" ) { return '<font color="#9c29c1">Viol.</font>';}
  if (color == "red" ) { return '<font color="red">Rub.</font>';}
  if (color == "black" || color == "black/black" ) { return '<font color="black">Nig.</font>';}
  if (color == "green/black" ) { return '<font color="green">Vir.</font>/<font color="black">Nig.</font>';}
  if (color == "white/black" ) { return '<span class="outline">Alb.</span>/<font color="black">Nig.</font>';}
  if (color == "white/green" ) { return '<span class="outline">Alb.</span>/<font color="green">Vir.</font>';}
  if (color == "white/red" ) { return '<span class="outline">Alb.</span>/<font color="red">Rub.</font>';}
  if (color == "white/violet" ) { return '<span class="outline">Alb.</span>/<font color="#9c29c1">Viol.</font>';}
  if (color == "red/black" ) { return '<font color="red">Rub.</font>/<font color="black">Nig.</font>';}
  if (color == "violet/black" ) { return '<font color="#9c29c1">Viol.</font>/<font color="black">Nig.</font>';}
  if (color == "black/green" ) { return '<font color="black">Nig.</font>/<font color="green">Vir.</font>';}
  //if (color == "black/white" ) { return '<font color="black">Nig.</font>/<span class="outline">Alb.</span>';}
  // This combination probably doesn't make any sense, therefore replacing with pure Black. As a backup, original line kept above.
  if (color == "black/white" ) { return '<font color="black">Nig.</font>';}
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

function is_last_day_of_month(ref_tempo_f) {
  if (!ref_tempo_f)
    { 
      month_f = month;
      day_f = day;
    }
  else
    { 
      day_f = ref_tempo_f.replace(/.*_/, "").replace(/^0/, "");
      month_f = ref_tempo_f.replace(/_.*/, "").replace(/^0/, "") - 1;
    }

  if ((month_f == 0 || month_f == 2 || month_f == 4 || month_f == 6 
    || month_f == 7 || month_f == 9 || month_f == 11) && day_f == 31 ) { return true; }
  else if ((month_f == 3 || month_f == 5 || month_f == 8 
    || month_f == 10) && day_f == 30 ) { return true; }
 else if (month_f == 1 && day_f == 29 && is_leap_year(year)) { return true; }
 else if (month_f == 1 && day_f == 28 && !is_leap_year(year)) { return true; }
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


function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function get_first_sunday_of_advent(christmas, christmas_weekday) {
  return new Date(christmas - ((21 + christmas_weekday) * 24 * 3600 * 1000));
}

function get_easter_date_old(year) {
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

function get_easter_date(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);

  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  //return new Date(year, month - 1, day);
  return new Date(Date.UTC(year, month - 1, day));
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
      if (str[ind] == '&') count++ }
  return count;
  };

function roman_upper_to_lower(str) {
  str = str.replaceAll("X","x");
  str = str.replaceAll("V","v");
  str = str.replaceAll("C","c");
  str = str.replaceAll("I","i"); 

  var pos = str.lastIndexOf('i');
  if (str.match("i") && pos == ((str.length)-2) )
      str = str.substring(0,pos) + 'j' + str.substring(pos+1);

  return str;
  };

function roman_lower_to_upper(str) {
  str = str.replaceAll("x","X");
  str = str.replaceAll("v","V");
  str = str.replaceAll("c","C");
  str = str.replaceAll("i","I");
  str = str.replaceAll("j","I");

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
  else if (sabb_mensis == 5 && month_sabb == 11) return "Qui cœlórum cóntines thronos.";
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
      if (ref_tempo_n.match("tp_13")) ref_tempo_n = ref_tempo_n.replace("tp_13", "pa_5");
      if (ref_tempo_n.match("tp_14")) ref_tempo_n = ref_tempo_n.replace("tp_14", "pa_6");
      if (ref_tempo_n.match("tp_15")) ref_tempo_n = ref_tempo_n.replace("tp_15", "pa_7");
      if (ref_tempo_n.match("tp_16")) ref_tempo_n = ref_tempo_n.replace("tp_16", "pa_8");
      if (ref_tempo_n.match("tp_17")) ref_tempo_n = ref_tempo_n.replace("tp_17", "pa_9");
      if (ref_tempo_n.match("tp_18")) ref_tempo_n = ref_tempo_n.replace("tp_18", "pa_10");
      if (ref_tempo_n.match("tp_19")) ref_tempo_n = ref_tempo_n.replace("tp_19", "pa_11");
      if (ref_tempo_n.match("tp_20")) ref_tempo_n = ref_tempo_n.replace("tp_20", "pa_12");
      if (ref_tempo_n.match("tp_21")) ref_tempo_n = ref_tempo_n.replace("tp_21", "pa_13");

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
          if ( (i + offset) < (duration + tempus_per_annum_until_septuagesima - 1) ) { 
            jj = i + offset - duration + 3;
            ref_tempo_n = "pe_" + ( 0 + Math.ceil((jj + weekday_end_c + 0)/ 7) - 1) + '_' + ((weekday_end_c + jj - 1) % 7); }
          else { 
            kk = i + offset - christmas_time_duration - tempus_per_annum_until_septuagesima + 1;
            ref_tempo_n = "sept_" + ( 0 + Math.ceil((kk + weekday_end_c + 1)/ 7) - 1) + '_' + ((weekday_end_c + kk) % 7); }
        }

      if ( ref_tempo_n.match("adv_") && (i+offset) == (duration-2) ) weekday_end_a = ( ((day_start + i + offset) % 7))
      if ( ref_tempo_n.match("adv_") && (i+offset) > (duration-2) )
        {
          jj = i + offset - duration + 2; // beginning of Christmas cycle from Advent
          ref_tempo_n = "christmas_" + ( 0 + Math.ceil((jj + day_start + weekday_end_a + 1)/ 7)) + '_' + ((weekday_end_a + jj) % 7);
        }

      if ( month_usual_number > 9 && ref_tempo_n.match("pe_")) {
        ref_tempo_n = ref_tempo_n.replace("pe_7_", "pa_24_");
        ref_tempo_n = ref_tempo_n.replace("pe_8_", "adv_1_");
        ref_tempo_n = ref_tempo_n.replace("pe_9_", "adv_2_");} 

      //ref_tempo_n = ( ref_tempo_n == "ash_2_0") ? "lent_1_0" : ref_tempo_n;
      ref_tempo_n = ( ref_tempo_n == "lent_7_0") ? "tp_1_0" : ref_tempo_n;
      ref_tempo_n = ( ref_tempo_n == "pe_7_0" && month_usual_number > 9) ? "pa_24_0" : ref_tempo_n;
      
      if (ref_tempo_n.match("pa_25_")) ref_tempo_n = ref_tempo_n.replace("pa_25_", "adv_1_");
      if (ref_tempo_n.match("pa_26_")) ref_tempo_n = ref_tempo_n.replace("pa_26_", "adv_2_");
      if (ref_tempo_n.match("pa_27_")) ref_tempo_n = ref_tempo_n.replace("pa_27_", "adv_3_");
      if (ref_tempo_n.match("pa_28_")) ref_tempo_n = ref_tempo_n.replace("pa_28_", "adv_4_");

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

const short_output = true; // Ep. et Conf. => E. C.

/////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////---... Variables declared for every possibly translated feast ...---\\\\\
//||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//////////////////////////////////||\\

var translated_annivers = false;
var translated_matthias = false;
var quatember_septembris = false;
var moved = [];
var comm_vesperae_full = [];
var comm_laudes_full = [];
var dominica_anticipata = false;
var sabb_mensis = 0;
var vigil_novembris = 0;
var titulus_dom = "";
var noct_defunct_counter = 1;
var adoratio_counter = 5;
var weekday_end_a = 0;  // Advent
var weekday_end_c = 0;  // Christmas

var off_mensis = false;
var off_feriale = false;
var off_s_bernardi = true;
var off_ss_sacramenti = true;

var ant_BMV_post_purificationem = false;

var OM_dates = [];
//var Officium_mensis = [];
var date_s_bernardi = "";
var date_ss_sacramenti = "";
var winter_hymns = false;

var check_next_new = "";
var check_next_tempo = "";

var lectio_ref = 0;
var lectio_ref_prev = 0;
var dominica_prima = false;
var tricenarium_requiem = false;
var pro_defunctis = true;
var anniversarium_01 = "";
var anniversarium_05 = "";
var anniversarium_09 = "";
var anniversarium_11 = "";

const roman_lc = ["nullus","j.","ij.","iij.","iv.","v.","vj.","vij.","viij.","ix.","x."];
const roman_uc = ["NULLUS","I.","II.","III.","IV.","V.","VI.","VII.","VIII.","IX.","X."];

// Days of Officium mensis throughout the years. If not present here, Officium mensis is computed.
OM_dates['2024'] = "2024,30,7,11,10,23,20,19,26,5,24,6,10"
OM_dates['2025'] = "2025,,,,,,,,,,,12,"
OM_dates['202x'] = "2023,,,,,,,,,,,," // sample


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
    if (ref_tempo.match("adv_1_0")) {
      //moved = []; 
      dominica_anticipata = false;
      anniversarium_01 = "";
      anniversarium_05 = "";
      anniversarium_09 = "";
      anniversarium_11 = "";
      }

    // zeroing Officium feriale, S. Bernardi and SS. Sacramenti
    if (day == 1) {
      off_mensis = false;
      off_feriale = false;
      off_s_bernardi = true;
      off_ss_sacramenti = true; }

    // zeroing Commemorations
    comm_vesperae_full = [];
    comm_laudes_full = [];

    // determining tomorrow for Vespers
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

    /////  Beginning of Tricenarium solemne  \\\\\
    if (false && ref_sancto == "09_17" && weekday != 6) { ref_sancto_next += "tr"; }
    if (false && ref_sancto == "09_18" && weekday != 0) { ref_sancto += "tr"; }

    if (false && ref_sancto == "09_19" && weekday == 1) { ref_sancto_next = "09_18tr"; }
    if (false && ref_sancto == "09_20" && weekday == 2) { ref_sancto = "09_18tr"; }



    /////////////////////////////////////////////////////
    ///////////////  Let's find a WINNER  ///////////////
    /////////////////////////////////////////////////////

    commemoratio_next = get_commemoratio(ref_tempo_next, ref_sancto_next);
    commemoratio = get_commemoratio(ref_tempo, ref_sancto);
    
    winner_next = get_winner(ref_tempo_next, ref_sancto_next); 
    winner = get_winner(ref_tempo, ref_sancto);
    feria = days_tempo[ref_tempo];
    feria_next = days_tempo[ref_tempo_next];

    
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
    commemoratio_next_add = [];
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
    if ( commemoratio_next && commemoratio_next['force'] > 50 
        && ref_tempo_next.match(/lent_6_|tp_1|tp_2_0/) )
      {
        moved.push(ref_sancto_next);
        trans_titulum = commemoratio_next['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Octavam Paschæ."
        commemoratio_next = "";
      }

    // Translating feasts MM. maj. and higher during Pentecost Octave
    if ( commemoratio_next && commemoratio_next['force'] > 50 
        && ref_tempo_next.match(/tp_7_6|tp_8|pa_1_0/) )
      {
        moved.push(ref_sancto_next);
        trans_titulum = commemoratio_next['header'].split(",", 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Octavam Pentecostes."
        commemoratio_next = "";
      }

    // Translating feasts MM. maj. on Ascension of Our Lord, Corpus Christi and SS. Cor D.N.J.C.
    if ( commemoratio_next && commemoratio_next['force'] > 50
        && ref_tempo_next.match(/tp_6_4|pa_1_4|pa_2_5/) )
      {
        moved.push(ref_sancto_next);
        trans_titulum = commemoratio_next['header'].split(/[,+]/, 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur in primam diem non impeditam."
        commemoratio_next = "";
      }

    // Octava Corporis Christi. See Ant. cist. II, p. 71
    // Only Sermones are celebrated, xij. Lect and MM. get translated, 
    // lower commemorated. Altovadum: only MM. maj. get translated.
    if ( commemoratio_next
       && commemoratio_next['force'] > 60 
       && commemoratio_next['force'] < 90 
       && ref_tempo_next.match(/pa_2_4/) )
      {
        moved.push(ref_sancto_next);
        trans_titulum = commemoratio_next['header'].split(/[,+]/, 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur in primam diem non impeditam."
        commemoratio_next = "";
      }

    // Completely removing feasts iij. Lect. and lower during Holy Week and Monday and Tuesday of Easter Octave

    const lower_feasts_removed = /lent_6_[456]|tp_1_[012]|tp_6_4|tp_8_[012]|pa_1_0|pa_1_4|pa_2_5/;

    // N.B.: "tp_7_6|" has been removed.
    if ( commemoratio_next 
      && lower_feasts_removed.test(ref_tempo_next))
      { trans_titulum = commemoratio_next['header'].split(/[,+]/, 1);
        trans_before = "Nihil fit hoc anno de festo " + trans_titulum + "."; 
        commemoratio_next = ""; }

    // Removing them on the day as well
    if ( commemoratio 
      && lower_feasts_removed.test(ref_tempo))
      { 
        commemoratio = ""; 
      }

    // Translating every feast higher than MM. min. that falls on Advent or Lent Sunday
      if ( weekday == 6 
          && winner_next == days_sancto[ref_sancto_next] 
          && winner_next['force'] > 60 
          && winner_next['force'] <= 80 
          && !ref_tempo.match(/christmas|pa_|pe_|tp_[2-7]_/i) 
          && !ref_sancto.match(/12_08/))
      {
        moved.push(ref_sancto_next);
        trans_titulum = winner['header'].split(/[,+]/, 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Dominicam."
        winner_next = feria_next;
        commemoratio_next = "";
      }  

    // Translating every feast higher than MM. maj. that falls on Sunday, that would overrank it, but cannot
      if ( weekday == 6 && commemoratio_next 
          && commemoratio_next['force'] > 60 
          && ref_tempo_next.match(/adv_|lent_/i) 
          && !ref_sancto_next.match(/12_08/) )
      {
        moved.push(ref_sancto_next);
        trans_titulum = commemoratio_next['header'].split(/[,+]/, 1);
        trans_before = "Festum " + trans_titulum[0] + " transfertur post Dominicam."
        winner_next = feria_next;
        commemoratio_next = "";
      }

    ////  Removing moved feasts from their original day  \\\\
    ////=================================================\\\\\
    if (moved.includes(ref_sancto))
    {
      if (commemoratio) 
        {
          winner = commemoratio;
          commemoratio = "";
        }
      else winner = feria;
    }

    //==========================
    // Debugging of moved feasts
    moved_beginning = '';
    if (moved.length > 0) moved_beginning = '<br>Moved beginning: ' + "\t" + moved.join(", ") + ' Length = "' + moved.length + '". ref_sancto = "' + ref_sancto;
    //==========================

    // Determining, whether we celebrate the Tricenarium magnum or not
    // On Sundays and Feast Days, no Vesperæ Defunctorum
    if ( ((day >= 18 && month_usual_number == 9)
        ||(day < 18 && month_usual_number == 10)) 
        && (winner_next['force'] < 30 
          || (ref_tempo_next.match("quatember_septembris") 
          && winner_next['force'] < 40 )) 
        && winner['force'] <= 30 ) 
      tricenarium_vesperae = true;

    if ( ((day > 18 && month_usual_number == 9)
        ||(day < 18 && month_usual_number == 10)) 
        && (winner['force'] < 30 
          || (ref_tempo.match("quatember_septembris") 
        && winner['force'] < 40)) ) { tricenarium = true; }


    // "Returning" translated feasts on Monday that is not in Holy Week and any Octave
    if ( weekday > 0 && moved.length > 0 
        && !moved.includes(ref_sancto)
        && !moved.includes(ref_sancto_next)
        && !ref_tempo.match(/lent_6_|tp_1_/) 
        && winner['force'] < 40 ) 
      {
        top_moved = 0;
        for (j = 0; j < moved.length; j++)
          { // we need to find the highest ranking feast in moved[]
            if (j == 0) force_temp_prev = 0;
            win_temp = days_sancto[moved[j]];
            if ( win_temp['force'] > force_temp_prev ) {
              top_moved = j;
              force_temp_prev = win_temp['force']; }
          }
        if (commemoratio && commemoratio['header']) commemoratio_add = commemoratio;
        if (winner['force'] != 10 ) commemoratio = winner;
        winner = days_sancto[moved[top_moved]]; 
        moved.splice(top_moved,1);
        translated = true;
        if (winner == days_sancto['anniversarium_dedicationis'] && days_sancto[ref_sancto]) 
            commemoratio = days_sancto[ref_sancto];
      } 

    // First Vespers (probably just copy previous function without splicing the "moved" Array)
    if ( moved.length > 0 
        && !ref_tempo.match(/lent_6_|tp_1_|tp_7_6|tp_8_/) 
        && winner_next['force'] < 40 ) 
      {
        top_moved = 0;
        for (j = 0; j < moved.length; j++)
          {
            if (j == 0) force_temp_prev = 0;
            win_temp = days_sancto[moved[j]];
            if ( win_temp['force'] > force_temp_prev ) {
              top_moved = j;
              force_temp_prev = win_temp['force']; }
          }
        if (moved[top_moved] == '04_25' && ref_sancto != '04_25') moved[top_moved] += "tr";
        if (commemoratio_next && commemoratio_next['header']) commemoratio_next_add = commemoratio_next;
        if (winner_next['force'] != 10 ) commemoratio_next = winner_next;
        winner_next = days_sancto[moved[top_moved]]; 
        translated_vesperae_j = true;
      }

    // Anniversarium Dedicationis Ecclesiæ Altovadensis 1. 6. (pokud přijde do svatodušního Oktávu)

    if ( ref_sancto == "05_31" ) {
        // edited tp_7_5 => tp_7_6
        if (ref_tempo_next.match(/tp_7_6|tp_8_/)) {
          moved.push('anniversarium_dedicationis');
          trans_before = "Festum Dedicationis Ecclesiæ Altovadensis translatum post Octavam Pentecostes."; }
        else {
          winner_next = days_sancto['anniversarium_dedicationis'];
            if ( weekday == 6 ) {
                commemoratio_next = days_tempo[ref_tempo_next];
                commemoratio_next_add = days_sancto[ref_sancto_next]; 
                }
            else commemoratio_next = days_sancto[ref_sancto_next]; }
        }
    if ( ref_sancto == "06_01" && !ref_tempo.match(/tp_7_6|tp_8_/) ) {
          if ( weekday == 0 ) {
              commemoratio = days_tempo[ref_tempo];
              commemoratio_add = days_sancto[ref_sancto]; 
              }
          else commemoratio = days_sancto[ref_sancto];
          winner = days_sancto['anniversarium_dedicationis']; }

    ////  Angeli Custodes in September (Sunday, main text) \\\\
    if ( weekday == 0 && month_usual_number == 9 && day < 8 ) {
        // There is a bug, where the first of a month, the month number remains of the old month, and I don't want to fix it, as I don't know, what it may break...
        if (commemoratio && commemoratio['header']) commemoratio_add = commemoratio;
        commemoratio = winner; 
        winner = days_sancto['angeli_custodes_sept'];
        }

    /////  SS. Nominis Jesu  \\\\\
    ////-----------------------\\\\
    /// Vesperæ j.
    //============
    if ((  ref_sancto == "01_01" && weekday <= 2)
      || ((ref_sancto == "01_02" || ref_sancto == "01_03") && weekday == 6 )
      || ( ref_sancto == "01_04" && weekday == 6)) { 
      winner_next = days_sancto['nomen_jesu']; 
      if (weekday == 6) {
        commemoratio_next = days_tempo['christmas_3_0'];
        }
      }

    /// Dies festi
    //============
    if ((ref_sancto == "01_02" && weekday <= 3) 
      || ((ref_sancto == "01_03" || ref_sancto == "01_04") && weekday == 0)
      || ( ref_sancto == "01_05" && weekday == 0)) { 
        winner = days_sancto['nomen_jesu'];
        if (weekday == 0) {
          commemoratio = days_tempo['christmas_3_0'];
        }
      }

    ////// S. Matthias ///////
    if ( ref_sancto == "02_24" && !is_leap_year(year) ) { winner = days_sancto['matthias']; commemoratio = days_tempo[ref_tempo];}
    if ( ref_sancto == "02_25" && is_leap_year(year) && weekday != 0 ) { winner = days_sancto['matthias']; commemoratio = days_tempo[ref_tempo];}
    if ( ((ref_sancto == "02_25" && is_leap_year(year)) || (ref_sancto == "02_24" && !is_leap_year(year))) && weekday == 0 ) {translated_matthias = true; trans_before = "Festum S. Matthiæ translatum in Feriam ij.";}
    if ( translated_matthias && weekday == 1 ) { winner = days_sancto['matthias']; commemoratio = days_tempo[ref_tempo]; translated_matthias = false; translated = true; }
    // second Vespers on translated feast: + St. Mechtildis: at the end of Vesper section

    //////  Rogationes in Octava Paschæ \\\\\\
    if  ((ref_tempo.match(/tp_1_[1-6]/) && ref_sancto.match("04_25"))
      || (ref_tempo.match(/tp_1_2/) && ref_sancto.match("04_27")))
    {
      if (commemoratio) commemoratio_add = commemoratio;
      commemoratio = days_sancto['04_25rog'];
    }

    //////  Vigiliæ: Translated if on Sunday  \\\\\\\

    vigilia_sabb = false; // do not delete, used further in the text

    saints_tomorrow = days_sancto[ref_sancto_next];
    if (weekday == 6 && saints_tomorrow && saints_tomorrow['header'].match(/Vigilia/i) && saints_tomorrow['force'] > winner['force'] && ref_sancto != "12_23" ) {
      commemoratio = days_sancto[ref_sancto];
      winner = days_sancto[ref_sancto_next]; vigilia_sabb = true;}

    if (weekday == 0 && commemoratio && commemoratio['header'].match(/Vigilia/i) && !ref_sancto.match(/01_05/)) { commemoratio = ""; }

    // Let's find out, whether (translated) Vigilia falls on Saturday
    vigilia_sabb = false;
    after_tomorrow = days_sancto[get_ref_sancto(2)];
    if (after_tomorrow && after_tomorrow['header'].match(/Vigilia/i)) vigilia_sabb = true;

    // For Vigil of St. Peter and Paul, if it falls on Sunday, it will be translated to Saturday, but Comm. of St. Leo will remain on Sunday. Therefore following lines...

    if (ref_sancto == "06_28" && weekday != 0) {
        winner = days_sancto[ref_sancto + "v"];
        commemoratio = days_sancto[ref_sancto]; }
    if (ref_sancto == "06_27" && weekday == 6) {
        winner = days_sancto["06_28v"];
        commemoratio = days_sancto[ref_sancto]; }
    if (ref_sancto == "06_26" && weekday == 5) vigilia_sabb = true;

    /////  Vigilia S. Jacobi, if it falls on Sunday \\\\\
    if ((ref_sancto == "07_23" && weekday == 6 )
     || (ref_sancto == "07_24" && weekday != 0)) {
        commemoratio_add = days_sancto['07_24v']; }

    /////  Vigilia S. Laurentii, if it falls on Sunday \\\\\
    if (ref_sancto == "08_08" && weekday == 6) { 
      commemoratio = days_sancto['08_09v']; }
    if (ref_sancto == "08_09" && weekday != 0) { 
      winner = days_sancto['08_09v']; }

    /////  Vigilia Assumptionis B.M.V., if it falls on Sunday \\\\\
    if ((ref_sancto == "08_13" && weekday == 6) 
      || (ref_sancto == "08_14" && weekday != 0)) {
         winner = days_sancto['08_14v']; }

    /////  Vigilia S. Matthæi, if it falls on Sunday \\\\\
    if (ref_sancto == "09_19" && weekday == 6) { ref_sancto += "v"; }
    if (ref_sancto == "09_20" && weekday != 0) { ref_sancto += "v"; }

    /////  Vigilia S. Andreæ, if it falls on Sunday \\\\\
    if (ref_sancto == "11_28" && weekday == 6 && !ref_tempo.match(/adv/)) { ref_sancto += "v"; }
    if (ref_sancto == "11_29" && weekday != 0 && !ref_tempo.match(/adv/)) { ref_sancto += "v"; }

    /////  Vigilia Imm. Conceptionis B.M.V., if it falls on Sunday \\\\\
    //if (ref_sancto == "12_06" && weekday == 6) { winner = days_sancto['12_06v']; }

    //// Vigils that need to change something down the line
    //// can be found under "Vigiliæ (2)"

    if (ref_sancto.match(/06_27|07_22|08_08|08_12|10_29|12_06/) && weekday == 5) 
        vigilia_sabb = true;

    // For (translated) Anniversary (1.6.1259), that happens to fall into the Octave of Corporis Christi (like 1.6.2027) or Ascens. (1.6.2028), the Octave Comm. must be added
    if (winner == days_sancto['anniversarium_dedicationis'] 
        && ref_tempo.match(/tp_6_[56]|tp_7_[01234]|pa_1_[56]|pa_2_[01234]/i) 
        && commemoratio == days_sancto[ref_sancto]) 
    {
      commemoratio_add = feria;
    }

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

    /////  All Souls Day - Commemoratio Omnium Fidelium Defunctorum  \\\\\
    // Usually 2.11., unless it falls on Sunday, then 3.11.
    if (ref_sancto == "11_02" && weekday == 0) 
      {
        winner_next = days_tempo[ref_tempo.replace("_0","_1")];
        commemoratio_next = days_sancto['11_03'];
      }

    if (ref_sancto == "11_03" && weekday == 1)
      {
        winner = feria;
        commemoratio = days_sancto['11_03'];
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

    // First Thursday in month not impeded by a feast of iij. or xij. Lessons.

    // Check Officium Mensis...
    if (OM_dates[year]) OM_date = OM_dates[year].split(",");
    

    if (weekday == 3 && winner_next['force'] < 30 && off_ss_sacramenti 
      && !ref_sancto.match(/08_13|11_01/)
      && day != (OM_date[month_usual_number]-1) && month_usual_number != 6 
      && !(month_usual_number == 12 && day >= 17) && !ref_tempo.match(/ash|lent/))
      { winner_next = days_sancto['votiva_sacramentum']; commemoratio_next = days_sancto[get_ref_sancto(1)]; tricenarium_vesperae = false;}
    if (weekday == 4 && winner['force'] < 30 && off_ss_sacramenti 
      && !ref_sancto.match(/08_14|11_02/)
      && day != OM_date[month_usual_number] && month_usual_number != 6 
      && !(month_usual_number == 12 && day >= 17) && !(month_usual_number == 1 && day <= 13)
      && !ref_tempo.match(/ash|lent/))
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

    // Last Tuesday in month not impeded by a feast of iij. or xij. Lessons.

    check_next_new = "";

    if (day == 1) {
      date_s_bernardi = "";
      ind_as = 1;
      trans_temp = 0;

      // Looking for feasts translated in the Pentecost Octave
      while (get_ref_sancto(ind_as).match(/^05_|^06_/))
        {
        ref_tempo_temp = get_ref_tempo(ind_as,prefix_tempo, week_start, day_start, duration);
        ref_sancto_temp = get_ref_sancto(ind_as);

        if ((ref_tempo_temp.match(/tp_7_6|tp_8_|pa_1_0/)
          && days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] > 60)
          || (ref_tempo_temp.match(/tp_7_6|tp_8_|pa_1_0/) && ref_sancto_temp == "06_01")) 
            { trans_temp++; }
        ind_as++;
        }

      for (j = 0; j <= 5; j++) {
        offset = (9 - weekday) % 7;
        temp_bernardi = get_ref_sancto((j*7)+offset);
        temporale_bernardi = get_ref_tempo((j*7)+offset, prefix_tempo, week_start, day_start, duration);
        check_next_new += "j = " + j + ", date = " + temp_bernardi 
        //+ ", temp. = " + temporale_bernardi 
        + ". ";
        if ( (!days_sancto[temp_bernardi] || days_sancto[temp_bernardi]['force'] < 30 )
          && !temporale_bernardi.match("lent") && days_tempo[temporale_bernardi] && days_tempo[temporale_bernardi]['force'] < 30
          && (day+(j*7)) != OM_date[month_usual_number] && temp_bernardi.match(month_usual_number + "_") && temp_bernardi != "11_02" 
          && !(temporale_bernardi.match(/pa_1_2/) && trans_temp > 1)
          && !(month_usual_number == 12 && temp_bernardi.replace("12_","") > 17)  
          && !(month_usual_number == 1 && temp_bernardi.replace("01_","") < 13) )
            date_s_bernardi = temp_bernardi; }
        check_next_new += "Date S. Bernardi: " + date_s_bernardi;
      }

    if (weekday == 1 && date_s_bernardi == ref_sancto_next && month_usual_number != 8 
    && !translated_vesperae_j)
      { winner_next = days_sancto['votiva_bernardi']; commemoratio_next = days_sancto[get_ref_sancto(1)]; tricenarium_vesperae = false;}
    if (weekday == 2 && date_s_bernardi == ref_sancto && month_usual_number != 8 
    && !translated)
      { 
        winner = days_sancto['votiva_bernardi']; 
        commemoratio = days_sancto[ref_sancto]; 
        if (ref_tempo.match("adv_")) {
          if (days_sancto[ref_sancto]) commemoratio_add = days_sancto[ref_sancto];
          commemoratio = days_tempo[ref_tempo]; }
        tricenarium = false;
      }

    /////  Switching off Tricenarium on Officium mensis  \\\\\
    if (OM_date[month_usual_number] == (day+1)) tricenarium_vesperae = false;
    if (OM_date[month_usual_number] == day) tricenarium = false;

    
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

    if (subtitulum) subtitulum = subtitulum + "<br>" + winner['subtitulum'];
    else subtitulum = winner['subtitulum'];
    
    //if (trans_before) before = before + '<div class="small_pg"><font color="red">' + trans_before + '</div></font>';

    if (trans_before) after = after + '<div class="small_pg"><font color="red">' + trans_before + '</div></font>';

    // It's more practical to keep the numbers in Header in lowercase (vj. etc.)
    // But for the main header, UPPERCASE numbers (VI. etc.) are nicer
    if (weekday == 0 && winner == days_tempo[ref_tempo])
      {
        if (ref_tempo.match(/tp_[3-6]/))
        {
          header = header.replace(/^(.*? )/, match => roman_lower_to_upper(match));
        }
        else if (ref_tempo.match(/pe_[2-6]|lent_[1-4]|pa_[3-9]|pa_[1-2][0-9]/))
        {
          header = header.replace(/^(\S+\s+)(\S+)/, (match, firstWord, secondWord) => 
            firstWord + roman_lower_to_upper(secondWord))
        }
      }

    if (commemoratio && commemoratio['header'].match(/Vigilia/i)) {
      header = header + ' atque ' + commemoratio['header'].replace(/[,+].*/, "");
    }

    function shorten_header(str) {
      str = str.replace(/[,+].*/, "");
      str = str.replace(/Dominica/i,"Dom.");
      str = str.replace(/Epiphani.m?/,"Epiph.");
      str = str.replace(/Pentecoste./,"Pent.");
      str = str.replace("Priv. Dieb. infra ","");
      str = str.replace(/infra Octavam/i, "de Oct.");
      str = str.replace(/Octavam?/,"Oct."); 
      str = str.replace(/de ea/i, translate_feria(ref_tempo, "short"));
      // 3. Aug. 2031: Inventionis. S. Stephani (Com. et M.) as Comm. on Sunday ^SS?\. => SS?\.
      if (weekday == 0 && !str.match(/^Dom|SS?\. |BB?\. /)) {
        str = 'Dom. ' + str; 
      }
      if (ref_tempo.match("adv_") && str.includes("De ea")) {
        str = "de Dom. " + roman_lc[ref_tempo.substring(4,5)] + " Adv."; 
      }
      return str;
    };


     /////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\
    ///  Loading the new Commemoratio variables   \\\\
    //|\\\\\\\\\\\\\\\\\\\|///////////////////////////

    // list of days with no commemorations
    const no_comm = /lent_6_[456]|tp_1_[012]|tp_6_4|tp_8_[012]|pa_2_5/;

    if (!no_comm.test(ref_tempo))
    // some days cannot have Commemorationes
    { 
      if (commemoratio)
        {
          if (commemoratio['vesperae_commemoratio'])
            comm_vesperae_full.push({
              force: commemoratio['force'], 
              comm: commemoratio['vesperae_commemoratio'].replace(/^Com\. /, "")});

          if (commemoratio['laudes_commemoratio'])
            comm_laudes_full.push({
              force: commemoratio['force'], 
              header: shorten_header(commemoratio['header']), 
              comm: commemoratio['laudes_commemoratio'].replace(/^Com\. /, "")});
        }

      if (commemoratio_add && commemoratio_add != commemoratio)
        {
          if (commemoratio_add['vesperae_commemoratio'])
            comm_vesperae_full.push({
              force: commemoratio_add['force'], 
              comm: commemoratio_add['vesperae_commemoratio'].replace(/^Com\. /, "")});

          if (commemoratio_add['laudes_commemoratio'])
            comm_laudes_full.push({
              force: commemoratio_add['force'], 
              header: shorten_header(commemoratio_add['header']), 
              comm: commemoratio_add['laudes_commemoratio'].replace(/^Com\. /, "")});
        }
      }

  if (!no_comm.test(ref_tempo_next))
    { 
      if (commemoratio_next)
        {
          if (commemoratio_next['vesperae_j_commemoratio'] 
            && !moved.includes(ref_sancto_next)
            )
            comm_vesperae_full.push({
              force: commemoratio_next['force'], 
              comm: commemoratio_next['vesperae_j_commemoratio'].replace(/^Com\. /, "")});
        }

      if (commemoratio_next_add && commemoratio_next_add != commemoratio_next)
        {
          if (commemoratio_next_add['vesperae_j_commemoratio'])
            comm_vesperae_full.push({
              force: commemoratio_next_add['force'], 
              comm: commemoratio_next_add['vesperae_j_commemoratio'].replace(/^Com\. /, "")});
        }
    }

    ref_sancto_temp = ref_sancto;
    ref_sancto_next_temp = ref_sancto_next;

    for (i_c = 0; i_c <= 6; i_c++) 
    {
      ref_sancto_temp = ref_sancto_temp + 'c';
      ref_sancto_next_temp = ref_sancto_next_temp + 'c';
      let comm_temp = days_sancto[ref_sancto_temp];
      let comm_next_temp = days_sancto[ref_sancto_next_temp];

      if (i_c == 6)
        { 
          comm_temp = days_tempo[ref_tempo + "cc"];
          comm_next_temp = days_tempo[ref_tempo_next + "cc"];
        }

      if (comm_temp && !no_comm.test(ref_tempo))
      {
        if (comm_temp['vesperae_commemoratio'])
          comm_vesperae_full.push({
            force: comm_temp['force'], 
            comm: comm_temp['vesperae_commemoratio'].replace(/^Com\. /, "")});

        if (comm_temp['laudes_commemoratio'])
          comm_laudes_full.push({
            force: comm_temp['force'], 
            header: shorten_header(comm_temp['header']), 
            comm: comm_temp['laudes_commemoratio'].replace(/^Com\. /, "")});
      }

      if (comm_next_temp && !no_comm.test(ref_tempo_next))
      {
        if (comm_next_temp['vesperae_j_commemoratio'])
          comm_vesperae_full.push({
            force: comm_next_temp['force'], 
            comm: comm_next_temp['vesperae_j_commemoratio'].replace(/^Com\. /, "")});
      }
    }


    if (commemoratio) {
      //comm_laudes = commemoratio['laudes']; 
      comm_laudes_post = commemoratio['laudes_post'];
      //comm_vesperae = commemoratio['vesperae'];
      comm_laudes = "" ;
      comm_vesperae = "";
    }

    if (false && commemoratio_next) {
      comm_vesperae_j = commemoratio_next['vesperae_j']; 
      comm_martyrologium = commemoratio_next['martyrologium']; }

    if (translated_vesperae_j && winner_next['martyrologium_transfer'])
      martyrologium = winner_next['martyrologium_transfer'];

    if (martyrologium || comm_martyrologium) { 
      if (martyrologium && !comm_martyrologium) laudes_post += martyrologium; 
      if (!martyrologium && comm_martyrologium) laudes_post += comm_martyrologium;
      if (martyrologium && comm_martyrologium) {
        comm_martyrologium = comm_martyrologium.replace("1o", "2o");
        comm_martyrologium = comm_martyrologium.replace(/in Capit\.:/, "");
        laudes_post += martyrologium + comm_martyrologium;  }
      martyrologium = ""; }

    if (!translated_vesperae_j) vesperae_j = vesperae_j.replace(" (translatum)", "");

    if ((winner == days_sancto[ref_sancto] && winner['force'] < 40 && !vesperae) 
        || winner == days_sancto['votiva_bernardi']
        || winner == days_sancto['votiva_sacramentum']) // && feria['vesperae']
        vesperae = translate_feria(ref_tempo, 1); // feria['vesperae'];

    ////// Color of Commemoratio et M. \\\\\\
    if (winner['force'] == 10 && commemoratio && commemoratio['rank'] == "Commemoratio et M.")
      color = commemoratio['color'];

    ///// Vigiliæ (2) - need to change already filled variables

    /////  Vigilia S. Bartholomæi, if it falls on Sunday \\\\\
    /// (as the Vigil would fall on Aug. 22 - Imm. Cordis B.M.V., 
    ///  which as a Serm. min. deletes the Vigil)
    if (ref_sancto == "08_23" && weekday == 0) { commemoratio = ""; 
        before += '<div class="small">¶ <red>Nihil fit hoc anno de Vigilia S. Bartholomæi.</red></div>'; }

    //////////  Vigilia S. Matthæi in Quatuor Tempora Septembris  \\\\\\\\\\\
    if (ref_sancto == "09_19v" && quatember_septembris) 
      { comm_laudes = days_sancto['09_19']['laudes_commemoratio']; }
    if (ref_sancto == "09_20v" && quatember_septembris) 
      { comm_laudes = days_sancto['09_20']['laudes']; }

    ////  Vigilia Imm. Conceptionis: nihil fit de ea in Officio  \\\\
    if (ref_sancto == "12_07" && weekday != 0 ) no_comm_laudes = true;
    if (ref_sancto == "12_06" && weekday == 6 ) {
      before += '<div class="small"><red>Nihil fit hoc anno de Vigilia Immaculatæ Conceptionis B.M.V.</red></div>';
      commemoratio = feria;
      }

    /////////// Label PARS HIEMALIS \\\\\\\\\\\\
    if (ref_tempo == "pa_24_6") missa_post += '<div class="centered, pars"><red>PARS HIEMALIS</red></div><div class="small">¶ <red>A Dom. I. Adventus usque ad Vigil. Nativitatis exclusive organum non pulsatur nisi in Festis et Dom. Gaudete.</red></div>';


    // Tricenarium solemne (1)
    if (commemoratio_next == days_sancto['09_18tr']) comm_vesperae_j = "";
    if (winner_next == days_sancto['09_18tr']) vesperae_j = "";

    if (commemoratio == days_sancto['09_18tr']) {comm_laudes = ""; comm_missa = "";}
    if (winner == days_sancto['09_18tr']) {laudes = "";}

    // A.S. Septembris: switch off Tricenarium
    if (ref_sancto_next == anniversarium_09 && winner_next != days_sancto['09_18tr']) tricenarium_vesperae = false;
    if (ref_sancto == anniversarium_09 && winner != days_sancto['09_18tr']) tricenarium = false;


    /////////////////////////////////////////////////////////////////
    ///  Lectiones et Responsoria Vigiliarum: dies non impedita  ///
    ///////////////////////////////////////////////////////////////

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
    if (ref_tempo == "ash_1_4") { vigil_lent_counter = 2; }
    if (ref_tempo.match("lent") && weekday == 1) { vigil_lent_counter = 0; }
    if (ref_tempo.match(/lent|ash/) )
      { if ( winner['force'] < 40 ) { vigiliae = 'iij. Lect. <font color="red">℟.℟. de Dominica: ' + vigil_lent[vigil_lent_counter] + '</font>'; vigil_lent_counter++; }

        // Fer. v. Cinerum and Sabb. infra ij. hebd. Quadr. have their 3rd ℟. proper
        if (ref_tempo.match(/ash_1_4|lent_2_6/))
            vigiliae = vigiliae.replace(/(\d),(\d),\d/, "$1,$2, proprium");
      } 

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

        if ( (winner['force'] < 30 || winner['header'].match(/Vigilia|omnium fidelium/)) && !(sabb_mensis == 5 && day < 10) && !ref_tempo.match(/adv/)) { vigiliae += "iij. Lect. " + vigil_buffer[vigil_novembris]; 
          if (sabb_mensis >= 3) vigiliae += ' <font color="red">℟.℟. de Dominica: ' + vigil_lent[vigil_novembris] + '</font>';
          vigil_novembris++; }
      } 

    // if (ref_tempo.match("adv_") && day < 24) // Originally...
    if (ref_tempo.match("adv_"))
      {
      if (weekday == 0) adv_vigil_counter = 0;
      if (!vigiliae && winner['header'].match("Vigilia")) vigiliae = feria['vigiliae'];
      if (vigiliae && winner['header'].match(/Vigilia|de ea/i) && !winner['header'].match(/Quatuor Temporum/i)) {
        vigiliae += ' <font color="red">℟.℟. de Dominica: ' + vigil_lent[adv_vigil_counter] + '</font>';
        adv_vigil_counter++;
        }
      }

    // Special case: Vigil of St. Andrew
    if (ref_sancto.match(/11_2[89]v/)) vigiliae = vigiliae.replace(/iij\. Lect\. .*<font/, "iij. Lect. <red>de Vigilia.</red> <font");

    // If Imm. Conception falls on ij. Advent Sunday, in Matins of Vigil, the first three Lessons from Sunday are read.
    if (ref_sancto == "12_07" && weekday == 6 ) vigiliae = "iij. Lect. <red>primi Nocturni de Dom. ij. Adv. </red><i>Et egrediétur.</i><red> cum ℟℟. suis</red>";


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
            after += '<div class="small">¶ <red>November hoc anno tantum quatuor habet Dominicas, sequitur vero statim Dominica iij. Novembris.</red>'; }

        if (sabb_mensis && winner_next == days_tempo[ref_tempo_next] ) 
          vesperae_j = "Sabb. ante Dom. " + roman_lc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb) + " <i>" + antiphon_sabb(sabb_mensis, month_sabb) + "</i>";
        else if (sabb_mensis) comm_vesperae_j = "Com. Sabb. ante Dom. " + roman_lc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb) + " <i>" + antiphon_sabb(sabb_mensis, month_sabb) + "</i>";
        titulus_dom = roman_uc[sabb_mensis] + " " + month_human_readable_genitive(month_sabb);

        // On first Sunday in November, ferial Hymns are changed
        if (month_sabb == 10 && sabb_mensis == 1) winter_hymns = true;

        /////////// Label PARS AUTUMNALIS \\\\\\\\\\\\
        if (month_sabb == 8 && sabb_mensis == 1) after += '<div class="centered, pars"><red>PARS AUTUMNALIS</red></div>';

        // First Sabbath of August, following remark is displayed in "after":
        if (month_sabb == 7 && sabb_mensis == 1)
        after += '<div class="small">¶ <red>Dicitur autem j. Dominica mensis, quæ est in Kalendis, vel proximior Kalendis illius mensis: ita ut si Kalendæ fuerint ij. iij. vel iv. Feria, tunc j. Dominica mensis, in quo liber Scripturæ inchoandus ponitur, est ea quæ præcedit Kalendas. Sin autem Kalendæ fuerint v. vj. vel Sabbato, prima Dominica est ea quæ sequitur, et in Sabbato præcedenti Antiphona ad Magnificat ponatur illius historiæ, omissis aliis, quæ forte occurrerent.</red> <blue>(<i>„Kalendæ“</i> primam diem mensis designant.)</blue></div>';
      }
    if (month_usual_number == 12) sabb_mensis = 0;

    // Adding the O Antiphons to Vespers
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
        if (winner_next['vesperae_j_commemoratio']) 
          {
            vesperae_j = winner_next['vesperae_j_commemoratio'];

            // Adding Comm.
            comm_vesperae_full.push({
              force: winner_next['force'], 
              comm: winner_next['vesperae_j_commemoratio'].replace(/^Com\. /, "")});
          }

        // Sabbato de Beata is commemorated only if the current higher feast is NOT also de Beata
        if (winner['header'].match(/B\. ?M\. ?V\. ?/) 
          && (winner_next == days_sancto['votiva_bmv'] 
          || winner_next == days_sancto['votiva_bmv_prima_sabb']))
          comm_vesperae_full.pop();

        commemoratio_vesperae = vesperae_j;
        today_wins = true; 
        }
      else if ( winner['force'] == winner_next['force'] && winner['force'] > 35 ) {
        // a capitulo de sequenti, ut in 25. & 26.6. et 28. & 29.8.
        vesperae_j = "";
        commemoratio_vesperae = winner_next['vesperae_j'];
        today_wins = true; 

        // Adding Comm.
        if (winner_next['vesperae_j_commemoratio']) 
            comm_vesperae_full.push({
              force: winner_next['force'], 
              comm: winner_next['vesperae_j_commemoratio'].replace(/^Com\. /, "")});
        }
      else { 
        // tomorrow wins
        if (winner['vesperae_commemoratio']) vesperae = winner['vesperae_commemoratio'];
        else vesperae = "";
        commemoratio_vesperae = vesperae;
        vesperae = vesperae_j; 
        today_wins = false;

        // Adding Comm.
        if (winner['vesperae_commemoratio'])
          comm_vesperae_full.push({
            force: winner['force'], 
            comm: winner['vesperae_commemoratio'].replace(/^Com\. /, "")});
        }
      }

    // In S. Familia, the Comm. of Oct. Epiph. is different...
    if (winner_next == days_tempo['pe_1_0']) commemoratio_vesperae = commemoratio_vesperae.replace(/Oct\. Epiph\. Domini\. <i>Ab Oriénte\.<\/i>( \& )?/, "");

    if (vesperae.match(/Feria/i) && ref_tempo.match(/lent_|ash_/) && winner['vesperae_commemoratio'])
      {
        vesperae = vesperae.replace(/Feria/i, feria['vesperae_commemoratio'].replace("Com. ", ""));
        comm_vesperae = ""; commemoratio_vesperae = "";
      }

    // O Antiphons for first Vespers of St. Thomas and other Comm.
    if (commemoratio_vesperae && month_usual_number == 12 && day >= 17 && day <=23 ) {
      commemoratio_vesperae = commemoratio_vesperae.replace(/Adv\. <i>.*<\/i>/, "Adv. " + O_ant[day-17]);
      }

    if (false) // to remove, if Vespers work
    { 
    commemoratio_vesperae = commemoratio_vesperae.replace("Com. ", "");
    if (vesperae) dash = " - "; else dash = "";
    if (commemoratio_vesperae) vesperae = vesperae.replace(/(?: - )?sine Com\.?/, "");
    // Comm. S. Peter & Paul on 18. Jan. and 1. Aug., so they work on Sundays
    if ( vesperae.match("Com.") && commemoratio_vesperae ) {
      if ((today_wins && winner_next['force'] < 30) 
      || (vesperae.match("Dom") && winner_next['force'] < 60) 
      || ref_sancto.match(/08_01|01_18|01_25/) 
      || ref_tempo_next.match(/pe_1_0/) 
      || (today_wins && winner['force'] == winner_next['force'])
        ) 
          vesperae += " & " + commemoratio_vesperae;
      else vesperae = vesperae.replace("Com.", "Com. " + commemoratio_vesperae + " & ");
      }
    else if (commemoratio_vesperae) vesperae += dash + "Com. " + commemoratio_vesperae;
    }

    //////////////////////////////////////////////////////////
    /////////   Let's modify the HEADER (if needed)  /////////
    //////////////////////////////////////////////////////////

    if (translated) { header = header + " (translatum)"; translated = false; }

    if ( winner['rank'].match(/Commemoratio/i)) {
        header = "De ea"; rank = ""; }
    if (commemoratio == days_tempo[ref_tempo] && ref_tempo.match(/tp_7_4/)) header += " atque " + commemoratio['header'].replace(/.*Oct/i, "Oct");
    if (weekday == 0 && sabb_mensis && winner == days_tempo[ref_tempo]) header = header.replace(/\.$/, " simul " + titulus_dom);

      ////////////////////////////////////////////////////////
     ///////////  First Vespers to moved feasts  ////////////
    ////////////////////////////////////////////////////////


    ///// Martyrologium of moved Annuntiatio (it's already in the Book \\\\\\
    if ( false && ref_sancto == "03_24" && ref_tempo.match(/lent_5_6|lent_6_|tp_1/) )
      { martyrologium = '<li><div class="small">– <u>in Capit.:</u> <red>In Martyr. 1o loco:</red> <ib>Apud Názareth Civitátem Galiléae * Annunciátio Domínica. ✝ - <blue>Ve městě Nazaret v Galileji Zvěstování Páně. ✝</blue></ib> <red>Hodie <b>non</b> dicitur</red> <ib>Ave Maria.</ib></div></li>';
        laudes_post += martyrologium;
      }

    ///// First Vespers of moved Anniversary Feast (1. Junii)
    if ( ref_tempo == "pa_1_0" && translated_annivers )
      comm_vesperae = "Anniversarium Dedicationis Ecclesiæ Altovadensis (translatum) ℟. maj. Terríbilis" + comm_vesperae;

    ////// S. Matthias ///////

    // Vigilia
    if (( ref_sancto == "02_22" && !is_leap_year(year) ) && weekday == 6 && !ref_tempo.match(/lent_|ash_/)) 
        {
          laudes += " & Vigiliæ S. Mathiæ, Ap. <i>In viam pacis.</i>"
          missa = missa.replace("Feria", "Vigilia S. Mathiæ.")
          missa = missa.replace("feriae", "Vigiliæ")
          //missa += " - <red>In fine Missæ Evangelium Vigiliæ.</red>";
        }

    if ((( ref_sancto == "02_23" && !is_leap_year(year) ) || ( ref_sancto == "02_24" && is_leap_year(year) )) && weekday != 0 && !ref_tempo.match(/lent_|ash_/)) 
        {
        if (ref_tempo.match(/ash|lent/)) 
        comm_missa = "2a Vigilia S. Mathiae. 3a A cunctis - Praef. Quadr.";
        missa += " - <red>In fine Missæ Evangelium <b>Vigiliae</b>.</red>";
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

    ///// Missa votiva de Angelis on Oct 2. \\\\\
    if (ref_sancto == "10_02" && winner['force'] < 30) missa = days_sancto["votiva_de_angelis"]["missa"];

    ///// Missa votiva de SSmo Corde Jesu on first Friday in month \\\\\
    if (weekday == 5 && day < 8 && winner['force'] < 35) {
      festum = "";
      titulum_missa_winner = winner['header'].split(",", 1) + "";
      if (color != "white") color = "white/" + color;
      if (!winner['header'].match(/De ea/i)) festum = "Missa " + titulum_missa_winner  + " - "
      missa_post = "<li>- <u>in Missa Conv.:</u> " + days_sancto["votiva_ssmi_cordis"]["missa"] + "</li> <li>- <u>in Miss. priv.:</u> " + festum + missa + '</li>' + missa_post; missa = ""; }

    ////////////////////////////////////////////////////////

    //  Sundays' and 1st Fridays' Adorations: Laudes Vespertinæ 1926  \\
    if ( (weekday == 0 && !ref_sancto.match(/11_01|11_02/) || (weekday == 5 && day < 8) ) ) 
       {  introitus = ["23","6","1","24","6","1"]
          tantum_ergo = ["25","26","27","28","29","30"];
          laudate_dominum = ["195b","196","197","198","199","203"]
          mane_nobiscum = ["193","194a","194b","195a"];
          if ( weekday == 5 ) 
            { laudate = "200"; 
              vesperae_post += "<red>Post Vesperas fit Expositio Sanctissimi Sacramenti et Consecratio Sacratissimo Cordi Jesu.</red>"; }
          else laudate = laudate_dominum[(adoratio_counter-1) % 6];
          if ( winner == days_sancto['nomen_jesu'] ) litaniae = " - Litaniæ SSmi. Nominis Jesu";
          else litaniae = "";

        after = "✠ Adoratio: LV pag. " + introitus[adoratio_counter % 6] + litaniae + " - " + tantum_ergo[adoratio_counter % 6] + " – "  + laudate + " – " + mane_nobiscum[(adoratio_counter-2) % 4] + "<br>" + after; 

        adoratio_counter++;
        }

    // Sundays' Adorations: Tantum ergo et Mane nobiscum (old version) \\
    if ( false && weekday == 0 ) 
       {  tantum_ergo = ["9","5","6a","6b","7","8"]; 
          mane_nobiscum = ["IV","I","II","III"];
          if ( day < 8 ) litaniae = "Litaniae S. Cordis –";
          else litaniae = "";

          // In festis B.M.V. (de Beata)
          if ((winner['header'].match(/B\..?M\..?V\..?/) && !winner['header'].match(/Joachim|Ann|Joseph/i))
            || (winner_next['header'].match(/B\..?M\..?V\..?/) && !winner_next['header'].match(/Joachim|Ann|Joseph/i) && winner_next['force'] >= 80)
            ) {
            BMV_ant = ["Alma Redemptoris Mater","Ave Regina cœlorum","Regina cœli","Salve Regina"];
            if (ref_tempo.match(/adv_|christmas_/) || (ref_tempo.match(/pe_|sept_/) && (month_usual_number == 1 || (month_usual_number == 2 && day <= 2) ))) ant_no = 0;
            else if (ref_tempo.match(/ash_|lent_/) || (ref_tempo.match(/pe_|sept_/) && (month_usual_number == 2 && day > 2) )) ant_no = 1;
            else if (ref_tempo.match(/tp_/)) ant_no = 2;
            else ant_no = 3;

            after = "✠ Adoratio: " + litaniae + " Tantum ergo p. " + tantum_ergo[(week_number-1) % 6] + " – " + BMV_ant[ant_no] + " (tonus simplex) ex Laud. Vesp.<br>" + after;  
            }
          // on other Sundays
          else after = "✠ Adoratio: " + litaniae + " Tantum ergo p. " + tantum_ergo[(week_number-1) % 6] + " – Mane nobiscum " + mane_nobiscum[week_number % 4] + ". (Laudes Vesp.)<br>" + after; 
        }
    
    // Fridays in Lent: unless 12-Lesson feast impedes (Wackarz, p. 178, par. 3), Processio poenitentialis is made:

    if ( weekday == 5 && ref_tempo.match(/lent|ash/) && winner['force'] < 40) 
      missa_post += '<div class="small">¶ <red>Post <s>Capitulum</s> <blue>Tertiam</blue> fit Processio cum 7 Psalmis pœnit. cum cruce discooperta, et sine</red> <i>Glória Patri</i>, <red>nisi in fine ultimi Psalmi, sed absque inclinatione; porro Cantor incipit Litanias cum Collectis in fine.</red> (Rit. Cist.) </div>';


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

    if (commemoratio_add['header']) comm_add_header_check = "<i><b>" + commemoratio_add['header'] + "</i></b>";
    else comm_add_header_check = '<font color="black">N/A</font>';

    if (commemoratio_next_add['header']) comm_next_add_header_check = "<i><b>" + commemoratio_next_add['header'] + "</i></b>";
    else comm_next_add_header_check = '<font color="black">N/A</font>';

    j = 1;

    moved_output = "";
    if (moved.length > 0) moved_output = '<br>Moved feasts: ' + moved.join(", ") + ' Length = "' + moved.length + '". ref_sancto = "' + ref_sancto;

    check_next = '<div class="fuchsia body"><u>ref_tempo</u> = \'<b>' + ref_tempo + "'</b> -> '" + ref_tempo_next + "' + <u>ref_sancto</u> = <b>'" + ref_sancto + "'</b> -> '" + ref_sancto_next + "'.<br>Winner = <i><b>" + winner['header'] + "</i></b> + Commemoratio = " + comm_header_check + '. Commemoratio_add = "' + comm_add_header_check + '" '
      + ".<br>Winner_next = <i><b>" + winner_next['header'] + "</i></b> + commemoratio_next = " + comm_next_header_check + "</i></b> + commemoratio_next_add = " + comm_next_add_header_check
      + ".<br>force: " +  winner['force'] + " (" + com_force  + ") -> force_next: " +  winner_next['force']    
      + ". extra_sunday = " + extra + "  --- i = " + i + "/" + duration // + '. <br>'
      +  ' -=- winter_hymns = "' + winter_hymns + '".'
      //+ 'Feria = "' + feria['header'] + '", &emsp;Vesperæ: "' + feria['vesperae'] + '".<br>'
      //+ '<br>Moved feasts [0] "' + moved[0] + '" [1] "' + moved[1] + '" [2] "' + moved[2] + '" [3] "' + moved[3] + '". Length = "' + moved.length
      + moved_beginning + moved_output 
      //+ '.<br>Sacérdos et Pontifex: "' + matchCount(vesperae,/Sacérdos et Póntifex/) + '" - Fíliæ Jerúsalem: "' + matchCount(vesperae,/F[íi]li(æ|ae) Jer[úu]salem/);
      //+ " - Day = " + day + ", Month = " + month + ". Header + a week: " + get_ref_sancto(j*7) + " - "

      //if (days_sancto[get_ref_sancto(j*7)]) check_next += days_sancto[get_ref_sancto(j*7)]['header'];
      //else check_next += get_ref_sancto(j*7) + " doesn't exist.";
      //check_next += "<br>Display format = " + display_format;

      if (check_next_new) check_next += "<br>" + check_next_new
      //if (check_next_tempo) {check_next += "<br>" + check_next_tempo; check_next_tempo = "";}
      //check_next += '<br>ref_tempo + 1: "' + get_ref_tempo(1, prefix_tempo, week_start, day_start, duration) + '", + 2: "' + get_ref_tempo(2, prefix_tempo, week_start, day_start, duration) + '", + 3: "' + get_ref_tempo(3, prefix_tempo, week_start, day_start, duration) + '", + 4: "' + get_ref_tempo(4, prefix_tempo, week_start, day_start, duration) + '", + 5: "' + get_ref_tempo(5, prefix_tempo, week_start, day_start, duration) + '", + 6: "' + get_ref_tempo(6, prefix_tempo, week_start, day_start, duration) + '", + 7: "' + get_ref_tempo(7, prefix_tempo, week_start, day_start, duration) + '", + 8: "' + get_ref_tempo(8, prefix_tempo, week_start, day_start, duration) + '",<br> + 28: "' + get_ref_tempo(28, prefix_tempo, week_start, day_start, duration) + '". '
      //+ ". j = 2: " + (day+(j*7)) + "_" + month_usual_number
      check_next += '".</div>';
    //\\\---- end of diagnostics -----///\\

    if (winner_next) {
        titulum_next = winner_next['header'].replace(/[,+].*/, "");
        }

    ////////////////////////////////////////
    /////  Commemoratio First Vespers  /////
    ////////////////////////////////////////

    if (false && comm_vesperae_j) 
            { 
              vesperae = vesperae.replace(/ - sine Com\.|sine Com\./, "");
              if (vesperae) dash = " - "; else dash = "";
              if (commemoratio_next['vesperae_j_commemoratio']) comm_vesperae_j = commemoratio_next['vesperae_j_commemoratio'];
              comm_vesperae_j = comm_vesperae_j.replaceAll("Com. ", "")
              if (vesperae.match("Com.")) {
                if (commemoratio_next['force'] > winner['force'] || ref_sancto.match(/06_29/)) vesperae = vesperae.replace("Com. ", "Com. " + comm_vesperae_j + " & ");
                else vesperae += " & " + comm_vesperae_j;
                }
              else vesperae += dash + "Com. " + comm_vesperae_j;
            }

    if (commemoratio)
      { 
        titulum = commemoratio['header'].split("+", 1);
        titulum_missa = shorten_header(commemoratio['header']);

        if (false)
          {
            titulum = commemoratio['header'].split("+", 1);
            titulum_missa = commemoratio['header'].split(",", 1);
            titulum_missa += "";
            if ( commemoratio['header'].match(/\+/) ) titulum_missa = commemoratio['header'].split("+", 1) + "";
            if ( commemoratio['header'].match(/De ea/i) ) { 
              titulum_missa = translate_feria(ref_tempo); 
              if (ref_tempo.match("adv_")) titulum_missa = "Dom. " + roman_lc[ref_tempo.substring(4,5)] + " Adv."; }
              if ( commemoratio['header'].match(/ Oct\.|Octav|De ea/i) && !commemoratio['header'].match(/post/i)) { titulum = ""; titulum_missa += ""; 
            titulum_missa = titulum_missa.replace(/.*Oct/i, "Oct"); 
            titulum_missa = titulum_missa.replace(/Octavam/i, "de Octava");}

            titulum_missa = titulum_missa.replace(/Dominica/i, "Dom."); 
            titulum_missa = titulum_missa.replace(/Pentecoste./i, "Pent"); 
          }

        if (false && titulum_missa.match("Dom.")) 
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
          comm = ""
          laudes = laudes.replace(/- sine Com\.|sine Com\./, "");

          // Advent changes on certain dates, only if in Commemoratio
          if (winner == days_sancto[ref_sancto] && month_usual_number == 12 && day >= 17 && day <=23 ) {
            if (day == 21) comm = comm.replace(/Adv\. <i>.*<\/i>/, "Adv. <i>Nolíte timére.</i>")
            if (day == 23) comm = comm.replace(/Adv\. <i>.*<\/i>/, "Adv. <i>Ecce compléta sunt.</i>") }

          if ( winner['force'] > 49 ) { laudes.replace("& B.M.V.", "");}
          comm = null;
        }

      
      /////////////////////////////////
      /////  Commemoratio Missa   /////
      /////////////////////////////////
      
      if (commemoratio['missa'] && !ref_tempo.match(/tp_7_6/)) 
      // On Pent. Vigil, a 3-Lesson feast may fall, cannot however be commemorated in Mass.
        { 
          if (!comm_missa) comm_missa = commemoratio['missa'];

          // If Sunday yields to another Feast with Comm., it needs to be added.
          if (weekday == 0 && !moved.includes(ref_sancto)
            && (commemoratio == days_tempo[ref_tempo] 
              || winner == days_sancto['nomen_jesu'])) {
            if (!missa.match("Asperges")) missa = "Asperges - " + missa;
            missa = missa.replace(/Duo Acolythi\.?(?: -)?/, "");
            missa = missa.replace(/Cum incenso ad oblata\.?(?: - )?/i, "");
            if (!missa.match("Processio") && ref_tempo.match(/tp_|pa_/) && month_usual_number <= 9) 
            //missa = 'Processio per Ecclesiam - ' + missa; // orig. Claustrum
               missa = missa.replace("Asperges", "Asperges - Processio per Claustrum")
            if (!missa.match("Sub tuum") && ref_tempo.match(/pe_|pa_/) && month_usual_number > 9) 
              missa = missa.replace("Asperges", "Asperges - Sub tuum")
            if (!missa.match("Cre.")) missa = missa.replace(/Pr(ae|æ)f\./i, "Cre. - Præf.")
            if (!missa.match(/In fine Miss.*Evang/i)) missa += ' - <red>In fine Missæ Evangelium Dominicæ.</red>';
            laudes_post = "<li>- <red>non dicitur </red><i>Quicúmque.</i></li>" + laudes_post;
            }

          // If we need to fill in current Sunday, e.g. on Officium mensis...
          if (missa.match(/-De Dominica-/i) ) {
            dominica = ref_tempo.slice(0, -1) + '0';
            missa = missa.replace(/-De Dominica-/i, days_tempo[dominica]['vesperae']);
            }

          // Cleanup:
          missa = missa.replaceAll("  ", " "); missa = missa.replace("..", ".");
          if ( !ref_tempo.match(/(lent|ash|sept)/) ) missa = missa.replace("- Tractus ", ""); // Quatember???

          missa = missa.replace(/- (Ora\.|Oratio) unica/i, "");

          if (winner['missa'] && winner == days_tempo[ref_tempo] && !winner['missa'].match("Glo.") && commemoratio['missa'] && ref_tempo.match("lent") && weekday != 0) missa = translate_feria(ref_tempo) + " - " + missa;

          //// Abbreviations \\\\
          missa = missa.replace(/Epiphaniam\.?/, "Epiph.");
          missa = missa.replace(/Pentecoste(s|n)\.?/, "Pent.");
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

      if (false && (comm_vesperae || commemoratio_vesperae || comm_vesperae_j || commemoratio_next_add)) 
        { 
          if (ref_tempo.match(/lent_5_6/)) comm_vesperae = ""; 

          vesperae = vesperae.replace(/- sine Com\.|sine Com\./, "");
          comm_vesperae = comm_vesperae.replace(/- sine Com.|sine Com./, "");

        if (winner == days_sancto['votiva_bernardi']
         || winner == days_sancto['votiva_sacramentum']) comm = "";

          // O Antiphons in comm. 
          if (winner == days_sancto[ref_sancto] && month_usual_number == 12 && day >= 17 && day <=23 ) {
            comm = comm.replace(/Adv\. <i>.*<\/i>/, "Adv. " + O_ant[day-17]); }

          if (vesperae.match(/Feria/i) && ref_tempo.match(/lent_|ash_/))
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
                if (commemoratio['force'] > winner_next['force'] || ref_sancto.match(/06_29/))
                    vesperae = vesperae.replace("Com.", "Com. " + comm_vesperae + " & ");
                else vesperae += " & " + comm_vesperae;
             }
             else if (commemoratio['force'] > 30 && !ref_sancto.match(/06_30/)) vesperae = vesperae.replace("Com.", "Com. " + comm_vesperae + " & ");
             // For 30.6.2024, Comm. of St. Peter should always go first and MM.maj. supersedes the Sunday, but not Pretiosissimum Sanguinem...
             else if ((commemoratio['force'] <= commemoratio_next['force']) || ref_sancto.match(/06_30/)) vesperae += " & " + comm_vesperae;
             else vesperae = vesperae.replace("Com.", "Com. " + comm_vesperae + " & ");
            }
          else if (comm_vesperae) vesperae += " - Com. " + comm_vesperae;

          if (commemoratio_next_add) {
            if (commemoratio_next_add['vesperae_j_commemoratio']) vesperae += " & " + commemoratio_next_add['vesperae_j_commemoratio'].replace(/Com\. /i,"");
            else if (commemoratio_next_add['vesperae_j']) vesperae += " & " + commemoratio_next_add['vesperae_j'].replace(/Com\. /i,"");
            }

          comm = null;
        }
    }
         /////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\
        ///////// New Commemorations: Output. \\\\\\\\\\\
        //////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\\

        // First we need to filter out lower feast Comm. if a today is a Sermo

        const allow_comm = /lent_6_[0123]|tp_1_[3-6]|tp_7_6|ash_1_3|lent_1_0/;

        if (winner['force'] > 90 && !allow_comm.test(ref_tempo))
          {
            for (i_c = 0; i_c < comm_laudes_full.length; i_c++) {
              if (comm_laudes_full[i_c].force < 35) 
                comm_laudes_full.splice(i_c,1); 
            }
          }

        //////////////////|\\\\\\\\\\\\\\\\\\
        ///   Laudes: NEW commemorationes  \\\
        //|\\\\\\\\\\\\\\\|///////////////////

        if (comm_laudes_full.length > 0)
        {
          // some antiphons change at Easter
          if ( ref_tempo.match("tp") ) {
            // Commune Confessoris non Pontificis
            comm_laudes_full.forEach(item => {
                item.comm = item.comm.replaceAll(/Simil[áa]bo eum/gi, "Qui manet in me");});

            // Commune Unius Martyris et Commune Martyrum
            comm_laudes_full.forEach(item => {
                item.comm = item.comm.replaceAll(/Qui vult ven[ií]re post me|Qui vult ven[ií]re|Qui vult|Qui odit|Fulg[ée]bunt justi/gi, "Lux perpétua");});
          } // finis T.P.

          // If there are multiple identical Comm., they need to be switched usually in this manner: Ant. Laudes => Ant. Vesperæ ( => Ant. ij. Vesperæ)

          // Test on 23.4.2026 (when St. Adalbert not in Easter Octave)
          let comm_used = /Mart\.|Ap\./i.test(winner['header']);
          // Commune Apostolorum et Martyrum T.P.
          comm_laudes_full.forEach(item => {
            if (/Lux perp[eé]tua\.?/i.test(item.comm)) {
              if (comm_used) {
                item.comm = item.comm.replace(/Lux perp[eé]tua\.?/i, "Fíliæ Jerúsalem.");
              } else {
                comm_used = true; }
              }
          });

          comm_used = /^S\. .* Mart\./i.test(winner['header']);
          // Commune Unius Martyris extra T.P.
          comm_laudes_full.forEach(item => {
            if (/Qui vult ven[ií]re post me\.?|Qui vult ven[ií]re\.?|Qui vult\.?/i.test(item.comm)) {
              if (comm_used) {
                item.comm = item.comm.replace(/Qui vult ven[ií]re post me\.?|Qui vult ven[ií]re\.?|Qui vult\.?/i, "Beátus vir.");
              } else {
                comm_used = true; }
              }
          });

          comm_used = /^SS\. .* Mart\./i.test(winner['header']);
          // Commune Plurimorum Martyrum extra T.P.
          comm_laudes_full.forEach(item => {
            if (/Fulg[eé]bunt justi\.?/i.test(item.comm)) {
              if (comm_used) {
                item.comm = item.comm.replace(/Fulg[eé]bunt justi\.?/i, "Isti sunt Sancti.");
              } else {
                comm_used = true; }
              }
          });

          comm_used = winner['header'].includes("Ep.");
          // Commune Confessorum Pontificum
          comm_laudes_full.forEach(item => {
            if (/Euge,? serve bone|Euge,? serve|Euge/i.test(item.comm)) {
              if (comm_used) {
                item.comm = item.comm.replace(/Euge,? serve bone|Euge,? serve|Euge/i, "Sacérdos et Póntifex");
              } else {
                comm_used = true; }
              }
          });

          comm_laudes_full.sort((a, b) => b.force - a.force);
          et = '';
          if (laudes) et = ' - ';
          //comm_temp = et + 'Com. ';
          comm_temp = et + '<font color=blue><b>Com.</b></font> ';

          for (i_c = 0; i_c < comm_laudes_full.length; i_c++) {
            comm_temp = comm_temp + ' ' + comm_laudes_full[i_c].comm + ' ';
            if (i_c < (comm_laudes_full.length-1)) 
                comm_temp = comm_temp + "& ";
          }

          laudes = laudes + comm_temp;
          comm_temp = "";

          //////////////////|\\\\\\\\\\\\\\\\\\
         ///    Missa: NEW commemorationes   \\\
         //|\\\\\\\\\\\\\\\|///////////////////

          // Except for Comm. ad Laudes only (main feast Serm. maj.),
          // all the Commemorations present in Lauds are also present in the Mass
 
          let comm_missa_copy = structuredClone(comm_laudes_full);

          if (winner['force'] > 90 && !allow_comm.test(ref_tempo))
          {
            for (i_c = 0; i_c < comm_missa_copy.length; i_c++) {
              if (comm_missa_copy[i_c].force < 35) comm_missa_copy.splice(i_c,1); 
            }
          }

          // In masses of feasts xij. Lect. et M. and lower, there are three Collects in total
          if (commemoratio 
            && commemoratio['rank'].match(/Commemoratio et M\./i)
            && winner['header'].match(/De ea/i)
            && winner['force'] < 20)
          {
            missa_temp = commemoratio['missa'];

            // In "Commemoratio et M.", the missa is taken from commemoratio['missa'], therefore the Comm. cannot be commemorated in the Mass.

            for (i_c = 0; i_c < comm_missa_copy.length; i_c++) {
              if (commemoratio['header'].match(comm_missa_copy[i_c].header)
                && winner != days_sancto['votiva_bernardi']
                && winner != days_sancto['votiva_bmv']
                && winner != days_sancto['votiva_bmv_prima_sabb']
                && winner != days_sancto['votiva_sacramentum'])
                comm_missa_copy.splice(i_c,1);
            }

            if (missa_temp.match(/de officio diei/i))
            {
              comm_missa_copy.push({force: winner['force'], header: missa_temp.match(/2a (.*?) 3a/is)?.[1]});
              comm_missa_copy.sort((a, b) => b.force - a.force);
            }
          }
          else missa_temp = winner['missa'];

          // Here the Mass Comm. are filled from the Lauds
          for (i_c = 0; i_c < comm_missa_copy.length; i_c++) {
            comm_temp = comm_temp + ' ' + (i_c+2) + 'a ' + comm_missa_copy[i_c].header + '. ';
          }

          if (winner['force'] < 45 || weekday == 0 
           || ref_tempo.match(/ash_1_3/))
          {
            // For feasts of xij. Lect. et M. and for Sundays
            comm_missa_add = [];

            // For details, see Rubricæ Generales Missalis Cisterciensis (1925), X. De Orationibus
            if (  ref_tempo.match(/pa_/) 
              || (ref_tempo.match(/pe_/) && month > 7)
              || (month > 0 && day > 2 && !ref_tempo.match(/ash_|lent_/))
              || (ref_tempo.match(/sept_/) && weekday == 0))
              {
                // §2. (1) Ab Octava Pentecosten usque ad Adventum
                //     (2) A Purificatione usque ad Quadragesimam
                comm_missa_add.push({force: 2, header: 'A cunctis.'});
                comm_missa_add.push({force: 1, header: 'ad libitum.'});
              }
            else if (ref_sancto.match(/02_01/) || month == 0)
              {
                // §3. Ab Octava Epiphaniæ (excl.) usque ad Purificationem (excl.)
                comm_missa_add.push({force: 2, header: 'de S. Maria Deus, qui salútis.'});
                comm_missa_add.push({force: 1, header: 'Ecclesiæ. vel pro Papa.'});
              }
            else if (ref_tempo.match(/ash_|lent_[1-4]/) 
              && winner != feria)
              {
                // §4. A Feria iv. Cinerum usque ad Dominicam Passionis
                comm_missa_add.push({force: 2, header: 'de Feria'});
                comm_missa_add.push({force: 1, header: 'A cunctis.'});
              }
            else if (ref_tempo.match(/ash_|lent_[1-4]/) 
              && winner == feria)
              {
                // Feria iv. Cinerum: Oratio. Dom. j. Quadragesimæ: Oratio.
                comm_missa_add.push({force: 2, header: 'A cunctis.'});
                comm_missa_add.push({force: 1, header: 'Pro vivis et defunctis Omnípotens.'});
              }
            else if (ref_tempo.match(/lent_5/) 
              && winner != feria)
              {
                // §5. A Dominica Passionis usque ad Dominicam Palmarum
                comm_missa_add.push({force: 2, header: 'de Feria'});
                comm_missa_add.push({force: 1, header: 'Ecclésiæ.'});
              }
            else if (ref_tempo.match(/lent_5/) 
              && winner == feria)
              {
                // Dom. Passionis: Oratio.
                comm_missa_add.push({force: 2, header: 'Ecclésiæ.'});
                comm_missa_add.push({force: 1, header: '<font color=red>Non dicitur tertia oratio.</font>'});
              }
            else if (ref_tempo.match(/tp_[2-5]|tp_6_[1-3]/))
              {
                // §6. Ab Octava Paschæ usque ad Ascensionem
                comm_missa_add.push({force: 2, header: 'de S. Maria Concéde nos.'});
                comm_missa_add.push({force: 1, header: 'Ecclésiæ. vel pro Papa.'});
              }
            else if (ref_tempo.match(/pa_1_[56]|pa_2_[123]/))
              {
                // Octave SS. Corporis Christi doesn't have A cunctis
                comm_missa_add.push({force: 2, header: 'de S. Maria Concéde nos.'});
                comm_missa_add.push({force: 1, header: 'Ecclésiæ. vel pro Papa.'});
              }

            //comm_missa_add.sort((a, b) => b.force - a.force);
            if (winner == days_sancto['votiva_bmv']
             || winner == days_sancto['votiva_bmv_prima_sabb']
             || winner == days_sancto['08_14v'])
              {
                comm_missa_add[0] = {force: 2, header: 'de Sp. Sancto.'};
              }

            if (comm_missa_copy.length <= 1 && comm_missa_add[0])
            comm_temp = comm_temp + ' ' + (comm_missa_copy.length+2) + 'a ' + comm_missa_add[0].header + '. ';
            if (comm_missa_copy.length == 0 && comm_missa_add[1])
            comm_temp = comm_temp + ' ' + (comm_missa_copy.length+3) + 'a ' + comm_missa_add[1].header + '. ';
          }

          // In Advent, 2a changes
          if (ref_tempo.match("adv")) 
          {
            comm_temp = comm_temp.replace("A cunctis", "Deus qui de beátæ")
          }
          
          
          // Final output (Comm. Missa)
          //===========================
          if (missa)
          {
            if (missa.match(/2a/)) {
              missa = missa.replace(/2a.*? -/i, comm_temp + '- ');
            } else if (missa.match(/Glo\./i)) {
              missa = missa.replace(/Glo\./i, "Glo. - " + comm_temp);
            } else {
              missa = comm_temp + ' ' + missa;
            }

            missa = missa.replaceAll(/\s\s/g, " ");
            missa = missa.replaceAll('..', '.');
            missa = missa.replaceAll(/\.(<[^>]*>)\./g, '.$1');
          } 
          else if (missa_post) 
          {
            if (missa_post.match(/2a/)) {
              missa_post = missa_post.replace(/2a.*? -/i, comm_temp + '- ');
            } else if (missa_post.match(/Glo\./i)) {
              missa_post = missa_post.replace(/Glo\./i, "Glo. - " + comm_temp);
            } else {
              missa_post = comm_temp + ' ' + missa;
            }
            
            missa_post = missa_post.replaceAll(/\s\s/g, " ");
            missa_post = missa_post.replaceAll('..', '.');
            missa_post = missa_post.replaceAll(/\.(<[^>]*>)\./g, '.$1');
          }
          else missa = missa + '<font color=red><b>Ubi est missa?</b></font> <font color=blue><b>Com.</b></font> ' + comm_temp;

          //missa = missa + ' <font color=blue><b>Com.</b></font> ' + comm_temp;
          
          comm_temp = null;
        }

        //////////////////|\\\\\\\\\\\\\\\\\\
        ///  Vesperæ: NEW commemorationes  \\\
        //|\\\\\\\\\\\\\\\|///////////////////

        // First we need to filter out lower feasts if a Sermo is following
        if (winner_next['force'] > 90 && !allow_comm.test(ref_tempo_next))
          {
            for (i_c = 0; i_c < comm_vesperae_full.length; i_c++) {
              if (comm_vesperae_full[i_c].force < 35) 
                comm_vesperae_full.splice(i_c,1); 
            }
          }

        // Tuesdays of Paschal and Pentecost Octave can get first Vespers from Wednesday, 
        // but they need to be deleted.
        if (ref_tempo.match(/tp_[18]_2/))
        {
          comm_vesperae_full = [];
        }

        // Then we write out the Commemorations
        if (comm_vesperae_full.length > 0)
        {
          // Vesperae: commemorationes
          comm_vesperae_full.sort((a, b) => b.force - a.force);
          et = '';
          if (vesperae) et = ' - ';
          //comm_temp = et + 'Com. ';
          comm_temp = et + '<font color=blue><b>Com.</b></font> ';

          // some antiphons change at Easter
          if ( ref_tempo.match("tp") ) {
            // Commune Confessoris non Pontificis
            comm_vesperae_full.forEach(item => {
              item.comm = item.comm.replaceAll(/Iste cogn[óo]vit/gi, "Beátus vir, qui métuit");});
            comm_vesperae_full.forEach(item => {
              item.comm = item.comm.replaceAll(/Iste Sanctus digne\.?/gi, "Hic vir.");});

            // Commune Unius Martyris et Commune Martyrum
            comm_vesperae_full.forEach(item => {
              item.comm = item.comm.replaceAll(/Be[aá]tus vir\.|Iste Sanctus pro lege\.?|Isti sunt Sancti\.?|Isti sunt\.?/gi, "Fíliæ Jerúsalem.");});

            // Sabbato B.M.V.
            comm_vesperae_full.forEach(item => {
              item.comm = item.comm.replaceAll(/Beátam me dicent/gi, "Regína cœli lætáre");});
          } // finis T.P.

          // If there are multiple identical Comm., they need to be switched usually in this manner: Ant. Vesperæ => Ant. Laudes ( => Ant. ij. Vesperæ)

          // Test on 23.4.2026 (when St. Adalbert not in Easter Octave)

          let comm_used =
              /Mart\.|Ap\./i.test(winner.force >= winner_next.force ? winner : winner_next);
          // Commune Apostolorum et Martyrum T.P.
          comm_vesperae_full.forEach(item => {
            if (/F[ií]li(æ|ae) Jer[uú]salem\.?/i.test(item.comm)) {
              if (comm_used) {
                item.comm = item.comm.replace(/F[ií]li(æ|ae) Jer[uú]salem\.?/, "Lux perpétua.");
              } else {
                comm_used = true; }
              }
          });

          comm_used =
              /^S\. .* Mart\./i.test(winner.force >= winner_next.force ? winner : winner_next);
          // Commune Unius Martyris extra T.P.
          comm_vesperae_full.forEach(item => {
            if (/Be[aá]tus vir\.?/i.test(item.comm)) {
              if (comm_used) {
                item.comm = item.comm.replace(/Be[aá]tus vir\.?/, "Qui vult veníre post me.");
              } else {
                comm_used = true; }
              }
          });

          comm_used =
              /^SS\. .* Mart\./i.test(winner.force >= winner_next.force ? winner : winner_next);
          // Commune Plurimorum Martyrum extra T.P.
          comm_vesperae_full.forEach(item => {
            if (/Isti sunt Sancti\.?/i.test(item.comm)) {
              if (comm_used) {
                item.comm = item.comm.replace(/Isti sunt Sancti\.?/, "Fulgébunt justi.");
              } else {
                comm_used = true; }
              }
          });

          //comm_used = winner['header'].includes("Ep.");
          comm_used =
              (winner.force >= winner_next.force ? winner : winner_next)
              .header.includes("Ep.");
          // Commune Confessoris Pontificis
          comm_vesperae_full.forEach(item => {
            if (/Sac[ée]rdos et P[óo]ntifex/i.test(item.comm)) {
              if (comm_used) {
                item.comm = item.comm.replace(/Sac[ée]rdos et P[óo]ntifex/, "Euge serve bone");
              } else {
                comm_used = true; }
              }
          });

          for (i_c = 0; i_c < comm_vesperae_full.length; i_c++) {
            comm_temp = comm_temp + ' ' + comm_vesperae_full[i_c].comm + ' ';
            if (i_c < (comm_vesperae_full.length-1)) 
                comm_temp = comm_temp + "& ";
          }

          comm_temp = comm_temp.replace(
            new RegExp(escapeRegex(winner_next['header'])
            + "(?: \\([ix]ij\\. Lect\\. et M\\.\\))?"), "de seq.");
            
          vesperae = vesperae + comm_temp.replace(winner['header'], "de præc.");
          comm_temp = null;
        }

        if (short_output)
        {
          laudes = shorten(laudes);
          vesperae = shorten(vesperae);
        }

        if (!laudes && winner['force'] > 40) laudes = "sine Com.";
        if (!vesperae.includes("Com.")) vesperae += " - sine Com.";

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

    // Rogationes in Octava Paschæ
    if (commemoratio == days_sancto['04_25rog'])
    {
      header = header + ' atque ' + commemoratio['header'];
      missa = commemoratio['missa'] + missa + " - <red>In fine Missæ Evangelium de Rogationibus.</red>";
    }

    ////  Angeli Custodes in September (Saturday, first Vesper) \\\\
    if ( weekday == 6 && ((month == 7 && ((day == 1) || (day == 31))) || (month == 8 && day < 7)) ) {
        vesperae = days_sancto['angeli_custodes_sept']['vesperae_j'] + " - Com. " + vesperae.replace("- Com.", "&"); laudes_post += days_sancto['angeli_custodes_sept']['martyrologium']; }

    // Feria ij. Rogationum, if festum iij. Lect. et M. follows
    // (we need to switch the vespers)

    if (ref_tempo.match(/tp_6_1/) && winner == days_tempo[ref_tempo] && winner_next['force'] == 30) {
        vesperae = winner_next['vesperae_j'];
        if (vesperae.match(/Com\./)) 
            vesperae = vesperae.replace(/Com\./, "Com. " + winner['vesperae'] + " & ");
        else vesperae += " - " + winner['vesperae_commemoratio'];
    }

      //////  Replacing -Ant Laudes- with appropriate Ferial Antiphon  \\\\\\

      if (laudes && laudes.match("-Ant Laudes-"))
        { 
          ant_feria = ["", "Eréxit Dóminus.","Salútem ex inimícis nostris.","In sanctitáte.", "Ad dandam sciéntiam.","Per víscera misericórdiæ.","In viam pacis." ];
          laudes = laudes.replace(/-Ant Laudes-/, '<i>' + ant_feria[weekday] + '</i>');
        }

      //check_next += '.<br>Sacérdos et Póntifex: "' + matchCount(vesperae,/Sac[ée]rdos et P[óo]ntifex/) + '" - Fíliæ Jerúsalem: "' + matchCount(vesperae,/F[íi]li(æ|ae) Jer[úu]salem/g) + '.<br>Comm. in Laudibus: "' + getComm(laudes) + '" - et in Vesperis: "' + getComm(vesperae)
      //+ '".</div>';

    /// Final commemoration of B.M.V. on Festa xij. Lect. et M. and lower \\\
    laudes_bmv = " B.M.V.";
    vesperae_bmv = " B.M.V.";
    et = " &"
    et1 = " &"
    dash = " - ";
    if ( laudes == "" ) dash = "";
    if ( laudes.match("B.M.V.") ) { laudes_bmv = ""; et = "";}
    if ( winner['header'].match("B.M.V.") ) { laudes_bmv = ""; et = ""; et1 = "";}
    if ( laudes.match(/Com\. /) ) et1 = " &";
    
    // Com. B.M.V. ad Laudes 
    if ( (winner['force'] < 41 || ref_tempo.match(/ash_1_3/)) 
      && !header.match(/Infra Oct/i) 
      && getComm(laudes) < 2 
      && !ref_sancto.match(/01_05|02_22|05_06/)) // Chair of St. Peter in Antioch; S. John at Latin Gate: Suffrages are left out
      {
      laudes = laudes.replace(/(?: - )?sine Com\.?/, "");
      if ( weekday == 2 && getComm(laudes) < 1 ) laudes_bmv += " & B. B. R.";
      if ( weekday == 3 && getComm(laudes) < 1 ) laudes_bmv += " & S. Joseph";
      if ( weekday == 6 && getComm(laudes) < 1 
         && !winner['header'].match("B.M.V.")) laudes_bmv += et1 + " De Pace";
      if ( weekday == 6 && getComm(laudes) < 2 
         && winner['header'].match("B.M.V."))  laudes_bmv += et1 + " De Pace";

      if ( laudes.match("& B.M.V. ") ) laudes = laudes.replace("B.M.V. ", "B.M.V. " + laudes_bmv + " ");
      else if ( laudes.match(/Com\. /) ) laudes = laudes + et + laudes_bmv;
      else laudes = laudes + dash + "Com. " + laudes_bmv;
      }

    if (winner == days_sancto['votiva_bernardi']) laudes = laudes.replace("B. B. R.", "B. R. <red>(nomen S. Bernardi hic omittitur)</red>");

    // Com. B.M.V. ad Vesperas
    et = " &"
    dash = " - ";
    if ( vesperae == "" ) dash = "";
    if ( vesperae.match("B.M.V.") || weekday == 6) { vesperae_bmv = ""; et = "";}
    if ( weekday == 5 && winner_next['force'] < 35 && !vigilia_sabb ) { vesperae_bmv = ""; et = ""; }

    if (( winner['force'] < 41 || ref_tempo.match(/ash_1_3/)) 
      && (winner_next['force'] < 41 || ref_tempo_next.match(/ash_1_3/)) 
      && !header.match(/Infra Oct/i) && getComm(vesperae) < 2 
      && ((!ref_sancto.match(/02_23/) && !is_leap_year(year)) 
          || (!ref_sancto.match(/02_24/) && is_leap_year(year))) // St. Mathias 
      && !ref_sancto.match(/02_21|05_05/)) // Chair of St. Peter in Antioch; S. John at Latin Gate: Suffrages are left out
      {
      vesperae = vesperae.replace(/(?: - )?sine Com\.?/, "");
      if ( weekday == 1 && getComm(vesperae) < 1 ) vesperae_bmv += et + " B. B. R.";
      if ( weekday == 2 && getComm(vesperae) < 1 ) vesperae_bmv += " & S. Joseph"; 
      if ( weekday == 5 && getComm(vesperae) < 1 
        && !winner_next['header'].match("B.M.V.")) vesperae_bmv += et + " De Pace";
      else if ( weekday == 5 && getComm(vesperae) < 2 
        && winner_next['header'].match("B.M.V."))  vesperae_bmv += et + " De Pace";

      if ( vesperae.match("& B.M.V. ") ) vesperae = vesperae.replace("B.M.V. ", "B.M.V. " + vesperae_bmv + " ");
      else if ( vesperae.match(/Com\. /) && vesperae_bmv ) vesperae += " &" + vesperae_bmv;
      //else if ( vesperae.match(/Com\. /) ) vesperae += vesperae_bmv;
      else if (vesperae_bmv) vesperae = vesperae + dash + "Com. " + vesperae_bmv;
      }

    if (winner_next == days_sancto['votiva_bernardi']) vesperae = vesperae.replace("B. B. R.", "B. R. <red>(nomen S. Bernardi hic omittitur)</red>");

    // Changes in Suffragium of Our Lady:
    //===================================
    // After 2.2.
    if (ref_sancto == "02_02") ant_BMV_post_purificationem = true;

    if (ref_sancto.match(/02_0[345]/) && winner['force'] <= 40 && winner != days_sancto['votiva_bmv'] && winner != days_sancto['votiva_bmv_prima_sabb'] && ant_BMV_post_purificationem) { 
      laudes = laudes.replace("B.M.V.", "B.M.V. <red>℣. <i>D</red>ignáre me.</i> Ora. <i><red>C</red>oncéde miséricors.</i>");
        vesperae = vesperae.replace("B.M.V.", "B.M.V. <i><red>A</red>ve Regína cœlórum</i> <red>℣. <i>D</red>ignáre me.</i> Ora. <i><red>C</red>oncéde miséricors.</i>"); 
        ant_BMV_post_purificationem = false;
      }

    //// Deleting Votiva B.M.V. in Sabbato Comm. in feasts of Our Lady
    if ((winner_next == days_sancto['votiva_bmv'] 
      || winner_next == days_sancto['votiva_bmv_prima_sabb'])
      && winner['header'].match(/B\..?M\..?V\./) 
      && !ref_sancto.match(/03_19|03_20/)) {
          vesperae = vesperae.replace("de seq. <i>Beátam me dicent.</i> & ", "");
          vesperae = vesperae.replace("Com. de seq. <i>Beátam me dicent.</i>", "");
      }

    check_next += 'Comm. in Laudibus: "' + getComm(laudes) + '" - et in Vesperis: "' + getComm(vesperae) + '".</div>';

    /////////  Getting rid of unused "Feria"  \\\\\\\\\\\\\
    if (!ref_tempo.match(/lent_|ash_/) || weekday == 0) {
      //laudes = laudes.replace(/Feria(?: & )?/, "");
      //vesperae = vesperae.replace(/Feria(?: & )?/, ""); }
      laudes = laudes.replace(/Feria & /, "");
      vesperae = vesperae.replace(/Feria & /, ""); }

    /////////  Reminder of Ferial Hymn change after first Sunday of November  \\\\\\\\\\\\\
    //if ( header.match(/simul I\. Novembris/i) || (winter_hymns && day > 1 && day < 8 && month_usual_number == 11 && winner == days_tempo[ref_tempo]))
    if (winter_hymns && weekday != 6 && (winner == days_tempo[ref_tempo] || winner['header'].match(/Vigilia|Commemoratio/i)))
      { 
        if (laudes.match(/^Com\.|^sine Com\./)) minus = "- "; else minus = "";
        vigiliae = "<red>Hymn.</red> <i>Ætérne rerum cónditor.</i> " + vigiliae;
        laudes = "<red>Hymn.</red> <i>Splendor patérnæ glóriæ.</i> " + minus + laudes;
        if (winner['force'] > winner_next['force'] || winner_next['header'].match("Vigilia")) {
          if (vesperae.match("- Com.")) vesperae = vesperae.replace(/- Com\./i, "<red>Hymn.</red> <i>Deus Creátor ómnium.</i> - Com.")
          else if (vesperae.match("- sine Com.")) vesperae = vesperae.replace(/- Com\./i, "<red>Hymn.</red> <i>Deus Creátor ómnium.</i> - sine Com.")
          else vesperae += " <red>Hymn.</red> <i>Deus Creátor ómnium.</i>";
          }
        winter_hymns = false;
      }

    /////  Vigilia Omnium Sanctorum: martyrologium  \\\\\
    if (ref_sancto == "10_30" && weekday == 6) laudes_post = days_sancto["11_01"]['martyrologium'].replace("Festívitas", "Vigília Festivitátis").replace("Slavnost", "Vigilie slavnosti").replace(" - Ave Maria.", "") + laudes_post;

    ////  Vesperae Sabbato: A capitulo de Sabb., if Saturday's feast has ij. Vesp.
    if (false && weekday == 6 && winner['force'] >= 40 && winner_next == days_tempo[ref_tempo_next] && winner['force'] <= winner_next['force'] && !ref_tempo.match(/lent_6_6|tp_7_6/) && !winner['header'].match(/Quatuor Temp/i)) 
        vesperae = "de festo. A capitulo de " + vesperae;

    /////////////  Sunday after Epiphany that doesn't fit:  \\\\\\\\\\\\\\\\
    // Sets the anticipated Sunday to previous Thursday, but only as a Feria
    // with iij. Lessons from the Homily, Ant. ad Benedictus and the Collect
    //----------------------------------------------------------------------
    // See Rubricæ Generales Brev. Cist., p. xvij. De dominicis, §5 and 6.

    if ( ref_tempo.match("pe_") && extra == 1 && i >= (duration - 7) ) // Monday of the last week post Epiph.
      {
        next_sunday = "pe_" + (1 + week_start + Math.ceil((i + 1) / 7)) + '_0';
        next_sunday_no = 1 + week_start + Math.ceil((i + 1) / 7);

        // If we have any Feria after the anticipated Sunday, it will look like this:
        if (dominica_anticipata && winner['force'] == 10)
          {
          subtitulum = "<red>Officium de Feria, Ant. ad Benedictus et Oratio de Dominica " + roman_lc[next_sunday_no] + " post. Epiph.</red>"
          laudes = days_tempo[next_sunday]['laudes'] + " <red>de Dom. " + roman_lc[next_sunday_no] + " post. Epiph.</red> - " + laudes;
          missa = days_tempo[next_sunday]['header'] + " - " + days_tempo[next_sunday]['missa'];
          missa = missa.replace(/Asperges - |Cre\. -/g, "");
          missa = missa.replace(/Glo\. -/, "2a A cunctis. 3a ad libitum. -");
          missa = missa.replace(/Pr(ae|æ)f\. SS\. Trin\./i, "Præf. Comm.");
          }

        // Looking for a free day within that "anticipated" week
        if ((i == (duration - 7) && winner['force'] < 30 // Monday (it's the last resort)
            && days_sancto[get_ref_sancto(1)] && days_sancto[get_ref_sancto(1)]['force'] >= 30 
            && days_sancto[get_ref_sancto(2)] && days_sancto[get_ref_sancto(2)]['force'] >= 30 
            && days_sancto[get_ref_sancto(3)] && days_sancto[get_ref_sancto(3)]['force'] >= 30
            && days_sancto[get_ref_sancto(4)] && days_sancto[get_ref_sancto(4)]['force'] >= 30)
          || (i == (duration - 6) && winner['force'] < 30  // Tuesday (2nd last resort)
            && days_sancto[get_ref_sancto(1)] && days_sancto[get_ref_sancto(1)]['force'] >= 30 
            && days_sancto[get_ref_sancto(2)] && days_sancto[get_ref_sancto(2)]['force'] >= 30 
            && days_sancto[get_ref_sancto(3)] && days_sancto[get_ref_sancto(3)]['force'] >= 30)
          || (i == (duration - 5) && winner['force'] < 30 // Wednesday(3rd last resort)
            && days_sancto[get_ref_sancto(1)] && days_sancto[get_ref_sancto(1)]['force'] >= 30 
            && days_sancto[get_ref_sancto(2)] && days_sancto[get_ref_sancto(2)]['force'] >= 30)
          || (i == (duration - 4) && winner['force'] < 30) // Thursday (preferred option)
          || (i == (duration - 3) && winner['force'] < 30 && !dominica_anticipata) // Friday (2nd preferred option)
          // Saturday will be either Festum xij. Lect., or Sabb. de Beata.
          )
          {
          vigiliae = "iij. Lect. <red>Invitatorium de Feria. Benedictio </red><i>Evangelica lectio.</i> <red>Leguntur tres lectiones de iij. nocturno: ix., x., xj. una cum xij. Oratio de Dom. vj. post Epiph. Ceterum Officium de Feria, sola Ant. ad Benedictus et Oratio de Dominica " + roman_lc[next_sunday_no] + " post. Epiph.</red>";
          laudes = days_tempo[next_sunday]['laudes'] + " <red>de Dom. " + roman_lc[next_sunday_no] + " post. Epiph.</red> - " + laudes;

          missa = days_tempo[next_sunday]['header'] + " - " + days_tempo[next_sunday]['missa'];
          missa = missa.replace(/Asperges - |Cre\. -/g, "");
          missa = missa.replace(/Glo\. -/, "2a A cunctis. 3a ad libitum. -");
          missa = missa.replace(/Pr(ae|æ)f\. SS\. Trin\./i, "Præf. Comm.");
          
          header = days_tempo[next_sunday]['header'] + " (anticipata)";
          header = header.replace(/^(\S+\s+)(\S+)/, (match, firstWord, secondWord) => 
            firstWord + roman_lower_to_upper(secondWord))

          dominica_anticipata = true;
          }

        // If there is no free Feria, only a Comm. in Saturday's Lauds is made. And in the Mass.
        if (i == (duration - 2) && !dominica_anticipata)
          { 
          if (laudes.match(/sine Com\./)) 
              laudes = laudes.replace(/sine Com\./, days_tempo[next_sunday]['laudes_commemoratio']);
          else if (laudes.match(/Com\./)) {
              if (ref_sancto.match(/01_18|01_25/))
                laudes += " & " + days_tempo[next_sunday]['laudes_commemoratio'].replace("Com.", "");
              else laudes = laudes.replace(/Com\./, days_tempo[next_sunday]['laudes_commemoratio'] + " & ");
              }
          else if (laudes) 
              laudes += " - " + days_tempo[next_sunday]['laudes_commemoratio']
          else laudes += days_tempo[next_sunday]['laudes_commemoratio']

          laudes = laudes.replace("Epiph.", "Epiph. <red>(anticipata)</red>")

          if (missa.match(/[1-4]a /))
            {
            if (ref_sancto.match(/01_18/)) missa = missa.replace("3a", "3a Dom. " + roman_lc[next_sunday_no] + " post Epiph. 4a");
            if (ref_sancto.match(/01_25/)) missa = missa.replace("- Cre", "3a Dom. " + roman_lc[next_sunday_no] + " post Epiph. - Cre");
            else 
                {
                  missa = missa.replace("3a", "4a");
                  missa = missa.replace("2a", "3a");
                  missa = missa.replace("3a", "2a Dom. " + roman_lc[next_sunday_no] + " post Epiph. 3a");
                }
            missa = missa.replace(/4a Ecclési(ae|æ) vel pro Papa\.? /, "");
            missa = missa.replace(/4a de Sp\. Sancto\.? /, "");
            }
          }
      }

    ////  Sabbato ante Septuagesimam: Benedicamus Domino cum Alleluia.  \\\\
    if (ref_tempo_next == "sept_1_0") vesperae += " - <i><red>B</red>enedicámus Dómino.</i> <red>cum 2 <i>A</red>lleluia.</i>"

    //// Postprocessing \\\\
    vesperae = vesperae.replace("(et M.)", "(Com. et M.)"); // to be removed, hopefully. For some reason, the code doesn't work without replaceAll("Com. ","") in line 814 (Comm. of first Vesper) and I'm too tired to find out why.
    laudes = laudes.replaceAll(/\(Com\.\) |\(Com\. et M\.\) |\(iij\. Lect\. et M\.\) /g, "");

    laudes = laudes.replace('- Com. + <u>Vesp. Def.', " + <u>Vesp. Def.");
    vesperae = vesperae.replace('- Com. + <u>Vesp. Def.', " + <u>Vesp. Def.");

    vesperae = vesperae.replace(/de seq\. \(.ij\. Lect\. et M\.\)/, "de seq.");

    missa = missa.replace("  ", " ");

    /////  Vigilia Epiphaniae, if it falls on Sunday \\\\\
    if (ref_sancto == "01_05" && weekday == 0) {
        missa = missa.replace(/2a Vigilia.*? 3a/i, "2a") }

    if ( ref_sancto.match(/09_20v|09_19v/) && quatember_septembris ) 
      {
        laudes = laudes.replace("Vigiliæ S. Matthæi, Ap. et Evang. & ", "")
        if (getComm(laudes) < 2) laudes += "& B.M.V."
        laudes += ' <red>De Vigilia S. Matthæi in Laudibus nihil fit.</red>';
      }

    if (false && tricenarium_vesperae) // original, cycling the j., ij. and iij. Noct.
      {
      vesperae += " " + days_sancto['tricenarium']['vesperae_j'];
      if (noct_defunct_counter % 3 == 2) vesperae = vesperae.replace('<u>j. Noct.</u>', "<u>ij. Noct.</u>");
      else if (noct_defunct_counter % 3 == 0) vesperae = vesperae.replace('<u>j. Noct.</u>', "<u>iij. Noct.</u>");
      noct_defunct_counter++;
      }

    if (true && tricenarium_vesperae)
      {
      // Feria ij. + Feria v.: j. Noct.
      // Feria iij. + Feria vi.: ij. Noct.
      // Fer. iv. + Sabb.: iij. Noct.
      vesperae += " " + days_sancto['tricenarium']['vesperae_j'];
      if (weekday == 1 || weekday == 4) vesperae = vesperae.replace('j. Noct.', "ij. Noct.");
      else if (weekday == 2 || weekday == 5) vesperae = vesperae.replace('j. Noct.', "iij. Noct.");
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
      if (vigiliae) vigiliae += " + ";
      vigiliae += days_sancto['tricenarium']['vigiliae'];
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

     //////////////////|\\\\\\\\\\\\\\\\\\\\\
    ////////   Anniversarium Solemne  \\\\\\\\
    //\\\\\\\\\\\\\\\\\|//////////////////////

    // Finding a date for January (usually 31.1.)
    //////////////////////////////////////////////
    // Blocking points: the Anniversary date falls: on Fest. iij. Lect. et M. and higher, Sunday, Saturday de Beata, Thursday de SS. Sacramento (1st free Thursday in month exc. June), Tuesday de S. Bernardo (last free Tuesday in month exc. August).
    if (day == 1 && month_usual_number == 1) {
      //looking for 31.1. on 1.1., i.e. weekday(31.1.) = weekday(1.1.) + 2
      if (weekday == 0) anniversarium_01 = "02_08"; // 31.1. on Tuesday
      else if (weekday == 2) anniversarium_01 = "02_08"; // 31.1. on Thursday
      else if (weekday == 4) anniversarium_01 = "02_09"; // 31.1. on Saturday | or "02_11"
      else if (weekday == 5) anniversarium_01 = "02_08"; // 31.1. on Sunday
      else if (get_ref_tempo(37,prefix_tempo, week_start, day_start, duration).match("sept") && extra == 1) anniversarium_01 = "02_08"; // 31.1. on the only free Monday before Septuagesima, i.e. place for additional Sunday post Epiph.
      else anniversarium_01 = "01_31";
      }

    //if (ref_sancto == "01_01") vigiliae += " Anniversarium_01 = '" + anniversarium_01 + "'" + " get_ref_tempo(37) = '" + get_ref_tempo(37,prefix_tempo, week_start, day_start, duration) + "'";
    if (ref_sancto == "01_31" && anniversarium_01 != "01_31") before = '<div class="small"><red>Solemne Anniversarium Superiorum Defunctorum translatum ad diem ' + anniversarium_01.substring(4,5) + '. Februarii.</red></div>';

    // A. S. Maji. We have to avoid all the Octaves and translated feasts
    /////////////////////////////////////////////////////////////////////
    if (day == 30 && month_usual_number == 4 ) {  // we have to start 30.4. to avoid overlap of A.S. and O.M.
      //looking for 21.5. on 1.5., i.e. weekday(21.5.) = weekday(1.5.) - 1
      anniversarium_05 = "";
      ind_as = 1;
      trans_temp = 0;
      date_ss_sacramenti_as = "";
      date_s_bernardi_as = "";
      date_s_bernardi_as_maii = "";
      if (month_usual_number == 4) offset_m = 21; else offset_m = 1;

      // Looking for feasts translated in the Pentecost Octave
      while (get_ref_sancto(ind_as).match(/^05_|^06_/))
        {
        ref_tempo_temp = get_ref_tempo(ind_as,prefix_tempo, week_start, day_start, duration);
        ref_sancto_temp = get_ref_sancto(ind_as);

        if ((ref_tempo_temp.match(/tp_7_6|tp_8_|pa_1_0/)
          && days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] > 60)
          || (ref_tempo_temp.match(/tp_7_6|tp_8_|pa_1_0/) && ref_sancto_temp == "06_01")) 
            { trans_temp++; }
        ind_as++;
        }
      
      // Return the variable to beginning!
      ind_as = 0;
      ref_tempo_temp = get_ref_tempo(offset_m,prefix_tempo, week_start, day_start, duration);

      if (weekday != 0 && weekday != 6 && !ref_tempo_temp.match(/tp_6_[456]|tp_7_|tp_8_/)
        && days_tempo[ref_tempo_temp]['force'] < 30) anniversarium_05 = "05_21"; 
      else {
        while (!anniversarium_05 && ind_as < 90) {
          ref_tempo_temp = get_ref_tempo(offset_m+ind_as,prefix_tempo, week_start, day_start, duration);
          ref_sancto_temp = get_ref_sancto(offset_m+ind_as);

          // Looking for Officium SS. Sacramenti
          if (ref_sancto_temp.match(/_01/) || ind_as == 0) {
            date_ss_sacramenti_as = "";
            weekday_as = ref_tempo_temp.slice(-1);
            month_as = ref_sancto_temp.replace(/_.*/, "").replace(/^0/, "");
    
            for (j = 0; j <= 5; j++) {
              offset = ((4 - weekday_as) % 7) + ind_as;
              temp_ss_sacramenti = get_ref_sancto((j*7) + offset);
              temporale_ss_sacramenti = get_ref_tempo((j*7)+offset, prefix_tempo, week_start, day_start, duration);

              //vigiliae += " j = " + j + ", date = " + temp_ss_sacramenti + ", temporale_ss_sacramenti = " + temporale_ss_sacramenti + "<br>";

              if ( (!days_sancto[temp_ss_sacramenti] || days_sancto[temp_ss_sacramenti]['force'] < 30 )
                && !temporale_ss_sacramenti.match("lent") && days_tempo[temporale_ss_sacramenti] && days_tempo[temporale_ss_sacramenti]['force'] < 30
                && temp_ss_sacramenti.match(month_as + "_") && temp_ss_sacramenti != "11_02"  
                && month_as != 6 // not in June, when the main feast is
                && !(month_as == 12 && temp_ss_sacramenti.replace("12_","") > 17)  
                && !(month_as == 1 && temp_ss_sacramenti.replace("01_","") < 13) )
                date_ss_sacramenti_as = temp_ss_sacramenti; 

              if (date_ss_sacramenti_as) j=5;
            }
        
            //vigiliae += "<br>Date_ss_sacramenti_as = '" + date_ss_sacramenti_as + "'.";
            //ind_as = 0;
          }

          // Looking for Off. S. Bernardi in May, June and July
          if (ref_sancto_temp.match(/_01/) || ind_as == 0) {
            date_s_bernardi_as = "";
            weekday_as = ref_tempo_temp.slice(-1);
            month_as = ref_sancto_temp.replace(/_.*/, "").replace(/^0/, "");

            //vigiliae += "<br>ref_tempo_temp = '" + ref_tempo_temp + "' weekday_as = '" + weekday_as + "'. month_as = '" + month_as + "'. ind_as = '" + ind_as +"'.<br>";
      
            for (j = 0; j <= 5; j++) {
              offset = ((9 - weekday_as) % 7) + offset_m + ind_as;
              temp_bernardi = get_ref_sancto((j*7) + offset);
              temporale_bernardi = get_ref_tempo((j*7)+offset, prefix_tempo, week_start, day_start, duration);
              //vigiliae += " j = " + j + ", date = " + temp_bernardi + ", temporale_bernardi = " + temporale_bernardi + "<br>";

            if ( (!days_sancto[temp_bernardi] || days_sancto[temp_bernardi]['force'] < 30 )
              && !temporale_bernardi.match("lent") && days_tempo[temporale_bernardi] && days_tempo[temporale_bernardi]['force'] < 30
             && (day+(j*7)) != OM_date[month_as] && temp_bernardi.match(month_as + "_") && temp_bernardi != "11_02" 
             && !(month_as == 12 && temp_bernardi.replace("12_","") > 17)  
             && !(month_as == 1 && temp_bernardi.replace("01_","") < 13) )
                date_s_bernardi_as = temp_bernardi; }
             //vigiliae += "Date_s_bernardi_as = '" + date_s_bernardi_as + "'.";
            }

          if (!date_s_bernardi_as_maii && date_s_bernardi_as && month_as == 5) {
            date_s_bernardi_as_maii = date_s_bernardi_as;
            //vigiliae += "<br>Date_s_bernardi_as_maii = '" + date_s_bernardi_as_maii + "'.";
            }

          /// Looking for the Anniversary itself

          // TO DO: look for A.S. NOT after a feast or Sunday first. + solve this for going the other way

          if (!ref_tempo_temp.match(/tp_6_[456]|tp_7_|tp_8_|_0|[0-9]_6/) 
            && (!days_sancto[ref_sancto_temp] || (days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] < 30))
            && days_tempo[ref_tempo_temp]['force'] < 30
            && !ref_sancto_temp.match(/06_01|06_28/)
            && ref_sancto_temp != date_s_bernardi
            && ref_sancto_temp != date_s_bernardi_as
            && ref_sancto_temp != date_ss_sacramenti_as
            && !yesterday_feast
             ) anniversarium_05 = ref_sancto_temp;

          if (ind_as < 21)
            {
              // Let's define days before 21.5. until 1.5.
              ref_tempo_temp_b = get_ref_tempo(offset_m-ind_as,prefix_tempo, week_start, day_start, duration);
              ref_sancto_temp_b = get_ref_sancto(offset_m-ind_as);

              if (!ref_tempo_temp_b.match(/tp_6_[456]|tp_7_|tp_8_|_0|[0-9]_6/) 
              && (!days_sancto[ref_sancto_temp_b] || (days_sancto[ref_sancto_temp_b] && days_sancto[ref_sancto_temp_b]['force'] < 30))
              && days_tempo[ref_tempo_temp_b]['force'] < 30
              && !ref_sancto_temp_b.match(/06_01|06_28/)
              && ref_sancto_temp_b != date_s_bernardi_as_maii
              && ref_sancto_temp_b != date_ss_sacramenti_as
              ) anniversarium_05 = ref_sancto_temp_b;

              //vigiliae += "<br>Ind (-) = " + ind_as + ", '" + ref_tempo_temp_b + "' - '" + ref_sancto_temp_b + "'. trans_temp = '" + trans_temp + "'. Anniversarium_05 = '" + anniversarium_05 + "'. ";
            }

          if (trans_temp) yesterday_feast = true;

          // Moving the date due to translated feasts 
          //-- (anniversarium_05 != ref_sancto_temp_b): going back (it seems) the translations don't matter  
          if (anniversarium_05 && trans_temp && anniversarium_05 != ref_sancto_temp_b) { anniversarium_05 = ""; trans_temp--; }

          // If a feast is currently translated due to Pentecost Octave, it will likely be "unloaded" here
          if (ref_tempo_temp.match(/adv_1_1|tp_2_[123]|pa_1_[123]/) && trans_temp) { trans_temp--; }

          // Looking for eventual Festum xij. Lect. (and higher) to block them for Vesp. Def.
          if ((days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] >= 40) 
            || (days_tempo[ref_tempo_temp] && days_tempo[ref_tempo_temp]['force'] >= 40))
            yesterday_feast = true;

          // If a feast is currently translated due to Pentecost Octave, it will likely be "unloaded" here
          if (ref_tempo_temp == /pa_1_[123]/ && trans_temp) { trans_temp--; }

          //vigiliae += "<br>Ind = " + ind_as + ", '" + ref_tempo_temp + "' - '" + ref_sancto_temp + "'. trans_temp = '" + trans_temp + "'. Anniversarium_05 = '" + anniversarium_05 + "'. ";
          ind_as++;
          }
          //vigiliae += "Anniversarium_05 = " + anniversarium_05;
        }
      }

    if (ref_sancto == "05_21" && anniversarium_05 != "05_21") before = '<div class="small"><red>Solemne Anniversarium Personarum Regularium Ordinis Defunctorum translatum ad diem ' + get_date_from_sancto(anniversarium_05) + '.</red></div>';

    //if (ref_sancto.match(/05_22/) && !anniversarium_05.match(month_usual_number + "_")) anniversarium_05 = "";


    // A. S. Septembris. We have to avoid mainly the Ember Days 
    ///////////////////////////////////////////////////////////
    if (day == 1 && month_usual_number == 9) {
      anniversarium_09 = "";
      ind_as = 0;
      quat_sept = []; 

      ref_tempo_temp = get_ref_tempo(17,prefix_tempo, week_start, day_start, duration);
      ref_sancto_temp = get_ref_sancto(17);

      ///////// Quatuor Temporum Septembris (Quatember) \\\\\\\\\\
      while (!quat_sept[1])
        {
          ref_tempo_temp = get_ref_tempo(14+ind_as,prefix_tempo, week_start, day_start, duration);
          ref_sancto_temp = get_ref_sancto(14+ind_as);

          if (ref_tempo_temp.match(/_3$/))
            {
              quat_sept[1] = ref_sancto_temp;
              quat_sept[2] = get_ref_sancto(14+ind_as+2);
              quat_sept[3] = get_ref_sancto(14+ind_as+3);
            }
          ind_as++;
        }
      //vigiliae += "ref_sancto_temp = " + ref_sancto_temp + "<br>quat_sept[1] = " + quat_sept[1] + ". quat_sept[2] = " + quat_sept[2] + ". quat_sept[3] = " + quat_sept[3] + ". ";

      // Reset the index variable!
      ind_as = 0;

      // If 1. Sept. Wednesday or Thursday, 18. Sept is then Saturday or Sunday
      if (weekday != 3 && weekday != 4 && ref_sancto_temp != date_s_bernardi 
        && ref_sancto_temp != quat_sept[1] && ref_sancto_temp != quat_sept[2] && ref_sancto_temp != quat_sept[3] 
        && days_tempo[ref_tempo_temp]['force'] < 30) anniversarium_09 = "09_18"; 
      else {
        while (!anniversarium_09 && ind_as < 90) {
          ref_tempo_temp = get_ref_tempo(17+ind_as,prefix_tempo, week_start, day_start, duration);
          ref_sancto_temp = get_ref_sancto(17+ind_as);

          /// Looking for the Anniversary itself

          //if (!ref_tempo_temp.match(/tp_6_[456]|tp_7_|tp_8_|_0|[0-9]_6|[0-9]_1/) // including Mondays (Vesp. after Sunday's Vesp.)
          if (!ref_tempo_temp.match(/tp_6_[456]|tp_7_|tp_8_|_0|[0-9]_6/) 
            && (!days_sancto[ref_sancto_temp] || (days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] < 30))
            && days_tempo[ref_tempo_temp]['force'] < 30
            && !ref_sancto_temp.match(/09_20/)
            && ref_sancto_temp != date_s_bernardi
            && ref_sancto_temp != date_s_bernardi_as
            && ref_sancto_temp != quat_sept[1] && ref_sancto_temp != quat_sept[2] && ref_sancto_temp != quat_sept[3]
             ) anniversarium_09 = ref_sancto_temp;

          //vigiliae += "<br>Ind = " + ind_as + ", '" + ref_tempo_temp + "' - '" + ref_sancto_temp + "'. trans_temp = '" + trans_temp + "'. Anniversarium_09 = '" + anniversarium_09 + "'. ";
          ind_as++;
          }
        }
        // vigiliae += "Anniversarium_09 = " + anniversarium_09;
      }

    if (ref_sancto == "09_18" && anniversarium_09 != "09_18") before = '<div class="small"><red>Solemne Anniversarium Fratrum, Parentum et Benefactorum Ordinis Nostri Defunctorum translatum ad diem ' + get_date_from_sancto(anniversarium_09) + '.</red></div>';

    // A. S. Novembris. 
    ///////////////////////////////////////////////////////////
    if (day == 1 && month_usual_number == 11) {
      anniversarium_11 = "";
      ind_as = 0;

      // If 1. Sept. Wednesday or Thursday, 18. Sept is then Saturday or Sunday
      if (weekday != 1 && weekday != 2 && ref_sancto_temp != date_s_bernardi 
        && days_tempo[ref_tempo_temp]['force'] < 30) anniversarium_11 = "11_20"; 
      else {
        while (!anniversarium_11 && ind_as < 90) {
          ref_tempo_temp = get_ref_tempo(19+ind_as,prefix_tempo, week_start, day_start, duration);
          ref_sancto_temp = get_ref_sancto(19+ind_as);

          /// Looking for the Anniversary itself

          //if (!ref_tempo_temp.match(/tp_6_[456]|tp_7_|tp_8_|_0|[0-9]_6|[0-9]_1/) // including Mondays (Vesp. after Sunday's Vesp.)
          if (!ref_tempo_temp.match(/tp_6_[456]|tp_7_|tp_8_|_0|[0-9]_6/) 
            && (!days_sancto[ref_sancto_temp] || (days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] < 30))
            && days_tempo[ref_tempo_temp]['force'] < 30
            && !ref_sancto_temp.match(/09_20/)
            && ref_sancto_temp != date_s_bernardi
            && ref_sancto_temp != date_s_bernardi_as
             ) anniversarium_11 = ref_sancto_temp;


          //vigiliae += "<br>Ind = " + ind_as + ", '" + ref_tempo_temp + "' - '" + ref_sancto_temp + "'. trans_temp = '" + trans_temp + "'. Anniversarium_11 = '" + anniversarium_11 + "'. ";
          ind_as++;
          }
        }
        //vigiliae += "Anniversarium_11 = " + anniversarium_11;
      }

    if (ref_sancto == "11_20" && anniversarium_11 != "11_20") before = '<div class="small"><red>Solemne Anniversarium Parentum et Fratrum Nostrorum Defunctorum translatum ad diem ' + get_date_from_sancto(anniversarium_11) + '.</red></div>';

    /////////////////////////////////////////////////////////////////////////

    // Placing the Off. defunct.
    // A. S. Januarii: usually 31.1.
    if (ref_sancto_next == anniversarium_01)
      {
      laudes_post = days_sancto['anniversarium_01']['martyrologium'] + laudes_post;
      vesperae += days_sancto['anniversarium_01']['vesperae_j'];
      }

    if (ref_sancto == anniversarium_01)
      {
        header = days_sancto['anniversarium_01']['header'];
        if (vigiliae) vigiliae += " + ";
        vigiliae += days_sancto['anniversarium_01']['vigiliae'];
        missa_post = "<li>- <u>in Missa Conv.:</u> " + days_sancto['anniversarium_01']['missa'] + "</li> <li>- <u>in Miss. priv.:</u> " + missa + '</li>' + missa_post; 
        missa = ""; 
        color = "black/" + color;
      }

    // A. S. Maji: usually 21.5.
    if (ref_sancto_next == anniversarium_05)
      {
      laudes_post = days_sancto['anniversarium_05']['martyrologium'] + laudes_post;
      vesperae += days_sancto['anniversarium_05']['vesperae_j'];
      }

    if (ref_sancto == anniversarium_05)
      {
        header += " - " + days_sancto['anniversarium_05']['header'].replace("de ea – ", "");
        if (vigiliae) vigiliae += " + ";
        vigiliae += days_sancto['anniversarium_05']['vigiliae'];
        missa_post = "<li>- <u>in Missa Conv.:</u> " + days_sancto['anniversarium_05']['missa'] + "</li> <li>- <u>in Miss. priv.:</u> " + missa + '</li>' + missa_post; 
        missa = ""; 
        color = "black/" + color;
      }

    // A. S. Septembris: usually 18.9.
    if (ref_sancto_next == anniversarium_09)
      {
      laudes_post = days_sancto['anniversarium_09']['martyrologium'] + laudes_post;
      vesperae += days_sancto['anniversarium_09']['vesperae_j'];
      }

    if (ref_sancto == anniversarium_09)
      {
        header += " - " + days_sancto['anniversarium_09']['header'].replace("de ea – ", "");
        if (vigiliae) vigiliae += " + ";
        vigiliae += days_sancto['anniversarium_09']['vigiliae'];
        //missa_post = "<li>- <u>in Missa Conv.:</u> " + days_sancto['anniversarium_09']['missa'] + "</li> <li>- <u>in Miss. priv.:</u> " + missa + '</li>' + missa_post; 
        //missa = ""; 
        //color = "black/" + color;
        missa = days_sancto['anniversarium_09']['missa']; 
        color = "black";
      }

    /////  All Souls Day - Commemoratio Omnium Fidelium Defunctorum  \\\\\
    // Usually 2.11., unless it falls on Sunday, then 3.11.
    if (ref_sancto == "11_01" && weekday != 6 || ref_sancto == "11_02" && weekday == 0) vesperae += days_sancto['all_souls']['vesperae_j'];

    if (ref_sancto == "11_02" && weekday != 0 || ref_sancto == "11_03" && weekday == 1)
      {
        header = days_sancto['all_souls']['header'];
        color = days_sancto['all_souls']['color'];
        rank = days_sancto['all_souls']['rank'];
        vigiliae = days_sancto['all_souls']['vigiliae'] + " " + vigiliae + days_sancto['all_souls']['laudes'];
        laudes_post += days_sancto['all_souls']['laudes_post'];
        missa = days_sancto['all_souls']['missa'];
      }

    /////  Commemoratio Parentum et Fratrum Nostrorum Defunctorum  \\\\\
    // A. S. Novembris: usually 20.11.
    if (ref_sancto_next == anniversarium_11)
      {
      laudes_post = days_sancto['anniversarium_11']['martyrologium'] + laudes_post;
      vesperae += days_sancto['anniversarium_11']['vesperae_j'];
      }

    if (ref_sancto == anniversarium_11)
      {
        header += " - " + days_sancto['anniversarium_11']['header'].replace("de ea – ", "");
        if (vigiliae) vigiliae += " + ";
        vigiliae += days_sancto['anniversarium_11']['vigiliae'];
        //missa_post = "<li>- <u>in Missa Conv.:</u> " + days_sancto['anniversarium_11']['missa'] + "</li> <li>- <u>in Miss. priv.:</u> " + missa + '</li>' + missa_post; 
        //missa = ""; 
        //color = "black/" + color;
        missa = days_sancto['anniversarium_11']['missa']; 
        color = "black";
      }

    /////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////
    /////   Officium Mensis (computing)   \\\\\
    ////////////////////|\\\\\\\\\\\\\\\\\\\\\\\

    if (is_last_day_of_month()) officium_mensis = "N";

    if (is_last_day_of_month() && start != christmas_new)
      {
        officium_mensis = "";
        ind_as = 0;
        trans_temp = 0;
        yesterday_feast = false; // if a day before had xij. Lect., it shouldn't be an O.M.
        sunday_feast = false; // if a Sunday was overruled by a feast, one Feria should be left for the Sunday's Mass

        ref_tempo_temp = get_ref_tempo(1+ind_as,prefix_tempo, week_start, day_start, duration);
        ref_sancto_temp = get_ref_sancto(1+ind_as);

        // Looking for Officium SS. Sacramenti
          date_ss_sacramenti_om = "";
          weekday_as = ref_tempo_temp.slice(-1);
          month_as = ref_sancto_temp.replace(/_.*/, "").replace(/^0/, "");
    
          for (j = 0; j <= 5; j++) {
            offset = ((4 - weekday_as) % 7) + 1 + ind_as;
            temp_ss_sacramenti = get_ref_sancto((j*7) + offset);
            temporale_ss_sacramenti = get_ref_tempo((j*7)+offset, prefix_tempo, week_start, day_start, duration);

            if ( (!days_sancto[temp_ss_sacramenti] || days_sancto[temp_ss_sacramenti]['force'] < 30 )
              && !temporale_ss_sacramenti.match("lent") && days_tempo[temporale_ss_sacramenti] && days_tempo[temporale_ss_sacramenti]['force'] < 30
              && temp_ss_sacramenti.match(month_as + "_") && temp_ss_sacramenti != "11_02"  
              && month_as != 6 // not in June, when the main feast is
              && !(month_as == 12 && temp_ss_sacramenti.replace("12_","") > 17)  
              && !(month_as == 1 && temp_ss_sacramenti.replace("01_","") < 13) )
              date_ss_sacramenti_om = temp_ss_sacramenti; 

            if (date_ss_sacramenti_om) j=5;
          }
        
        //vigiliae += "<br>Date_ss_sacramenti_om = '" + date_ss_sacramenti_om + "'.";
        ind_as = 0;

        // Looking for Off. S. Bernardi
          date_s_bernardi_om = "";
          weekday_as = ref_tempo_temp.slice(-1);
          month_as = ref_sancto_temp.replace(/_.*/, "").replace(/^0/, "");
      
          for (j = 0; j <= 5; j++) {
            offset = ((9 - weekday_as) % 7) + 1 + ind_as;
            temp_bernardi = get_ref_sancto((j*7) + offset);
            temporale_bernardi = get_ref_tempo((j*7)+offset, prefix_tempo, week_start, day_start, duration);

          if ( (!days_sancto[temp_bernardi] || days_sancto[temp_bernardi]['force'] < 30 )
            && !temporale_bernardi.match("lent") && days_tempo[temporale_bernardi] && days_tempo[temporale_bernardi]['force'] < 30
            && temp_bernardi.match(month_as + "_") && temp_bernardi != "11_02"  
            && month_as != 8 // not in August, when the main feast is
            && !(month_as == 12 && temp_bernardi.replace("12_","") > 17)  
            && !(month_as == 1 && temp_bernardi.replace("01_","") < 13) )
              date_s_bernardi_om = temp_bernardi; 
          }
        
        //vigiliae += "<br>Date_s_bernardi_om = '" + date_s_bernardi_om + "'.";
        ind_as = 0;

        // Looking for feasts translated in the Holy Week, Easter and Pentecost Octave
        if (moved.length > 0) trans_temp = moved.length;

        while (get_ref_sancto(ind_as).match(month_as + "_"))
          {
          ref_tempo_temp = get_ref_tempo(ind_as,prefix_tempo, week_start, day_start, duration);
          ref_sancto_temp = get_ref_sancto(ind_as);  

          if ((ref_tempo_temp.match(/lent_6_|tp_1|tp_7_6|tp_8_|pa_1_0/)
            && days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] > 60)
            || (ref_tempo_temp.match(/lent_6_|tp_1|tp_7_6|tp_8_|pa_1_0/) && ref_sancto_temp == "06_01")) 
              { trans_temp++; }
          ind_as++;
          }

          trans_temp_bak = trans_temp; // saving the translated count for the second run

        ind_as = 0;

        //////  The O.M. function's core  \\\\\\\

        while (!officium_mensis && ind_as < 35) {
          ref_tempo_temp = get_ref_tempo(1+ind_as,prefix_tempo, week_start, day_start, duration);
          ref_sancto_temp = get_ref_sancto(1+ind_as);
          weekday_as = ref_tempo_temp.slice(-1);

          // Looking for eventual Festum xij. Lect. (and higher) to block them for Vesp. Def.
          if (ind_as == 0 
            && ((days_sancto[ref_sancto] && days_sancto[ref_sancto]['force'] >= 40) 
            || (days_tempo[ref_tempo] && days_tempo[ref_tempo]['force'] >= 40)))
            yesterday_feast = true;

          // Looking for commemorated Sunday, which Officium would have to be resumed before O.M.
          if (ref_tempo_temp.match(/_0/) && days_sancto[ref_sancto_temp]
            && days_tempo[ref_tempo_temp]['force'] < days_sancto[ref_sancto_temp]['force'])
              sunday_feast = true;

          /// Looking for the Anniversary itself: First Run

          if (!ref_tempo_temp.match(/tp_6_[456]|tp_7_|tp_8_|_0|[0-9]_6|[0-9]_1/) // including Mondays (Vesp. after Sunday's Vesp.)
            && (!days_sancto[ref_sancto_temp] || (days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] < 30))
            && (days_tempo[ref_tempo_temp]['force'] < 30 || (days_tempo[ref_tempo_temp]['header'].match(/de ea/i) && !days_tempo[ref_tempo_temp]['header'].match(/Vigilia|Rogationum/i)))
            && (!days_sancto[ref_sancto_temp] || (days_sancto[ref_sancto_temp] 
              && !days_sancto[ref_sancto_temp]['rank'].match(/Commemoratio et M/i)))
            && !days_tempo[ref_tempo_temp]['header'].match(/Quatt?uor Temporum/i) 
            && !ref_sancto_temp.match(/01_31|05_21|09_18|11_20|11_02/) // A.S.
            && !ref_sancto_temp.match(/02_01|05_22|09_19|11_03/) // first, exclude days after A.S.
            && !ref_sancto_temp.match(/02_11|08_14|10_02/) // Vigiliae etc.
            && !((ref_sancto_temp.match(/02_2[45]/) && !is_leap_year(year)) || (ref_sancto_temp.match(/02_2[56]/) && is_leap_year(year))) // S. Mathias and day after
            && !ref_tempo_temp.match(/ash_/)
            && ref_sancto_temp != date_s_bernardi_om
            && ref_sancto_temp != date_ss_sacramenti_om
            && ref_sancto_temp != anniversarium_01 && ref_sancto_temp != anniversarium_05
            && ref_sancto_temp != anniversarium_09 && ref_sancto_temp != anniversarium_11
            && !(weekday_as == 5 && ref_sancto_temp.match(/_0[1-7]/)) // First Friday
            && !yesterday_feast
             ) officium_mensis = ref_sancto_temp;

          yesterday_feast = false;
          if (trans_temp) yesterday_feast = true;

          // Moving the date due to translated feasts
          //if (officium_mensis && trans_temp) { officium_mensis = ""; trans_temp--; }
          if (officium_mensis && trans_temp) { officium_mensis = ""; }

          // Deleting O.M. that would sit on a resumed Sunday Office
          if (sunday_feast) { officium_mensis = ""; sunday_feast = false;}

          // If a feast is currently translated due to Pentecost Octave, it will likely be "unloaded" here
          if (ref_tempo_temp.match(/adv_1_1|tp_2_[123]|pa_1_[123]/) && trans_temp) { trans_temp--; }

          // Looking for eventual Festum xij. Lect. (and higher) to block them for Vesp. Def.
          if ((days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] >= 40) 
            || (days_tempo[ref_tempo_temp] && days_tempo[ref_tempo_temp]['force'] >= 40))
            yesterday_feast = true;

          if (is_last_day_of_month(ref_sancto_temp)) ind_as = 40;

          if (days_tempo[ref_tempo_temp]) header_temp = days_tempo[ref_tempo_temp]['header'];
          else header_temp = "!!!! MISSING !!!!"

          //vigiliae += "<br>Ind = " + ind_as + ", '" + ref_tempo_temp + "' - '" + ref_sancto_temp + "'. trans_temp = '" + trans_temp + "'. Feria = '" + header_temp + "'. ";
          ind_as++;
          }

      // If we haven't found the O.M., we will try another run with slightly
      // loosened criteria: O.M. can fall right after a feast or A.S.
      if (!officium_mensis)
        { 
          trans_temp = trans_temp_bak;
          ind_as = 0;

        while (!officium_mensis && ind_as < 35) {
          ref_tempo_temp = get_ref_tempo(1+ind_as,prefix_tempo, week_start, day_start, duration);
          ref_sancto_temp = get_ref_sancto(1+ind_as);
          weekday_as = ref_tempo_temp.slice(-1);

          // Looking for eventual Festum xij. Lect. (and higher) to block them for Vesp. Def.
          if (ind_as == 0 
            && ((days_sancto[ref_sancto] && days_sancto[ref_sancto]['force'] >= 40) 
            || (days_tempo[ref_tempo] && days_tempo[ref_tempo]['force'] >= 40)))
            yesterday_feast = true;

          /// Looking for the Anniversary itself: Second Run

          if (!ref_tempo_temp.match(/tp_6_[456]|tp_7_|tp_8_|_0|[0-9]_6/) // including Mondays (Vesp. after Sunday's Vesp.)
            && (!days_sancto[ref_sancto_temp] || (days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] < 30))
            && (days_tempo[ref_tempo_temp]['force'] < 30 || days_tempo[ref_tempo_temp]['header'].match(/de ea/i) )
            && !days_tempo[ref_tempo_temp]['header'].match(/Quatt?uor Temporum/i) 
            && !ref_sancto_temp.match(/01_31|05_21|09_18|11_20|11_02/) // A.S.
            && !ref_sancto_temp.match(/02_11|08_14/) // Vigiliae etc.
            && !((ref_sancto_temp.match(/02_24/) && !is_leap_year(year)) || (ref_sancto_temp.match(/02_25/) && is_leap_year(year))) // S. Mathias only
            && !ref_tempo_temp.match(/ash_/)
            && ref_sancto_temp != date_s_bernardi_om
            && ref_sancto_temp != date_ss_sacramenti_om
            && ref_sancto_temp != anniversarium_01 && ref_sancto_temp != anniversarium_05
            && ref_sancto_temp != anniversarium_09 && ref_sancto_temp != anniversarium_11
            && !(weekday_as == 5 && ref_sancto_temp.match(/_0[1-7]/)) // First Friday
             ) officium_mensis = ref_sancto_temp;

          yesterday_feast = false;

          // Moving the date due to translated feasts
          //if (officium_mensis && trans_temp) { officium_mensis = ""; trans_temp--; }
          if (officium_mensis && trans_temp) { officium_mensis = ""; }

          // If a feast is currently translated due to Pentecost Octave, it will likely be "unloaded" here
          if (ref_tempo_temp.match(/adv_1_1|tp_2_[123]|pa_1_[123]/) && trans_temp) { trans_temp--; }

          // Looking for eventual Festum xij. Lect. (and higher) to block them for Vesp. Def.
          if ((days_sancto[ref_sancto_temp] && days_sancto[ref_sancto_temp]['force'] >= 40) 
            || (days_tempo[ref_tempo_temp] && days_tempo[ref_tempo_temp]['force'] >= 40))
            yesterday_feast = true;

          if (is_last_day_of_month(ref_sancto_temp)) ind_as = 40;

          //vigiliae += "<br>Ind = " + ind_as + ", '" + ref_tempo_temp + "' - '" + ref_sancto_temp + "'. Feria = '" + header_temp + "'. ";
          ind_as++;
          }
        }

        //// If we still haven't found the O.M., we put it (slightly altered)
        //// to the first day in month:
        if (!officium_mensis) 
          {
            if (ref_tempo_temp = get_ref_tempo(1,prefix_tempo, week_start, day_start, duration).match(/_0$/))
              officium_mensis = month_as + "_02i";
            else officium_mensis = month_as + "_01i";
          }

        if (!OM_date[month_as] && !officium_mensis.match(/_0[12]i/)) OM_date[month_as] = officium_mensis[3].replace("0","") + officium_mensis[4];

        //vigiliae += "<br>Officium_mensis = '" + officium_mensis + "'. ";
      }

    // Getting rid of eventual double spaces or dashes
    laudes = laudes.replaceAll("  ", " "); laudes = laudes.replace(/(\-|–) (\-|–)/, "-" );
    vesperae = vesperae.replaceAll("  ", " "); vesperae = vesperae.replace(/(\-|–) (\-|–)/, "-" );

    ////  Adding the green "&" sign \\\\
    laudes = laudes.replaceAll("& ", '<font color="green">&</font> ');
    missa = missa.replaceAll("& ", '<font color="green">&</font> ');
    vesperae = vesperae.replaceAll("& ", '<font color="green">&</font> ');

    ///////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ////////    Postprocessing Missa   \\\\\\\\\\\
    //\\\\\\\\\\\\\\\\\/////////////////////////\\

      /// Removing "In fine Evangelium feriae." if not in Lent
      if (!ref_tempo.match(/lent_|ash_/)) {
        missa = missa.replace(/- In fine (?:Miss(ae|æ) )?Evangelium feri(ae|æ)\.?/i, ""); }

      /// Processio vs. Sub tuum. After Exalt. S. Crucis (14.9.), it is Sub tuum.
      if (weekday == 0 && ref_tempo.match(/pa_|pe_/) 
      && ((day > 14 && month_usual_number == 9) || month_usual_number > 9)
        ) 
          missa = missa.replace(/Processio (–|-)|Processio per (Ecclesiam|Claustrum) (–|-)/i, "Sub tuum -");

      /// And between Finding and Exaltation of the Holy Cross on Sunday...
      if (weekday == 0 && ((day <= 14 && month_usual_number == 9) || (month_usual_number > 5 &&month_usual_number < 9 ))) missa = missa.replace(/Processio (–|-)|Processio per Ecclesiam (–|-)|Sub tuum (–|-)/i, "Processio per Claustrum -");

      /// Praefationes
      if (ref_tempo.match("lent")) 
        missa = missa.replace(/Pr(ae|æ)f\. Comm\./, "Præf. Quadr.");
      if (!ref_tempo.match(/ash|lent|adv/))
        missa = missa.replace(/.a Feria\.? -/i, "-" );
      missa = missa.replace(/- -/, "-" );
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

      // Preparing the dates of Officium mensis
      if (OM_dates[year]) OM_date = OM_dates[year].split(",");

      ///  Rorate Mass: adding Miss. priv. in Feria \\\
      if (ref_tempo.match("adv_") && winner['force'] == 25 && day != OM_date[month_usual_number])
        {
        tertia = "de Sp. Sancto"
        if (commemoratio) tertia = titulum_missa;
        missa_post = "<li>- <u>in Missa Conv.:</u> <blue><i>Rorate</i></blue> - Glo. - 2a de Dominica. 3a " + tertia + ". - Praef. B.M.V. <i>Et Te in veneratione.</i></li><li>- <u>in Miss. priv.:</u> " + missa + "</li>" + missa_post
        missa = "";

        if (weekday == 6) missa_post = missa_post.replace("sine Glo.", "Glo.");
        }

      ///  Rorate Mass: adding Miss. priv. in Off. SS. Sacramento \\\
      if (ref_tempo.match("adv_") && winner == days_sancto['votiva_sacramentum'])
        {
        missa_post = "<li>- <u>in Missa Conv.</u> " + missa + "</li><li>- <u>in Miss. priv.</u> De. SS. Sacramento <red>ut supra</red> (vel <blue><i>Rorate</i></blue> ante ortum solis, id est 7:35!)</li>" + missa_post
        missa = "";
        }

      ///  Rorate Mass: adding Miss. priv. in Off. S. Bernardi \\\
      if (ref_tempo.match("adv_") && winner == days_sancto['votiva_bernardi'])
        {
        missa_post = "<li>- <u>in Missa Conv.</u> " + missa + "</li><li>- <u>in Miss. priv.</u> De. S. Bernardo <red>ut supra</red> (vel <blue><i>Rorate</i></blue> ante ortum solis, id est 7:35!)</li>" + missa_post
        missa = "";
        }

      /////  Removing "Sub tuum" on Fest. Serm. and Sundays  \\\\\
      if (weekday == 0 || winner['force'] > 85 ) 
        { 
          if (missa.match(/Sub tuum/)) missa = missa.replace(/Sub tuum - /, "");
          if (missa_post.match(/Sub tuum/)) missa_post = missa_post.replace(/Sub tuum - /, "");
        }

      //// Some shortenings \\\\

      if ((missa.match(/Dominica/i) || missa_post.match(/Dominica/i)) && ref_tempo.match(/adv/i)) {
          missa = missa.replace(/Dominica/ig, "Dom. " + roman_lc[ref_tempo.substring(4,5)] + " Adv.");
          missa_post = missa_post.replace(/Dominica/ig, "Dom. " + roman_lc[ref_tempo.substring(4,5)] + " Adv");}

      if (missa.match("Vigilia Nativitatis S. Joannis"))
          missa = missa.replace("Vigilia Nativitatis S. Joannis", "Vigil. Nat. S. Joannis");

      // If there is no Comm. in a Sunday, it takes Comm. as usual for Ferias
      if (ref_tempo.match(/adv_/i) && weekday == 0 && missa.match("Glo. - Cre."))
        missa = missa.replace("Glo. - Cre.", "Glo. - 2a De S. Maria <i>Deus, qui de beátæ.</i> 3a <i>Ecclesiæ tuæ.</i> vel pro Papa - Cre.")

      if (ref_tempo.match(/pe_|pa_/i) && weekday == 0 && missa.match("Glo. - Cre."))
        missa = missa.replace("Glo. - Cre.", "Glo. - 2a A cunctis. 3a ad libitum. - Cre.")

      missa = missa.replace("..", ".");

    ////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\
    //////////     Officium Defunctorum    \\\\\\\\\\
    //----------------------------------------------\\
    
    /// Officium mensis \\\
    //-------------------\\\

    // Variables containing individual dates of O.M. are declared before this function

    if (OM_date[month_usual_number]) 
    {
      //OM_date = OM_dates[year].split(",");

      if ((day == (OM_date[month_usual_number]-1) && winner['force'] < 40)
        || (OM_date[month_usual_number+1] == 1 && is_last_day_of_month(ref_sancto))) {
        vesperae += " " + days_sancto['officium_mensis']['vesperae_j'];
        if (weekday == 1 || weekday == 4) vesperae = vesperae.replace('j. Noct.', "ij. Noct.");
        else if (weekday == 2 || weekday == 5) vesperae = vesperae.replace('j. Noct.', "iij. Noct.");
      }

      if ( day == (OM_date[month_usual_number]-1) && winner['force'] >= 40) {
        vesperae += " - <red>Vesp. et Noct. Defunct. omittuntur.</red>"; }
    
      if ( day == OM_date[month_usual_number]) {
        if (!ref_tempo.match(/lent_/) 
          && commemoratio && commemoratio['rank'] != 'Commemoratio et M.') 
            color = days_sancto['officium_mensis']['color'] + '/' + color;
        if (vigiliae) plus = " + "; else plus = "";
        vigiliae += plus + days_sancto['officium_mensis']['vigiliae'];
        //laudes += " " + days_sancto['officium_mensis']['laudes'];
        if (!ref_tempo.match(/lent_/)
          && commemoratio && commemoratio['rank'] != 'Commemoratio et M.') {
            missa_post = days_sancto['officium_mensis']['missa'] + missa; 
            missa = "";
        } else {
          // in Lent, no Requiem is celebrated, only Collect Praesta. will be added to penultimate place.
          // Rubr. general. Miss. Cist. § V.
          if (!missa.match(/Omn[ií]potens/)) {
            if (missa.match("4a")) missa = missa.replace("4a", "4a <i>Præsta, Dómine.</i> 5a");
            else if (missa.match("3a")) missa = missa.replace("3a", "3a <i>Præsta, Dómine.</i> 4a");
            else if (missa.match("2a")) missa = missa.replace("2a", "2a <i>Præsta, Dómine.</i> 3a");
            }
        }
        
        if (header.match(/de ea/i)) header = days_sancto['officium_mensis']['header'];
        else header += " atque " + days_sancto['officium_mensis']['header'];
        off_mensis = true;
      }
    }

    // Officium feriale: find a day
    if (false && off_mensis && weekday == 0) {off_feriale = true; off_mensis = false;}
    if (ref_sancto == anniversarium_09) off_feriale = false;

    // Implement the Off. feriale
    if ( winner_next['force'] < 30 && off_feriale && day != (OM_date[month_usual_number]-1) )
      { vesperae += " " + days_sancto['officium_mensis']['vesperae_j']; noct_defunct_counter++;}
    if ( winner['force'] < 30 && off_feriale && day != OM_date[month_usual_number] )
      { 
        color = days_sancto['officium_mensis']['color'] + '/' + color;
        if (vigiliae) plus = " + "; else plus = "";
        vigiliae = plus + days_sancto['officium_mensis']['vigiliae'];
        //laudes += " " + days_sancto['officium_mensis']['laudes'];
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
      if (vigiliae) vigiliae += " + ";
      vigiliae += days_sancto['09_18tr']['vigiliae']; 
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
    block_new_year = '<div class="year brown mt-5"><font color="red">A</font>nno <font color="red">D</font>omini ' + year + '</div>';
    if (day == 1) {
      if (OM_dates[year]) OM_date = OM_dates[year].split(",");
      else OM_date = [];
      month = date.getMonth();
      off_mensis_text = "";
      anniv_solemne = "";
      if (OM_date[(month+1)] || officium_mensis) dash = ' – '; else dash = '';
      
      // A.S. Januarii (usually 31.1.)
      if (month == 0 && anniversarium_01.match(/01_/)) anniv_solemne = dash + 'A. S. 31.';
      if (month == 0 && !anniversarium_01.match(/01_/)) anniv_solemne = dash + 'A. S. transf. in ' + get_date_from_sancto(anniversarium_01) + '.';

      if (OM_date[(month+1)] && OM_dates[year]) off_mensis_text = '<div class="body-smaller blue">O. M. ' + OM_date[(month+1)] + ". (l) – " + officium_mensis.replace(/.*_0?/, "") + ". " + anniv_solemne + '</div>';
      else if (anniv_solemne) off_mensis_text = '<div class="body-smaller blue">O. M. '  + officium_mensis.replace(/.*_0?/, "") + ". " + anniv_solemne + '</div>';
      else off_mensis_text = '<div class="body-smaller blue">O. M. '  + officium_mensis.replace(/.*_0?/, "") + '.</div>';
      //block_new_month = '<div class="month blue mb-3">Januarius' + " " + year + '</div>';
      block_new_month = '<nav class="navbar sticky-top sticky-top-2"><div class="navbar-brand month blue">' + month_human_readable_uc(month) + " " + year + off_mensis_text + '</div></nav>';
    }
  } else {
    block_new_year = '';
    if (day == 1 ) {
      month = date.getMonth();
      off_mensis_text = "";
      anniv_solemne = "";
      if (OM_date[(month+1)] || officium_mensis) dash = ' – '; else dash = '';

      // A.S. Januarii (usually 31.1.)
      if (month == 0 && anniversarium_01.match(/01_/)) anniv_solemne = dash + 'A. S. 31.';
      if (month == 0 && !anniversarium_01.match(/01_/)) anniv_solemne = dash + 'A. S. transf. in ' + get_date_from_sancto(anniversarium_01) + '.';
      if (month == 1 && anniversarium_01.match(/02_/)) anniv_solemne = dash + 'A. S. Januarii ' + anniversarium_01.substring(4,5) + '.';

      // A.S. Maji (usually 21.5.)
      if (month == 4 && anniversarium_05.match(/05_/)) anniv_solemne = dash + 'A. S. ' + anniversarium_05.replace(/.*_0?/, "") + '.';
      if (month == 4 && !anniversarium_05.match(/05_/)) anniv_solemne = dash + 'A. S. transf. in ' + get_date_from_sancto(anniversarium_05) + '.';
      if (month == 5 && anniversarium_05.match(/06_/)) anniv_solemne = dash + 'A. S. Maji ' + anniversarium_05.replace(/.*_0?/, "") + '.';
      if (month == 6 && anniversarium_05.match(/07_/)) anniv_solemne = dash + 'A. S. Maji ' + anniversarium_05.replace(/.*_0?/, "") + '.';

      // A.S. Septembris (usually 20.9.)
      if (month == 8 && anniversarium_09.match(/09_/)) anniv_solemne = dash + 'A. S. ' + anniversarium_09.substring(3,5).replace(/^0/, "") + '.';

      // A.S. Novembris (1): All Souls Day (usually 2.11.)
      //if (month == 10 && weekday == 6) anniv_solemne = dash + 'A. S. 3.';
      //else if (month == 10 && weekday != 6) anniv_solemne = dash + 'A. S. 2.';

      // A.S. Novembris (usually 20.11.)
      if (month == 10 && anniversarium_11.match(/11_/)) anniv_solemne += dash + 'A. S. ' + anniversarium_11.substring(3,5).replace(/^0/, "") + '.';


      if (OM_date[(month+1)] && OM_dates[year]) off_mensis_text = '<div class="body-smaller blue">O. M. ' + OM_date[(month+1)] + ". (l) – " + officium_mensis.replace(/.*_0?/, "") + ". " + anniv_solemne + '</div>';
      else if (anniv_solemne) off_mensis_text = '<div class="body-smaller blue">O. M. '  + officium_mensis.replace(/.*_0?/, "") + ". " + anniv_solemne + '</div>';
      else off_mensis_text = '<div class="body-smaller blue">O. M. '  + officium_mensis.replace(/.*_0?/, "") + '.</div>';
      block_new_month = '<nav class="navbar sticky-top sticky-top-2"><div class="navbar-brand month blue">' + month_human_readable_uc(month) + " " + year + off_mensis_text + '</div></nav>';
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
    if (block_vigiliae.match(/post.Vigil./)) { 
        block_vigiliae = block_vigiliae.replace("<u>ad Vigil.:</u> ", ""); }
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

  if ((weekday == 3 || weekday == 5) && winner['force'] < 80 && !ref_tempo.match(/tp_/) && !ref_sancto.match(/12_2[456789]|12_31/) && !winner['header'].match(/Oct\. Epiph/)) {
    block_jejunium = ' – <font color="red">jejunatur</font>';
  } else if ( ref_tempo == "ash_1_3" || ref_tempo == "lent_6_5" ) { 
    block_jejunium = ' – <font color="red">jejunatur</font> <font color="blue">(den přísného postu)</font>';
  } else if (( ref_tempo.match(/ash_|lent_/) && winner['force'] < 80 && weekday != 0) 
            || ref_tempo.match(/lent_6_[123]/)
            || (laudes_post.match(/[Vv]ig[ií]l[íi]a/) && winner['force'] < 80 && weekday != 0) 
            || (header.match(/[Vv]ig[ií]l[íi]a|Quatuor Temp/i) && weekday != 0) 
            || (winner_next['force'] >= 90 && weekday != 0 && winner['force'] < 80 && winner_next != days_tempo[ref_tempo_next] && !ref_sancto.match(/12_2[456789]|12_3[01]/))) {
    block_jejunium = ' – <font color="red">jejunatur</font>';
  } else { block_jejunium = ''; }

  ////////  Output format  \\\\\\\\\
  if (display_format == "output") 
    {
    if (missa) missa = missa.replaceAll(/<\/?li>/g, "");
    if (missa_post) missa_post = missa_post.replaceAll(/<\/?li>/g, "");
    if (laudes_post) laudes_post = laudes_post.replaceAll(/<\/?li>/g, "");

    if (subtitulum) block_subtitulum = '<span class="body text-justify">' + ' – ' + subtitulum + ' ';
    else block_subtitulum = '<span class="body text-justify"> '; 

    if (vigiliae) { block_vigiliae = '– <u>ad Vigil.:</u> ' + vigiliae + ' '; 
      if (block_vigiliae.match(/post Vigil\./)) 
        block_vigiliae = block_vigiliae.replace("<u>ad Vigil.:</u> ", ""); }
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
