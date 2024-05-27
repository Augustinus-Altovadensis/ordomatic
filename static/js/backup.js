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
