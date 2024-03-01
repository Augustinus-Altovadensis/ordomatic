// Find and replace:

function replace() {
  // Cyclus liturgicus (=> <Title>):
  cyclus = ['C', 'A', 'B'][year % 3];
  $('#cyclus').html(cyclus);

  // Sanctum Pascha (=> <Title>):
  easter_month = month_human_readable_genitive(easter.getMonth());
  $('#pascha').html(easter.getDate() + ' ' + easter_month);

  // Explicit annus liturgicus (=> <pa_34_6>)
  $('#explicit').html(year);
}

function addtags(winner) {
    ///////////////////////////////////////////////
    ///// Replacement section (HTML tags) /////////
    ///////////////////////////////////////////////
    winner = winner.replace(/B.M.V.|B. M. V./, 'B. M. V.');
    winner = winner.replace(/S\.P\.N\.|S\. P\. N\./, 'S. P. N.');
    winner = winner.replace(/O\.N\.|O\. N\./, 'O. N.');
    winner = winner.replace("sine Com.", 'sine <font color="green"><b><del>Com.</del></b></font> ');
    winner = winner.replace("Com.", '<font color="green"><b>Com.</b></font> ');
    winner = winner.replaceAll("Comme.", '<font color="blue"><b>Comme.</b></font> ');
    winner = winner.replace("sine Glo.", 'sine <del>Glo.</del>');
    //winner = winner.replace("&", '<font color="green"><b>&</b></font> ');
    winner = winner.replace("2a ", '2<sup>a</sup> ');
    winner = winner.replace("3a ", '3<sup>a</sup> ');
    winner = winner.replaceAll('Aña\.', '<font color="red">Aña.</font>');
    winner = winner.replaceAll("Aña ", '<font color="red">Aña.</font> ');
    winner = winner.replaceAll("Dicitur", '<font color="red">Dicitur</font> ');
    winner = winner.replace("⇓", '<font color="red">⇓</font>');
    winner = winner.replace("(Ex Processionale Cisterciense)", '<font color="red">(Ex Processionale Cisterciense)</font>');
    winner = winner.replace(/℟. maj.|R. maj./, '<font color="red">℟. maj.</font>');
    winner = winner.replace("(in „Schaller“ etiam)", '<font color="red">(in „Schaller“ etiam)</font>');
    winner = winner.replace("xx", '<font color="red">xx</font>');
    winner = winner.replace("xx", '<font color="red">xx</font>');
    winner = winner.replace("xx", '<font color="red">xx</font>');
    winner = winner.replace("xx", '<font color="red">xx</font>');
    winner = winner.replace("xx", '<font color="red">xx</font>');
    winner = winner.replace("xx", '<font color="red">xx</font>');
    //winner = winner.replace("✠", '<font color="red">✠</font>');
    winner = winner.replaceAll("*", '<font color="red">*</font>');
    winner = winner.replaceAll("§", '<font color="red">§</font>');
    winner = winner.replace("Oratio.", '<font color="red"><b>Oratio.</b></font>');
    winner = winner.replaceAll("(supplementum bre. Cist. 1965)", '<font color="red">(supplementum bre. Cist. 1965)</font>');
    winner = winner.replaceAll("(suppl. brev. Cist. 1965)", '<font color="red">(suppl. brev. Cist. 1965)</font>');
    winner = winner.replace("et ℟.", '<font color="red">et ℟.</font>');
    winner = winner.replace("Processio sollemnissima cum pluviali et dalmaticis", '<font color="red">Processio sollemnissima cum pluviali et dalmaticis</font>');
    winner = winner.replace(/Duo Acolythi\. |Duo Acolythi /, '<font color="red">Duo Acolythi. </font>');
    winner = winner.replace(/Cum incenso ad [oO]blata\. |Cum incenso ad [oO]blata /, '<font color="red">Cum incenso ad oblata. </font>');
    winner = winner.replace("de Officio diei", '<font color="red">de Officio diei</font>');
    winner = winner.replace("Hymnus, in quo dicitur:", '<font color="red">Hymnus, in quo dicitur:</font> ');
    winner = winner.replace("Sub tuum", '<i><b>Sub tuum</i></b>');
    winner = winner.replace("Asperges", '<i><b>Asperges</i></b>');
    winner = winner.replace("Qui vult", '<i><b>Qui vult</i></b>');
    winner = winner.replace("O Doctor óptime", '<i><b>O Doctor óptime</i></b>');
    winner = winner.replace("O Doctor", '<i><b>O Doctor</i></b>');
    winner = winner.replace("Beátus vir", '<i><b>Beátus vir</i></b>');
    winner = winner.replace("Iste cognovit", '<i><b>Iste cognóvit</i></b>');
    winner = winner.replace("Iste cognóvit", '<i><b>Iste cognóvit</i></b>');
    winner = winner.replace("Ecclesiae", '<i><b>Ecclesiae</i></b>');
    winner = winner.replace("Sancte Paule", '<i><b>Sancte Paule</i></b>');
    winner = winner.replace("Veni, sponsa Christi", '<i><b>Veni, sponsa Christi</i></b>');
    winner = winner.replace("Veni sponsa", '<i><b>Veni sponsa</i></b>');
    winner = winner.replace("Símile est ... sagénæ", '<i><b>Símile est … sagénæ</i></b>');
    winner = winner.replace("Sacérdos et Póntifex", '<i><b>Sacérdos et Póntifex</i></b>');
    winner = winner.replace("Hac die ... suprémos", '<i><b>Hac die … suprémos</i></b>');
    winner = winner.replace("Isti sunt duæ", '<i><b>Isti sunt duæ</i></b>');
    winner = winner.replace("Isti sunt Sancti", '<i><b>Isti sunt Sancti</i></b>');
    winner = winner.replace("Isti sunt", '<i><b>Isti sunt</i></b>');
    winner = winner.replace("Iste Sanctus pro lege", '<i><b>Iste Sanctus pro lege</i></b>');
    winner = winner.replace(/Iste [Ss]anctus/, '<i><b>Iste Sanctus</i></b>');
    winner = winner.replace("Euge, serve bone", '<i><b>Euge, serve bone</i></b>');
    winner = winner.replace("Euge", '<i><b>Euge</i></b>');
    winner = winner.replace("Dum stetéritis", '<i><b>Dum stetéritis</i></b>');
    winner = winner.replace("Amávit eum Dóminus", '<i><b>Amávit eum Dóminus</i></b>');
    winner = winner.replace("Amávit eum", '<i><b>Amávit eum</i></b>');
    winner = winner.replace("Ecce ego mitto vos", '<i><b>Ecce ego mitto vos</i></b>');
    winner = winner.replace("Beáti eritis", '<i><b>Beáti eritis</i></b>');
    winner = winner.replace("Hic est vere Martyr", '<i><b>Hic est vere Martyr</i></b>');
    winner = winner.replace("Tradidérunt", '<i><b>Tradidérunt</i></b>');
    winner = winner.replace("Similábo eum", '<i><b>Similábo eum</i></b>');
    winner = winner.replace("Quinque prudéntes Vírgines", '<i><b>Quinque prudéntes Vírgines</i></b>');
    winner = winner.replace("Quinque prudéntes", '<i><b>Quinque prudéntes</i></b>');
    winner = winner.replace("Símile est ... hómini", '<i><b>Símile est … hómini</i></b>');
    winner = winner.replace("Pax ætérna", '<i><b>Pax ætérna</i></b>');
    winner = winner.replace("O quam metuéndus", '<i><b>O quam metuéndus</i></b>');
    winner = winner.replace("Zachæe", '<i><b>Zachæe</i></b>');
    winner = winner.replaceAll(" -", " –");
    winner = winner.replaceAll(" –", " –");
    winner = winner.replaceAll("-", '<i><b>–</i></b>'); // separator replaced by dash
    winner = winner.replace(/Communic[aá]ntes/, '<i><b>Communicántes</i></b>');
    winner = winner.replace("– –", "–");
    winner = winner.replace("- -", "–");
    winner = winner.replace(/℟\. maj\.|R\. maj\./, "℟. maj.");
    winner = winner.replace("Qui odit", '<i><b>Qui odit</i></b>');
    winner = winner.replace("Laudémus virum", '<i><b>Laudémus virum</i></b>');
    winner = winner.replace("Terríbilis", '<i><b>Terríbilis</i></b>');
    winner = winner.replace("xxx", '<i><b>xxx</i></b>');
    winner = winner.replace("xxx", '<i><b>xxx</i></b>');
    winner = winner.replace("xxx", '<i><b>xxx</i></b>');
    winner = winner.replace("xxx", '<i><b>xxx</i></b>');
    winner = winner.replace("xxx", '<i><b>xxx</i></b>');
    winner = winner.replace('<ib>', '<i><b>');
    winner = winner.replace('</ib>', '</i></b>');
    winner = winner.replace('<bi>', '<i><b>');
    winner = winner.replace('</bi>', '</i></b>');
    winner = winner.replace('<red>', '<font color="red">');
    winner = winner.replace('<blue>', '<font color="blue">');
    winner = winner.replace('</red>', '</font>');
    winner = winner.replace('</blue>', '</font>');
    winner = winner.replace('</f>', '</font>');
    return winner;
}
