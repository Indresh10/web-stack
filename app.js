const app = angular.module("myApp", []);
const debug = true;
app.controller("ctrl", ($scope, $http) => {
    $scope.srchType = "uname";
    $scope.display1 = "";
    $scope.display2 = "d-none";
    getData = () => {
        $http.get("http://127.0.0.1:3302/user")
            .then((res) => {
                if (debug) console.log(res);
                $scope.data = res.data;
                if (res.data.length > 0) $scope.current = 0;
                else $scope.current = null;
                disable(true);
                setTemp();
            });
    };
    getData();
    setTemp = () => {
        $scope.temp = $scope.data[ $scope.current ];
        if ($scope.current == null) $scope.conf = "";
        else $scope.conf = $scope.data[ $scope.current ].pass;
        document.getElementById("type").value = $scope.data[ $scope.current ].type;
    };
    $scope.resetSrch = () => {
        $scope.srch = "";
        getData();
    };

    $scope.search = () => {
        $http.get(`http://127.0.0.1:3302/user?${$scope.srchType}=${$scope.srch}`)
            .then((res) => {
                if (debug) console.log(res);
                $scope.data = res.data;
                if (res.data.length > 0) $scope.current = 0;
                else $scope.current = null;
                disable(true);
                setTemp();
            });
    };

    $scope.active = (id) => {
        if (id == $scope.current) return "table-active";
        else return "";
    };

    $scope.setActive = (id) => {
        $scope.current = id;
        setTemp();
    };

    $scope.next = () => {
        if ($scope.current < $scope.data.length - 1) $scope.current++;
        setTemp();
    };
    $scope.prev = () => {
        if ($scope.current > 0) $scope.current--;
        setTemp();
    };

    $scope.setMode = (mode) => {
        $scope.mode = mode;
        if (mode == 'add') {
            $scope.current = null;
            // reset();
        }
        if (mode == 'cancel') {
            $scope.display1 = "";
            $scope.display2 = "d-none";
            disable(true);
            if ($scope.current == null) $scope.current = 0;
        } else {
            $scope.display2 = "";
            $scope.display1 = "d-none";
            disable(false);
        }
        setTemp();
    };

    $scope.save = () => {
        validation();
        if (checkValidity()) {
            if ($scope.mode == "add") {
                data = getInputData();
                $http.post("http://127.0.0.1:3302/user", JSON.stringify(data)).then((res) => {
                    if (debug) console.log(res);
                    getData();
                    $scope.setMode('cancel');
                });
            }
            if ($scope.mode == "edit") {
                data = getInputData();
                url = `http://127.0.0.1:3302/user?uid=${$scope.data[ $scope.current ].uid}`;
                $http.put(url, JSON.stringify(data)).then((res) => {
                    if (debug) console.log(res);
                    getData();
                    $scope.setMode('cancel');
                });
            }
        }
    };

    $scope.del = () => {
        res = confirm("Are you sure ?");
        if (res) {
            url = `http://127.0.0.1:3302/user?uid=${$scope.data[ $scope.current ].uid}`;
            $http.delete(url, {})
                .then((res) => {
                    if (debug) console.log(res);
                    getData();
                });
        }
    };
});
app.filter("typeFilter", () => {
    return (x) => {
        switch (x) {
            case "adm":
                return "Admin";
            case "doc":
                return "Doctor";
            case "pat":
                return "Patient";
            case "hos":
                return "Hospital";
        }
    };
});

function disable(bool) {
    Array.from(document.querySelectorAll("input")).forEach((ele, index) => {
        if (index == 5) ele.disabled = !bool;
        else { ele.disabled = bool; ele.classList.remove("is-invalid"); };
    });
    document.querySelector("select").disabled = bool;
    if (bool) document.querySelector("select").classList.remove("is-invalid");
}

function getInputData() {
    inputs = document.querySelectorAll("input");
    select = document.querySelector("select");
    return {
        "uid": null,
        "uname": inputs[ 0 ].value,
        "pass": inputs[ 3 ].value,
        "type": select.value,
        "email": inputs[ 1 ].value,
        "phone": inputs[ 2 ].value
    };
}


function validation() {
    inputs = document.querySelectorAll("input").forEach((ele, index) => {
        if (index != 5) {
            if (ele.value.length == 0) ele.classList.add("is-invalid");
            else ele.classList.remove("is-invalid");
            ele.oninput = () => {
                if (ele.value.length == 0) ele.classList.add("is-invalid");
                else ele.classList.remove("is-invalid");
            };
        }
    });

    select = document.querySelector("select");
    if (select.value.length == 0) select.classList.add("is-invalid");
    else select.classList.remove("is-invalid");

    select.addEventListener("change", () => {
        if (select.value.length == 0) select.classList.add("is-invalid");
        else select.classList.remove("is-invalid");
    });
    email = document.getElementById("email");
    if (checkEmail(email.value)) {
        email.classList.remove("is-invalid");
        document.getElementById("invalid-email").innerText = "required*";
    } else {
        email.classList.add("is-invalid");
        document.getElementById("invalid-email").innerText = "invalid email format";
    }
    email.addEventListener("input", () => {
        if (checkEmail(email.value)) {
            email.classList.remove("is-invalid");
            document.getElementById("invalid-email").innerText = "required*";
        } else {
            email.classList.add("is-invalid");
            document.getElementById("invalid-email").innerText = "invalid email format";
        }
    });

    phone = document.getElementById("phone");
    if (checkTel(phone.value)) {
        phone.classList.remove("is-invalid");
        document.getElementById("invalid-phone").innerText = "required*";
    } else {
        phone.classList.add("is-invalid");
        document.getElementById("invalid-phone").innerText = "invalid phone format";
    }
    phone.addEventListener("input", () => {
        if (checkTel(phone.value)) {
            phone.classList.remove("is-invalid");
            document.getElementById("invalid-phone").innerText = "required*";
        } else {
            phone.classList.add("is-invalid");
            document.getElementById("invalid-phone").innerText = "invalid phone format";
        }
    });

    confpass = document.getElementById("confpass");
    if (checkPass()) {
        confpass.classList.remove("is-invalid");
        document.getElementById("invalid-confpass").innerText = "required*";
    } else {
        confpass.classList.add("is-invalid");
        document.getElementById("invalid-confpass").innerText = "Password doesn't match";
    }
    confpass.addEventListener("input", () => {
        if (checkPass()) {
            confpass.classList.remove("is-invalid");
            document.getElementById("invalid-confpass").innerText = "required*";
        } else {
            confpass.classList.add("is-invalid");
            document.getElementById("invalid-confpass").innerText = "Password doesn't match";
        }
    });
}

function checkEmail(str) {
    var emailPattern = /^(\b[a-z]+)+([a-z0-9]+)+([\.-]?[a-z0-9])*@[a-z]+([\.-]?[a-z]+)*(\.[a-z]{2,3})+$/;
    if (str.match(emailPattern)) {
        return true;
    } else {
        return false;
    }
}

function checkTel(str) {
    var telPattern = /^[0-9]{10}/;
    if (str.match(telPattern)) {
        return true;
    } else {
        return false;
    }
}

function checkPass() {
    pass = document.getElementById("pass");
    conf = document.getElementById("confpass");
    return pass.value == conf.value;
}

function checkValidity() {
    validate = true;
    document.querySelectorAll("input").forEach((ele, index) => {
        if (ele.classList.contains("is-invalid") && index != 5) validate = false;
    });
    select = document.querySelector("select");
    if (select.classList.contains("is-invalid")) validate = false;
    return validate;
}

function reset() {
    document.querySelectorAll("input").forEach((ele, index) => {
        ele.value = "";
    });
    document.querySelector("select").value = "";

}