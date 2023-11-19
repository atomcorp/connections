export const answers = [
  {
    words: ["HAIL", "RAIN", "SLEET", "SNOW"],
    answer: "WET WEATHER",
  },
  {
    words: ["BUCKS", "HEAT", "JAZZ", "NETS"],
    answer: "NBA TEAMS",
  },
  {
    words: ["OPTION", "RETURN", "SHIFT", "TAB"],
    answer: "KEYBOARD KEYS",
  },
  {
    words: ["KAYAK", "LEVEL", "MOM", "RACE CAR"],
    answer: "PALINDROMES",
  },
];

export type Board = {
  connection: string;
  words: string[];
}[];

export const startingBoard: Board = [
  {
    connection: "",
    words: ["SNOW", "LEVEL", "SHIFT", "KAYAK"],
  },
  {
    connection: "",
    words: ["HEAT", "TAB", "BUCKS", "RETURN"],
  },
  {
    connection: "",
    words: ["JAZZ", "HAIL", "OPTION", "RAIN"],
  },
  {
    connection: "",
    words: ["SLEET", "RACE CAR", "MOM", "NETS"],
  },
];
