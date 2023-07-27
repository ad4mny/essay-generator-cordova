window.addEventListener('load', (event) => {

    var parameter = new URLSearchParams(window.location.search);
    var essayid = parameter.get('essayid');

    $('#update_intro_btn').html('<a href="vocabulary_list.html?essayid=' + essayid + '&paragraph=1" class="btn btn-secondary btn-sm">Update Introduction</a>');

    $('#update_body_btn').html('<a href="vocabulary_list.html?essayid=' + essayid + '&paragraph=2" class="btn btn-secondary btn-sm">Update Body</a>');

    $('#update_conclusion_btn').html('<a href="vocabulary_list.html?essayid=' + essayid + '&paragraph=3" class="btn btn-secondary btn-sm">Update Conclusion</a>');

    $.ajax({
        type: "POST",
        url: webURL + "api/get_outline",
        data: {
            essayid: essayid
        },
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {

            if (data != false) {
                localStorage.setItem('outline', JSON.stringify(data));

                for (var i = 0; i < data.length; i++) {
                    if (data[i].paragraph == 1) {
                        $('#email_introduction').append(
                            '<span class="col-auto btn border p-2 rounded-4 text-left">' +
                            data[i].word +
                            '</span>'
                        );
                    }
                    else if (data[i].paragraph == 2) {
                        $('#email_body').append(
                            '<span class="col-auto btn border p-2 rounded-4 text-left">' +
                            data[i].word +
                            '</span>'
                        );
                    }
                    else {
                        $('#email_conclusion').append(
                            '<span class="col-auto btn border p-2 rounded-4 text-left">' +
                            data[i].word +
                            '</span>'
                        );
                    }
                }
            } else {
                $('#email_introduction').html('<div class="p-3 text-muted"> No introduction outline yet.</div>');
                $('#email_body').html('<div class="p-3 text-muted"> No body outline yet.</div>');
                $('#email_conclusion').html('<div class="p-3 text-muted"> No conclusion outline yet.</div>');
                localStorage.removeItem('outline');
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

var submitOutline = function () {

    var parameter = new URLSearchParams(window.location.search)
    var essayid = parameter.get('essayid');

    if (essayid != null) {

        $.ajax({
            type: "POST",
            url: webURL + "api/submit_outline",
            data: {
                essayid: essayid
            },
            dataType: 'json',
            beforeSend: function () {
                $('#load_gif').show();
            },
            success: function (data) {
                location.replace('submission.html');
            },
            error: function () {
                $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#load_gif').hide();
            }

        });

    } else {
        alert('Please select atleast one word to continue.')
    }
}