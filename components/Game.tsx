"use client";

import React, { CSSProperties } from "react";
import { LayoutGroup, motion, stagger, useAnimate } from "framer-motion";

import { Board, answers, startingBoard } from "@/components/data";

import css from "./Game.module.css";

const getConnection = (selectedWords: string[]) => {
  const connection = answers.find((answer) =>
    answer.words.every((word) => selectedWords.includes(word))
  );

  if (connection) {
    return connection.answer;
  }
  return;
};

const updateBoard = (connection: string) => (formerBoard: Board) => {
  const connectedWords = answers.find(
    ({ answer }) => connection === answer
  )?.words;
  if (connectedWords) {
    const connectedRows = formerBoard.filter((row) => row.connection);
    const unConnectedRows = formerBoard.filter((row) => !row.connection);
    const allRemainingWords = unConnectedRows
      .map((row) => row.words)
      .flat()
      .filter((word) => !connectedWords.includes(word));

    const nextUnconnectedRows = [];
    const remainingRows = allRemainingWords.length / 4;
    for (let index = 0; index < remainingRows; index++) {
      const multiplier = index * 4;
      nextUnconnectedRows.push({
        connection: "",
        words: [
          allRemainingWords[0 + multiplier],
          allRemainingWords[1 + multiplier],
          allRemainingWords[2 + multiplier],
          allRemainingWords[3 + multiplier],
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
};

type Row = CSSProperties & {
  "--row": number;
  "--col": number;
  "--color": string;
};

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
  const connection = getConnection(selected);

  React.useEffect(() => {
    const runAnimation = async () => {
      // bump up
      await animate(
        'button[aria-current="true"]',
        { y: -10, zIndex: 3 },
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
        setBoard(updateBoard(connection));
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
      <LayoutGroup>
        <section ref={scope} className={css.board}>
          {board.map((row, rowIndex) => (
            <>
              {row.words.map((word, colIndex) => {
                const isSelected = selected.includes(word);
                return (
                  <motion.button
                    layoutId={word}
                    style={
                      {
                        zIndex: !!row.connection ? 1 : "initial",
                        "--row": rowIndex + 1,
                        "--col": colIndex + 1,
                      } as Row
                    }
                    whileTap={{
                      scale: !isSelected ? 0.9 : 1,
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
                    aria-current={isSelected}
                    className={css.word}
                    key={word}
                  >
                    {word}
                  </motion.button>
                );
              })}
              {row.connection && (
                <motion.div
                  key={row.connection}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 1],
                  }}
                  transition={{ delay: 0.3 }}
                  style={
                    {
                      "--row": rowIndex + 1,
                      "--color": `--group-${rowIndex}-color`,
                    } as Row
                  }
                  className={css.answer}
                >
                  <div className={css.connection}>{row.connection}</div>
                  <div>{row.words.join(", ")}</div>
                </motion.div>
              )}
            </>
          ))}
        </section>
      </LayoutGroup>
      <div className={css.footer}>
        <button
          className={css.reset}
          onClick={() => {
            setBoard(startingBoard);
          }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
