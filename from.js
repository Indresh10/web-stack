function noNumber(str) {
    const num = /[0-9!@#$%^&*()~`\_\-\+\={}\[\]|\\;:'",./<>?]$/;
    if (num.test(str)) {
        return str.substring(0, str.length - 1);
    } else {
        return str;
    }
}
var fname = document.getElementById("floatingfname");
var lname = document.getElementById("floatinglname");
var email = document.getElementById("floatinguname");
var pass = document.getElementById("floatingpass");
var add = document.getElementById("floatingadd");
var phone = document.getElementById("floatingphone");
var age = document.getElementById("floatingage");
var select = document.getElementById("floatingSelect");
fname.oninput = function () {
    fname.value = noNumber(fname.value.toString());
    checkProgress();
};
lname.oninput = function () {
    lname.value = noNumber(lname.value.toString());
    checkProgress();
};
var form = document.getElementsByClassName("needs-validation")[ 0 ];
email.oninput = function () {
    if (form.classList.contains("was-validated")) {
        if (!checkEmail(email.value)) {
            email.setCustomValidity("Invalid");
            document.getElementById("invalid-email").innerHTML = "Invalid email format";
        } else {
            email.setCustomValidity("");
        }
    }
};
pass.oninput = function () {
    if (form.classList.contains("was-validated")) {
        if (!checkPass(pass.value) && pass.value != "") {
            pass.setCustomValidity("Invalid");
            document.getElementById("invalid-pass").innerHTML = "Invalid password format";
        } else {
            pass.setCustomValidity("");
        }
    }
};
phone.oninput = function () {
    if (form.classList.contains("was-validated")) {
        if (phone.value != "") {
            document.getElementById("invalid-phone").innerHTML = "Invalid Pattern(xxxxxxxxxx)";
        } else {
            document.getElementById("invalid-phone").innerHTML = "Required*";
        }
    }
}
age.oninput = function () {
    if (form.classList.contains("was-validated")) {
        if (age.value != "") {
            document.getElementById("invalid-age").innerHTML = "Not in range(0-100)";
        } else {
            document.getElementById("invalid-age").innerHTML = "Required*";
        }
    }
};
function sub() {
    if (!checkEmail(email.value) && email.value != "") {
        email.setCustomValidity("Invalid");
        document.getElementById("invalid-email").innerHTML = "Invalid email format";
    } else {
        email.setCustomValidity("");
    }
    if (!checkPass(pass.value) && pass.value != "") {
        pass.setCustomValidity("Invalid");
        document.getElementById("invalid-pass").innerHTML = "Invalid password format";
    } else {
        pass.setCustomValidity("");
    }
    form.classList.add("was-validated");
};
var progress = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
function checkProgress() {
    let formControls = document.getElementsByClassName("form-control");
    Array.from(formControls).forEach((element, index) => {
        element.onchange = function () {
            console.log(progress);
            if (element.value == "" && progress[ index ] == 1) progress[ index ]--;
            else if (progress[ index ] == 0) progress[ index ]++;
            changeProgress();
        };
    });
}

function selectChange(select) {
    console.log("inside select");
    if (this.value = "") progress[ 7 ]--;
    else progress[ 7 ]++;
    changeProgress();
}

function changeProgress() {
    let pro = progress.reduce((total, value) => { return total + value; });
    let progress_percent = pro * 12.5;
    let pbar = document.getElementById("pbar");
    if (pro <= 3) {
        pbar.classList.add("bg-danger");
        pbar.classList.remove("bg-warning");
        pbar.classList.remove("bg-success");
    }
    else if (pro > 3 && pro < 6) {
        pbar.classList.add("bg-warning");
        pbar.classList.remove("bg-danger");
        pbar.classList.remove("bg-success");
    }
    else {
        pbar.classList.add("bg-success");
        pbar.classList.remove("bg-warning");
        pbar.classList.remove("bg-danger");
    }
    pbar.style = `width:${progress_percent}%`;
    pbar.innerText = `${pro}/8`;
}

function checkEmail(str) {
    var emailPattern = /^(\b[a-z]+)+([a-z0-9]+)+([\.-]?[a-z0-9])*@[a-z]+([\.-]?[a-z]+)*(\.[a-z]{2,3})+$/;
    if (str.match(emailPattern)) {
        return true;
    } else {
        return false;
    }
}

function checkPass(str) {
    var lowercase = /[a-z]/;
    var uppercase = /[A-Z]/;
    var num = /[0-9]/;
    var spl = /[!@#$%^&*()~`\_\-\+\={}\[\]|\\;:'",./<>?]/;

    if (lowercase.test(str) && uppercase.test(str) && num.test(str) && spl.test(str) && str.length >= 8)
        return true;
    else
        return false;
}
