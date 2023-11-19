"use client";

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
  const [selected, setSelected] = React.useState<string[]>([]);

  const onSelect = (word: string) => {
    if (selected.length < 4) {
      setSelected([...selected, word]);
    }
    if (selected.includes(word)) {
      setSelected(selected.filter((selectedWord) => selectedWord !== word));
    }
  };

  return (
    <main className={css.container}>
      <h1>Connections</h1>
      <section className={css.board}>
        {startingBoard.map((row, i) =>
          row.map((word) => (
            <div
              onClick={() => {
                onSelect(word);
              }}
              aria-current={selected.includes(word)}
              className={css.word}
              key={word}
            >
              {word}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
