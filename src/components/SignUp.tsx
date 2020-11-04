import React from "react";
export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <form noValidate>
      <label htmlFor="signup-email">Email Address</label>
      <input
        id="signup-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value.trim());
        }}
      />
      <label htmlFor="signup-password">Password</label>
      <input
        id="signup-password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
