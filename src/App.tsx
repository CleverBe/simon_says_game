import { useState, useEffect } from "react";
import { cn } from "./lib/utils";

const buttons = [1, 2, 3, 4];

const buttonColors = {
  1: "bg-red-500",
  2: "bg-green-500",
  3: "bg-yellow-500",
  4: "bg-purple-500",
};

const buttonSounds: { [key: number]: HTMLAudioElement } = {
  1: new Audio("/sounds/sound1.mp3"),
  2: new Audio("/sounds/sound2.mp3"),
  3: new Audio("/sounds/sound3.mp3"),
  4: new Audio("/sounds/sound4.mp3"),
};

export default function App() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isPlaying) {
      showSequence();
    }
  }, [sequence]);

  const startGame = () => {
    setMessage("");
    setSequence([getRandomButton()]);
    setUserInput([]);
    setIsPlaying(true);
  };

  const getRandomButton = () =>
    buttons[Math.floor(Math.random() * buttons.length)];

  const showSequence = async () => {
    setIsShowingSequence(true);
    for (const button of sequence) {
      await highlightButton(button);
    }
    setIsShowingSequence(false);
  };

  const highlightButton = (button: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setActiveButton(button);
        playSoundForButton(button);
        setTimeout(() => {
          setActiveButton(null);
          resolve();
        }, 500); // Duración de la animación y audio
      }, 500); // Espera para mostrar el siguiente botón
    });
  };

  const playSoundForButton = (button: number) => {
    const audio = buttonSounds[button];

    audio.currentTime = 0;
    audio.play();

    // Detener el sonido después de 500ms
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reiniciar el tiempo del audio
    }, 500); // Duración del audio igual que la animación (500ms)
  };

  const getRecord = () => {
    try {
      const storedRecord = localStorage.getItem("record") || "0";
      return parseInt(storedRecord);
    } catch {
      localStorage.setItem("record", "0");
      return 0;
    }
  };

  const checkRecordOnLocalStorage = (score: number) => {
    const record = getRecord();

    if (record < score) {
      localStorage.setItem("record", score.toString());
    }
  };

  const handleButtonClick = (button: number) => {
    if (isShowingSequence || !isPlaying) return;

    setActiveButton(button);
    playSoundForButton(button);
    setTimeout(() => setActiveButton(null), 500);

    const newUserInput = [...userInput, button];
    setUserInput(newUserInput);

    if (
      newUserInput[newUserInput.length - 1] !==
      sequence[newUserInput.length - 1]
    ) {
      setMessage("¡Fallaste! Inténtalo de nuevo.");
      setIsPlaying(false);
      checkRecordOnLocalStorage(sequence.length);
      return;
    }

    if (newUserInput.length === sequence.length) {
      setTimeout(() => {
        setSequence([...sequence, getRandomButton()]);
        setUserInput([]);
      }, 1000);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center justify-center pt-8">
        <h1 className="text-2xl font-bold mb-4">Simon Says Game</h1>
        <div className="flex items-center gap-4">
          <p>Nivel: {!isPlaying ? 1 : sequence.length}</p>
          <p>Record: {getRecord()}</p>
        </div>
        <div className="size-96 grid grid-cols-2 gap-4 mx-auto place-items-center p-4">
          {buttons.map((button) => (
            <button
              key={button}
              className={cn(
                "w-full h-full rounded-full text-white p-3 border-2 border-transparent",
                buttonColors[button as keyof typeof buttonColors],
                activeButton === button ? "opacity-100" : "opacity-40",
                isPlaying && !isShowingSequence
                  ? "cursor-pointer hover:border-white"
                  : ""
              )}
              onClick={() => handleButtonClick(button)}
              disabled={isShowingSequence}
            />
          ))}
        </div>
        {message && <p className="mt-4 text-red-400">{message}</p>}
        <div className="flex gap-4">
          <button
            className="mt-6 px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={startGame}
            disabled={isPlaying}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
