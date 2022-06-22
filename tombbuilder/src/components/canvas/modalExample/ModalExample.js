import * as React from "react";
import { Button } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

export default function ModalExample({ children, header }) {
  const [isOpen, setIsOpen] = React.useState(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>
        Size & position of active item
      </Button>
      <Modal onClose={close} isOpen={isOpen}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={close}>
            Cancel
          </ModalButton>
          <ModalButton onClick={close}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}