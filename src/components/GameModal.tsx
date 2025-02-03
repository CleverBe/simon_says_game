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
        className="z-10 w-[200px] rounded-md bg-gray-300 backdrop:bg-gray-800/50"
      >
        <div className="flex flex-col items-center justify-center gap-4 p-4">
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
            className="h-28 w-36 rounded bg-green-500 px-4 py-2 text-xl hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={startGame}
            disabled={isPlaying}
          >
            {isFirstRender ? "Play" : "Play Again"}
          </button>
        </div>
      </dialog>
    );
  },
);
