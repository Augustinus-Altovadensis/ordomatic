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
    winner = winner.replace("-date-", day + ". " + month_usual_number + ".");

    winner = winner.replace(/B.M.V.|B. M. V./, 'B. M. V.');
    winner = winner.replace(/S\.P\.N\.|S\. P\. N\./, 'S. P. N.');
    winner = winner.replace(/O\.N\.|O\. N\./, 'O. N.');
    winner = winner.replace("sine Com.", '<font color="green"><s>Com.</s></font>');
    //winner = winner.replace(/^Com\./, '<font color="green"><b>Com.</b></font> ');
    winner = winner.replace(/Com\. /, '<font color="green">Com.</font> ');
    winner = winner.replace(/Com\.- /, 'Com. ');
    winner = winner.replaceAll("Comme.", '<font color="blue"><b>Comme.</b></font> ');
    // Maybe the "sine" word will be removed
    winner = winner.replace("sine Glo.", '<s>Glo.</s>');
    winner = winner.replace("sine Cre.", '<s>Cre.</s>');
    // Following will be switched off probably
    //winner = winner.replace("&", '<font color="green"><b>&</b></font> ');
    winner = winner.replace("&.", '&');
    winner = winner.replace(/2a Eccl[eé]si(ae|æ) /, '2a <i>Ecclésiæ</i> ');
    winner = winner.replace(/3a Eccl[eé]si(ae|æ) /, '3a <i>Ecclésiæ</i> ');
    winner = winner.replaceAll("1a ", '1<sup>a</sup> ');
    winner = winner.replaceAll("1o ", '1<sup>o</sup> ');
    winner = winner.replaceAll("2a ", '2<sup>a</sup> ');
    winner = winner.replaceAll("2o ", '2<sup>o</sup> ');
    winner = winner.replaceAll("3a ", '3<sup>a</sup> ');
    winner = winner.replaceAll("4a ", '4<sup>a</sup> ');
    winner = winner.replaceAll("Dicitur", '<font color="red">Dicitur</font> ');
    winner = winner.replace("⇓", '<font color="red">⇓</font>');
    winner = winner.replace("(Ex Processionale Cisterciense)", '<font color="red">(Ex Processionale Cisterciense)</font>');
    winner = winner.replace(/[℟R]\. maj\./, '<font color="red"><b>℟. maj.</b></font>');
    winner = winner.replace("(in „Schaller“ etiam)", '<font color="red">(in „Schaller“ etiam)</font>');
    winner = winner.replace(/In fine Evangelium feriae./i, '<font color="red">In fine Evangelium Feriae.</font>');
    winner = winner.replace(/In fine Miss(æ|ae) Evangelium feri(æ|ae)./i, '<font color="red">In fine Missæ Evangelium Feriae.</font>');
    winner = winner.replace(/non dicitur\./, '<font color="red">non dicitur.</font>');
    winner = winner.replaceAll("℣. ", '<font color="red"><b>℣.</b></font> ');
    winner = winner.replaceAll("℟. ", '<font color="red">℟.</font> ');
    //winner = winner.replaceAll(/Aña\. |Aña /, '<font color="red">Aña.</font> ');
    //winner = winner.replace("Magn.", '<font color="red">Magn.</font>');
    //winner = winner.replace("Mag.", '<font color="red">Mag.</font>');
    //winner = winner.replace("Ben.", '<font color="red">Ben.</font>');
    //winner = winner.replace("ad libitum", '<font color="red">ad libitum</font>');
    winner = winner.replace("in Hymno", '<font color="red">in Hymno</font>');
    winner = winner.replace("-xx", '<font color="red">xx</font>');
    winner = winner.replace("-xx", '<font color="red">xx</font>');
    winner = winner.replace("-xx", '<font color="red">xx</font>');
    winner = winner.replace("-xx", '<font color="red">xx</font>');
    winner = winner.replace("-xx", '<font color="red">xx</font>');
    //winner = winner.replace("✠", '<font color="red">✠</font>');
    winner = winner.replaceAll("*", '<font color="red">*</font>');
    winner = winner.replaceAll("§", '<font color="red">§</font>');
    winner = winner.replace("Oratio.", '<font color="red"><b>Oratio.</b></font>');
    winner = winner.replace("cum Ora.", '<font color="red">cum Ora.</font>');
    winner = winner.replaceAll("(supplementum bre. Cist. 1965)", '<font color="red">(supplementum bre. Cist. 1965)</font>');
    winner = winner.replaceAll("(suppl. brev. Cist. 1965)", '<font color="red">(suppl. brev. Cist. 1965)</font>');
    winner = winner.replaceAll("(Suppl. brev. Cist. 1965)", '<font color="red">(Suppl. brev. Cist. 1965)</font>');
    winner = winner.replace("et ℟.", '<font color="red">et ℟.</font>');
    winner = winner.replace("Processio sollemnissima cum pluviali et dalmaticis", '<font color="red">Processio sollemnissima cum pluviali et dalmaticis</font>');
    winner = winner.replace("Processio cum pluviali et", '<font color="red">Processio cum pluviali et</font>');
    winner = winner.replace("Processio et", '<font color="red">Processio et</font>');
    winner = winner.replace("Processio per Claustrum", '<font color="red">Processio per Claustrum</font>');
    winner = winner.replace("Processio ", '<font color="red">Processio</font> ');
    winner = winner.replace(/Duo Acolythi\. |Duo Acolythi /, '<font color="red">Duo Acolythi. </font>');
    winner = winner.replace(/Cum incenso ad [oO]blata\. |Cum incenso ad [oO]blata /, '<font color="red">Cum incenso ad oblata. </font>');
    winner = winner.replace("de Officio diei", '<font color="red">de Officio diei</font>');
    winner = winner.replace("Hymnus, in quo dicitur:", '<font color="red">Hymnus, in quo dicitur:</font> ');
    winner = winner.replace(/Aña Sub tuum|Aña. Sub tuum/, '<font color="red">Aña.</font> <i>Sub tuum</i>');
    winner = winner.replace("Sub tuum", '<i>Sub tuum</i>');
    winner = winner.replace("Asperges", '<i>Asperges</i>');
    winner = winner.replace(/Qui vult ven[ií]re/, '<i>Qui vult veníre</i>');
    winner = winner.replace("Qui vult", '<i>Qui vult</i>');
    winner = winner.replace("O Doctor óptime", '<i>O Doctor óptime</i>');
    winner = winner.replace(/O Doctor/i, '<i>O Doctor</i>');
    winner = winner.replace(/Be[áa]tus vir, qui m[eé]tuit/, '<i>Beátus vir, qui métuit</i>');
    winner = winner.replace("Beátus vir", '<i>Beátus vir</i>');
    winner = winner.replace("Qui manet in me", '<i>Qui manet in me</i>');
    winner = winner.replace(/Fulg[eé]bunt [ij]usti/, '<i>Fulgébunt justi</i>');
    winner = winner.replace(/Fulg[eé]bunt/, '<i>Fulgébunt</i>');
    winner = winner.replace(/Iste cogn[óo]vit/, '<i>Iste cognóvit</i>');
    //winner = winner.replace(/Eccl[eé]si(ae|æ) /, '<i>Ecclésiæ</i> ');
    winner = winner.replace("Sancte Paule", '<i>Sancte Paule</i>');
    winner = winner.replace(/Veni(, | )sponsa Christi/i, '<i>Veni, sponsa Christi</i>');
    winner = winner.replace("Veni sponsa", '<i>Veni sponsa</i>');
    winner = winner.replace("Veni, sponsa", '<i>Veni, sponsa</i>');
    winner = winner.replace(/S[íi]mile est ?\.\.\. ?sag[ée]n(æ|ae)/, '<i>Símile est… sagénæ</i>');
    winner = winner.replace(/Sac[ée]rdos et P[óo]ntifex/, '<i>Sacérdos et Póntifex</i>');
    winner = winner.replace("Hac die ... suprémos", '<i>Hac die … suprémos</i>');
    winner = winner.replace("Isti sunt duæ", '<i>Isti sunt duæ</i>');
    winner = winner.replace("Isti sunt Sancti", '<i>Isti sunt Sancti</i>');
    winner = winner.replace("Isti sunt", '<i>Isti sunt</i>');
    winner = winner.replace("Iste Sanctus pro lege", '<i>Iste Sanctus pro lege</i>');
    winner = winner.replace(/Iste [Ss]anctus digne/, '<i>Iste Sanctus digne</i>');
    winner = winner.replace(/Iste [Ss]anctus/, '<i>Iste Sanctus</i>');
    winner = winner.replace(/Euge,? serve bone/, '<i>Euge serve bone</i>');
    winner = winner.replace(/Euge,? serve/, '<i>Euge serve</i>');
    winner = winner.replace(/Euge\.? /, '<i>Euge</i> ');
    winner = winner.replace("Dum stetéritis", '<i>Dum stetéritis</i>');
    winner = winner.replace("Amávit eum Dóminus", '<i>Amávit eum Dóminus</i>');
    winner = winner.replace("Amávit eum", '<i>Amávit eum</i>');
    winner = winner.replace("Ecce ego mitto vos", '<i>Ecce ego mitto vos</i>');
    winner = winner.replace("Beáti eritis", '<i>Beáti eritis</i>');
    winner = winner.replace("Hic est vere Martyr", '<i>Hic est vere Martyr</i>');
    winner = winner.replace("Tradidérunt", '<i>Tradidérunt</i>');
    winner = winner.replace("Similábo eum", '<i>Similábo eum</i>');
    winner = winner.replace("Quinque prudéntes Vírgines", '<i>Quinque prudéntes Vírgines</i>');
    winner = winner.replace("Quinque prudéntes", '<i>Quinque prudéntes</i>');
    winner = winner.replace(/S[íi]mile est ?\.\.\. hómini/, '<i>Símile est… hómini</i>');
    winner = winner.replace("Pax ætérna", '<i>Pax ætérna</i>');
    winner = winner.replace("O quam metuéndus", '<i>O quam metuéndus</i>');
    winner = winner.replace("Zachæe", '<i>Zachæe</i>');
    winner = winner.replaceAll("S. ", "S. ");
    winner = winner.replaceAll(" -", " –");
    winner = winner.replaceAll(" –", " –");
    winner = winner.replaceAll("-", '<i>–</i>'); // separator replaced by dash
    winner = winner.replace(/Communic[aá]ntes/, '<i>Communicántes</i>');
    winner = winner.replace("– –", "–");
    winner = winner.replace("- -", "–");
    winner = winner.replace(/℟\. maj\.|R\. maj\./, "℟. maj.");
    winner = winner.replace("Qui odit", '<i>Qui odit</i>');
    winner = winner.replace("Laudémus virum", '<i>Laudémus virum</i>');
    winner = winner.replace("Terríbilis", '<i>Terríbilis</i>');
    winner = winner.replace("A cunctis", '<i>A cunctis</i>');
    winner = winner.replace(/Deus qui de be(a|á)t(æ|ae)/, '<i>Deus qui de beátæ</i>');
    winner = winner.replace(/Omn[ií]potens/, '<i>Omnípotens</i>');
    winner = winner.replace("Benedicámus Dómino, Deo grátias.", '<i><font color="red">B</font>enedicámus Dómino, <font color="red">D</font>eo grátias.</i>');
    winner = winner.replace("Hanc ígitur", '<i>Hanc ígitur</i>');
    winner = winner.replace(/Conc[ée]de nos/, '<i>Concéde nos</i>');
    winner = winner.replace("Vidi aquam", '<i>Vidi aquam</i>');
    winner = winner.replace(/F[íi]li(æ|ae) Jer[úu]salem/, '<i>Fíliæ Jerúsalem</i>');
    winner = winner.replace(/Lux perp[ée]tua/, '<i>Lux perpétua</i>');
    winner = winner.replace("xxx", '<i>xxx</i>');
    winner = winner.replace("xxx", '<i>xxx</i>');
    winner = winner.replace("xxx", '<i>xxx</i>');
    winner = winner.replace("xxx", '<i>xxx</i>');
    winner = winner.replace("xxx", '<i>xxx</i>');
    winner = winner.replace("xxx", '<i>xxx</i>');
    winner = winner.replace("xxx", '<i>xxx</i>');
    winner = winner.replace("in Miss. Conv.:", '<u>in Miss. Conv.:</u>');
    winner = winner.replace("in Miss. Priv.:", '<u>in Miss. Conv.:</u>');
    winner = winner.replaceAll('<ib>', '<i><b>');
    winner = winner.replaceAll('</ib>', '</i></b>');
    winner = winner.replaceAll('<bi>', '<i><b>');
    winner = winner.replaceAll('</bi>', '</i></b>');
    winner = winner.replaceAll('<red>', '<font color="red">');
    winner = winner.replaceAll('<blue>', '<font color="blue">');
    winner = winner.replaceAll('</red>', '</font>');
    winner = winner.replaceAll('</blue>', '</font>');
    winner = winner.replaceAll('</f>', '</font>');

    return winner;
}
