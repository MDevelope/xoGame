import { createContext, useState } from "react";

const ModalContext = createContext();

/**
 * ModalState component that provides the modal state and functions to the
 * children components.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children components.
 * @return {JSX.Element} The ModalState component.
 */
const ModalState = (props) => {
  // State variables for the modal visibility and mode
  const [show, setShow] = useState(false); // Modal visibility
  const [mode, setMode] = useState("winner"); // Modal mode ("winner" or "start")

  /**
   * Function to show the modal.
   *
   * @return {void} This function does not return anything.
   */
  const showModal = () => setShow(true);

  /**
   * Function to hide the modal.
   *
   * @return {void} This function does not return anything.
   */
  const hideModal = () => setShow(false);

  // Provider component that provides the modal state and functions to the children components
  return (
    <ModalContext.Provider
      value={{
        show, // Modal visibility
        modaleModel: mode, // Modal mode
        showModal, // Function to show the modal
        hideModal, // Function to hide the modal
        setModalMode: setMode, // Function to set the modal mode
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalState };