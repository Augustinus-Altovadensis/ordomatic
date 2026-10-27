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

function savePosition() {
    const days = document.querySelectorAll('.d-flex[id^="date-"]');
    const center = window.innerHeight / 4;

    let closest = null;
    let minDistance = Infinity;

    days.forEach(day => {
        const rect = day.getBoundingClientRect();
        const distance = Math.abs(rect.top - center);

        if (distance < minDistance) {
            minDistance = distance;
            closest = day;
        }
    });

    if (!closest) return null;

    return {
        id: closest.id,
        top: closest.getBoundingClientRect().top
    };
}

function restorePosition(position) {
    if (!position) return;

    const day = document.getElementById(position.id);
    if (!day) return;

    const newTop = day.getBoundingClientRect().top;

    window.scrollBy({
        top: newTop - position.top,
        behavior: "instant"
    });
}

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
  // month_sabb = month according to the Antiphonary. NB: January = 0

  const antiphonae_sabb = {
    7: [ // August
      "Sapiéntia ædificávit.",
      "Omnis sapiéntia.",
      "Sapiéntia clámitat.",
      "Atténde, fili mi.",
      "Dóminus possédit me."],
    8: [ // September
      "Cum audísset Job.",
      "Quare detraxístis.",
      "Ne reminiscáris.",
      "Adónai.",
      "Adónai."],
    9: [ // October
      "Adapériat.",
      "Exáudiat Dóminus.",
      "Ornavérunt.",
      "Tu, Dómine universórum.",
      "Tua est poténtia."],
    10: [ // November
      "Vidi Dóminum sedéntem.",
      "Aspice Dómine.",
      "Super muros tuos.",
      "Muro tuo.",
      "Qui cœlórum cóntines thronos."]
    };

  return antiphonae_sabb[month_sabb]?.[sabb_mensis - 1] ?? "alia Antiphona.";
  }

function mergeTemporale(data) 
  {
    for (const year in data) {
        temporale[year] ??= {};

        for (const date in data[year]) {
            temporale[year][date] ??= data[year][date];
        }
    }
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

function get_ref_tempo(t_offset)
  {
    let new_date = new Date(date);
    new_date.setDate(new_date.getDate() + t_offset);
    
    return temporale[new_date.getFullYear()]?.[get_ref_sancto(t_offset)].ref_tempo;
  }

function get_s_bernardi(month, year) 
{ // Last Tuesday in month not impeded by a feast of iij. or xij. Lessons.

  let date_s_bernardi = "0";
  const offset = (2 - weekday + 7) % 7;

  for (let j = 0; j <= 5; j++) 
  {
    let ref_sancto_bernardi = get_ref_sancto((j*7) + offset);
    let ref_tempo_bernardi = get_ref_tempo((j*7) + offset);

      if (false)
      { 
        console.log("j =", j, "month =", month, "weekday =", weekday, "offset =", offset);
        console.log("ref_sancto_bernardi = ", ref_sancto_bernardi);
        console.log("ref_tempo_bernardi = ", ref_tempo_bernardi);
        console.log("date_s_bernardi = ", date_s_bernardi);
      }

    if ( (!days_sancto[ref_sancto_bernardi] 
        || days_sancto[ref_sancto_bernardi]['force'] < 30 )
      && !ref_tempo_bernardi.match("lent") 
      && days_tempo[ref_tempo_bernardi] 
      && days_tempo[ref_tempo_bernardi]['force'] < 30
      && temporale[date.getFullYear()]?.[ref_sancto_bernardi].translated == 0
      && (day+(j*7)) != OM_date[month+1] 
      && ref_sancto_bernardi.match(add_zero(month+1) + (month+1) + "_")
      && ref_sancto_bernardi != "11_02" 
      && !(month == 7) // month of St. Bernards Feast
      && !(month == 11 && ref_sancto_bernardi.replace("12_","") > 17)  
      && !(month == 0 && ref_sancto_bernardi.replace("01_","") < 13) 
      )
        { 
          date_s_bernardi = ref_sancto_bernardi; 
        }
  }

  return date_s_bernardi;
}

function get_ss_sacramenti(month, year) 
{ // First Thursday in month not impeded by a feast of iij. or xij. Lessons.
  //let date_ss_sacramenti = "0";
  let date_ss_sacramenti;
  const offset = (4 - weekday + 7) % 7;

  //weekday_as = ref_tempo_temp.slice(-1);
  //month_as = ref_sancto_temp.replace(/_.*/, "").replace(/^0/, "");
    
  for (j = 0; j <= 5; j++) 
  {
    //offset = ((4 - weekday_as) % 7) + ind_as;

    let ref_sancto_ss_sacramenti = get_ref_sancto((j*7) + offset);
    let ref_tempo_ss_sacramenti = get_ref_tempo((j*7) + offset);

    //ref_sancto_ss_sacramenti = get_ref_sancto((j*7) + offset);
    //ref_tempo_ss_sacramenti = get_ref_tempo((j*7)+offset, prefix_tempo, week_start, day_start, duration);

    if ( (!days_sancto[ref_sancto_ss_sacramenti] 
        || days_sancto[ref_sancto_ss_sacramenti]['force'] < 30 )
      && !ref_tempo_ss_sacramenti.match("lent") 
      && days_tempo[ref_tempo_ss_sacramenti] 
      && days_tempo[ref_tempo_ss_sacramenti]['force'] < 30
      && ref_sancto_ss_sacramenti.match(month + "_") 
      && ref_sancto_ss_sacramenti != "11_02"  
      && month_as != 6 // not in June, when the main feast is
      // May needs to be added, in 2027 Corpus Christi is in May
      // Plus the month, when the Corpus Christi Octave is.
      && !(month == 12 && ref_sancto_ss_sacramenti.replace("12_","") > 17)  
      && !(month == 1 && ref_sancto_ss_sacramenti.replace("01_","") < 13) )
        date_ss_sacramenti = ref_sancto_ss_sacramenti; 

    if (date_ss_sacramenti) j=5;
  }

  return date_ss_sacramenti;
}

function get_winner(ref_tempo, ref_sancto) {
  winner = days_tempo[ref_tempo];
  if (!days_tempo[ref_tempo]) { 
    winner = days_sancto[ref_sancto]; 
  }
  if (days_sancto[ref_sancto] && days_tempo[ref_tempo] 
    && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force']) {
    winner = days_sancto[ref_sancto];
  } 
  return winner;
}

function get_commemoratio(ref_tempo, ref_sancto) {
  // In Traditional Rites, after the winner is determined, the "loser" is commemorated. 
  // Only if the "loser" is a common Feria, we don't commemorate it.
  winner = days_tempo[ref_tempo];
  commemoratio = "";

  if (days_sancto[ref_sancto] && days_tempo[ref_tempo] 
    && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force']) {
      winner = days_sancto[ref_sancto]; 
    }
  if (winner == days_sancto[ref_sancto] && days_tempo[ref_tempo]['force'] != 10) { 
      commemoratio = days_tempo[ref_tempo];
    }
  if (winner == days_tempo[ref_tempo]) { 
      commemoratio = days_sancto[ref_sancto];
    }
  return commemoratio;
}

