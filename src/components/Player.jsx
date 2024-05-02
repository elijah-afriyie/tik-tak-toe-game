import { useState } from "react";

function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // Switching between Save and Edit
  function handleEditSave() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Populate name input field
  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleNameChange}
        className="player-name"
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditSave} className="edit-button">
        <p className="edit-button-text">{isEditing ? "Save" : "Edit"}</p>
      </button>
    </li>
  );
}

export default Player;
