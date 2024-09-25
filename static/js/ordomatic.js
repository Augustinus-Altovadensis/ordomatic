$(document).ready(function () {
  // On loading, display the liturgical year of today in the select_year:
  const today = new Date();
  var year = today.getFullYear();
  var christmas = get_christmas_date(year);
  var christmas_weekday = get_christmas_weekday(christmas);
  var first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
  var select_display_format = document.getElementById('display_format');
  if (today > first_sunday_of_advent) {
    year += 1;
  }
  $('#select_year').val(year);
  var display_form = select_display_format.options[select_display_format.selectedIndex].text;
  $('#display_format').val("display");
  refresh_ordo(year, display_form);
});

// On selecting a new year, refresh the ordo:
$('#select_year').change(function () {
  refresh_ordo($(this).val(), display_format);
});

// On selecting a new format, refresh the ordo:
$('#display_format').change(function () {
  select_display_format = document.getElementById('display_format');
  display_format = select_display_format.options[select_display_format.selectedIndex].value;
  refresh_ordo(year, display_format);
});

