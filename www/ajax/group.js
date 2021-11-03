window.addEventListener('load', (event) => {

    // get user groups
    $.ajax({
        type: "POST",
        url: webURL + "api/get_user_group",
        data: {
            userid: token.id
        },
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {

            if (data != false) {

                var result = "";
                var fullname;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].fullname == null) {
                        fullname = "No name";
                    } else {
                        fullname = data[i].fullname;
                    }
                    result +=
                        '<div class="border rounded-3 p-2 m-1 bg-white">' +
                        '<p class="text-capitalize mb-0">' + fullname + '</p>' +
                        '<p class="mb-0">' + data[i].phone + '</p>' +
                        '</div>';
                }

                $('#group_id').val(data[0].id);

                $('#display').html(
                    '<div class="col-12">' +
                    '<small class="fw-light">Group Name</small>' +
                    '<div class="border rounded-3 p-2 m-1 bg-white">' +
                    '<h3 class="text-capitalize mb-0">' + data[0].name + '</h3>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-12">' +
                    '<small class="fw-light">Group Member</small>' +
                    result +
                    '</div>' +
                    '<div class="col-12 m-auto text-center mt-3">' +
                    '<button type="button" class="btn btn-danger me-2 leave-group">' +
                    '<i class="fas fa-sign-out-alt fa-fw"></i> Leave Group' +
                    '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_member">' +
                    '<i class="fas fa-plus fa-fw"></i> Add Member' +
                    '</button>' +
                    '</button>' +
                    '</div>'
                );

            } else {
                $('#groups').show();
            }
        },
        error: function () {
            $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }

    });

    // get student list
    $.ajax({
        type: "POST",
        url: webURL + "api/get_student_list",
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {
            if (data != false) {

                for (var i = 0; i < data.length; i++) {

                    $('#select_member').append(
                        '<option value="' + data[i].id + '">' + data[i].fullname + '</option>'
                    );
                }

            } else {
                $('#select_member').append(
                    '<option selected disabled>No available student to add</option>'
                );
            }
        },
        error: function () {
            $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }

    });

    // get group list
    $.ajax({
        type: "POST",
        url: webURL + "api/get_group_list",
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {
            if (data != false) {

                for (var i = 0; i < data.length; i++) {

                    $('#select_group').append(
                        '<option value="' + data[i].id + '">' + data[i].name + '</option>'
                    );
                }

            } else {
                $('#select_group').append(
                    '<option selected disabled>No available group to join</option>'
                );
            }
        },
        error: function () {
            $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }

    });
});

$('#join_form').submit(function (e) {
    e.preventDefault();

    var formData = new FormData(this);
    formData.append('userid', token.id);

    $.ajax({
        type: "POST",
        url: webURL + "api/join_group",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'JSON',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {
            if (data != false) {
                location.replace('group.html');
            } else {
                alert('Failed to join group, try again.');
            }
        },
        error: function () {
            $('#display').append('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }
    });

});

$('#create_form').submit(function (e) {
    e.preventDefault();

    var formData = new FormData(this);
    formData.append('userid', token.id);

    $.ajax({
        type: "POST",
        url: webURL + "api/create_group",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'JSON',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {
            if (data != false) {
                location.replace('group.html');
            } else {
                alert('Failed to create group, try again.');
            }
        },
        error: function () {
            $('#display').append('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }
    });

});

$('#member_form').submit(function (e) {
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
        type: "POST",
        url: webURL + "api/add_member",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'JSON',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {
            if (data != false) {
                location.replace('group.html');
            } else {
                alert('Failed to add group member, try again.');
            }
        },
        error: function () {
            $('#display').append('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }
    });

});

$('body').on('click', '.leave-group', function (e) {

    $.ajax({
        type: "POST",
        url: webURL + "api/leave_group",
        data: {
            userid: token.id
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