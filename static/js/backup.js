   
    // sometimes, we need to replace Com. festum with Com. de seq.
    next_com_title = "Com. " + winner_next['header'];
    next_et_title = "&  " + winner_next['header']; // the Com. doesn't need to be as first
    if ( vesperae.match(next_com_title) ) vesperae = vesperae.replace(next_com_title, "Com. de seq.")
    if ( vesperae.match(next_et_title) ) vesperae = vesperae.replace(next_et_title, "& de seq.")

    // the same goes for "de præcedenti"
    praec_com_title = "Com. " + winner['header'];
    praec_et_title = "&  " + winner['header']; // the Com. doesn't need to be as first
    if ( vesperae.match(praec_com_title) ) vesperae = vesperae.replace(praec_com_title, "Com. de præc.")
    if ( vesperae.match(praec_et_title) ) vesperae = vesperae.replace(praec_et_title, "& de præc.")

  //////////////////////////////


    ///////// Missa Votiva de Beata \\\\\\\\\\
    /// Replacements done for "missa":
    if (false && (winner == days_sancto['votiva_bmv'] 
    ||  winner == days_sancto['votiva_bmv_prima_sabb'])) {
      if (ref_tempo.match(/pe_|sept_|tp_|pa_/)) missa = missa.replace("Glo.", "Glo. - 2a de Sp. Sancto. 3a Ecclésiae vel pro Papa.");
    if (ref_tempo.match("adv_")) missa = missa.replace("Glo.", "<blue><i>Rorate</i></blue> - Glo. - 2a de Dominica. 3a de Sp. Sancto.");
      if (commemoratio) {
        comm_missa = commemoratio['missa'];
        comm_missa = comm_missa.replace(/A cunctis\.?|de S\. Maria\.?|(?:de )?(?:B\. ?M\. ?V\. ?)? Conc[eé]de nos\.?/i, "de Sp. Sancto.") }
      }

  //////////////////////////////

    ///// Workaround for First Vespers S. Familiae //////
    if ( ref_tempo.match("christmas") && i == (duration-2) ) 
      {  if ( winner['force'] > 100 ) 
          vesperae = winner['vesperae'] + " – " + 'Com. de seq. <i>Verbum caro.</i>';
          else vesperae = 'Sanctæ Familiæ: Jesu, Mariæ et Joseph <font color="red">(supple. bre. Cist. 1965)</font>'; }


  //////////////////////////////

        if (false && matchCount(vesperae,/F[íi]li(æ|ae) Jer[úu]salem/g) == 2 ) { t = 0;
        vesperae = vesperae.replace(/F[íi]li(æ|ae) Jer[úu]salem/g, match => ++t == 2 ? "Lux perpétua" : match); }
      if (false &&  matchCount(laudes,/Lux perp[ée]tua/g) == 2 ) { t = 0;
        laudes = laudes.replace(/Lux perp[ée]tua/g, match => ++t == 2 ? "Fíliæ Jerúsalem" : match); }

      if (false && matchCount(vesperae,/Sac[ée]rdos et P[óo]ntifex/) == 1 ) { t = 0;
        vesperae = vesperae.replace(/Sac[ée]rdos et P[óo]ntifex/g, match => ++t == 2 ? "Euge serve bone" : match); }
      if (false && matchCount(laudes,/Euge,? serve bone|Euge,? serve|Euge/) == 1 ) { t = 0;
        laudes = laudes.replace(/Euge,? serve bone|Euge,? serve|Euge/g, match => ++t == 2 ? "Sacérdos et Póntifex" : match); }

//////////////////////////////

    // Deleting moved feasts on the original day
    if (moved.includes(ref_sancto))
    {
      before = before + '<div><font color=blue>Removing ' + ref_sancto + '.</font></div>'
      if (winner == days_sancto[ref_sancto])
      {
        winner = feria;
      }
      commemoratio = "";
    }

//////////////////////////////

    // For (translated) Anniversary (1.6.1259), that happens to fall into the Octave of Corporis Christi or Ascens., the Octave Comm. from unused temporale must be filled in

    if (false && winner == days_sancto['anniversarium_dedicationis'] && ref_tempo.match(/pa_1_[56]|pa_2_[01234]/i) && commemoratio == days_sancto[ref_sancto])
    {
      if (!laudes.match("Com."))  
        laudes += " - Com. Oct. Corp. Chr. <i>Ego sum panis.</i>";
      else laudes = laudes.replace("Com.", "Com. Oct. Corp. Chr. <i>Ego sum panis.</i> &");
      if (!vesperae.match("Com.")) 
        vesperae += " - Com. Oct. Corp. Chr. <i>O Sacraméntum.</i>"; 
      else if (vesperae.match("Cognovérunt omnes."))
        vesperae = vesperae.replace("Cognovérunt omnes.</i>", "Cognovérunt omnes.</i> & Oct. Corp. Chr. <ib>Magníficat.</i>"); 
      else vesperae = vesperae.replace("Com.", "Com. Oct. Corp. Chr. <ib>O Sacraméntum.</ib> &");
      if (missa) {
          missa = missa.replace(/3a.*? -/,"");
          missa = missa.replace("2a", "3a");
          missa = missa.replace(/Glo\.? [-–]/, "Glo - 2a de Oct. Corp. Christi.");
          missa = missa.replace(/(?:-)? Cre/, "- Cre");
          }
    }

    if (false && winner == days_sancto['anniversarium_dedicationis'] && ref_tempo.match(/tp_6_[56]|tp_7_[01234]/i) && commemoratio == days_sancto[ref_sancto])
    {
      // Test on 1.6.2028
      if (!laudes.match("Com."))  
        laudes += " - Com. Oct. Ascensionis <i>Ascéndo.</i>";
      else laudes = laudes.replace("Com.", "Com. Oct. Ascensionis <i>Ascéndo.</i> &");
      if (!vesperae.match("Com.")) 
        vesperae += " - Com. Oct. Ascensionis <i>O Rex glóriae.</i>"; 
      else if (vesperae.match("Sabb. ante Dom. infra oct. Ascensionis."))
        vesperae = vesperae.replace("Sabb. ante Dom. infra oct. Ascensionis.", "Sabb. ante Dom. infra oct. Ascensionis <i>Cum vénerit.</i> & Oct. Corp. Chr. <i>Pater, manifestávi.</i>"); 
      else vesperae = vesperae.replace("Com.", "Com. Oct. Ascensionis <i>O Rex glóriæ.</i> &");
      if (missa) {
          missa = missa.replace(/3a.*? -/,"");
          missa = missa.replace("2a", "3a");
          missa = missa.replace(/Glo\.? [-–]/, "Glo. - 2a de Oct. Ascensionis.");
          missa = missa.replace(/(?:-)? Cre/, "- Cre");
          }
    }

/////////////////////////////////////////////////////////////////
///// Original Commemoration routine:
/////////////////////////////////////////////////////////////////


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

//// .....

    ////////////////////////////////////////////////
    /////////  The COMMEMORATIONS Section  /////////
    ////////////////////////////////////////////////

    //winner['body'] = "";
    comm_head = "";
    comm_sabbato = "";
    com_force = 0;

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
          comm_laudes = comm_laudes.replace(/- sine Com\.|sine Com\./, "");
          laudes = laudes.replace(/- sine Com\.|sine Com\./, "");
          comm_laudes = comm_laudes.replace("Com\. ", "");
          comm = commemoratio['laudes_commemoratio'];
          comm = comm.replace("Com\. ", "");
          comm = ( comm == "C1") ? "Dum stetéritis. " : comm;
          comm = ( comm == "C1a") ? "Isti sunt duæ olívæ. " : comm;
          comm = ( comm == "C2") ? "Qui vult. " : comm;
          comm = ( comm == "C2a") ? "Qui odit. " : comm;
          comm = ( comm == "C3") ? "Fulgébunt justi. " : comm;
          comm = ( comm == "C4") ? "Euge, serve bone. " : comm;
          comm = ( comm == "C5") ? "Similábo eum. " : comm;
          comm = ( comm == "C6") ? "Símile est ... sagénæ. " : comm;
          comm = ( comm == "C7") ? "Símile est ... sagénæ. " : comm; // not an error
          comm = ( comm == "C8") ? "Zachæe. " : comm;

          // Glossary:
          // comm_laudes = commemoratio['laudes'];
          // comm = commemoratio['laudes_commemoratio'];
          // titulum = commemoratio['header']

          // Advent changes on certain dates, only if in Commemoratio
          if (winner == days_sancto[ref_sancto] && month_usual_number == 12 && day >= 17 && day <=23 ) {
            if (day == 21) comm = comm.replace(/Adv\. <i>.*<\/i>/, "Adv. <i>Nolíte timére.</i>")
            if (day == 23) comm = comm.replace(/Adv\. <i>.*<\/i>/, "Adv. <i>Ecce compléta sunt.</i>") }

          // In S. Familia, the Comm. of Oct. Epiph. is different...
          if (winner == days_tempo['pe_1_0']) {
              comm = comm.replace(/Oct\. Epiph\. Domini\. <i>Magi venérunt\.<\/i> <red>sine<\/red> <i>Alleluia\.<\/i>( \& )?/, "")
              comm_laudes = ""
            }

          et = " & ";
          dash = " – ";
          if ( !titulum ) et = "";
          if ( !comm_laudes ) et = "";
          if ( !laudes ) dash = "";

          if (laudes.match(/Feria/i) && ref_tempo.match(/lent_|ash_/))
             {
              laudes = laudes.replace(/Feria\.?/i, comm);
              comm = "";
             }
          else if (laudes.match(/^Com\. | - Com\./) && comm) 
            { // we need to sort the commemorations according to their force
             if (commemoratio['force'] >= 30 ) {
              if (!laudes.match(/Tu es pastor|Oct. Epiph.|Fer\./i)) laudes = laudes.replace("Com.", "Com. " + comm + " & ");
              else laudes += " & " + comm;}
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

          // In S. Familia, the Comm. of Oct. Epiph. is different...
          //if (winner == days_tempo['pe_1_0']) laudes = laudes.replace(/ ?\&? ?Oct\. Epiph\. Domini\. <i>Magi venérunt\.<\/i> <red>sine<\/red> <i>Alleluia\.<\/i> ?\&? ?/, "")

          //BACKUP else laudes = laudes + dash + "Com. " + titulum + " " + comm + et + comm_laudes;

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
          
          // Replacing the word "Feria" in [missa] field to keep other commemorations, while only the Feria is commemorated (like at feasts of St. Peter and Paul in Lent)
          if (missa.match(/Feria/i) && !ref_tempo.match(/lent_|ash_/) )
              missa = missa.replace(/.a Feria\.? -/i, "-" );
          else if (missa_post.match(/Feria/i) && !ref_tempo.match(/lent_|ash_/) )
              missa_post = missa_post.replace(/.a Feria\.? -/i, "-" );
          //else if (missa.match(/Feria/i) && ref_tempo.match(/lent|adv/) && commemoratio == days_tempo[ref_tempo])
          else if (missa.match(/Feria/i) && ref_tempo.match(/lent_|ash_/))
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

          // On Sunday, Com. de Feria needs to be deleted: "de Feria. 3a "
          if (weekday == 0 && comm_missa.match(/de feria/i)) comm_missa = comm_missa.replace(/a de feria\. 3/i,""); 

          // Needs to be tested. Originally the following line said:
          // if (!(commemoratio['force'] == 9 && commemoratio['missa'].match(/2a S\./)) (this condition was negated)
          if (!(commemoratio['force'] == 9 && commemoratio['missa'].match(/2a S\./)) && (winner != days_sancto['votiva_bmv'] || winner != days_sancto['votiva_bmv_prima_sabb'])) {
            comm_missa = comm_missa.replace(/3a.*/,""); 
            comm_missa = comm_missa.replace("2a", "3a"); 
            if (ref_tempo.match("adv_") && winner == days_sancto[ref_sancto]) de = "de "; else de = "";
            if (comm_missa.length > 5) comm_missa = "2a " + de + titulum_missa + ". " + comm_missa; else comm_missa = "2a " + titulum_missa + ". ";
            }

          if (commemoratio['force'] == 9 && commemoratio['missa'].match(/2a S\./) && (winner == days_sancto['votiva_bernardi'] || winner == days_sancto['xxx'])) {
            comm_missa = comm_missa.replace(/3a.*/,""); 
            comm_missa = comm_missa.replace("2a", "3a"); 
            if (ref_tempo.match("adv_") && winner == days_sancto[ref_sancto]) de = "de "; else de = "";
            if (comm_missa.length > 5) comm_missa = "2a " + de + titulum_missa + ". " + comm_missa; else comm_missa = "2a " + titulum_missa + ". ";
            }

          comm_missa = comm_missa.replace(/-.*/, ""); 

          // In MM. maj. and higher, we get rid of 3a de S. Maria (and later all variants)
          if (winner['force'] >= 80) {
              comm_missa = comm_missa.replace(/.a (?:de S\. Maria |B\. ?M\. ?V\. ? )?A cunctis\.? ?/, "")
              comm_missa = comm_missa.replace(/.a (?:de S\. Maria)? Conc[ée]de nos\.? ?/, "")
            }

          /////  Vigilia Assumptionis, 3a oratio in missa \\\\\
          if (winner == days_sancto['08_14v']) {
            comm_missa = comm_missa.replace(/A cunctis/i, "de Sp. Sancto") }

          ///// In Corpus Christi Octave, A cunctis. needs to be replaced with Concéde nos.
          if (ref_tempo.match(/pa_1_[56]|pa_2_[123]/) && comm_missa && comm_missa.match(/A cunctis/i))
              comm_missa = comm_missa.replace(/A cunctis/i, "Concéde nos")

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
          if (win_missa.match("2a") && winner['force'] > 40 && win_missa.match(/2a S\. |2a Fer\. |2a (?:de )?Dom/i)) 
            { 
            win_missa_com = win_missa.match(/2a.*? -/) + "";
            win_missa_com = win_missa_com.replace(" -", "") + "";
            } else win_missa_com = "";
          if (win_missa_com) {
            comm_missa = comm_missa.replace(/3a.*/,""); 
            comm_missa = comm_missa.replace("2a", "3a"); 
            comm_missa = win_missa_com + " " + comm_missa; }

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

          if (commemoratio_add && commemoratio_add['header']) {
            titulum_add = commemoratio_add['header'].split(",", 1);
            titulum_add = " " + titulum_add;
            if (commemoratio_add['missa']) 
              {
                next_ora = "3a";
                //missa = missa.replace(/2a (.*?) -/i, "2a " + "$1" + next_ora + titulum_add + ". -");
                missa = missa.replace(/.a de S\. Maria(.*?)\./i, "");
                missa = missa.replace(/2a (.*?) -/i, "2a " + "$1" + next_ora + titulum_add + ". -");
              }
            }

          // If Sunday yields to another Feast with Comm., it needs to be added.
          if (weekday == 0 && (commemoratio == days_tempo[ref_tempo] 
              || winner == days_sancto['nomen_jesu'])) {
            if (!missa.match("Asperges")) missa = "Asperges - " + missa;
            missa = missa.replace(/Duo Acolythi\.?(?: -)?/, "");
            missa = missa.replace(/Cum incenso ad oblata\.?(?: - )?/i, "");
            if (!missa.match("Processio") && ref_tempo.match(/tp_|pa_/) && month_usual_number <= 9) //missa = 'Processio per Ecclesiam - ' + missa; // orig. Claustrum
               missa = missa.replace("Asperges", "Asperges - Processio per Claustrum")
            if (!missa.match("Sub tuum") && ref_tempo.match(/pe_|pa_/) && month_usual_number > 9) missa = missa.replace("Asperges", "Asperges - Sub tuum")
            if (!missa.match("Cre.")) missa = missa.replace(/Pr(ae|æ)f\./i, "Cre. - Præf.")
            if (!missa.match(/In fine Miss.*Evang/i)) missa += ' - <red>In fine Missæ Evangelium Dominicæ.</red>';
            if (winner['laudes'].match("Com.") && !winner['laudes'].match("sine Com."))
              { 
                tertia_oratio = winner['missa'].match(/2a.*? -/i);
                tertia_oratio += "";
                tertia_oratio = tertia_oratio.replace("2a", "3a");
                missa = missa.replace(/2a.*? -/i, "2a " + titulum_missa + " " + tertia_oratio)
              }
            laudes_post = "<li>- <red>non dicitur </red><i>Quicúmque.</i></li>" + laudes_post;
            }

          // If we need to fill in current Sunday, e.g. on Officium mensis...
          if (missa.match(/-De Dominica-/i) ) {
            dominica = ref_tempo.slice(0, -1) + '0';
            missa = missa.replace(/-De Dominica-/i, days_tempo[dominica]['vesperae']);
            }

          // In MM. maj. and higher, we get rid of 3a de S. Maria (and later all variants)
          if (winner['force'] > 70) missa = missa.replace(/3a De S\. Maria\. |3a B\..?M\..?V\. Concéde nos\.?/i, "");

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

          comm = commemoratio['vesperae_commemoratio'];
          comm = ( comm == "C1") ? "Ecce ego mitto vos. " : comm;
          comm = ( comm == "C12") ? "Beáti eritis. " : comm;
          comm = ( comm == "C2") ? "Beátur vir. " : comm;
          comm = ( comm == "C2a") ? "Iste Sanctus. " : comm;
          comm = ( comm == "C22") ? "Hic est vere Martyr. " : comm;
          comm = ( comm == "C3") ? "Isti sunt Sancti. " : comm;
          comm = ( comm == "C32") ? "Tradidérunt. " : comm;
          comm = ( comm == "C4") ? "Sacérdos et Póntifex. " : comm;
          comm = ( comm == "C42") ? "Amávit eum Dóminus. " : comm;
          comm = ( comm == "C42a") ? "Dum esset summus Póntifex. " : comm;
          comm = ( comm == "C4d") ? "O Doctor óptime. " : comm;
          comm = ( comm == "C5") ? "Iste cognóvit. " : comm;
          comm = ( comm == "C52") ? "Iste Sanctus. " : comm;
          comm = ( comm == "C6") ? "Veni, sponsa Christi. " : comm;
          comm = ( comm == "C62") ? "Quinque prudéntes Vírgines. " : comm;
          comm = ( comm == "C7") ? "Símile est... hómini. " : comm;
          comm = ( comm == "C8") ? "Pax ætérna. " : comm;
          comm = ( comm == "C82") ? "O quam metuéndus. " : comm;

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

    /// Final commemoration of B.M.V. on Festa xij. Lect. et M. and lower \\\
    laudes_bmv = " B.M.V.";
    vesperae_bmv = " B.M.V.";
    et = " &"
    et1 = " &"
    dash = " - ";
    if ( laudes == "" ) dash = "";
    if ( laudes.match("B.M.V.") ) { laudes_bmv = ""; et = "";}
    if ( winner['header'].match("B.M.V.") ) { laudes_bmv = ""; et = ""; et1 = "";}
    if ( laudes.match(/Com\./) ) et1 = " &";
    
    // Com. B.M.V. ad Laudes 
    if ( false && (winner['force'] < 41 || ref_tempo.match(/ash_1_3/)) 
      && !header.match(/Infra Oct/i) 
      && getComm(laudes) < 2 
      && !ref_sancto.match(/01_05|02_22|05_06/)) 
      // Chair of St. Peter in Antioch; S. John at Latin Gate: Suffrages are left out
      {
      laudes = laudes.replace(/(?: - )?sine Com\.?/, "");
      if ( weekday == 2 && getComm(laudes) < 1 ) laudes_bmv += " & B.\u202FB.\u202FR.";
      if ( weekday == 3 && getComm(laudes) < 1 ) laudes_bmv += " & S. Joseph";
      if ( weekday == 6 && getComm(laudes) < 1 
         && !winner['header'].match("B.M.V.")) laudes_bmv += et1 + " De Pace";
      if ( weekday == 6 && getComm(laudes) < 2 
         && winner['header'].match("B.M.V."))  laudes_bmv += et1 + " De Pace";

      if ( laudes.match("& B.M.V. ") ) laudes = laudes.replace("B.M.V. ", "B.M.V. " + laudes_bmv + " ");
      else if ( laudes.match(/Com\./) ) laudes = laudes + et + laudes_bmv;
      else laudes = laudes + dash + "Com. " + laudes_bmv;
      }


    // Com. B.M.V. ad Vesperas
    et = " &"
    dash = " - ";
    if ( vesperae == "" ) dash = "";
    if ( vesperae.match("B.M.V.") || weekday == 6) { vesperae_bmv = ""; et = "";}
    if ( weekday == 5 && winner_next['force'] < 35 && !vigilia_sabb ) { vesperae_bmv = ""; et = ""; }

    if ( false && ( winner['force'] < 41 || ref_tempo.match(/ash_1_3/)) 
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
      else if ( vesperae.match(/Com\./) && vesperae_bmv ) vesperae += " &" + vesperae_bmv;
      else if (vesperae_bmv) vesperae = vesperae + dash + "Com. " + vesperae_bmv;
      }