var titles = [];
var activeTitle = 0;
var app = angular.module("viewLibraryApp", []);

app.controller("viewLibraryCntrl", function($scope, $http) {
    $scope.obj = [];

$scope.get_titles = function() {
    $http({
        method: "get",
        url: libraryURL + "/read-records",
    }).then(function(response) {
       // if(response.data.msg == "SUCCESS") {
            titles = response.data;
            $scope.obj = titles[activeTitle];
            $scope.showHide();
       // } else {
         //   console.log(response.data.msg);
       // }
    }, function(response) {
        console.log(response);

    });
};

$scope.get_titles();

$scope.changeTitle = function(direction){
    activeTitle += direction;
    $scope.obj = titles[activeTitle];
    $scope.showHide();
}

$scope.showHide = function() {
    $scope.hidePrev = (activeTitle == 0) ? true : false;
    $scope.hideNext = (activeTitle == titles.length-1) ? true : false;
}

$scope.editTitle = (titleNumber) {
    $scope.title = $scope.titles[titleNumber].title;
    $scope.author = $scope.titles[titleNumber].author;
    $scope.publisher = $scope.titles[titleNumber].publisher;
    $scope.yearPublished = $scope.titles[titleNumber].yearPublished;
    $scope.isbn = $scope.titles[titleNumber].isbn;
}
$scope.updateTitle = function() {
    $http({
        method: "put",
        url: "http://localhost:3500/update-title",
        data: {
            titleId: $scope.titleId,
            title: $scope.title,
            publisher: $scope.publisher,
            yearPublished: $scope.yearPublished,
            isbn: $scope.isbn
        }
    }).then(function(response){
        if(response.data.msg === "SUCCESS") {
            $scope.redrawTable();
            $scope.closeForm();
        } else {
            console.log(response.data.msg);
        }
    }, function(response) {
        console.log(response);
    })
};

});
