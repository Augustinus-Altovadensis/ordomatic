// Find and replace:

function replace() {
  var year = Number.parseInt($('#year').text());

  // Cyclus liturgicus (=> <Title>):
  var cyclus = ['C', 'A', 'B'][year % 3];
  $('#cyclus').html(cyclus);

  // Sanctum Pascha (=> <Title>):
  var date_pascha = get_easter_date(year);
  var month_pascha = month_human_readable_genitive(date_pascha.getMonth());
  $('#pascha').html(date_pascha.getDate() + ' ' + month_pascha);

  // Explicit annus liturgicus (=> <pa_34_6>)
  $('#explicit').html(year);
}
