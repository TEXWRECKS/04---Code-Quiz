    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      var output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          var answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
      {
        question: "What is a [] used for?",
        answers: {
            a: "Properties",
            b: "Array",
            c: "URL's"
        },
        correctAnswer: "b"
    },
    {
        question: "What is DOM?",
        answers: {
            a: "Document Object Model",
            b: "A nickname for Dominick",
            c: "The opposite of submissive"
        },
        correctAnswer: "a"
    },
    {
        question: "What is 'this' used for?",
        answers: {
            a: "To explain what you get (love) in the Pantera song",
            b: "Points to the a specific element, or if not told what to point to, will point to the window"
        },
        correctAnswer: "b"
    },
    {
        question: "What is NaN?",
        answers: {
            a: "Nick at Night",
            b: "Nine ant Nails",
            c: "Not a Number"
        },
        correctAnswer: "c"
    },
    {
        question: "What is API?",
        answers: {
            a: "High altitude wind gauge instrument",
            b: "Set of code features that developers can use in their apps to interact with components of a users web broswer, data sets, hardware/software on a user's computer, or 3rd party software and services",
            c: "Doc's hand console of instruments that ensure conditions are right to set off the flux capacitor"
        },
        correctAnswer: "b"
    },
    {
        question: "What is {} used for?",
        answers: {
            a: "Arby's curly fries",
            b: "Array",
            c: "Properties"
        },
        correctAnswer: "c"
      },
    ];
  
// Kick things off
buildQuiz();
  
// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
  
// Show the first slide
showSlide(currentSlide);
  
// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
;
  
