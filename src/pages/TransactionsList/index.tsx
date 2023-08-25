import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { format } from "date-fns";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import TransactionModal from "../../components/Modal";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import './index.css';

export interface ITransaction {
    id: number,
    amount : string,
    approval: string,
    image_url: string,
    created_at: string,
    account: {
        id: number,
        user: {
            name: string,
            email: string
        }
    }
}

const TransactionsList: React.FC = () => {

    const [showModal, setShowModal] = useState(false);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [selectedItem, setSelectedItem] = useState<ITransaction | null>(null);

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleInfoClick = (item: ITransaction) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const getTransactions = async () => {
        try {
          const res =  await api.get('/transactions');
          setTransactions(res.data);

        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            if (axiosError.response?.data?.error) {
                toast.error(`${axiosError.response.data.error}`);
            }
        }
    };

    useEffect(() => {
        getTransactions();
    }, [setTransactions]);

    const buttonStyle = {
        cursor: "pointer"
    };

    const handleApprove = async (item: ITransaction) => {

        try {
            await api.put('/transaction', {id:item.id, approval: "approved"});
            toast.success("Depósito Aprovado");
            getTransactions();
        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            if (axiosError.response?.data?.error) {
                toast.error(`${axiosError.response.data.error}`);
            }
        }
        setShowModal(false);
    };

    const handleReject = async (item: ITransaction) => {

        try {
            await api.put('/transaction', {id:item.id, approval: "rejected"});
            toast.success("Depósito Rejeitado");
            getTransactions();
        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            if (axiosError.response?.data?.error) {
                toast.error(`${axiosError.response.data.error}`);
            }
        }
        setShowModal(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "dd/MM/yyyy");
    };

    return (
        <div className="container">
            <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
            <br />
            <div className="signup-header">
                <h3>Depósitos</h3>
            </div>
            <br />
            <div className="container">
                {transactions.length>0 &&<Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Valor</th>
                            <th>Conta</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.account?.user?.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.account?.id}</td>
                                <td>{formatDate(item.created_at)}</td>
                                <td className="text-center">
                                    <FaCheckCircle 
                                        className="text-success fs-4 mr-2" 
                                        style={buttonStyle}
                                        onClick={() => handleApprove(item)} />
                                    {" "}
                                    <FaTimesCircle 
                                        className="text-danger fs-4 mr-2" 
                                        style={buttonStyle}
                                        onClick={() => handleReject(item)} />
                                    {" "}
                                    <FaInfoCircle 
                                        className="text-primary fs-4" 
                                        style={buttonStyle}
                                        onClick={() => handleInfoClick(item)} />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>}
                {transactions.length===0 && <div>Sem depósitos disponíveis</div>}
                <TransactionModal
                    show={showModal}
                    onClose={handleModalClose}
                    item={selectedItem}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            </div>
        </div>
    );
}

export default TransactionsList;