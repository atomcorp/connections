"use client";

import React, { CSSProperties } from "react";
import { LayoutGroup, motion, stagger, useAnimate } from "framer-motion";

import { Answer, Board, answers, startingBoard } from "@/components/data";

import css from "./Game.module.css";

const getAnswer = (selectedWords: string[]) => {
  const answer = answers.find((answer) =>
    answer.words.every((word) => selectedWords.includes(word))
  );

  return answer;
};

const parseRowsOfWords = (words: string[]) => {
  const rows = [];
  for (let index = 0; index < words.length / 4; index++) {
    const multiplier = index * 4;
    rows.push([
      words[0 + multiplier],
      words[1 + multiplier],
      words[2 + multiplier],
      words[3 + multiplier],
    ]);
  }
  return rows;
};

const getBoard = (board: Board, foundRows: string[][]) => {
  const foundWords = foundRows.flat();
  const wordsRemaining = board
    .flat()
    .filter((word) => !foundWords.includes(word));

  const nextBoard = [];

  const remainingRows = parseRowsOfWords(wordsRemaining);

  nextBoard.push(...foundRows);
  nextBoard.push(...remainingRows);
  return nextBoard;
};

type Row = CSSProperties & {
  "--row": number;
  "--col": number;
  "--color": string;
};

export default function Game() {
  const [scope, animate] = useAnimate();

  const [selected, setSelected] = React.useState<string[]>([]);
  const [answered, setAnswered] = React.useState<Answer[]>([]);

  const onSelect = (word: string) => {
    if (selected.includes(word)) {
      setSelected(selected.filter((selectedWord) => selectedWord !== word));
    } else if (selected.length < 4) {
      setSelected([...selected, word]);
    }
  };

  const isGuessComplete = selected.length === 4;
  const selectedToString = selected.join(",");

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

      const answer = getAnswer(selected);

      if (!answer) {
        // shake button
        await animate('button[aria-current="true"]', {
          x: [-4, 5, -5, 4, -3, 1, 0],
        });
      } else {
        setAnswered((prevAnswered) => [...prevAnswered, answer]);
      }
      setSelected([]);
    };

    const selected = selectedToString.split(",");
    if (selected.length === 4) {
      runAnimation();
    }
  }, [selectedToString, animate]);

  const foundRows = answered.map(({ words }) => words);
  const board = !answered.length
    ? startingBoard
    : getBoard(startingBoard, foundRows);

  const foundWords = foundRows.flat();

  return (
    <main className={css.container}>
      <h1 className={css.title}>Connectoms</h1>
      <LayoutGroup>
        <section ref={scope} className={css.board}>
          {answered.map((answer, rowIndex) => (
            <motion.div
              key={answer.connection}
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
              <div className={css.connection}>{answer.connection}</div>
              <div>{answer.words.join(", ")}</div>
            </motion.div>
          ))}

          {board.map((words, rowIndex) => (
            <>
              {words.map((word, colIndex) => {
                const isSelected = selected.includes(word);
                const isFound = foundWords.includes(word);
                return (
                  <motion.button
                    layoutId={word}
                    style={
                      {
                        zIndex: isFound ? 1 : "initial",
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
                    disabled={isFound}
                    aria-current={isSelected}
                    className={css.word}
                    key={word}
                  >
                    {word}
                  </motion.button>
                );
              })}
            </>
          ))}
        </section>
      </LayoutGroup>
      <div className={css.footer}>
        <button
          className={css.reset}
          onClick={() => {
            setAnswered([]);
          }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
