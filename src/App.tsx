import { useState, useEffect, useRef } from "react";
import { GameModal } from "./components/GameModal";
import { ButtonItem } from "./components/ButtonItem";
import { Header } from "./components/Header";
import { useIsFirstRender } from "./hooks/useIsFirstRender";
import { buttonColors, buttons, buttonSounds } from "./constants";

export default function App() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const currentScore = sequence.length ? sequence.length - 1 : 0;

  const isFirstRender = useIsFirstRender();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      showSequence();
    }
  }, [sequence]);

  const startGame = () => {
    dialogRef.current?.close();
    setSequence([getRandomButton()]);
    setUserInput([]);
    setIsPlaying(true);
  };

  const getRandomButton = () => {
    return buttons[Math.floor(Math.random() * buttons.length)];
  };

  const playSoundForButton = (button: number) => {
    const audio = buttonSounds[button];

    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 500);
  };

  const highlightButton = (button: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setActiveButton(button);
        playSoundForButton(button);
        setTimeout(() => {
          setActiveButton(null);
          resolve();
        }, 500);
      }, 500);
    });
  };

  const showSequence = async () => {
    setIsShowingSequence(true);
    for (const button of sequence) {
      await highlightButton(button);
    }
    setIsShowingSequence(false);
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

    if (sequence.length === userInput.length) return;

    setActiveButton(button);
    playSoundForButton(button);
    setTimeout(() => setActiveButton(null), 500);

    const newUserInput = [...userInput, button];
    setUserInput(newUserInput);

    if (
      newUserInput[newUserInput.length - 1] !==
      sequence[newUserInput.length - 1]
    ) {
      dialogRef.current?.showModal();

      setIsPlaying(false);
      checkRecordOnLocalStorage(currentScore);
      return;
    }

    if (newUserInput.length === sequence.length) {
      setTimeout(() => {
        setSequence([...sequence, getRandomButton()]);
        setUserInput([]);
      }, 1000);
    }
  };

  const disabledButtons =
    isShowingSequence || !isPlaying || sequence.length === userInput.length;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <Header score={currentScore} record={getRecord()} />
      <div className="mx-auto grid size-64 grid-cols-2 place-items-center gap-4 p-4 sm:size-96">
        {buttons.map((button) => (
          <ButtonItem
            key={button}
            button={button}
            activeButton={activeButton}
            isPlaying={isPlaying}
            handleButtonClick={handleButtonClick}
            buttonColors={buttonColors}
            disabledButtons={disabledButtons}
          />
        ))}
      </div>
      <GameModal
        ref={dialogRef}
        isPlaying={isPlaying}
        score={currentScore}
        isFirstRender={isFirstRender.current}
        startGame={startGame}
      />
    </div>
  );
}
