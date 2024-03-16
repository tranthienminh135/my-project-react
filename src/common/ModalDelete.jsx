import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteSC } from "../service/sc-service";

function DeleteModal(props) {
  const { show, setShow, item, deleteSuccess } = props;

  const handleClose = () => setShow(false);

  const handleDelete = () => {
    deleteSC(item.id).then((res) => {
      deleteSuccess();
    });
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key. {item.description}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
