"use client";

import React from "react";
import { motion, stagger, useAnimate } from "framer-motion";

import { answers, startingBoard } from "@/components/data";

import css from "./Game.module.css";

const isConnection = (selectedWords: string[]) => {
  const connection = answers.find((answer) =>
    answer.words.every((word) => selectedWords.includes(word))
  );

  if (connection) {
    return connection.answer;
  }
};

export default function Game() {
  const [scope, animate] = useAnimate();

  const [selected, setSelected] = React.useState<string[]>([]);

  const onSelect = (word: string) => {
    if (selected.includes(word)) {
      setSelected(selected.filter((selectedWord) => selectedWord !== word));
    } else if (selected.length < 4) {
      setSelected([...selected, word]);
    }
  };

  const isGuessComplete = selected.length === 4;
  const isSelectionConnection = isConnection(selected);

  React.useLayoutEffect(() => {
    const runAnimation = async () => {
      // bump up
      await animate(
        'button[aria-current="true"]',
        { y: -10 },
        {
          delay: stagger(0.25, {
            ease: "linear",
            startDelay: 0.1,
          }),
        }
      );
      // bump down
      await animate('button[aria-current="true"]', { y: 0 }, { delay: 0.3 });
      if (!isSelectionConnection) {
        await animate('button[aria-current="true"]', {
          x: [-4, 5, -5, 4, -3, 1, 0],
        });
      }
      setSelected([]);
    };
    if (isGuessComplete) {
      runAnimation();
    }
  }, [isSelectionConnection, isGuessComplete, animate]);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Atonnections</h1>
      <section ref={scope} className={css.board}>
        {startingBoard.map((row, i) =>
          row.map((word) => (
            <motion.button
              whileTap={{
                scale: 0.9,
                transition: {
                  duration: 0.1,
                  ease: "easeOut",
                },
              }}
              onClick={() => {
                if (!isGuessComplete) {
                  onSelect(word);
                }
              }}
              aria-current={selected.includes(word)}
              className={css.word}
              key={word}
            >
              {word}
            </motion.button>
          ))
        )}
      </section>
    </main>
  );
}
