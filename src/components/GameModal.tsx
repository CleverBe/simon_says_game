import { forwardRef } from "react";

export interface ProjectModalProps {
  isPlaying: boolean;
  score: number;
  isFirstRender: boolean;
  startGame: () => void;
}

export const GameModal = forwardRef<HTMLDialogElement, ProjectModalProps>(
  (props, ref) => {
    const { isPlaying, score, isFirstRender, startGame } = props;

    return (
      <dialog
        ref={ref}
        className="rounded-md z-10 backdrop:bg-gray-800/50 w-[200px] bg-gray-300"
      >
        <div className="p-4 flex flex-col gap-4 items-center justify-center">
          <div className="text-pretty text-center">
            {isFirstRender ? (
              <>
                <p className="font-semibold">Welcome!</p>
                <p>Follow the sequence of colors and sounds.</p>
              </>
            ) : (
              <p className="text-xl">Score: {score}</p>
            )}
          </div>
          <button
            className="w-36 text-xl h-28 px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={startGame}
            disabled={isPlaying}
          >
            {isFirstRender ? "Play" : "Play Again"}
          </button>
        </div>
      </dialog>
    );
  }
);
