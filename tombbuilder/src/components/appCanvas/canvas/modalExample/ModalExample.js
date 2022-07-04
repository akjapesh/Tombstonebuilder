import * as React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import gearIcon from "assets/gear.svg";
import { Button, SHAPE, KIND } from "baseui/button";

export default function ModalExample({ children, header }) {
  const [isOpen, setIsOpen] = React.useState(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <Button
        shape={SHAPE.square}
        kind={KIND.primary}
        className="app-handlers__tool"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={gearIcon}
          alt="config of active item"
          title="Click to configure"
        ></img>
      </Button>
      <Modal onClose={close} isOpen={isOpen}>
        <ModalHeader>CONFIGURATIONS</ModalHeader>
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
