$(document).ready(function () {
  // On loading, display the liturgical year of today in the select_year:
  const today = new Date();
  var year = today.getFullYear();
  var christmas = get_christmas_date(year);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  if (today > first_sunday_of_advent) {
    year += 1;
  }
  $('#select_year').val(year);
  refresh_ordo(year);

  // On selecting a new year, refresh the ordo:
  $('#select_year').change(function () {
    refresh_ordo($(this).val());
  });
});
