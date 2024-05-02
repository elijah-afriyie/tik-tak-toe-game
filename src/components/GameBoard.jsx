export default function GameBoard({ onSelectSquare, board }) {
  /*
  turns is a prop that was used in the App component to pass the state of gameTurns to this component, and it represents an array of turns made by players during the game.

  When working in react, manage as little states as needed and try to derive as many values as possible from that state.
  */

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                  // Condition to check if button has already been clicked
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
