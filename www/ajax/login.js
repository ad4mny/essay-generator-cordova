var login =  function () {

    var phone = $("#phone").val();
    var password = $("#password").val();

    if ($.trim(phone).length > 0 && $.trim(password).length > 0) {

        $.ajax({
            type: "POST",
            url: webURL + "api/login",
            data: {
                phone: phone,
                password: password
            },
            dataType: 'json',
            beforeSend: function () {
                $('#load_gif').show();
            },
            success: function (data) {
                // console.log(data);
                if (data != null) {
                    localStorage.setItem('token', JSON.stringify(data));
                    location.replace('index.html');
                } else {
                    alert('Incorrect username or password.');
                }
            },
            error: function () {
                $('#info_box').html('<div class="row">' +
                    '<div class="col">' +
                    '<p class="my-3 text-muted">Internal server error, please reload.</p>' +
                    '</div>' +
                    '</div>');
            },
            complete: function () {
                $('#load_gif').hide();
            }
        });

    } else {
        alert('Invalid username or password character.');
    }

};

var register = function () {

    var name = $("#name").val();
    var phone = $("#phone").val();
    var password = $("#password").val();

    if (comparePassword() != false) {

        $.ajax({
            type: "POST",
            url: webURL + "api/register",
            data: {
                name: name,
                phone: phone,
                password: password
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#load_gif').show();
            },
            success: function (data) {
                if (data == false) {
                    alert('Error signing you up.');
                } else if (data == "Phone number already registered.") {
                    alert(data);
                } else {
                    localStorage.setItem('token', JSON.stringify(data));
                    location.replace('index.html');
                }
            },
            error: function () {
                $('#info_box').html('<div class="row">' +
                    '<div class="col">' +
                    '<p class="my-3 text-muted">Internal server error, please reload.</p>' +
                    '</div>' +
                    '</div>');
            },
            complete: function () {
                $('#load_gif').hide();
            }
        });

    }

};

var comparePassword = function () {

    if ($('#password').val() != $('#c_password').val()) {
        $('#c_password').addClass("border border-danger");
        return false;
    } else {
        $('#c_password').removeClass("border border-danger");
        return true;
    }
};