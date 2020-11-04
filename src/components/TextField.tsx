import React from "react";

type TextFieldProps = {
  id: string;
  type: "email" | "password" | "text";
};

export default function TextField() {
  return (
    <div>
      <label htmlFor="signin-email">Email Address</label>
      <input
        id="signin-email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value.trim());
        }}
      />
    </div>
  );
}
