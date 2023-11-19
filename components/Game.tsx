import React from "react";

import css from "./Game.module.css";

const answers = {
  "WET WEATHER": { level: 0, members: ["HAIL", "RAIN", "SLEET", "SNOW"] },
  "NBA TEAMS": { level: 1, members: ["BUCKS", "HEAT", "JAZZ", "NETS"] },
  "KEYBOARD KEYS": {
    level: 2,
    members: ["OPTION", "RETURN", "SHIFT", "TAB"],
  },
  PALINDROMES: { level: 3, members: ["KAYAK", "LEVEL", "MOM", "RACE CAR"] },
};

const startingBoard = [
  ["SNOW", "LEVEL", "SHIFT", "KAYAK"],
  ["HEAT", "TAB", "BUCKS", "RETURN"],
  ["JAZZ", "HAIL", "OPTION", "RAIN"],
  ["SLEET", "RACE CAR", "MOM", "NETS"],
];

export default function Game() {
  return (
    <main className={css.container}>
      <h1>Connections</h1>
      <section className={css.board}>
        {startingBoard.map((row, i) =>
          row.map((word) => (
            <span className={css.word} key={word}>
              {word}
            </span>
          ))
        )}
      </section>
    </main>
  );
}
