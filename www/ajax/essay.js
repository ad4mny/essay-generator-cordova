var essayid = '';

window.addEventListener('load', (event) => {

    var parameter = new URLSearchParams(window.location.search);
    essayid = parameter.get('essayid');

    $.ajax({
        type: "POST",
        url: webURL + "api/view_outline",
        data: {
            essayid: essayid
        },
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {
            if (data != false) {

                var first_word = true;
                var previous_word = '';

                // loop for intro outline
                $.each(data.intro, function (key, value) {
                    if (first_word) {
                        $('#email_introduction').append(value.word);
                        first_word = false;
                    } else {
                        if (previous_word === '.')
                            $('#email_introduction').append(' ' + value.word);
                        else if (value.word === '.' || value.word === ',')
                            $('#email_introduction').append(value.word.toLowerCase());
                        else
                            $('#email_introduction').append(' ' + value.word.toLowerCase());
                    }
                    previous_word = value.word;
                });

                first_word = true;
                previous_word = '';

                // loop for body outline
                $.each(data.body, function (key, value) {
                    if (first_word) {
                        $('#email_body').append(value.word);
                        first_word = false;
                    } else {
                        if (previous_word === '.')
                            $('#email_body').append(' ' + value.word);
                        else if (value.word === '.' || value.word === ',')
                            $('#email_body').append(value.word.toLowerCase());
                        else
                            $('#email_body').append(' ' + value.word.toLowerCase());
                    }
                    previous_word = value.word;
                });

                first_word = true;
                previous_word = '';

                // loop for body outline
                $.each(data.conclusion, function (key, value) {
                    if (first_word) {
                        $('#email_conclusion').append(value.word);
                        first_word = false;
                    } else {
                        if (previous_word === '.')
                            $('#email_conclusion').append(' ' + value.word);
                        else if (value.word === '.' || value.word === ',')
                            $('#email_conclusion').append(value.word.toLowerCase());
                        else
                            $('#email_conclusion').append(' ' + value.word.toLowerCase());
                    }
                    previous_word = value.word;
                });
            } else {
                $('#email_introduction').html('<p class="text-muted">No introduction outline found.</p>');
                $('#email_body').html('<p class="text-muted">No body outline found.</p>');
                $('#email_conclusion').html('<p class="text-muted">No conclusion outline found.</p>');
            }
        },
        error: function () {
            $('#info_box').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }

    });

});

var back = function () {
    localStorage.removeItem('vocab');
    location.replace('submission.html');
}