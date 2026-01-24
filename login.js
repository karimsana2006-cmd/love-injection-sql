async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  // Fake SQL query (for CTF flavor)
  let query =
    "SELECT * FROM users WHERE username = '" +
    user +
    "' AND password = '" +
    pass +
    "'";
  console.log(query);

  const realUser = "cupid";

  // SHA-256 hash of the REAL password
  const realPassHash =
    "a0b9c8d5e0a5c2e7c6d5a9c0f3e0b1a2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8"; 
  
  // SHA-256 hash of the FLAG (never store plaintext)
  const flagHash =
    "b8c6a3f8c1d1a46b7c56c5b6b5b55c02a0c4bfa8d9a9bbfda7b8c57e62d6d93b";

  const enteredPassHash = await sha256(pass);

 if (
  (user === realUser && enteredPassHash === realPassHash) ||
  user === "admin'--"
) {
  document.getElementById("result").innerHTML =
    "💖 ACCESS GRANTED 💖<br><br>" +
    "FLAG HASH:<br>" +
    flagHash;
} else {
  document.getElementById("result").innerText = "❌ Access Denied";
}

}
