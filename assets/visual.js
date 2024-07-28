function toggleMode() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    setCookie("user-prefers-dark", "false", 7);
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    setCookie("user-prefers-dark", "true", 7);
  }
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

var userPrefersDark = getCookie("user-prefers-dark");
if (userPrefersDark === null) {
  userPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
} else {
  userPrefersDark = userPrefersDark === "true";
}

if (userPrefersDark) {
  document.body.classList.add("dark-mode");
  setCookie("user-prefers-dark", "true", 7);
} else {
  document.body.classList.remove("dark-mode");
  setCookie("user-prefers-dark", "false", 7);
}
