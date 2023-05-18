var existing_vocab = [];
var essayid = '';
var paragraph = '';

window.addEventListener('load', (event) => {

    var parameter = new URLSearchParams(window.location.search);
    essayid = parameter.get('essayid');
    paragraph = parameter.get('paragraph');

    if (paragraph == 1)
        $('#title').html('Your introduction paragraph');
    else if (paragraph == 2)
        $('#title').html('Your body paragraph');
    else
        $('#title').html('Your conclusion paragraph');

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

            var outlines = JSON.parse(localStorage.getItem('outline'));
            existing_vocab = [];

            if (outlines != null ) {
                for (var i = 0; i < outlines.length; i++)
                    if (outlines[i].paragraph == paragraph) {
                        existing_vocab.push(outlines[i].id);
                        $('#vocab_selected').append(
                            '<button class="col-auto btn border m-1 remove-vocab" id="' + outlines[i].id + '" value="' + outlines[i].word + '">' +
                            outlines[i].word +
                            '</button>');
                    }
            }

            if (data != false) {
                for (var i = 0; i < data.length; i++)
                    $('#vocab_list').append(
                        '<button class="col-auto btn border m-1 add-vocab" id="' + data[i].id + '" value="' + data[i].word + '">' + data[i].word +
                        '</button>');
            }
            else
                $('#vocab_list').append('<div class="p-3 text-muted"> No available vocabulary to choose.</div>');

        },
        error: function () {
            $('#info_box').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }

    });

});

$('body').on('click', '.add-vocab', function (e) {

    var id = this.id;
    var word = this.getAttribute("value");

    if (existing_vocab == null) {
        localStorage.setItem('vocab', JSON.stringify([id]));
    } else {
        existing_vocab.push(id);
        localStorage.setItem('vocab', JSON.stringify(existing_vocab));
    }

    $('#vocab_selected').append('<button class="col-auto btn border m-1 remove-vocab" id="' + id + '" value="' + word + '">' + word + '</button>');

});

$('body').on('click', '.remove-vocab', function (e) {

    var id = this.id;
    var word = this.getAttribute("value");

    if (existing_vocab != null) {
        existing_vocab.splice(existing_vocab.indexOf(id), 1);
        localStorage.setItem('vocab', JSON.stringify(existing_vocab));
    }

    $(this).remove();

});

var back = function () {
    localStorage.removeItem('vocab');
    location.replace('outline.html?essayid=' + essayid);
}

var reset = function () {
    localStorage.removeItem('vocab');
    location.reload();
}

var next = function () {
    var data = JSON.parse(localStorage.getItem('vocab'));
    localStorage.removeItem('vocab');
    var parameter = new URLSearchParams(window.location.search)
    var essayid = parameter.get('essayid');
    var paragraph = parameter.get('paragraph');

    if (data != null && data.length > 0) {

        $.ajax({
            type: "POST",
            url: webURL + "api/set_vocabulary",
            data: {
                essayid: essayid,
                data: data,
                paragraph: paragraph
            },
            dataType: 'json',
            beforeSend: function () {
                $('#load_gif').show();
            },
            success: function (data) {
                if (data != false)
                    location.replace('outline.html?essayid=' + essayid);
                else
                    alert('Error while adding vocabularies to essay outline, try again.');
            },
            error: function () {
                $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#load_gif').hide();
            }

        });
    } else
        alert('Please select atleast one word to continue.');
}