"use client";

import React from "react";
import { LayoutGroup, motion, stagger, useAnimate } from "framer-motion";

import { answers, startingBoard, testBoard } from "@/components/data";

import css from "./Game.module.css";

const isConnection = (selectedWords: string[]) => {
  const connection = answers.find((answer) =>
    answer.words.every((word) => selectedWords.includes(word))
  );

  if (connection) {
    return connection.answer;
  }
};

const rearrangeBoard = (isConnection: string, board: string[][]) => {};

export default function Game() {
  const [scope, animate] = useAnimate();

  const [board, setBoard] = React.useState(startingBoard);
  const [selected, setSelected] = React.useState<string[]>([]);

  const onSelect = (word: string) => {
    if (selected.includes(word)) {
      setSelected(selected.filter((selectedWord) => selectedWord !== word));
    } else if (selected.length < 4) {
      setSelected([...selected, word]);
    }
  };

  const isGuessComplete = selected.length === 4;
  const connection = isConnection(selected);

  React.useLayoutEffect(() => {
    const runAnimation = async () => {
      // bump up
      await animate(
        'button[aria-current="true"]',
        { y: -10, zIndex: 1 },
        {
          delay: stagger(0.25, {
            ease: "linear",
            startDelay: 0.1,
          }),
        }
      );
      // bump down
      await animate(
        'button[aria-current="true"]',
        { y: 0, zIndex: 0 },
        { delay: 0.3 }
      );
      if (!connection) {
        await animate('button[aria-current="true"]', {
          x: [-4, 5, -5, 4, -3, 1, 0],
        });
      } else {
        setBoard((formerBoard) => {
          const connectedWords = answers.find(
            ({ answer }) => connection === answer
          )?.words;
          if (connectedWords) {
            const connectedRows = formerBoard.filter((row) => row.connection);
            const unConnectedRows = formerBoard.filter(
              (row) => !row.connection
            );

            const allRemainingWords = unConnectedRows
              .map((row) => row.words)
              .flat()
              .filter((word) => !connectedWords.includes(word));
            const nextUnconnectedRows = [];
            const remainingRows = allRemainingWords.length / 4;

            for (let index = 0; index < remainingRows; index++) {
              const multiple = index * 4;
              nextUnconnectedRows.push({
                connection: "",
                words: [
                  allRemainingWords[0 + multiple],
                  allRemainingWords[1 + multiple],
                  allRemainingWords[2 + multiple],
                  allRemainingWords[3 + multiple],
                ],
              });
            }
            return [
              ...connectedRows,
              {
                connection,
                words: connectedWords,
              },
              ...nextUnconnectedRows,
            ];
          }
          return formerBoard;
        });
      }
      setSelected([]);
    };
    if (isGuessComplete) {
      runAnimation();
    }
  }, [connection, isGuessComplete, animate]);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Connectoms</h1>
      <div>
        <button
          onClick={() => {
            setBoard(startingBoard);
          }}
        >
          Reset
        </button>
      </div>
      <LayoutGroup>
        <section ref={scope} className={css.board}>
          {board.map((row) =>
            row.words.map((word) => (
              <motion.button
                layoutId={word}
                style={{
                  zIndex: !!row.connection ? 1 : "initial",
                }}
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
                disabled={!!row.connection}
                aria-current={selected.includes(word)}
                className={css.word}
                key={word}
              >
                {word}
              </motion.button>
            ))
          )}
        </section>
      </LayoutGroup>
    </main>
  );
}
