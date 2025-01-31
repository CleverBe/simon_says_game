import { cn } from "../lib/utils";

interface ButtonItemProps {
  button: number;
  isPlaying: boolean;
  activeButton: number | null;
  handleButtonClick: (button: number) => void;
  buttonColors: { [key: number]: string };
  disabledButtons: boolean;
}

export const ButtonItem = ({
  button,
  isPlaying,
  activeButton,
  handleButtonClick,
  buttonColors,
  disabledButtons,
}: ButtonItemProps) => {
  return (
    <button
      className={cn(
        "w-full h-full rounded-md text-white p-3 border-2 border-transparent",
        buttonColors[button as keyof typeof buttonColors],
        activeButton === button ? "opacity-100" : "opacity-40",
        isPlaying && !disabledButtons ? "cursor-pointer hover:border-white" : ""
      )}
      onClick={() => handleButtonClick(button)}
      disabled={disabledButtons}
    />
  );
};
