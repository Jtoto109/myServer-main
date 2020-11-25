//retrieve the library data and populate on page load
//function getLibraryData() {
$.ajax({
    url: libraryURL + "/read-records",
    type:"get",
    success: function(response) {
        var data = jQuery.parseJSON(response);
        createLibraryTable(data);
    }
 });

 $('.delete_button').click(function() {
    var itemID = this.getAttribute("data-id");

$.ajax({
    url: libraryURL + "/delete-records",
    type: "delete",
    success: function(response){
        
        $.ajax({
            url: libraryURL + "/read-records",
            type:"get",
            success: function(response) {
                var data = jQuery.parseJSON(response);
                createLibraryTable(data);
            }
         });    


    }
});
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
            tableHTML += "<td class = 'delete_button'>"
            +"<button data-id='" + libraryData[i].ID + "'>DELETE</button>";
            + "</td>";
        tableHTML += "</tr>"
    }
    
    $('#libraryTable').html(tableHTML);
};
