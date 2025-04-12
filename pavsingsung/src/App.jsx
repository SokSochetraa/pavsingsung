import { useState } from "react";

const options = ["rock", "paper", "scissors"];
const images = {
  rock: "/rock.svg",
  paper: "/paper.svg",
  scissors: "/scissors.svg",
  rockCom: "/rock_com_shaking.svg",
};

function App() {
  const [playerChoice, setPlayerChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rock");
  const [result, setResult] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [point, setPoint] = useState(0);

  const play = (choice) => {
    const computer = options[Math.floor(Math.random() * options.length)];

    setPlayerChoice("rock");
    setComputerChoice("rockCom");
    setResult("");
    setIsRevealing(true);

    setTimeout(() => {
      setPlayerChoice(choice);
      setComputerChoice(computer);
      const gameResult = getResult(choice, computer);
      setResult(gameResult);
      if (gameResult === "You Win!") {
        setPoint((prev) => prev + 1);
      } else if (gameResult === "You Lose!") {
        setPoint((prev) => prev - 1);
      }
      setIsRevealing(false);
    }, 1000);
  };

  const getResult = (player, computer) => {
    if (player === computer) return "Draw!";

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "You Win!";
    }
    return "You Lose!";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h2 className="text-center m-[35px] font-bungee text-7xl md:text-6xl">
        Lg Pav Sing Sung
      </h2>

      <div className="flex flex-col md:flex-row w-full max-w-5xl justify-between items-center gap-8 px-8">
        <div className="text-center flex flex-col items-center">
          <h4 className="font-bungee text-3xl mb-4">Player</h4>
          <div className="w-[300px] h-[200px] flex justify-center items-center bg-[#1e1e1e] rounded-xl shadow">
            {playerChoice && (
              <img
                className={`w-[150px] transform rotate-90 transition-transform duration-300 ${
                  isRevealing ? "animate-shake" : ""
                }`}
                src={images[playerChoice]}
                alt={playerChoice}
              />
            )}
          </div>
        </div>
        <h4 className="font-bungee text-white text-5xl mb-1">
          {!isRevealing && result}
        </h4>
        <div className="text-center flex flex-col items-center">
          <h4 className="font-bungee text-3xl mb-4">Computer</h4>
          <div className="w-[300px] h-[200px] flex justify-center items-center bg-[#1e1e1e] rounded-xl shadow">
            {computerChoice && (
              <img
                className={`w-[150px] transform rotate-90 scale-y-[-1] transition-transform duration-300 ${
                  isRevealing ? "animate-shake" : ""
                }`}
                src={images[computerChoice]}
                alt={computerChoice}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => play(option)}
            className="w-[150px] h-[100px] bg-[#1e1e1e] rounded-lg shadow-md border-[2.5px] border-transparent hover:border-[#cd1401] hover:scale-105 transition transform flex items-center justify-center disabled:opacity-50"
            disabled={isRevealing}
          >
            <img
              src={images[option]}
              alt={option}
              className="w-[40px] rotate-90"
            />
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <h4 className="font-bungee text-xl text-gray-600">Score: {point}</h4>
      </div>
    </div>
  );
}

export default App;
