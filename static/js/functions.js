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

function get_winner(ref_tempo, ref_sancto) {
  winner = days_tempo[ref_tempo];
  if ( !days_tempo[ref_tempo] ) { winner = days_sancto[ref_sancto]; winner['body'] = '<div class="solemnitas minor blue">' + ref_tempo + '</div>'; }
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
  if (days_sancto[ref_sancto] && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force'])   {
    winner = days_sancto[ref_sancto]; }
  if (winner == days_sancto[ref_sancto] && days_tempo[ref_tempo]['force'] != 10) { commemoratio = days_tempo[ref_tempo]; }
  if (winner == days_tempo[ref_tempo]) { commemoratio = days_sancto[ref_sancto]; }
  return commemoratio;
}

/////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////---... Variables declared for every possibly translated feast ...---\\\\\
//||\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//////////////////////////////////||\\

var translated_joseph = false;
var translated_annunt = false;
var translated_benedict = false;
var translated_joachim = false;
var translated_gabriel = false;
var translated_annivers = false;


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
  for (i = 0; i < duration; i++) {
    date = new Date(start.getTime() + (i * 24 * 3600 * 1000));
    day = date.getDate();
    weekday = date.getDay();
    week_number = date.getWeek();
    month_usual_number = date.getMonth() + 1;
    ref_tempo = prefix_tempo + (week_start + Math.ceil((i + 1) / 7)) + '_' + (day_start + (i % 7));
    ref_sancto = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day) + day;

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

      ref_tempo_next = ( ref_tempo_next == "tp_8_1") ? "tp_8_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "adv_5_0") ? "christmas_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "ash_1_7") ? "lent_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "lent_7_0") ? "tp_1_0" : ref_tempo_next;
      ref_tempo_next = ( ref_tempo_next == "pa_35_0") ? "adv_1_0" : ref_tempo_next;

    /////////////////////////////////////////////////////
    ///////////////  Let's find a WINNER  ///////////////
    /////////////////////////////////////////////////////

    commemoratio = get_commemoratio(ref_tempo, ref_sancto);
    if (i < (duration-1)) winner_next = get_winner(ref_tempo_next, ref_sancto_next); 
    winner = get_winner(ref_tempo, ref_sancto);

    
      //////////////////////////////////////////////////////
     ////////////////    MOVABLE FEASTS   /////////////////
    //////////////////////////////////////////////////////

    translated = false;
    trans_vesperae = "";
    comm_vesperae = "";

    //////-- Translating feasts between 19. and 25. March. --\\\\\\
    movable_easter = ["03_19","03_25","03_21","03_20","03_24"];

    if ( ref_sancto == "03_19" && ref_tempo.match(/lent_6_|tp_1_/) )
      { commemoratio = ""; translated_joseph = true;}
    if ( ref_sancto == "03_20" && ref_tempo.match(/lent_6_|tp_1_/) )
      { commemoratio = ""; translated_joachim = true;}
    if ( ref_sancto == "03_21" && ref_tempo.match(/lent_6_|tp_1_/) )
      { commemoratio = ""; translated_benedict = true;}
    if ( ref_sancto == "03_24" && ref_tempo.match(/lent_6_|tp_1_/) )
      { commemoratio = ""; translated_gabriel = true;}
    if ( ref_sancto == "03_25" && ref_tempo.match(/lent_6_|tp_1_/) )
      { commemoratio = ""; translated_annunt = true;}
    
    if ( ref_tempo == "tp_2_1" )
      { if (translated_joseph) {winner = days_sancto['03_19']; translated_joseph = false; translated = true;}
      else if (translated_annunt) {winner = days_sancto['03_25']; translated_annunt = false; translated = true;}
      if (translated) commemoratio = days_sancto[ref_sancto]; }

    if ( ref_tempo == "tp_2_2" )
      { if (translated_annunt) {winner = days_sancto['03_25']; translated_annunt = false; translated = true;}
      else if (translated_benedict) {winner = days_sancto['03_21']; translated_benedict = false; translated = true;}
      else if (translated_joachim) {winner = days_sancto['03_20']; translated_joachim = false; translated = true;}
      else if (translated_gabriel) {winner = days_sancto['03_24']; translated_gabriel = false; translated = true;}
      if (translated) commemoratio = days_sancto[ref_sancto]; }

    if ( ref_tempo == "tp_2_3" )
      { if (translated_benedict) {winner = days_sancto['03_21']; translated_benedict = false; translated = true;}
      else if (translated_joachim) {winner = days_sancto['03_20']; translated_joachim = false; translated = true;}
      else if (translated_gabriel) {winner = days_sancto['03_24']; translated_gabriel = false; translated = true;}
      if (translated) commemoratio = days_sancto[ref_sancto]; }

    if ( ref_tempo == "tp_2_4" )
      { if (translated_joachim) {winner = days_sancto['03_20']; translated_joachim = false; translated = true;}
      else if (translated_gabriel) {winner = days_sancto['03_24']; translated_gabriel = false; translated = true;}
      if (translated) commemoratio = days_sancto[ref_sancto]; }

    if ( ref_tempo == "tp_2_5" )
      { if (translated_gabriel) {winner = days_sancto['03_24']; translated_gabriel = false; translated = true;}
      if (translated) commemoratio = days_sancto[ref_sancto]; }

  
      if ( ref_tempo == "tp_2_0" )
      { if (translated_joseph) {trans_vesperae = "S. Joseph Sponsi B.&ThinSpace;M.&ThinSpace;V., Confessoris et Universalis Ecclesiae Patroni (translatum) ℟. maj. <i><b>Fecit me.</i></b>"}
      else if (translated_annunt) {trans_vesperae = "Annuntiatio B.&ThinSpace;M.&ThinSpace;V. (translatum) <i><b>Ecce concípies.</i></b>";} }

    if ( ref_tempo == "tp_2_1" )
      { if (translated_annunt) {trans_vesperae = "Annuntiatio B.&ThinSpace;M.&ThinSpace;V. (translatum) <i><b>Ecce concípies.</i></b>";}
      else if (translated_benedict) {trans_vesperae = "S.&ThinSpace;P.&ThinSpace;N. Benedicti Abbatis (translatum) <i><b>Sanctissime Conféssor.</i></b>";}
      else if (translated_joachim) {trans_vesperae = "S. Joachim Patris B.&ThinSpace;M.&ThinSpace;V. (translatum) <i><b>Laudémus virum.</i></b>";}
      else if (translated_gabriel) {trans_vesperae = "S. Gabrielis Archangeli (translatum) <i><b>Adhuc me loquénte.</i></b>";} }

    if ( ref_tempo == "tp_2_2" )
      { if (translated_benedict) {trans_vesperae = "S.&ThinSpace;P.&ThinSpace;N. Benedicti Abbatis (translatum) <i><b>Sanctissime Conféssor.</i></b>";}
      else if (translated_joachim) {trans_vesperae = "S. Joachim Patris B.&ThinSpace;M&ThinSpace;V. (translatum) <i><b>Laudémus virum.</i></b>";}
      else if (translated_gabriel) {trans_vesperae = "S. Gabrielis Archangeli (translatum) <i><b>Adhuc me loquénte.</i></b>";} }

    if ( ref_tempo == "tp_2_3" )
      { if (translated_joachim) {trans_vesperae = "S. Joachim Patris B.&ThinSpace;M.&ThinSpace;V. (translatum) <i><b>Laudémus virum.</i></b>";}
      else if (translated_gabriel) {trans_vesperae = "S. Gabrielis Archangeli (translatum) <i><b>Adhuc me loquénte.</i></b>";} }

    if ( ref_tempo == "tp_2_4" )
      { if (translated_gabriel) {trans_vesperae = "S. Gabrielis Archangeli (translatum) <i><b>Adhuc me loquénte.</i></b>";} }
    // End of: Translating feasts between 19. and 25. March. (incl. I. Vesp.)

    // Anniversarium Dedicationis Ecclesiæ Altovadensis 1. 6. (pokud přijde do svatodušního Oktávu)
    if ( ref_sancto == "06_01" ) {
        if ( ref_tempo.match(/tp_8_/) ) translated_annivers = true; 
        else { winner = days_tempo['anniversarium_dedicationis']; commemoratio = ""; } }

    if ( ref_tempo == "pa_1_1" && translated_annivers )
      { winner = days_tempo['anniversarium_dedicationis'];
        commemoratio = days_sancto[ref_sancto];
        translated_annivers = false; translated = true;}

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

    ///////// Missa Votiva de Beata \\\\\\\\\\
    if (weekday == 6 && winner['force'] < 35 )
      { winner = days_sancto['votiva_bmv']; commemoratio = days_sancto[ref_sancto]; }
    
    /////////////////////////////|\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    ////.. Let's load the working variables with content ..\\\\
    //||\\\\\\\\\\\\\\\\\\\\\\\\\|//////////////////////////||\\

    before = winner['before'];
    header = winner['header']; 
    laudes = winner['laudes']; 
    missa = winner['missa']; 
    vesperae = winner['vesperae'];  // this strange placement is 
    after = winner['after'];        // to enable following section
    laudes_post = winner['laudes_post'];
    missa_post = winner['missa_post'];
    vesperae_post = winner['vesperae_post'];

    if (commemoratio) {
      comm_laudes = commemoratio['laudes']; 
      comm_vesperae = commemoratio['vesperae']; }

    if (trans_vesperae != "" && comm_vesperae != "") comm_vesperae = trans_vesperae + " & " + comm_vesperae;
    else if (trans_vesperae != "" ) comm_vesperae = trans_vesperae;

    //////////////////////////////////////////////////////////
    /////////   Let's modify the HEADER (if needed)  /////////
    //////////////////////////////////////////////////////////

    if (translated) { header = header + " (translatum)"; translated = false; }
    if ( extra == 1 && i == (duration - 3) ) header = "Dominica " + header + " (anticipata)";

      ////////////////////////////////////////////////////////
     ///////////  First Vespers to moved feasts  ////////////
    ////////////////////////////////////////////////////////

    /////  First Vespers SS: Nominis Jesu  //////////
    if ( ref_sancto == "01_01" && ( weekday < 2 || weekday == 6 ) ) { vesperae = vesperae + ' - Com. SS. Nominis Jesu <b><i>Fecit mihi magna</i></b>'; }
    if ( (ref_sancto == "01_02" || ref_sancto == "01_03" ) && weekday == 6 ) { vesperae = "SS. Nominis Jesu - sine Com."; }
    if ( ref_sancto == "01_04" && weekday == 6 ) { vesperae = "SS. Nominis Jesu - Com. S. Telesphori Papæ et Martyris Iste sanctus"; }

    ///// Workaround for First Vespers S. Familiae //////
    if ( ref_tempo_next.match("christmas") && i == (duration-1) ) 
      {  if ( winner['force'] > 100 ) 
          vesperae = winner['vesperae'] + " – " + 'Com. seq. <i><b>Verbum caro.</i></b>';
          else vesperae = 'Sanctæ Familiæ: Jesu, Mariæ et Joseph <font color="red">(supple. bre. Cist. 1965)</font>';  }

    ///// First Vespers of moved Anniversary Feast (1. Junii)
    if ( ref_tempo == "pa_1_0" && translated_annivers )
      comm_vesperae = "Anniversarium Dedicationis Ecclesiæ Altovadensis (translatum) ℟. maj. Terríbilis" + comm_vesperae;

    ///// Missa Votiva de Beata - I. Vespers \\\\\
    if (weekday == 5 && winner_next['force'] < 35 && winner['force'] < 35 )
      { vesperae = "de seq."; } //winner_next = days_sancto['votiva_bmv']; }
    if (weekday == 5 && winner_next['force'] < 35)
      after = '<div class="small">¶ <font color="red">Ad Completorium et per Horas in die, in fine Hymnorum dicitur: <i><b>G</font>lória tibi, Dómine, Qui natus es de Vírgine.</i></b></div>'; 


    ////////////////////////////////////////////////////////

    // Sundays' Adorations: Tantum ergo et Mane nobiscum //
    if ( weekday == 0 ) 
       {  tantum_ergo = ["9","5","6a","6b","7","8"]; 
          mane_nobiscum = ["IV","I","II","III"];
          if ( day < 8 ) litaniae = "Litaniae S. Cordis –";
          else litaniae = "";
          after = "✠ Adoratio: " + litaniae + " Tantum ergo p. " + tantum_ergo[(week_number-1) % 6] + " – Mane nobiscum " + mane_nobiscum[week_number % 4] + ". (Laudes Vesp.)<br>" + after; 
        }
    
    /////////////////////////////////////
    ///  Vigiliae: dies non impedita  ///
    /////////////////////////////////////

    vigiliae = winner['vigiliae'];

    vigil_newyear = ['<i><b>Christus natus</i></b> iij. Lect.<font color="red">(Prima Die non impedita)</font> <i><b>Justificáti ergo.</i></b>',
      'iij. Lect. <font color="red">(Secunda Die non impedita; ut die 3. Jan.)</font> <i><b>An ignorátis fratres.</i></b>',
      'iij. Lect. <font color="red">(Tertia Die non impedita; ut die 3. Jan.)</font> <i><b>Fratres, debitóres sumus.</i></b>'];
    if (ref_sancto == "01_02") { vigil_newyear_counter = 0; }
    if (month_usual_number == 1 && day > 1 && day < 5 )
      { if ( winner['force'] > 40 ) {}
        else { vigiliae = vigil_newyear[vigil_newyear_counter]; vigil_newyear_counter++; } }

    vigil_epiphania = ['<font color="red">Prima Die non impedita post Epiph.</font> <i><b>Veritátem dico.</i></b>','<font color="red">Secunda die</font> <i><b>Paulus vocátus.</i></b>','<font color="red">Tertia die</font> <i><b>Et ego.</i></b>','<font color="red">Quarta die</font> <i><b>Omníno audítur.</i></b>','<font color="red">Quinta die</font> <i><b>Audet aliquis.</i></b>'];
    if (ref_sancto == "01_07") { vigil_epiphania_counter = 0; }
    if (month_usual_number == 1 && day > 6 && day < 12 )
      { if ( ref_tempo == "pa_1_0" ) {}
        else { vigiliae = vigil_epiphania[vigil_epiphania_counter]; vigil_epiphania_counter++; } }

    ////////////////////////////////////////////////
    /////////  The COMMEMORATIONS Section  /////////
    ////////////////////////////////////////////////

    winner['body'] = "";

    com_force = 0;

    if (commemoratio) {com_force = commemoratio['force'];}

    check_next = '<font color="blue">ref_tempo = ' + ref_tempo + "' -> '" + ref_tempo_next + "'<br>ref_sancto = '" + ref_sancto + "' -> '" + ref_sancto_next + ".<br>force: " +  winner['force'] + " (" + com_force  + ") -> force_next: " +  winner_next['force']    
      + " extra_sunday = " + extra + "  --- i = " + i + "/" + duration
      + ".</font>";

    if (commemoratio)
      { titulum = commemoratio['header'].split("+", 1);
        titulum_missa = commemoratio['header'].split(",", 1);
        if ( commemoratio['header'].match(/Oct\.|Octav/i) ) { titulum = ""; }

      if (commemoratio['before'] != "") 
        { if (winner['before'] != "" )
            { before = winner['before'] + " – " + commemoratio['before'];}
          else { before = commemoratio['before'];}  }

      if (commemoratio['after'] != "") 
        { if (winner['after'] != "" )
            { after = after + winner['after'] + " – " + commemoratio['after'];}
          else { after = commemoratio['after'];}    }

      if (commemoratio['laudes_post'] != "") 
        { if (winner['laudes_post'] != "" ) laudes_post = winner['laudes_post'] + " – " + commemoratio['laudes_post'];
          else laudes_post = commemoratio['laudes_post']; }

      if (commemoratio['missa_post'] != "") 
        { if (winner['missa_post'] != "" ) missa_post = winner['missa_post'] + " – " + commemoratio['missa_post'];
          else missa_post = commemoratio['missa_post']; }

      if (commemoratio['vesperae_post'] != "") 
        { if (winner['vesperae_post'] != "" ) vesperae_post = winner['vesperae_post'] + " – " + commemoratio['vesperae_post'];
          else vesperae_post = commemoratio['vesperae_post']; }

      /////////////////////////////////
      /////  Commemoratio Laudes  /////
      /////////////////////////////////

      if (commemoratio['laudes'] != "") 
        { 
          comm_laudes = comm_laudes.replace(/- sine Com\.|sine Com\./, "");
          laudes = laudes.replace(/- sine Com\.|sine Com\./, "");
          comm_laudes = comm_laudes.replace("Com\. ", "");
          comm = commemoratio['laudes_commemoratio'];
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
          //if ( comm == commemoratio['laudes_commemoratio'] ) { comm = "<i><b>" + comm + "</i></b> ";}

          et = " & ";
          if ( titulum == "" ) et = "";

          if ( commemoratio['laudes_commemoratio'].match(/^Com\. /) )
            { 
              laudes = laudes + " – " + commemoratio['laudes_commemoratio'];
            }
          else if ( commemoratio['laudes_commemoratio'].length > 3 ) { laudes = laudes + " – Com. " + titulum + et + commemoratio['laudes_commemoratio'];}
          else laudes = laudes + " – Com. " + titulum + " " + comm + et + comm_laudes;

          if ( winner['force'] > 49 ) { laudes.replace("& B.M.V.", "");}
          comm = null;
        }
      
      /////////////////////////////////
      /////  Commemoratio Missa   /////
      /////////////////////////////////
      
      if (commemoratio['missa'] != "") 
        { 
          comm_missa = commemoratio['missa'].match(/2a .* -/);
          comm_missa = comm_missa + " "; // looks stupid, but converts the variable into a string that the replace function can take
          comm_missa = comm_missa.replace(/3.*/,""); 
          comm_missa = comm_missa.replace("2a", "3a"); 
          if (comm_missa.length > 5) comm_missa = "2a " + titulum_missa + ". " + comm_missa; else comm_missa = "2a " + titulum_missa + ". ";
          comm_missa = comm_missa.replace(/-.*/, ""); 
          missa = winner['missa'].replace("Glo.", "Glo. – " + comm_missa);
        }

      /////////////////////////////////
      ///// Commemoratio Vesperæ  /////
      /////////////////////////////////
      if (commemoratio['vesperae'] != "" || comm_vesperae != "" ) 
        { 
          vesperae = vesperae.replace(/- sine Com.|sine Com./, "");
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

          if ( commemoratio['vesperae_commemoratio'].match("^Com\. ") )
            { 
             vesperae = winner['vesperae'] + " – " + commemoratio['vesperae_commemoratio'];
            }
          else if ( commemoratio['vesperae_commemoratio'].length > 3 ) { vesperae = winner['vesperae'] + " – Com. " + titulum + et + commemoratio['vesperae_commemoratio'];}
          else vesperae = winner['vesperae'] + " – Com. " + titulum + " " + comm + et + comm_vesperae;

          ////// If tomorrow's Vespers beat today's winner //////////

          if ( winner_next['force'] > winner['force'] )
            { 
            if ( commemoratio['vesperae_commemoratio'].match("^Com\. ") )
            { 
             vesperae = commemoratio['vesperae'] + " – " + winner['vesperae_commemoratio'];
            }
            else vesperae = commemoratio['vesperae'] + " – Com. " 
              + winner['vesperae'] + " "  // more testing needed
              + winner['vesperae_commemoratio'];
            vesperae = vesperae.replace(/- sine Com.|sine Com./, "");
            }

          comm = null;
          winner['body'] = commemoratio['header'];
        }
    }
    ////////////////// Finis Commemorationum //////////////////

    ////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /////////////    Postprocessing of Laudes/Vesperae   \\\\\\\\\\\\\\
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////\\

    // Provision for j. Vesperae, if the day before is nothing
    if (!commemoratio && comm_vesperae != "")
        {
          vesperae = vesperae + " – Com. " + comm_vesperae;
        }

    /// Final commemoration of B.M.V. on Festa xij. Lect. et M. and lower \\\
    laudes_bmv = " B. M. V.";
    vesperae_bmv = " B. M. V.";
    et = " &"
    if ( laudes.match("B.M.V.") ) { laudes_bmv = ""; et = "";}
    
    // Com. B.M.V. ad Laudes 
    if ( winner['force'] < 41 )
      {
      if ( weekday == 2 ) laudes_bmv += " & B. B. R.";
      if ( weekday == 3 ) laudes_bmv += " & S. Joseph";
      if ( weekday == 6 ) laudes_bmv += " & De pace";

      if ( laudes.match(/Com\. /) ) laudes = laudes + et + laudes_bmv;
      else laudes = laudes + " - Com. " + laudes_bmv;
      }

    // Com. B.M.V. ad Vesperas
    if ( vesperae.match("B.M.V.") ) { vesperae_bmv = ""; et = "";}
    if ( winner_next['force'] < 41 && winner['force'] < 41 )
      {
      if ( weekday == 1 ) vesperae_bmv += " & B. B. R.";
      if ( weekday == 2 ) vesperae_bmv += " & S. Joseph"; 
      if ( weekday == 5 ) vesperae_bmv += " & De pace";

      if ( vesperae.match(/Com\. /) ) vesperae = vesperae + et + vesperae_bmv;
      else vesperae = vesperae + " - Com. " + vesperae_bmv;
      }

    laudes_split = laudes.split("Com. ");
    // Check so that the green "&" won't appear before "Com. " word
    // (see Laudes 1.1. etc.)
    if ( laudes_split[1] ) 
      { laudes_replace = laudes_split[1] + " ";
        laudes_replace = laudes_replace.replaceAll("&", '<font color="green"><b>&</b></font> ');
        laudes = laudes_split[0] + "Com. " + laudes_replace; }

    vesperae_split = vesperae.split("Com. ");
    if ( vesperae_split[1] ) 
      { vesperae_replace = vesperae_split[1] + " ";
        vesperae_replace = vesperae_replace.replaceAll("&", '<font color="green"><b>&</b></font> ');

        /// Provision for translated feasts. If the feast is translated, 
        /// normal Commemorationes usually don't apply.
        if (trans_vesperae != "") vesperae = vesperae_split[0] + "Com. " + trans_vesperae;
        else vesperae = vesperae_split[0] + "Com. " + vesperae_replace; }
    
    /////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //////  Replacement section (HTML tags) and output  \\\\\\\
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////////////////\\

    for (let j of ["before"]) { winner[j] = addtags(winner[j]); }
    vigiliae = addtags(vigiliae); 
    laudes = addtags(laudes); 
    missa = addtags(missa); 
    vesperae = addtags(vesperae);
    after = addtags(after);
    laudes_post = addtags(laudes_post);
    missa_post = addtags(missa_post);
    vesperae_post = addtags(vesperae_post);
    
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
      winner['rank'],
      winner['body'],
      winner['subtitulum'],
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
    if (date.getMonth() != month || day == 1) {
      month = date.getMonth();
      block_new_month = '<div class="month blue mb-3">Januarius</div>';
    }
  } else {
    block_new_year = '';
    if (date.getMonth() != month || day == 1) {
      month = date.getMonth();
      block_new_month = '<div class="month blue my-3">' + month_human_readable(month) + '</div>';
    } else {
      block_new_month = '';
    }
  }

  // Blocks 'before' and 'after'?:
  if (before != "") {
    block_before = '<div class="body text-justify"><ul>' + before + '</ul></div>';
  } else { block_before = ''; }
  if (after != "") {
    block_after = '<span class="body text-justify ms-1"><ul>' + after + '</ul></span>';
  } else { block_after = ''; }

  // Blocks that can also be empty: Rank, Subtitulum, Vigiliae, Laudes, Missa, Vesperae and texts between them:

  if (rank != "") {
    rank = rank.replace(" ", " ");
    block_rank = '<b> – ' + rank + '</b>';
  } else { block_rank = ''; }

header = header.replace("+","");

if (comm_header != "") {
    comm_header = comm_header.replace("+","");
    block_commemoratio = '<span class="body text-justify"><ul><font color="black"><i>Commemoratio:</i></font><font color="blue"><b> ' + comm_header + '</b></font></ul></span>';
  } else { block_commemoratio = ''; }

if (subtitulum != "") {
    block_subtitulum = '<div class="body red text-justify"><ul>' + subtitulum + '</ul></div>';
  } else { block_subtitulum = ''; }

if (vigiliae != "") {
    block_vigiliae = '<div class="body text-justify"><ul><li><u>ad Vigil.:</u> ' + vigiliae + '</li></ul></div>';
  } else { block_vigiliae = ''; }

  if (laudes != "") {
    block_laudes = '<div class="body text-justify"><ul><li><u>in Laud.:</u> ' + laudes + '</li></ul></div>';
  } else { block_laudes = ''; }

  if (missa != "") {
    block_missa = '<div class="body text-justify"><ul><li><u>in Missa:</u> ' + missa + '</li></ul></div>';
  } else { block_missa = ''; }

  if (vesperae != "") {
    block_vesperae = '<div class="body text-justify"><ul><li><u>in Vesp.:</u> ' + vesperae + '</li></ul></div>';
  } else { block_vesperae = ''; }

////////////////   Texts between them   /////////////////////

if (laudes_post != "") {
    block_laudes_post = '<div class="body text-justify"><ul>' + laudes_post + '</ul></div>';
  } else { block_laudes_post = ''; }

  if (missa_post != "") {
    block_missa_post = '<div class="body text-justify"><ul>' + missa_post + '</ul></div>';
  } else { block_missa_post = ''; }

  if (vesperae_post != "") {
    block_vesperae_post = '<div class="body text-justify"><ul>' + vesperae_post + '</ul></div>';
  } else { block_vesperae_post = ''; }

  /////////////   jejunatur   ///////////////////////////////

  if ((weekday == 3 || weekday == 5) && winner['force'] < 100 ) {
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font></span>';
  } else if ( ref_tempo == "ash_1_3" || ref_tempo == "lent_6_5" ) { 
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font> <font color="blue">(den přísného postu)</font></span>';
  } else if ( ref_tempo.match(/adv|lent|ash/) && winner['force'] < 100 ) {
    block_jejunium = '<span class="rank"> – <font color="red">jejunatur</font></span>';
  } else { block_jejunium = ''; }
//////////////////////////////////////////////////////////////

  // Result:
  return (
    block_new_year
    + block_new_month
    + '<div class="d-flex flex-column w-50 mb-2">'
    + block_before
    + '<div class="head d-flex m-0">'
    + '<span class="first_line"><b>'  + add_zero(day) + day + "." 
    + " – " + liturgical_color(color) + " – " 
    + weekday_human_readable(weekday) + ' – </b>'
    + '<span class="header text-justify ms-1">' + header + '</span>' 
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
    //+ check // switch off and on here
  );
}
