import  React, { ChangeEvent, useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './index.css';

const Home: React.FC = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (email && password) {
            try {
                const isLogged = await auth.signin(email, password);
                if (isLogged) {
                    if (email == "admin@admin.com") {
                        navigate('/transactions');
                    } else {
                        navigate('/account');
                    }
                } else {
                    toast.error("Usuário ou Senha incorretos. Tente novamente.");
                }
            } catch (error) {
                const axiosError = error as AxiosError<{ error: string }>;
                if (axiosError.response?.data?.error) {
                    toast.error(`${axiosError.response.data.error}`);
                }
            }
        }
    }

    return (
        <div className="container">
            <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
            <br />
            <div className="signup-header">
                <h3>Login</h3>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password"
                            onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Entrar
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Home;