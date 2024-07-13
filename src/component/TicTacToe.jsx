import React, { useEffect, useState } from "react";

export default function TicTocTac() {
  const [btnText, setBtnText] = useState(Array(9).fill(""));
  const [btnDisabled, setBtnDisabled] = useState(Array(9).fill(false));

  const [isfirst, setIsFirst] = useState(Array(9).fill(false));
  const [isZero, setIsZero] = useState(true);
  const [zero, setZero] = useState([]);
  const [cross, setCross] = useState([]);
  
  const [winBox, setWinBox] = useState(Array(9).fill(false));
  const [winner, setWinner] = useState();

  let [player1Score, setPlayer1Score] = useState(0);
  let [player2Score, setPlayer2Score] = useState(0);

  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const onBtnClick = (e) => {
    e.preventDefault();
    const index = Number(e.target.id);
    const newBtnText = [...btnText];
    const newBtnDisabled = [...btnDisabled];

    newBtnText[index] = isZero ? "O" : "X";

    newBtnDisabled[index] = true;

    isZero ? setZero([...zero, index]) : setCross([...cross, index]);

    setBtnDisabled(newBtnDisabled);
    setBtnText(newBtnText);
    setIsZero(!isZero);
  };

  const removeText = (index) => {
    btns.map((btn) => {
      if (Number(btn.props.id) === index) {
        const newBtnText = [...btnText];
        const newBtnDisabled = [...btnDisabled];

        newBtnText[index] = "";
        newBtnDisabled[index] = false;

        setBtnText(newBtnText);
        setBtnDisabled(newBtnDisabled);
        setIsFirst(Array(9).fill(false));
      }
    });
  };

  useEffect(() => {
    if (zero.length > 3) {
      removeText(zero[0]);
      setZero(zero.slice(1));
    } else if (cross.length > 3) {
      removeText(cross[0]);
      setCross(cross.slice(1));
    } else if (zero.length == 3 || cross.length == 3) {
      const newIsFirst = [...isfirst];
      if (isZero) {
        if (zero.length == 3) {
          newIsFirst[zero[0]] = true;
          setIsFirst(newIsFirst);
        }
      } else {
        if (cross.length == 3) {
          newIsFirst[cross[0]] = true;
          setIsFirst(newIsFirst);
        }
      }
      for (const pattern of winningPattern) {
        const [a, b, c] = pattern;
        const pos1 = btnText[a];
        const pos2 = btnText[b];
        const pos3 = btnText[c];
        if (pos1 != "" && pos2 != "" && pos3 != "") {
          if (pos1 == pos2 && pos2 == pos3) {
            setWinner(
              isZero ? "Player 2 won this game" : "Player  1 won this game"
            );

            const newWinBox = [...winBox];
            newWinBox[a]=newWinBox[b]=newWinBox[c] = true;
            setWinBox(newWinBox);
          

            setIsFirst(Array(9).fill(false));
            setBtnDisabled(Array(9).fill(true));
            isZero
              ? setPlayer2Score(player2Score + 1)
              : setPlayer1Score(player1Score + 1);
          }
        }
      }
    }
  }, [zero, cross]);

  const btns = Array.from({ length: 9 }, (ele, index) => (
    <button
      className={` bg-slate-800  text-4xl sm:text-5xl font-bold ${
        isfirst[index] ? "text-sky-800" : "text-sky-400"
      } ${winBox[index] && ' text-white  '} `}
      key={index}
      id={index}
      disabled={btnDisabled[index]}
      onClick={onBtnClick}
    >
      {btnText[index]}
    </button>
  ));

  const restart = () => {
    setBtnText(Array(9).fill(""));
    setBtnDisabled(Array(9).fill(false));
    setZero([]);
    setCross([]);
    setWinner("");
    setIsFirst(Array(9).fill(false));
    setWinBox(Array(9).fill(false));
  };

  const newGame = () => {
    setBtnText(Array(9).fill(""));
    restart();
    setPlayer1Score(0);
    setPlayer2Score(0);
    setIsZero(true);
  };

  return (
    <>
      <div className="flex justify-between sm:justify-around mt-8 xs:mt-12  font-semibold px-4 text-xl xs:text-2xl">
        <div>
          <div className={` ${isZero ? "text-sky-300" : "text-gray-600"}` }>
            <div>Player 1 : O</div>
            <div>{player1Score}</div>
          </div>
        </div>

        <div>
          <div className={` ${isZero ? "text-gray-600" : "text-sky-300"}`}>
            <div>Player 2 : X</div>
            <div>{player2Score}</div>
          </div>
        </div>
      </div>

      <div className=" mt-8 sm:mt-16 sm:flex sm:items-center sm:justify-around sm:w-full ">
        <div className="mx-auto my-16 xs:my-20 sm:m-0 font-arimo text-sky-200 w-[19rem] h-72 xs:w-[22rem]  xs:h-80 sm:w-96 sm:h-80 grid sm:inline-grid  grid-cols-3 grid-rows-3 gap-2 bg-sky-600 ">
          {btns}
        </div>

        <div className=" sm:w-64">
          <div className="text-sky-500 text-xl sm:text-2xl my-4">{winner}</div>

          <div>
            <button
              className="bg-sky-700 text-slate-300 border-2 border-white text-xl lg:text-2xl lg:p-1 rounded-md px-2 font-semibold mb-6 "
              onClick={restart}
            >
              Rematch
            </button>
          </div>

          <div>
            <button
              className="bg-sky-700 text-slate-300 border-2 border-white text-xl lg:text-2xl lg:p-1 rounded-md px-2 font-semibold mb-6 "
              onClick={newGame}
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
