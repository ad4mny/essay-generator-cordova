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
                        $('#display').append(
                            '<div class="row bg-white shadow-sm border rounded-3 p-1 m-1">' +
                            '<div class="col m-auto text-capitalize">' +
                            data[i].title +
                            '</div>' +
                            '<div class="col-4 text-end m-auto">' +
                            '<a type="button" class="btn btn-primary btn-sm me-1" href="outline.html?essayid=' + data[i].id + '">' +
                            '<i class="fas fa-edit fa-fw"></i>' +
                            '</a>' +
                            '<button type="button" class="btn btn-danger btn-sm delete-outline" value="' + data[i].id + '">' +
                            '<i class="fas fa-times fa-fw"></i>' +
                            '</button>' +
                            '</div>' +
                            '</div>'
                        );
                    } else {
                        $('#display').append(
                            '<div class="row bg-white shadow-sm border rounded-3 p-1 m-1">' +
                            '<div class="col m-auto text-capitalize">' +
                            data[i].title +
                            '</div>' +
                            '<div class="col-4 text-end">' +
                            '<button type="button" class="btn btn-sm">' +
                            '<i class="fas fa-check fa-fw text-success"></i>' +
                            '</button>' +
                            '</div>' +
                            '</div>'
                        );
                    }
                }
            } else {
                $('#display').append(
                    '<div class="row bg-white shadow-sm border rounded-3 p-1 m-1">' +
                    '<div class="col m-auto ">' +
                    '<p class="text-muted mb-0">No essays submissions has been found for this group.</p>'+
                    '</div>' +
                    '</div>'
                );
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

$('body').on('click', '.delete-outline', function (e) {

    var essayid = this.getAttribute("value");

    $.ajax({
        type: "POST",
        url: webURL + "api/delete_outline",
        data: {
            essayid: essayid
        },
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {
            location.reload();
        },
        error: function () {
            $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }

    });

});