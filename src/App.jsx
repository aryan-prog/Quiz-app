import React, { useState,useEffect } from 'react';
import './App.css'

function App() {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
    {
			questionText: 'Who has scored 100 centuries in cricket',
			answerOptions: [
				{ answerText: 'Don Bradman', isCorrect: false },
				{ answerText: 'Jaques Kallis', isCorrect: false },
				{ answerText: 'M.S. Dhoni', isCorrect: false },
				{ answerText: 'Sachin Tendulkar', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [currentColor, setCurrentColor] = useState('#5E5DF0');
	const [buttonText, setButtonText] = useState('Result');
	const [timer, setTimer] = useState(10); // Initialize the timer with 10 seconds


	const changeColor = (isCorrect) => {
		let newColor='#5E5DF0';
		let newText='Result';
		if(isCorrect)
		{
			newColor='#198754';
			newText='Correct';
		}
		else
		{
			newColor='#FA113D';
			newText='Wrong';
		}

		setCurrentColor(newColor);
		setButtonText(newText);
	  };

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}
		changeColor(isCorrect);
		handleNextClick();
	};

  const handleNextClick = () =>{
    const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setTimeout(() => {
				setCurrentQuestion(nextQuestion);
				setTimer(10);
			  }, 500);
		} else {
			setShowScore(true);
		}
  }

  const handleTimeout = () => {
    handleNextClick();
  };

  useEffect(() => {
    // Start the timer when the component mounts
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(timerInterval);
          handleTimeout(); // Timer reached 0, handle timeout
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

	if (showScore) {
		clearInterval(timerInterval);
	}

    return () => {
      clearInterval(timerInterval); // Clear the timer interval on unmount
    };
  }, [currentQuestion,showScore]);
  
	return (
    <>
	<div className='timer'>
        <h3>Time Left: {timer} seconds</h3>
      </div>
    <h1>Quiz App</h1>
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className='answer-button' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
    <button className='next-button' onClick={handleNextClick}>Next</button>
	<button className='result-button' style={{ backgroundColor: currentColor }}>{buttonText}</button>
    </>
	);
}

export default App;