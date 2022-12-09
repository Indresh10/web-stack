var card = document.getElementById("back");
var theme_sw = document.getElementById("theme-switch");
var grad;
var col1;
var col2;
var ang;
var rng;
var sidebar = document.getElementById("sidebar");
var cardcode = document.getElementById("card-code");
var stch = document.getElementById("switch");
var range = document.getElementById("range");
var rvalue = document.getElementById("rvalue");
var toast = document.getElementById("toast");
var t_head = document.getElementById("toast-head");
var Name = document.getElementById("name");
var age = document.getElementById("age");
var email = document.getElementById("email");
var theme = document.getElementById("theme");
var modal = document.getElementById("modal");
var del = document.getElementsByClassName("delete");
var curTheme = "light";
range.onchange = () => {
    rvalue.innerText = `${range.value}%`;
    sessionStorage.setItem("rng", range.value.toString());
    changeGrad();
};

stch.onclick = () => {
    sessionStorage.setItem("col1", col2);
    sessionStorage.setItem("col2", col1);
    getSessionStorage();
    changeGrad();
};
theme_sw.onclick = () => themeSwitch();
function themeSwitch() {
    if (curTheme == "dark" || getCookie("theme") == "dark") {
        //dark mode
        card.classList.remove("text-bg-light");
        card.classList.add("text-bg-dark");
        sidebar.classList.remove("text-bg-light");
        sidebar.classList.add("text-bg-dark");
        cardcode.classList.remove("text-bg-light");
        cardcode.classList.add("text-bg-secondary");
        code.classList.add("text-light");
        code.classList.remove("text-dark");
        stch.classList.add("btn-outline-light");
        stch.classList.remove("btn-outline-dark");
        toast.classList.remove("text-bg-light");
        toast.classList.add("text-bg-dark");
        t_head.classList.remove("text-bg-light");
        t_head.classList.add("text-bg-dark");
        modal.classList.remove("text-bg-light");
        modal.classList.add("text-bg-dark");
        theme_sw.src = "./light_mode.png";
        curTheme = "light";
    } else {
        //light mode
        card.classList.remove("text-bg-dark");
        card.classList.add("text-bg-light");
        sidebar.classList.remove("text-bg-dark");
        sidebar.classList.add("text-bg-light");
        cardcode.classList.remove("text-bg-secondary");
        cardcode.classList.add("text-bg-light");
        code.classList.add("text-dark");
        code.classList.remove("text-light");
        stch.classList.remove("btn-outline-light");
        stch.classList.add("btn-outline-dark");
        toast.classList.remove("text-bg-dark");
        toast.classList.add("text-bg-light");
        t_head.classList.remove("text-bg-dark");
        t_head.classList.add("text-bg-light");
        modal.classList.remove("text-bg-dark");
        modal.classList.add("text-bg-light");
        theme_sw.src = "./dark_mode.png";
        curTheme = "dark";
    }
};

var fcolor = document.getElementById("fcolor-col");
var fcolortext = document.getElementById("fcolor-text");
fcolor.onchange = () => {
    fcolortext.value = fcolor.value;
    sessionStorage.setItem("col1", fcolor.value);
    changeGrad();
};
fcolortext.oninput = () => {
    fcolor.value = fcolortext.value;
    sessionStorage.setItem("col1", fcolor.value);
    changeGrad();
};

var scolor = document.getElementById("scolor-col");
var scolortext = document.getElementById("scolor-text");
scolor.onchange = () => {
    scolortext.value = scolor.value;
    sessionStorage.setItem("col2", scolor.value);
    changeGrad();
};
scolortext.oninput = () => {
    scolor.value = scolortext.value;
    sessionStorage.setItem("col2", scolor.value);
    changeGrad();
};
var angle = document.getElementById("angle");
angle.oninput = () => {
    sessionStorage.setItem("ang", angle.value);
    changeGrad();
};
var gselect = document.getElementById("gselect");
var dangle = document.getElementById("angle-div");
gselect.addEventListener("change", function () {
    if (gselect.value == "linear-gradient") {
        dangle.classList.remove("d-none");
        dangle.classList.add("show2");
        dangle.classList.remove("hide");
        sessionStorage.setItem("grad", gselect.value);
        changeGrad();
    } else if (gselect.value == "radial-gradient") {
        dangle.classList.add("hide");
        dangle.classList.remove("show2");
        setTimeout(() => {
            dangle.classList.add("d-none");
            sessionStorage.setItem("grad", gselect.value);
            changeGrad();
        }, 800);
    } else if (gselect.value == "conic-gradient") {
        if (dangle.classList.contains("hide")) {
            dangle.classList.add("show2");
            dangle.classList.remove("d-none");
        }
        dangle.classList.remove("hide");
        sessionStorage.setItem("grad", gselect.value);
        changeGrad();
    }

});

var gradient = document.getElementById("gradient");
var code = document.getElementById("code");
function changeGrad() {
    getSessionStorage();
    if (grad == "linear-gradient") {
        gradient.style = `background-image:${grad}(${ang}deg,${col1} ${rng}%,${col2})`;
        code.innerText = `background-image:${grad}(${ang}deg,${col1} ${rng}%,${col2})`;
    } else if (grad == "radial-gradient") {
        gradient.style = `background-image:${grad}(${col1} ${rng}%,${col2})`;
        code.innerText = `background-image:${grad}(${col1} ${rng}%,${col2})`;
    } else if (grad == "conic-gradient") {
        gradient.style = `background-image:${grad}(from ${ang}deg,${col1} ${rng}%,${col2})`;
        code.innerText = `background-image:${grad}(from ${ang}deg,${col1} ${rng}%,${col2})`;
    }
}

gradient.onload = changeGrad();

var copy = document.getElementById("copy");

var bdg = document.getElementById("badge");
copy.onclick = () => {
    navigator.clipboard.writeText(code.innerText.toString())
        .then(() => {
            bdg.innerText = "copied";
            bdg.classList.add("text-bg-success");
            bdg.classList.add("show2");
            bdg.classList.remove("text-bg-danger");
            bdg.classList.remove("d-none");
            bdg.classList.remove("hide");
            setTimeout(() => {
                bdg.classList.remove("show2");
                bdg.classList.add("hide");
            }, 2000);
        }).catch(() => {
            bdg.innerText = "error on copy";
            bdg.classList.add("text-bg-danger");
            bdg.classList.add("show2");
            bdg.classList.remove("text-bg-success");
            bdg.classList.remove("d-none");
            bdg.classList.remove("hide");
            setTimeout(() => {
                bdg.classList.remove("show2");
                bdg.classList.add("hide");
            }, 2000);
        });
};
window.onload = () => getSessionStorage();
function getSessionStorage() {
    grad = sessionStorage.getItem("grad");
    ang = sessionStorage.getItem("ang");
    col1 = sessionStorage.getItem("col1");
    col2 = sessionStorage.getItem("col2");
    rng = sessionStorage.getItem("rng");
    if (grad == null) grad = "linear-gradient";
    if (ang == null) ang = "0";
    if (col1 == null) col1 = "#000000";
    if (col2 == null) col2 = "#ffffff";
    if (rng == null) rng = "0";
    fcolor.value = col1;
    fcolortext.value = col1;
    scolor.value = col2;
    scolortext.value = col2;
    angle.value = ang;
    gselect.value = grad;
    if (grad == "radial-gradient")
        dangle.classList.add("d-none");
    range.value = rng;
    rvalue.innerText = `${rng}%`;

    let consent = getCookie("user_cookie_consent");
    if (consent != "") {
        toast.classList.remove("show");
    } else {
        toast.classList.add("show");
        toast.classList.add("show2");
    }
    Name.value = getCookie("name");
    age.value = getCookie("age");
    email.value = getCookie("email");
    theme.value = getCookie("theme");
    if (getCookie("theme") == "") curTheme = "light";
    else curTheme = getCookie("theme");
    themeSwitch();
}

// Create cookie
function setCookie(cname, cvalue, exdays = 30) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
function deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[ i ];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var accept = document.getElementById("accept");
accept.addEventListener("click", () => { acceptCookieConsent(); });
// Set cookie consent
function acceptCookieConsent() {
    deleteCookie('user_cookie_consent');
    setCookie('user_cookie_consent', true, 30);
    toast.classList.add("hide");
    toast.classList.remove("show2");
}

Array.from(del).forEach((ele, index) => {
    ele.onclick = () => {
        switch (index) {
            case 0:
                deleteCookie("name");
                Name.value = "";
                break;
            case 1:
                deleteCookie("age");
                age.value = "";
                break;
            case 2:
                deleteCookie("email");
                email.value = "";
                break;
            case 3:
                deleteCookie("theme");
                theme.value = "";
                if (getCookie("theme") == "") curTheme = "light";
                else curTheme = getCookie("theme");
                themeSwitch();
                break;
        };
    };
});

var edit = document.getElementById("edit");
edit.onclick = () => {
    if (edit.innerText == "Edit") {
        Name.disabled = false;
        age.disabled = false;
        email.disabled = false;
        theme.disabled = false;
        edit.innerText = "Save";
    } else {
        Name.disabled = true;
        age.disabled = true;
        email.disabled = true;
        theme.disabled = true;
        setCookie("name", Name.value);
        setCookie("age", age.value);
        setCookie("email", email.value);
        setCookie("theme", theme.value);
        if (getCookie("theme") == "") curTheme = "light";
        else curTheme = getCookie("theme");
        themeSwitch();
        edit.innerText = "Edit";
    }
};