import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { format } from "date-fns";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import './index.css';
import ModalDetail from "../../components/Modal/ModalDetail";

export interface ITransaction {
    id: number,
    type: string,
    amount: string,
    description: string | null,
    approval: string,
    image_url: string | null,
    created_at: string
}

export interface IAccout {
    id: number,
    balance : string,
    created_at: string,
    transactions: ITransaction[]
}

const Account: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [account, setAccount] = useState<IAccout | undefined>(undefined);
    const [selectedItem, setSelectedItem] = useState<ITransaction | null>(null);
    const [filter, setFilter] = useState<"approved" | "rejected" | "pending" | "all">("all");

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const buttonStyle = {
        cursor: "pointer"
    };
    const textColorRed = {
        color: "red"
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "dd/MM/yyyy");
    };

    const handleInfoClick = (item: ITransaction) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const getMyAccount = async () => {
        try {
          const res =  await api.get('/account');

          if (res.data.length > 0) {
            setAccount(res.data[0]);
          }

        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            if (axiosError.response?.data?.error) {
                toast.error(`${axiosError.response.data.error}`);
            }
        }
    };

    useEffect(() => {
        getMyAccount();
    }, [setAccount]);

    const getStatusText = (approval: string) => {
        if (approval === "approved") {
            return "Aprovado";
        } else if (approval === "rejected") {
            return "Rejeitado";
        } else {
            return "Pendente";
        }
    };

    const filteredTransactions = account?.transactions.filter(
        item => filter === "all" || item.approval === filter
    );

    return (<div className="container">
                <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
                <br />
                <div className="signup-header">
                    <h3>Conta</h3>
                </div>
                <br />
                <div className="container">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Saldo (R$)</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {account && <tr>
                                <td>{account?.balance}</td>
                                <td>{formatDate(account?.created_at)}</td>
                            </tr>}
                        </tbody>
                    </Table>
                    <hr />
                    <Button variant="info" onClick={() => setFilter("all")}>Todos</Button>{" "}
                    <Button variant="success" onClick={() => setFilter("approved")}>Aprovados</Button>{" "}
                    <Button variant="danger" onClick={() => setFilter("rejected")}>Rejeitados</Button>{" "}
                    <Button variant="warning" onClick={() => setFilter("pending")}>Pendentes</Button>{" "}
                    <hr />
                    {account && filteredTransactions && filteredTransactions.length > 0 &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Valor (R$)</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredTransactions.map((item, i) => (
                            <tr key={i}>
                                <td>{item.type === "deposit" ? "deposito" : "compra"}</td>
                                <td style={item.type === "purchase" ? textColorRed : undefined}>
                                    {item.type === "purchase" ? ` - ${item.amount}` : item.amount}
                                </td>
                                <td className="text-left">{formatDate(item.created_at)}</td>
                                <td className="text-left">{getStatusText(item.approval)}</td>
                                <td className="text-center">
                                    <FaInfoCircle 
                                        className="text-primary fs-4" 
                                        style={buttonStyle}
                                        onClick={() => handleInfoClick(item)} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>}
                    {filteredTransactions && filteredTransactions.length === 0 && <div>Sem depósitos ou compras disponíveis</div>}
                    <ModalDetail
                        show={showModal}
                        onClose={handleModalClose}
                        item={selectedItem}
                    />
            </div>
        </div>
    );
}

export default Account;