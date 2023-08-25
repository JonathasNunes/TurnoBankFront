import  React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import './index.css';

const Purchase: React.FC = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("amount", amount);
            formData.append("description", description);

            await api.post("/purchase", formData);
            toast.success("Compra realizada com sucesso!");
            
            setAmount("");
            setDescription("");
        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            if (axiosError.response?.data?.error) {
                toast.error(`Erro: ${axiosError.response.data.error}`);
            }
        }
    };

    return (<div className="container">
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
                <br />
                <div className="signup-header">
                    <h3>Compra</h3>
                </div>
                <br />
                <div className="container">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control type="number" value={amount} onChange={handleAmountChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" value={description} onChange={handleDescriptionChange} />
                    </Form.Group>

                    <Button variant="dark" onClick={handleSubmit}>
                        Enviar Compra
                    </Button>
                </Form>
                </div>
            </div>
    );
}

export default Purchase;