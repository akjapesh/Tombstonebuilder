import * as React from 'react';
import {Button} from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton} from 'baseui/modal';

import KeyboardEventsInfo from '../../utils/KeyboardEventsInfo';
import "../../styles/styles.css";

export default function KeyboardInfo() {
  const [isOpen, setIsOpen] = React.useState(false);
  function close() {
    setIsOpen(false);
  }
  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Keyboard Shortcuts</Button>
      <Modal onClose={close} isOpen={isOpen}>
        <ModalHeader>Useful Keyboard Shortcuts</ModalHeader>
        <ModalBody>
          {
              Object.keys(KeyboardEventsInfo).map((key)=>
              {
                    const value = KeyboardEventsInfo[key];
                    if(typeof(KeyboardEventsInfo[key])==="object")
                    {
                        let cnt = 1;
                        return (<>
                            <div id="Keyboard-Events">
                                <span id="Key-Command">{key}</span>
                                <span id="Key-Icons">
                                    {value.map((vl) =>
                                    {
                                        if(cnt)
                                        {
                                            cnt = 0;
                                        return <p id="key">{vl}</p>
                                        }
                                        return (
                                            <>
                                           <p id="Space-Between-Keys"> + </p>
                                            <p id="key">{vl}</p>
                                            </>
                                        )
                                    }
                                    )}
                                    </span>
                            </div>
                        </>)
                    }
                    else{
                        return (<>
                            <div id="Keyboard-Events">
                                <span id="Key-Command">{key}</span>
                                <span id="Key-Icons">
                                    <p id="key">{value}</p>
                                </span>
                            </div>
                        </>)
                    }
              })
          }
        </ModalBody>
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