import { useEffect, useRef, useState } from "react";

const options = ["rock", "paper", "scissors"];
const images = {
  rock: "/rock.svg",
  paper: "/paper.svg",
  scissors: "/scissors.svg",
  rockCom: "/rock_com_shaking.svg",
};

function App() {
  const [playerChoice, setPlayerChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rockCom");
  const [result, setResult] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [point, setPoint] = useState(0);

  const bgMusicRef = useRef(null);
  const shakeSoundRef = useRef(null);

  useEffect(() => {
    bgMusicRef.current = new Audio("/sounds/background.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.1;

    const playMusic = () => {
      bgMusicRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked", err));
      window.removeEventListener("click", playMusic);
    };

    window.addEventListener("click", playMusic);

    return () => {
      bgMusicRef.current.pause();
    };
  }, []);

  const play = (choice) => {
    const computer = options[Math.floor(Math.random() * options.length)];
    setPlayerChoice("rock");
    setComputerChoice("rockCom");
    setResult("");
    setIsRevealing(true);

    if (!shakeSoundRef.current) {
      shakeSoundRef.current = new Audio("/sounds/shaking.mp3");
    }
    shakeSoundRef.current.currentTime = 0;
    shakeSoundRef.current.play();

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
    }, 1500);
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
    <div className="min-h-screen flex flex-col items-center justify-center md:gap-6 mt-2">
      <h2 className="text-[#FF4B33] text-center mb-2 font-bungee text-5xl md:text-7xl text-xl">
        Lg Pav Sing Sung!!
      </h2>

      <div className="flex flex-col md:flex-row w-full max-w-5xl justify-between items-center gap-8 px-2">
        <div className="text-center flex flex-col items-center">
          <h4 className="font-bungee text-2xl md:text-3xl md:mb-4 text-[#FF4B33]">
            Player
          </h4>
          <div className="w-[250px] max-w-xs h-[150px] md:h-[200px] flex justify-center items-center bg-[#1e1e1e] rounded-xl shadow">
            {playerChoice && (
              <img
                className={`w-[100px] md:w-[150px] rotate-90 ${
                  isRevealing ? "animate-shake" : ""
                }`}
                src={images[playerChoice]}
                alt={playerChoice}
              />
            )}
          </div>
        </div>

        <h4 className="w-full md:w-[300px] h-[58px] text-center font-bungee text-[#FF4B33] text-4xl md:text-5xl">
          {!isRevealing && result}
        </h4>

        <div className="text-center flex flex-col-reverse md:flex-col items-center">
          <h4 className="font-bungee text-2xl md:text-3xl mb-4 text-[#FF4B33]">
            Computer
          </h4>
          <div className="w-[250px] max-w-xs h-[150px] md:h-[200px] flex justify-center items-center bg-[#1e1e1e] rounded-xl shadow">
            {computerChoice && (
              <img
                className={`w-[100px] md:w-[150px] rotate-90 scale-y-[-1] ${
                  computerChoice !== "rockCom" ? "" : "scale-x-[-1]"
                } ${isRevealing ? "animate-shake" : ""}`}
                src={images[computerChoice]}
                alt={computerChoice}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => play(option)}
            className="w-[100px] h-[80px] md:w-[150px] md:h-[100px] bg-[#1e1e1e] rounded-lg shadow-md border-[2.5px] border-transparent hover:border-[#cd1401] hover:scale-105 transition transform flex items-center justify-center disabled:opacity-50"
            disabled={isRevealing}
          >
            <img
              src={images[option]}
              alt={option}
              className="w-[30px] md:w-[40px] rotate-90"
            />
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <h4 className="font-bungee text-lg md:text-xl text-[#FF4B33]">
          Score: {point}
        </h4>
      </div>
    </div>
  );
}

export default App;
