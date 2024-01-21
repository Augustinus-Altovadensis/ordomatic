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
