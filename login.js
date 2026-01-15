function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  // Fake SQL query
  let query = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
  console.log(query); // viewable in dev tools

  // Real database values
  let realUser = "cupid";
  let realPass = "love123";

  // VULNERABLE check
  if (
    user === realUser && pass === realPass ||
    user.includes("admin'--")
  ) {
    document.getElementById("result").innerHTML =
      "💖 ACCESS GRANTED 💖<br><br>FLAG{cupid_loves_sql_injection}";
  } else {
    document.getElementById("result").innerText = "❌ Access Denied";
  }
}
