var submitTitle = function () {

    var title = $("#title").val();
    var email = $("#email").val();

    $.ajax({
        type: "POST",
        url: webURL + "api/submit_title",
        data: {
            userid: token.id,
            title: title,
            email: email
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {
            if (data != false) {
                location.replace('submission.html');
            } else {
                alert('Failed to submit email title, please join a group.');
            }
        },
        error: function () {
            $('#info_box').append('<div class="row">' +
                '<div class="col">' +
                '<p class="my-3 text-muted">Internal server error, please reload.</p>' +
                '</div>' +
                '</div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }
    });

};