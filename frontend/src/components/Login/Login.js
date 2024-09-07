import styled from "styled-components";
import bg from "../../img/bg.jpg";
import Button from "../Button/Button";
import { useAuth } from "../Auth/Auth";
import { useState } from "react";

function Login() {
  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmit = () => {
    if (input.name !== "" && input.password !== "") {
      auth.login(input)
      return;
    }
    console.log(input);
  };

  const test = () => {
    console.log(input)
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <LoginStyled bg={bg} className="Login">
      <div className="form">
        <h3>Login</h3>

        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Nama"
          id="username"
          name="name"
          onChange={handleInput}
        />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={handleInput}
        />

        <Button
          name={"Masuk"}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
          onClick={handleSubmit}
        />
      </div>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  postition: relative;

  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .background {
    background-image: url(${(props) => props.bg});
  }

  .form {
    height: 520px;
    width: 400px;
    background: #fcf6f9;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }
  * {
    font-family: "Poppins", sans-serif;
    color: rgba(34, 34, 96, 1);
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  h3 {
    font-size: 32px;
    font-weight: 600;
    line-height: 42px;
    text-align: center;
    color: var(--color-accent);
  }

  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input {
    display: block;
    height: 50px;
    width: 100%;
    background: #ffffff;
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }
  ::placeholder {
    color: rgba(34, 34, 96, 0.6);
  }
  button {
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
  .forgot {
    display: flex;
    justify-content: center;
    text-decoration: none;
    margin-top: 1em;
  }
`;

export default Login;
