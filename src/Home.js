import { useState, useEffect } from "react";
import "./home.css";
import hello from "./images/hello.png";
import fist from "./images/fist.png";
import peace from "./images/peace.png";
import paper from "./images/paper.png";
import rock from "./images/rock.png";
import scissor from "./images/scissor.png";
import bpaper from "./images/black_paper.png";
import brock from "./images/black_rock.png";
import bscissor from "./images/black_scissor.png";
import vs3 from "./images/vs3.png";

export function Home() {

 useEffect(() => {
  const images = [
    hello, fist, peace,
    paper, rock, scissor,
    bpaper, brock, bscissor,
    vs3
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}, []);


  const buttonImg = [hello, fist, peace];
  const userChoice = [paper, rock, scissor];
  const botChoice = [bpaper, brock, bscissor];

  const [userImg, setUserImg] = useState(rock);
  const [botImg, setBotImg] = useState(brock);
  const [animate, setAnimate] = useState(false);
  const [result, setResult] = useState("Make a move");

  function determineResult(userImg, botImg) {
    if((userImg === rock && botImg === brock) ||
    (userImg === scissor && botImg === bscissor) ||
    (userImg === paper && botImg === bpaper)){
      return "It's Tie";
    } else if (
      (userImg === rock && botImg === bscissor) ||
      (userImg === scissor && botImg === bpaper) ||
      (userImg === paper && botImg === brock)
    ) {
      return "You Win";
    } else {
      return "Bot Win";
    }
  }

  const handleClick = (userChoice) => {
    setUserImg(rock);

    setBotImg(brock);
    setAnimate(true);
    setResult("");

     requestAnimationFrame(() => {
    setTimeout(() => {
      setAnimate(false);
      setUserImg(userChoice);

      const randomBotImg =
        botChoice[Math.floor(Math.random() * botChoice.length)];

      setBotImg(randomBotImg);

       setResult( determineResult(userChoice, randomBotImg));
      // setResult(gameResult);
    }, 300);
  });
  };
  return (
    <div className="container">
      <div className="con1">
        <div className="user_img">
          <label>You</label>
          <img src={userImg} alt="" className={animate ? "shake" : ""} />
        </div>
        <div className="vs">
          <img src={vs3} alt="" />
        </div>

        <div className="com_img">
          <label>Bot</label>
          <img src={botImg} alt="" className={animate ? "shake" : ""} />
        </div>

        <div className="result">{result}</div>
      </div>
      <div className="option">
        {buttonImg.map((buttonImage, index) => (
          <button key={index} onClick={() => handleClick(userChoice[index])}>
            <img src={buttonImage} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
