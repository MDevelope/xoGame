import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { ModalContext } from "../../context/ModalContext";

/**
 * Restart component for the game modal.
 * This component renders the restart game modal.
 *
 * @returns {JSX.Element} - The rendered Restart component.
 */
const Restart = () => {
  // Get the hideModal and handleReset functions from the contexts.
  const { hideModal } = useContext(ModalContext);
  const { handleReset } = useContext(GameContext);

  return (
    // Render the restart modal.
    <div className="restart">
      {/* Render the title of the modal */}
      <h3 className="restart__title">Restart Game?</h3>
      <div className="restart__btns">
        {/* Render the cancel button */}
        <button className="btn btn-sm" onClick={hideModal}>
          no, cancal
        </button>
        {/* Render the restart button */}
        <button className="btn btn-yellow btn-sm" onClick={handleReset}>
          yes, restart
        </button>
      </div>
    </div>
  );
};

export default Restart;