    ///// Workaround for First Vespers S. Familiae //////
    if ( ref_tempo.match("christmas") && i == (duration-2) ) 
      {  if ( winner['force'] > 100 ) 
          vesperae = winner['vesperae'] + " – " + 'Com. de seq. <i>Verbum caro.</i>';
          else vesperae = 'Sanctæ Familiæ: Jesu, Mariæ et Joseph <font color="red">(supple. bre. Cist. 1965)</font>'; }


        if ( ref_sancto == "everything works")
          { // beginning of former Vespers
          dash = " - ";
          dash1 = " + ";
          //et = " & ";
          if ( winner['vesperae'] == "" || vesperae == "" ) dash = ""; 
          if ( comm == "" && titulum_next == "" ) dash = ""; 
          if ( commemoratio['vesperae_commemoratio'].match(/^Com\. /) )
            { 
             if ( comm == "" ) dash = "";
             vesperae = vesperae + dash + commemoratio['vesperae_commemoratio'];
            }
          else if ( commemoratio['vesperae_commemoratio'].length > 3 && commemoratio['force'] > 35 ) { vesperae = vesperae + dash + "Com. " + titulum + et + commemoratio['vesperae_commemoratio'];}
          else if ( commemoratio['vesperae_commemoratio'].length > 3 && commemoratio['force'] <= 35 ) { vesperae = vesperae + dash + "Com. " + commemoratio['vesperae_commemoratio'];} // CHECK!!!
          else if ( commemoratio['force'] > 35) vesperae = vesperae + dash + "Com. " + titulum_next + " " + comm //+ et + comm_vesperae;
          else if ( commemoratio['force'] <= 35) vesperae = vesperae + dash + "Com. " + titulum_next + " " + comm //+ et + comm_vesperae; // CHECK!!!
          // CHECK: this is to get rid of commemorated second (!) vespers of lower feasts. I may sometimes delete first vespers, so this must be checked.

          if ( feria['vesperae'] && weekday == 6 && winner['force'] > 60 && winner == days_sancto[ref_sancto] )
            { 
              if (vesperae.match("Com\. ")) vesperae = vesperae.replace("Com.", "Com. " + feria['vesperae'] );
              else vesperae = vesperae + "Com. " + feria['vesperae'];
            }
          else if ( feria['vesperae'] && weekday == 6 && winner['force'] <= 60 && winner == days_sancto[ref_sancto] )
            { 
              if (vesperae.match("Com\. ")) vesperae = vesperae.replace("Com.", feria['vesperae'] + " - Com. " );
              else vesperae = feria['vesperae'] + "Com. " + vesperae;
            }

          ////// If tomorrow's Vespers beat today's winner //////////

          if ( winner_next['force'] > winner['force'] && weekday != 6)
            { 
            if ( commemoratio['vesperae_commemoratio'].match("^Com\. ") )
            { 
             vesperae = commemoratio['vesperae'] + " – " + winner['vesperae_commemoratio'];
            }
            else if (commemoratio['vesperae'].match(/Feria/i)) vesperae = commemoratio['vesperae']; //  + " – Com. " + winner['vesperae_commemoratio']
            else if (winner['vesperae'].match(/Fer\.|Sabb./i)) vesperae = commemoratio['vesperae'] + " – Com. " + winner['vesperae_commemoratio'];
            else vesperae = commemoratio['vesperae'] + " – Com. " 
              + winner['vesperae'] + " "  // more testing needed
              + winner['vesperae_commemoratio'];
            vesperae = vesperae.replace(/- sine Com.|sine Com./, "");

            if (vesperae.match(/Feria/i) && ref_tempo.match("lent") && winner['vesperae_commemoratio'])
             {
              vesperae = vesperae.replace(/Feria/i, feria['vesperae_commemoratio'].replace("Com. ", ""));
             }
            }
          } // end of former Vespers

    if ((weekday == 0 || weekday == 6 ) && vesperae.match(/\(Com\.\)|\(Com\. et M\.\)/)) 
      {
        if (vesperae.match(/^Com\./)) {
          all_comm_vesp = vesperae.split("&"); }
        else { vesperae_parts = vesperae.split(" - Com. "); 
        all_comm_vesp = (vesperae_parts[1] + "").split("&"); }
        // Let's push all "xij. Lect." Comms. to the end
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match("(xij. Lect. et M.)")) { 
                all_comm_vesp.splice(k,1);
                all_new_vesp.push(temp_comm); } 
            temp_comm = null; }
        // Let's push all "iij. Lect." Comms. to the end
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match("(iij. Lect. et M.)")) { 
                all_comm_vesp.splice(k,1);
                all_new_vesp.push(temp_comm); } 
            temp_comm = null; }
        // And now all "Com. et M."
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match("(Com. et M.)")) { 
                all_comm_vesp.splice(k,1);
                all_new_vesp.push(temp_comm); }
            temp_comm = null; }
        // And now all "Com."
        for (k = 0; k < all_comm_vesp.length; k++) {
            temp_comm = all_comm_vesp[k] + "";
            if (temp_comm.match("(Com.)")) { 
                all_comm_vesp.splice(k,1);
                all_new_vesp.push(temp_comm); }
            temp_comm = null; }
          vesperae = vesperae_parts[0] + " - Com. ";
        //all_comm_vesp = all_comm_vesp.concat(all_new_vesp);
        //for (k = (all_comm_vesp.length-1); k >= 0; k--)
        for (k = 0; k < all_comm_vesp.length; k++)
          {
          vesperae += 'all [' + k + ']' + all_comm_vesp[k];
          //vesperae += all_comm_vesp[k];
          if (k < all_comm_vesp.length-1) vesperae += " & ";
          }
        if (all_new_vesp) {
          if (all_comm_vesp.length > 0) vesperae += " & ";
        for (k = 0; k < all_new_vesp.length; k++)
          { 
          vesperae += 'new [' + k + ']' + all_new_vesp[k];
          //vesperae += all_new_vesp[k];
          if (k < all_new_vesp.length-1) vesperae += " & ";
          } }
      }

  
function get_ref_sancto_old(offset)
  { 
    ref_sancto_n = add_zero(month_usual_number) + month_usual_number + '_' + add_zero(day + offset) + (day + offset);

      ref_sancto_n = ref_sancto_n.replace("010", "10");

      ref_sancto_n = ( ref_sancto_n == "12_32") ? "01_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "01_32") ? "02_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "02_30" && is_leap_year(year) ) ? "03_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "02_29" && !is_leap_year(year) ) ? "03_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "03_32") ? "04_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "04_31") ? "05_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "05_32") ? "06_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "06_31") ? "07_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "07_32") ? "08_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "08_32") ? "09_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "09_31") ? "10_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "10_32") ? "11_01" : ref_sancto_n;
      ref_sancto_n = ( ref_sancto_n == "11_31") ? "12_01" : ref_sancto_n;

      return ref_sancto_n;
  }