   
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

