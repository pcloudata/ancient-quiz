const quizData = [
    {
        question: "Which ancient Indian mathematician is known for inventing the concept of zero?",
        options: ["Aryabhata", "Brahmagupta", "Varahamihira", "Srinivasa Ramanujan"],
        correct: 1,
        clue: "This mathematician lived during the 7th century CE and wrote the Brahmasphutasiddhanta"
    },
    {
        question: "What ancient Indian text contains the earliest known use of the decimal system?",
        options: ["Bhagavad Gita", "Bhakshali Manuscript", "Rig Veda", "Yajur Veda"],
        correct: 1,
        clue: "This manuscript was discovered in 1881 near the village of Bakhshali and dates back to the 3rd century CE"
    },
    {
        question: "Who among these ancient Indian scientists developed the concept of gravity?",
        options: ["Acharya Kanad", "Bhaskaracharya", "Varahamihira", "Aryabhata"],
        correct: 3,
        clue: "This 5th century CE mathematician and astronomer wrote the Aryabhatiya and discussed the motion of celestial bodies"
    },
    {
        question: "Which ancient Indian text contains detailed astronomical calculations?",
        options: ["Surya Siddhanta", "Natyashastra", "Arthashastra", "Kamasutra"],
        correct: 0,
        clue: "This text provides calculations for planetary positions and eclipses, and dates back to the 4th century CE"
    },
    {
        question: "Who is credited with the invention of the sine function in trigonometry?",
        options: ["Aryabhata", "Brahmagupta", "Varahamihira", "Bhaskaracharya"],
        correct: 0,
        clue: "This 5th century CE mathematician introduced the concept of sine and cosine in his work Aryabhatiya"
    },
    {
        question: "Which ancient Indian text is considered the world's first pharmacopoeia?",
        options: ["Sushruta Samhita", "Charaka Samhita", "Bhagavad Gita", "Atharva Veda"],
        correct: 1,
        clue: "This text, written by Charaka in the 2nd century CE, is one of the foundational texts of Ayurveda"
    },
    {
        question: "Who among these ancient Indian scholars first calculated the circumference of Earth?",
        options: ["Aryabhata", "Bhaskaracharya", "Varahamihira", "Brahmagupta"],
        correct: 0,
        clue: "This 5th century CE mathematician made remarkably accurate calculations of Earth's circumference"
    },
    {
        question: "Which ancient Indian text contains detailed descriptions of surgical procedures?",
        options: ["Charaka Samhita", "Sushruta Samhita", "Ashtanga Hridaya", "Bhagavad Gita"],
        correct: 1,
        clue: "This text, attributed to Sushruta, is one of the most important ancient texts on surgery"
    },
    {
        question: "Who among these ancient Indian scientists accurately calculated the value of pi?",
        options: ["Acharya Kanad", "Bhaskaracharya", "Aryabhata", "Varahamihira"],
        correct: 2,
        clue: "This 5th century CE mathematician calculated pi to be approximately 3.1416"
    },
    {
        question: "Which ancient Indian text contains the earliest known systematic treatment of algebra?",
        options: ["Brahmasphutasiddhanta", "Lilavati", "Aryabhatiya", "Surya Siddhanta"],
        correct: 0,
        clue: "This text, written by Brahmagupta, introduced rules for arithmetic operations including zero"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    
    // Reset clue display
    const clueDisplay = document.getElementById('clue-display');
    clueDisplay.classList.add('hidden');
    clueDisplay.textContent = '';
    
    optionsElement.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });

    // Enable the clue button
    const clueBtn = document.getElementById('clue-btn');
    clueBtn.onclick = () => showClue(currentQuizData.clue);
    clueBtn.disabled = false;
}

function showClue(clueText) {
    const clueDisplay = document.getElementById('clue-display');
    const clueBtn = document.getElementById('clue-btn');
    
    // Show the clue and disable the button
    clueDisplay.textContent = clueText;
    clueDisplay.classList.remove('hidden');
    clueBtn.disabled = true;
}

function selectOption(selectedOption) {
    const currentQuizData = quizData[currentQuestion];
    
    // Disable all buttons
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Highlight correct and wrong answers
    if (selectedOption === currentQuizData.correct) {
        buttons[selectedOption].classList.add('correct');
        score++;
    } else {
        buttons[selectedOption].classList.add('wrong');
        buttons[currentQuizData.correct].classList.add('correct');
    }

    scoreElement.textContent = score;
    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        nextButton.classList.add('hidden');
    } else {
        alert(`Quiz completed! Your final score is ${score} out of ${quizData.length}`);
        currentQuestion = 0;
        score = 0;
        scoreElement.textContent = score;
        loadQuestion();
    }
}

// Initialize the quiz
loadQuestion();

// Add event listener to next button
nextButton.addEventListener('click', nextQuestion);
