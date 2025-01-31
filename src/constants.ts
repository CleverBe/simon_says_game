export const buttons = [1, 2, 3, 4];

export const buttonColors = {
  1: "bg-red-500",
  2: "bg-green-500",
  3: "bg-yellow-500",
  4: "bg-purple-500",
};

export const buttonSounds: { [key: number]: HTMLAudioElement } = {
  1: new Audio("/sounds/sound1.mp3"),
  2: new Audio("/sounds/sound2.mp3"),
  3: new Audio("/sounds/sound3.mp3"),
  4: new Audio("/sounds/sound4.mp3"),
};
