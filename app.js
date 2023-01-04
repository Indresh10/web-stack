const app = angular.module("myApp", [ "ngRoute" ]);
app.config(function ($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl: "home.html",
            controller: "homeCtrl"
        })
        .when("/edit/:noteId", {
            templateUrl: "edit.html",
            controller: "editCtrl"
        })
        .when("/add", {
            templateUrl: "edit.html",
            controller: "addCtrl"
        })
        .otherwise({
            redirectTo: '/'
        });

});

app.controller("homeCtrl", function ($scope, $http) {
    $http.get("http://127.0.0.1:3302/notes")
        .then((res) => {
            console.log(res);
            $scope.notes = res.data.notes;
        });
    $scope.goto = function (id) {
        if (id != -1)
            window.location.href = `#!/edit/${id}`;
        else
            window.location.href = `#!/add`;

    };

    $scope.del = function (id) {
        $http.delete(`/delete/${id}`, {})
            .then(function (response) {
                console.log(response);
                if (response.status == 202) {
                    $http.get("http://127.0.0.1:3302/notes")
                        .then((res) => {
                            console.log(res);
                            $scope.notes = res.data.notes;
                        });
                }
            });
    };
});

app.controller("editCtrl", function ($scope, $routeParams, $http) {
    $http.get(`http://127.0.0.1:3302/edit/${$routeParams.noteId}`)
        .then((res) => {
            $scope.type = "Edit";
            $scope.action = `/save/${$routeParams.noteId}`;
            $scope.data = res.data;
        });
});

app.controller("addCtrl", function ($scope, $http) {
    $http.get(`http://127.0.0.1:3302/add`)
        .then((res) => {
            $scope.type = "Create";
            $scope.action = "/save";
            $scope.data = res.data;
        });
});
