export type Answer = {
  words: string[];
  connection: string;
};

export const answers: Answer[] = [
  {
    words: ["HAIL", "RAIN", "SLEET", "SNOW"],
    connection: "WET WEATHER",
  },
  {
    words: ["BUCKS", "HEAT", "JAZZ", "NETS"],
    connection: "NBA TEAMS",
  },
  {
    words: ["OPTION", "RETURN", "SHIFT", "TAB"],
    connection: "KEYBOARD KEYS",
  },
  {
    words: ["KAYAK", "LEVEL", "MOM", "RACE CAR"],
    connection: "PALINDROMES",
  },
];

export type Board = string[][];

export const startingBoard: Board = [
  ["SNOW", "LEVEL", "SHIFT", "KAYAK"],
  ["HEAT", "TAB", "BUCKS", "RETURN"],
  ["JAZZ", "HAIL", "OPTION", "RAIN"],
  ["SLEET", "RACE CAR", "MOM", "NETS"],
];
