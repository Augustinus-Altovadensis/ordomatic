function refresh_ordo(year) {
    $('#content').html('');
    const christmas = get_christmas_date(year - 1);
    const christmas_weekday = get_christmas_weekday(christmas);
    const first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
    const advent_duration = 21 + christmas_weekday;

    // Title:
    $('#content').append(
        '<div class="title"> Ordo ' + first_sunday_of_advent.getFullYear() + '-' + (first_sunday_of_advent.getFullYear() + 1) + '</div>'
    );

    // Year:
    $('#content').append(
        '<div class="year">' + first_sunday_of_advent.getFullYear() + '</div>'
    );

    // Month:
    $('#content').append(
        '<div class="month">' + month_human_readable(first_sunday_of_advent.getMonth()) + '</div>'
    );

    // Advent:
    for (let i = 0; i < advent_duration; i++) {
        const date = new Date(first_sunday_of_advent.getTime() + (i * 24 * 3600 * 1000));
        const day = date.getDate();
        const weekday = date.getDay();
        const ref = 'adv_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
        console.log(ref);
        $('#content').append(element(
            day,
            weekday,
            days[ref]['hat'],
            days[ref]['color'],
            days[ref]['header'],
            days[ref]['body'],
        )
        );
    }
}
