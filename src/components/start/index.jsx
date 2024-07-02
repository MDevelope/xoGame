import React, { useContext } from 'react'
import Xicon from '../icons/Xicon'
import Oicon from '../icons/Oicon'
import { GameContext } from '../../context/GameContext'


/**
 * Start component for the game.
 * This component is responsible for selecting the player's mark and starting a new game.
 * 
 * @returns {JSX.Element} - The rendered Start component.
 */
const Start = () => {
  // Get the active user and set the active user from the GameContext.
  const { activeUser, setActiveUser, handleStart } = useContext(GameContext);

  return (
    <div className="start">
      {/* Header with the X and O icons */}
      <div className="start__header">
        <Xicon />
        <Oicon />
      </div>
      {/* Card with the active user selection and game start options */}
      <div className="card shadow-gray">
        <h1 className="text-lg">Pick player 1'st mark</h1>
        <div className="start__players">
          {/* X icon for selecting the active user */}
          <span
            className={activeUser === "x" ? "start__players--active" : ""}
            onClick={() => setActiveUser("x")}
          >
            <Xicon color={activeUser === "x" ? "dark" : "light"} />
          </span>
          {/* O icon for selecting the active user */}
          <span
            className={activeUser === "o" ? "start__players--active" : ""}
            onClick={() => setActiveUser("o")}
          >
            <Oicon color={activeUser === "o" ? "dark" : "light"} />
          </span>
        </div>
        <p className="text-light text-normal">remember: x goes first</p>
      </div>
      {/* Buttons for starting a new game */}
      <div className="start__btns">
        {/* Button for starting a new game against the CPU */}
        <button className="btn btn-yellow" onClick={() => handleStart("cpu")}>
          new game (vs CPU)
        </button>
        {/* Button for starting a new game against another player */}
        <button className="btn btn-blue" onClick={() => handleStart("user")}>
          {" "}
          new game (vs Player)
        </button>
      </div>
    </div>
  );
};

export default Start;