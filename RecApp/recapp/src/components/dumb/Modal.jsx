
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CustomModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} size={props.size}>
      <ModalHeader>
        {props.title}
        <p style={{ wordBreak: 'break-word' }}>
          {props.hash ? `(${props.hash})` : null}
        </p>
      </ModalHeader>
      <ModalBody>
        {props.children}
      </ModalBody>
      <ModalFooter>
        {!props.transaction &&
          <div>
            <Button color="secondary" onClick={() => props.toggle()}>Cancel</Button>
            <Button color="primary" onClick={props.triggerAction}>{props.actionType}</Button>{' '}
          </div>
        }
        {props.transaction && props.done
          && <Button color="primary" onClick={props.triggerAction}>{props.actionType}</Button>
        }
      </ModalFooter>
    </Modal>
  )
}

export default CustomModal;