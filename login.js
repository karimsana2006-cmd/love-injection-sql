function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  // Fake SQL query
  let query = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
  console.log(query); // viewable in dev tools

  // Real database values
  let realUser = "cupid";
  let realPass = "love123";

  const encodedFlag = "RkxBR3tjdXBpZF9sb3Zlc19zcWxfaW5qZWN0aW9ufQ=="; // base64

  // VULNERABLE check
  if (
    (user === realUser && pass === realPass) ||
    user.includes("admin'--")
  ) {
    let flag = atob(encodedFlag); // decode only after exploit
    document.getElementById("result").innerHTML =
      "💖 ACCESS GRANTED 💖<br><br>" + flag;
  } else {
    document.getElementById("result").innerText = "❌ Access Denied";
  }
}
