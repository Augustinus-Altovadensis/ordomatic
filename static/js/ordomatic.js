$(document).ready(function () {
  // Display the year of the current liturgical year in the select_year:
  var today = new Date();
  var year = today.getFullYear();
  var christmas = new Date(year, 11, 25);
  var christmas_weekday = christmas.getDay();
  var first_sunday_advent = new Date(christmas - (christmas_weekday + (21 * 24 * 3600 * 1000)));
  if (today > first_sunday_advent) {
    year += 1;
  }
  $('#select_year').val(year);
  $('#select_year').change(function () {
    console.log($(this).val());
  });
});
