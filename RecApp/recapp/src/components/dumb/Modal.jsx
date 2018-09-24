
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CustomModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} size={props.size}>
      <ModalHeader>{props.title}</ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        <Button color="primary" onClick={props.triggerAction}>{props.actionType}</Button>{' '}
      </ModalFooter>
    </Modal>
  )
}

export default CustomModal;