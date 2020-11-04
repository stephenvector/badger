import React, { useCallback, useState } from "react";
import axios from "axios";
import { FormStatus } from "../types";

export default function SignIn() {
  const [formStatus, setFormStatus] = useState(FormStatus.INITIAL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(async () => {
    const result = await axios.post("/api/signin", { email, password });
  }, [email, password]);

  return (
    <form noValidate>
      <label htmlFor="signin-email">Email Address</label>
      <input
        id="signin-email"
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
