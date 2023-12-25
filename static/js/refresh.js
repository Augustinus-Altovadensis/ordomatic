function refresh_ordo(year) {
    $('#content').html('');
    const christmas = get_christmas_date(year - 1);
    const christmas_weekday = get_christmas_weekday(christmas);
    const first_sunday_of_advent = get_first_sunday_of_advent(christmas, christmas_weekday);
    const advent_duration = 21 + christmas_weekday;

    // Title:
    $('#content').append(
        '<div class="title text-center orange w-100"> Ordo ' + first_sunday_of_advent.getFullYear() + '-' + (first_sunday_of_advent.getFullYear() + 1) + '</div>'
    );

    // Year:
    $('#content').append(
        '<div class="year text-center fw-bold blue w-100 p-1">' + first_sunday_of_advent.getFullYear() + '</div>'
    );

    // Month:
    $('#content').append(
        '<div class="month text-center fw-bold green w-100 mb-3 p-1">' + month_human_readable(first_sunday_of_advent.getMonth()) + '</div>'
    );

    // Advent:
    for (let i = 0; i < advent_duration; i++) {
        const date = new Date(first_sunday_of_advent.getTime() + (i * 24 * 3600 * 1000));
        const day = date.getDate();
        let zero = '';
        if (day < 10) {
            zero = '0';
        }
        const weekday = date.getDay();
        const month = date.getMonth() + 1;
        const ref_tempo = 'adv_' + Math.ceil((i + 1) / 7) + '_' + (i % 7);
        let winner = days_tempo[ref_tempo];
        const ref_sancto = month + '_' + zero + day;
        if (days_sancto[ref_sancto] && days_sancto[ref_sancto]['force'] > days_tempo[ref_tempo]['force']) {
            winner = days_sancto[ref_sancto];
        }
        $('#content').append(element(
            day,
            weekday,
            winner['hat'],
            winner['color'],
            winner['header'],
            winner['body'],
        )
        );
    }
}
