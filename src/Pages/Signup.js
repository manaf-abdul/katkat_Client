import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import BackgroundImage from "../Components/BackGroundImage";
import { BASEURL } from '../Constants';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { data } = await axios.post(`${BASEURL}user/signup`, { email, password,name })
            toast(data.msg)
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <Container>
            <BackgroundImage />
            <div className="content">
                {/* <Header /> */}
                <div className="form-container flex column a-center j-center">
                    <div className="form flex column a-center j-center bg-white" style={{ "backGroundColor": "0" }}>
                        <div className="title">
                            <h3>Create Account</h3>
                        </div>
                        <div className="container flex column">
                            <input
                                type="text"
                                placeholder="UserName"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <button onClick={handleLogin}>Create Account</button>
                            <p className="text-center p-3">
                                Already registered ?
                                <Link to="/login">
                                    <a>Login</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
const Container = styled.div`
    position: relative;
    .content {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.5);
      grid-template-rows: 15vh 85vh;
      .form-container {
        gap: 2rem;
        height: 85vh;
        .form {
          padding: 2rem;
          background-color: #0;
          width: 25vw;
          gap: 2rem;
          color: white;
          .container {
            gap: 2rem;
            input {
              padding: 0.5rem 1rem;
              width: 15rem;
            }
            button {
              padding: 0.5rem 1rem;
              background-color: #0275d8;
              border: none;
              cursor: pointer;
              color: white;
              border-radius: 0.2rem;
              font-weight: bolder;
              font-size: 1.05rem;
            }
          }
        }
      }
    }
`;

export default Signup