interface HeaderProps {
  score: number;
  record: number;
}

export const Header = ({ score, record }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold">Simon Says Game</h1>
      <div className="flex items-center gap-4 rounded bg-gray-800 p-4 text-2xl font-bold">
        <div>Score: {score}</div>
        <div>Record: {record}</div>
      </div>
    </div>
  );
};
