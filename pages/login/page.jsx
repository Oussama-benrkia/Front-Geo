"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import "./page.css";
import { redirect } from "next/dist/server/api-utils";
import { UserContext } from "../../app/layout";

import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function login() {
    const data = {
      email: email,
      password: password,
    };
    fetch("http://localhost:8081/api/auth/authenticate", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          router.push("/");
        }
      });

      //Admin authenti

      fetch("http://localhost:8081/api/users/mycompte",{
  method: "post",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.token) {
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user_id);
      router.push("/");
    }
  });
      
    const usertoken = localStorage.getItem("token");
  }
  return (
    <div className="login">
      <h1>Welcome To Safaryat</h1>
      <div className="email">
        <input
          type="email"
          value={email}
          placeholder="donner votre email"
          className="em"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="password">
        <input
          type="password"
          value={password}
          placeholder="password"
          className="pa"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn" onClick={login}>
        Se connecter
      </button>
      <p>
        Not signed in ? <Link href="/register"> Sign Up</Link>
      </p>
    </div>
  );
}
