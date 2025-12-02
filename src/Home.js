import { useState } from "react";
import "./home.css";


export function Home() {
  const buttonImg = [
    process.env.PUBLIC_URL + "/hello.png",
    process.env.PUBLIC_URL + "/fist.png",
    process.env.PUBLIC_URL + "/peace.png",
  ];
  const userChoice = [
    process.env.PUBLIC_URL + "/paper.png",
    process.env.PUBLIC_URL + "/rock.png",
    process.env.PUBLIC_URL + "/scissor.png",
  ];
  const botChoice = [
    process.env.PUBLIC_URL + "/black_paper.png",
    process.env.PUBLIC_URL + "/black_rock.png",
    process.env.PUBLIC_URL + "/black_scissor.png",
  ];

  const [userImg, setUserImg] = useState(process.env.PUBLIC_URL + "/rock.png");
  const [botImg, setBotImg] = useState(process.env.PUBLIC_URL + "/black_rock.png");
  const [animate, setAnimate] = useState(false);
  const [result, setResult] = useState("Make a move");

  function determineResult(userImg, botImg) {
    if (userImg === botImg.replace('black_','')) {
      return "It's Tie";
    } else if (
      (userImg === process.env.PUBLIC_URL + "/rock.png" && botImg === process.env.PUBLIC_URL + "/black_scissor.png") ||
      (userImg === process.env.PUBLIC_URL + "/scissor.png" && botImg === process.env.PUBLIC_URL + "/black_paper.png") ||
      (userImg === process.env.PUBLIC_URL + "/paper.png" && botImg === process.env.PUBLIC_URL + "/black_rock.png")
    ) {
      return "You Win";
    } else {
      return "Bot Win";
    }
  }

  const handleClick = (userChoice) => {
    setUserImg(process.env.PUBLIC_URL + '/rock.png');
    setBotImg(process.env.PUBLIC_URL + '/black_rock.png');
    setAnimate(true);
    setResult("");

    setTimeout(() => {
    setAnimate(false);

    setUserImg(userChoice);
    const randomBotImg =
    botChoice[Math.floor(Math.random() * botChoice.length)];
    setUserImg(userChoice);
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
          <img src={process.env.PUBLIC_URL + "/vs3.png"} alt=""/>
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
