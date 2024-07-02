import React, { useContext } from "react";
import Win from "./Win";
import Restart from "./Restart";
import { ModalContext } from "../../context/ModalContext";

/**
 * Modal component that displays the winner or the restart modal.
 * The modal is displayed based on the value of the `show` and `modaleModel`
 * properties from the `ModalContext`.
 *
 * @return {JSX.Element} The Modal component.
 */
const Modal = () => {
  // Destructure the `show` and `modaleModel` properties from the `ModalContext`
  const { show, modaleModel } = useContext(ModalContext);

  // Render the modal based on the value of `modaleModel`
  return (
    <div className={`modal ${!show && "closed"}`}>
      {/* Modal content */}
      <div className="modal__content">
        <div className="container">
          {/* If `modaleModel` is "winner", render the Win component */}
          {modaleModel === "winner" && <Win />}
          {/* If `modaleModel` is "start", render the Restart component */}
          {modaleModel === "start" && <Restart />}
        </div>
      </div>
    </div>
  );
};

export default Modal;