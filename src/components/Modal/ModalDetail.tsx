import React from "react";
import { Modal } from "react-bootstrap";
import { ITransaction } from "../../pages/Account";
import { format } from "date-fns";

interface ModalDetailProps {
    show: boolean;
    onClose: () => void;
    item?: ITransaction | null;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
    show,
    onClose,
    item = null
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
                <p>Valor: {item?.amount}</p>
                <p>Conta: {item?.id}</p>
                {item?.type === "deposit" && <p><img src={imgUrl + item?.image_url} alt="Imagem do Depósito" style={{ width: '80%' }} /></p>}
                <p>Data: {formatDate(item?.created_at ?? '')}</p>
            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDetail;