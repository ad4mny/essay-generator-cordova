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
            if (data != false)
                for (var i = 0; i < data.length; i++) {
                    if (data[i].status != "Submitted") {
                        $('#display').append(
                            '<div class="row bg-white shadow-sm border rounded-3 m-1">' +
                            '<div class="col-12 pt-2 text-capitalize d-flex justify-content-between">' +
                            '<small class="text-muted">Title</small>' +
                            '<small class="text-muted">Email ' + data[i].type + '</small>' +
                            '</div>' +
                            '<div class="col-12 m-auto pb-2 text-capitalize">' +
                            '<h6 class="mb-0">' + data[i].title + '</h6>' +
                            '</div>' +
                            '<div class="col-6 text-center border-top border-end">' +
                            '<a href="outline.html?essayid=' + data[i].id + '" type="button" class="btn text-primary btn-sm me-1">' +
                            '<small><i class="fas fa-edit fa-fw"></i> Update</small>' +
                            '</a>' +
                            '</div>' +
                            '<div class="col-6 text-center border-top">' +
                            '<button class="btn text-danger btn-sm delete-outline" value="' + data[i].id + '">' +
                            '<small><i class="fas fa-trash-alt fa-fw"></i> Remove</small>' +
                            '</button>' +
                            '</div>' +
                            '</div>'
                        );
                    } else {
                        $('#display').append(
                            '<div class="row bg-white shadow-sm border rounded-3 m-1">' +
                            '<div class="col-12 pt-2 text-capitalize d-flex justify-content-between">' +
                            '<small class="text-muted">Title</small>' +
                            '<small class="text-muted">Email ' + data[i].type + '</small>' +
                            '</div>' +
                            '<div class="col-12 m-auto text-capitalize py-2">' +
                            '<h6 class="mb-0">' + data[i].title + '</h6>' +
                            '</div>' +
                            '<div class="col-12 text-center border-top">' +
                            '<a href="essay.html?essayid=' + data[i].id + '" type="button" class="btn text-success btn-sm">' +
                            '<small><i class="fas fa-check fa-fw"></i> View Submission</small>' +
                            '</a>' +
                            '</div>' +
                            '</div>'
                        );
                    }
                }
            else
                $('#display').append(
                    '<div class="row bg-white shadow-sm border rounded-3 p-1 m-1">' +
                    '<div class="col m-auto ">' +
                    '<p class="text-muted mb-0">No essays submissions has been found.</p>' +
                    '</div>' +
                    '</div>'
                );
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