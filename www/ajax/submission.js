window.addEventListener('load', (event) => {

    $.ajax({
        type: "POST",
        url: webURL + "api/get_submission",
        data: {
            userid: token.id
        },
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {

            if (data != false) {
                for (var i = 0; i < data.length; i++) {

                    if (data[i].status != "Submitted") {
                        var links = '<a class="card shadow-sm border rounded-3 p-2 mb-2 mx-2 text-decoration-none  text-danger" href="outline.html?essayid=' + data[i].id + '"> ' +
                            data[i].title +
                            '</a>';
                    } else {
                        var links = '<span class="card shadow-sm border rounded-3 p-2 mb-2 mx-2 text-decoration-none text-success"> ' +
                            data[i].title +
                            '</span>';
                    }

                    $('#essay_list').append(
                        '<div class="row">' +
                        '<div class="col">' +
                        links +
                        '</div>' +
                        '</div>'
                    );
                }
            } else {

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