//create a jquery listener that waits for the user to enter submit
//function activateSubmitButton() {
    $('#data-submit').click(function() {
        var bookTitle = $('#bookTitle').val();
        var author = $('#author').val();
        var publisher = $('#publisher').val();
        var yearPublished = $('#yearPublished').val();
        var isbn = $('#isbn').val();

        var d = new Date();
        var ID = "lib" + d.getTime();

        var jsonString = JSON.stringify({ID: ID, bookTitle: bookTitle, author: author, publisher: publisher, yearPublished: yearPublished, isbn: isbn});
        
        $.ajax({
            url: "http://localhost:3500/write-record",
            type: "post",
            data: {data: jsonString},
            success: function(response) {
                alert(response);
            },
            error: function(err){
                alert(err);
            }
        });
    })
