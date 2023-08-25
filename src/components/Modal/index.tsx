import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ITransaction } from "../../pages/TransactionsList";
import { format } from "date-fns";

interface TransactionModalProps {
    show: boolean;
    onClose: () => void;
    item?: ITransaction | null;
    onApprove: (item: ITransaction) => void;
    onReject: (item: ITransaction) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
    show,
    onClose,
    item = null,
    onApprove,
    onReject
}) => {

    const formatDate = (dateString: string | undefined) => {
        if (dateString) {
            const date = new Date(dateString);
            return format(date, "dd/MM/yyyy");
        } else {
            return "Data não disponível";
        }
    };

    const imgUrl = 'https://turno-test-1f1add29f800.herokuapp.com/files/';

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes da Transação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Cliente: {item?.account?.user?.name}</p>
                <p>Email: {item?.account?.user?.email}</p>
                <p>Valor: {item?.amount}</p>
                <p>Conta: {item?.account?.id}</p>
                <p><img src={imgUrl + item?.image_url} alt="Imagem do Depósito" style={{ width: '80%' }} /></p>
                <p>Data: {formatDate(item?.created_at ?? '')}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => item && onApprove(item)} >
                    Aprovar
                </Button>
                <Button variant="danger" onClick={() => item && onReject(item)} >
                    Rejeitar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TransactionModal;