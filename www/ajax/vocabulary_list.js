window.addEventListener('load', (event) => {

    var parameter = new URLSearchParams(window.location.search);
    var essayid = parameter.get('essayid');
    var paragraph = parameter.get('paragraph');

    if (paragraph == 1) {
        $('#title').html('Introduction');

    } else {
        $('#title').html('Email Body');
    }

    $.ajax({
        type: "POST",
        url: webURL + "api/get_vocabulary",
        data: {
            essayid: essayid,
            paragraph: paragraph
        },
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {

            if (data != false) {
                for (var i = 0; i < data.length; i++) {
                    $('#vocab_list').append('<button class="col-auto btn border m-1 btn-vocab" id="' + data[i].id + '" value="' + data[i].word + '">' +
                        data[i].word +
                        '</button>');
                }
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

$('body').on('click', '.btn-vocab', function (e) {
    var id = this.id;
    var word = this.getAttribute("value");
    var data = [];

    data = JSON.parse(localStorage.getItem('vocab'));

    if (data == null) {
        localStorage.setItem('vocab', JSON.stringify([id]));
    } else {
        data.push(id);
        localStorage.setItem('vocab', JSON.stringify(data));
    }

    $('#vocab_selected').append('<button class="col-auto btn border m-1" id="' + id + '">' +
        word +
        '</button>');
    $(this).remove();

});

var reset = function () {
    localStorage.removeItem('vocab');
    location.reload();
}

var next = function () {

    var data = JSON.parse(localStorage.getItem('vocab'));
    localStorage.removeItem('vocab');
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
                if (data != false) {
                    location.replace('outline.html?essayid=' + essayid);

                } else {
                    alert('Error while adding vocabularies to essay outline, try again.');
                }
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