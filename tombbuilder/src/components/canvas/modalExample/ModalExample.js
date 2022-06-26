import * as React from "react";
import { Button } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import gearIcon from "../../../assets/gear.svg";
import { StatefulTooltip } from "baseui/tooltip";

export default function ModalExample({ children, header }) {
  const [isOpen, setIsOpen] = React.useState(false);

  function close() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <button onClick={() => setIsOpen(true)}>
            <StatefulTooltip 
              content={() => (  <p>"Click to configure"</p>)}
              returnFocus
              autoFocus>
                <img className="app-handlers__tool" src={gearIcon} alt="config of active item"></img>
            </StatefulTooltip>

      </button>
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
