
    // https://raw.githubusercontent.com/halfmoonui/halfmoon/master/js/halfmoon.js
    let darkModeOn = false;
      
    const createCookie = (name, value, days) => {
      let expires;
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "expires=" + date.toGMTString();
      } else {
        expires = "";
      }
      document.cookie = name + "=" + value + "; SameSite=Lax;"+ expires + "; path=/";
    }
      
    const readCookie = name => {
      let nameEQ = name + "=";
      let ca = document.cookie.split(";");
      for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length,c.length);
        }
      }
      return null;
    }
      
    const deleteCookie = name => {
      createCookie(name, "", -1);
    }
      
    const toggleDarkMode = (e) => {
      if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        darkModeOn = false;
        createCookie("my_preferredMode", "light-mode", 365);
      } else {
        document.body.classList.add("dark-mode");
        darkModeOn = true;
        createCookie("my_preferredMode", "dark-mode", 365);
      }
    }
      
    const getPreferredMode = () => {
      if (readCookie("my_preferredMode")) {
        return readCookie("my_preferredMode");
      } else {
        return "not-set";
      }
    }
      
    document.getElementById("darkMode").addEventListener("click", toggleDarkMode)
      
    document.addEventListener("DOMContentLoaded", () => {
      if (readCookie("my_preferredMode")) {
        if (readCookie("my_preferredMode") == "dark-mode") {
          darkModeOn = true;
        } else {
          darkModeOn = false;
        }
      } else {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          darkModeOn = true;
        } else {
          if (document.body.classList.contains("dark-mode")) {
            darkModeOn = true;
          } else {
            darkModeOn = false;
          }
        }
      }

      if (darkModeOn) {
        if (!document.body.classList.contains("dark-mode")) {
          document.body.classList.add("dark-mode");
        }
        document.getElementById("darkMode").checked = true
      } else {
        if (document.body.classList.contains("dark-mode")) {
          document.body.classList.remove("dark-mode");
        }
      }
    })
