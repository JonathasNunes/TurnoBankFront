import  React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import './index.css';

interface IUser {
    name: string,
    email : string,
    password: string
}

const Signup: React.FC = () => {

    const [model, setModel] = useState<IUser>({
                                name: '',
                                email : '',
                                password: ''
                            });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
  
    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ... model,
            [e.target.name]: e.target.value
        });
    }

    function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
      
        if (model.password !== confirmPassword) {
            toast.error("A senha e a confirmação devem ser iguais.");
            cleanForm();
        }
      
        try {
            await api.post('/user', model);
            toast.success("Conta criada com sucesso!");
            cleanForm();
        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            if (axiosError.response?.data?.error) {
                toast.error(`Erro ao criar a conta: ${axiosError.response.data.error}`);
            }
        }
    }

    function cleanForm() {
        setModel({
            name: '',
            email: '',
            password: ''
        });
        setConfirmPassword('');
    }

    return (
        <div className="container">
            <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
            <br />
            <div className="signup-header">
                <h3>Cadastro</h3>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Nome</Form.Label>
                        <Form.Control name="name" type="text" 
                        value={model.name}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control name="email" type="email"
                        value={model.email}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Senha</Form.Label>
                        <Form.Control name="password" type="password" id="password"
                        value={model.password}
                        minLength={6}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => updateModel(e)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="confirmPassword">Confirme a Senha</Form.Label>
                        <Form.Control name="confirmPassword" id="confirmPassword" type="password"
                                    minLength={6}
                                    value={confirmPassword}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmPasswordChange(e)} />
                        {model.password !== confirmPassword && (
                            <div className="text-danger">As senhas não coincidem.</div>
                        )}
                    </Form.Group>

                    <Button variant="dark" type="submit"> Salvar </Button>
                </Form>
            </div>
        </div>
    );
}

export default Signup;