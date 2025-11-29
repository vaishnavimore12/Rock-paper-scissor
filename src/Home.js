import { useState } from "react";
import "../src/styles/home.css";

export function Home() {
  const buttonImg = ["/hello.png", "/fist.png", "/peace.png"];
  const userChoice = ["/paper.png", "/rock.png", "/scissor.png"];
  const botChoice = [
    "/black_paper.png",
    "/black_rock.png",
    "/black_scissor.png",
  ];

  const [userImg, setUserImg] = useState("/rock.png");
  const [botImg, setBotImg] = useState("/black_rock.png");
  const [animate, setAnimate] = useState(false);
  const [result, setResult] = useState("Make a move");

  function determineResult(userImg, botImg) {
    if (userImg === botImg.replace('black_','')) {
      return "It's Tie";
    } else if (
      (userImg === "/rock.png" && botImg === "/black_scissor.png") ||
      (userImg === "/scissor.png" && botImg === "/black_paper.png") ||
      (userImg === "/paper.png" && botImg === "/black_rock.png")
    ) {
      return "You Win";
    } else {
      return "Bot Win";
    }
  }

  const handleClick = (userChoice) => {
    setUserImg('/rock.png');
    setBotImg('/black_rock.png');
    setAnimate(true);
    setResult("");

    setTimeout(() => {
    setAnimate(false);

    setUserImg(userChoice);
    const randomBotImg =
    botChoice[Math.floor(Math.random() * botChoice.length)];
    setBotImg(randomBotImg);

    const gameResult =determineResult(userChoice,randomBotImg);
    setResult(gameResult);
    


    }, 350);
  };
  return (
    <div className="container">
      <div className="con1">
         
        <div className="user_img">
       <label>You</label>
          <img src={userImg} alt="" className={animate ? "shake" : ""} />
        </div>
        <div className="vs">
          <img src="/vs3.png" alt=""/>
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
