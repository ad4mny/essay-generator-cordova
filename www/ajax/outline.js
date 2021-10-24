window.addEventListener('load', (event) => {

    var parameter = new URLSearchParams(window.location.search);
    var essayid = parameter.get('essayid');

    $('#update_intro_btn').html('<a href="vocabulary_list.html?essayid=' + essayid + '&paragraph=1" class="btn btn-secondary">Update Introduction</a>');

    $('#update_body_btn').html('<a href="vocabulary_list.html?essayid=' + essayid + '&paragraph=2" class="btn btn-secondary">Update Body</a>');

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
            console.log(data);
            if (data != false) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].paragraph == 1) {
                        $('#introduction').append('<span class="col-auto btn border m-1">' +
                            data[i].word +
                            '</span>');
                    } else {
                        $('#email_body').append('<span class="col-auto btn border m-1">' +
                            data[i].word +
                            '</span>');
                    }

                }
            } else {
                $('#introduction').html('<p class="text-muted">No essay outline yet.</p>');
                $('#email_body').html('<p class="text-muted">No essay outline yet.</p>');
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

var submit = function () {

    var data = JSON.parse(localStorage.getItem('vocab'));
    var parameter = new URLSearchParams(window.location.search)
    var essayid = parameter.get('essayid');

    if (data != null) {

        $.ajax({
            type: "POST",
            url: webURL + "api/set_vocabulary",
            data: {
                essayid: essayid,
                data: data
            },
            dataType: 'json',
            beforeSend: function () {
                $('#load_gif').show();
            },
            success: function (data) {
                console.log(data);
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