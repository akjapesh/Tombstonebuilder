import * as React from 'react';
import {Button} from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton} from 'baseui/modal';

import {supportedKeyboardEvents} from '../../utils/supportedKeyBoardEvents';
import "../../styles/styles.css";

export default function KeyboardInfo() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Keyboard Shortcuts</Button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ModalHeader>Useful Keyboard Shortcuts</ModalHeader>
        <ModalBody>
          {
            Object.keys(supportedKeyboardEvents).map((key, index)=>
            {
              const value = supportedKeyboardEvents[key];

              return (
              <>
                <div className="Keyboard-Events">
                  <span className="Key-Command" id={index}>{key}</span>
                  <span className="Key-Icons">
                    {value.map((vl,key) =>{
                      return (
                      <>
                        <p className="key" key={key}>{vl}</p>
                        {key === value.length - 1 ? null: <p className="Space-Between-Keys" key={key}> + </p>}
                      </>
                      )
                    }
                    )}
                  </span>
                </div>
              </>)
            })
          }
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={()=>{setIsOpen(false)}}>
            Cancel
          </ModalButton>
          <ModalButton onClick={()=>setIsOpen(false)}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}