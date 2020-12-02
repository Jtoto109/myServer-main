retrieveData(); //get initial load

function retrieveData() {
    //retrive the library data and populate on page load
    $.ajax({
        url: libraryURL + "/read-records",
        type:"get",
        success: function(response) {
            var data = JSON.parse(response);
            createLibraryTable(data);
        },
        error: function(err) {
            alert(err);
        }
    });

function createLibraryTable(libraryData){
    var tableHTML;

    for(var i=0; i<libraryData.length; i++){
        tableHTML += "<tr>";
            tableHTML += "<td>" + libraryData[i].ID + "</td>";
            tableHTML += "<td>" + libraryData[i].bookTitle + "</td>";
            tableHTML += "<td>" + libraryData[i].author + "</td>";
            tableHTML += "<td>" + libraryData[i].publisher + "</td>";
            tableHTML += "<td>" + libraryData[i].yearPublished + "</td>";
            tableHTML += "<td>" + libraryData[i].isbn + "</td>";
            tableHTML += "<td>"
                        + "<button class ='btn btn-sm edit_btn delete-button' "
                        + "data-id='" + libraryData[i].ID
                        + "'>DELETE</button>"
                        + "</td>";
            tableHTML += "</tr>";
    }
             
    $("#libraryTable").html(tableHTML);
    activateDelete();
}

function activateDelete() {
    $('.delete-button').click(function() {
        var deleteID = this.getAttribute("data-id");

        $.ajax({
            url: libraryURL + "/delete-record",
            type: "delete",
            data: {deleteID: deleteID},
            success: function(response){
                if(response ="SUCCESS") {
                    retrieveData();//repaint table
                }   else {
                    alert(response);
                }
            },
            error: function(err) {
                alert(err);
            }
        });
    });
}}
