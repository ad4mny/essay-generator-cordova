window.addEventListener('load', (event) => {

    $.ajax({
        type: "POST",
        url: webURL + "api/get_group",
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
                for (var i = 0; i < data.length; i++) {
                    result += '<small>Group Member ' + (i + 1) + '</small>' +
                        '<p class="fw-bold">' + data[i].phone + '</p>';
                }

                $('#display').html(
                    '          <h2>Your group</h2>' +
                    '            <div class="col-12">' +
                    '                <small>Group Name</small>' +
                    '                <h4 class="fw-bold">' + data[0].name + '</h4>' +
                    '            </div>' +
                    '            <div class="col-12">' +
                    result +
                    '            </div>'
                );

            } else {
                $('#group_form').show();
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

$('#group_form').submit(function (e) {
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
            // console.log(data);
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

var addMember = function () {

    $('#member_input').append('<div class="col-12">' +
        '<small>Group Member</small>' +
        '<input type="text" class="form-control" name="member[]" placeholder="Enter member\'s contact number">' +
        '</div>'
    );

};