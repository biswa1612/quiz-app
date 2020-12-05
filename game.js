const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const ProgressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Entomology is the science that studies?',
        choice1: 'Behavior of human beings',
        choice2: 'Insects',
        choice3: 'The origin and history of technical and scientific terms',
        choice4: 'The formation of rocks',
        answer: 2,
    },
    {
        question: 'For which of the following disciplines is Nobel Prize awarded?',
        choice1: 'Physics and Chemistry',
        choice2: 'Physiology or Medicine',
        choice3: 'Literature, Peace and Economics',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'First human heart transplant operation conducted by Dr. Christiaan Barnard on Louis Washkansky, was conducted in?',
        choice1: '1967',
        choice2: '1968',
        choice3: '1958',
        choice4: '1922',
        answer: 1,
    },
    {
        question: 'Galileo was an Italian astronomer who?',
        choice1: 'developed the telescope',
        choice2: 'discovered four satellites of Jupiter',
        choice3: 'discovered that the movement of pendulum produces a regular time measurement',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'Gravity setting chambers are used in industries to remove?',
        choice1: 'SOx',
        choice2: 'NOx',
        choice3: 'suspended particulate matter',
        choice4: 'CO',
        answer: 3,
    },
    {
        question: 'The words Satyameva Jayate inscribed below the base plate of the emblem of India are taken from?',
        choice1: 'Rigveda',
        choice2: 'Satpath Brahmana',
        choice3: 'Mundak Upanishad',
        choice4: 'Ramayana',
        answer: 3,
    },
    {
        question: 'The ratio of width of our National flag to its length is?',
        choice1: '3:5',
        choice2: '2:3',
        choice3: '2:4',
        choice4: '3:4',
        answer: 2,
    },
    {
        question: 'The difference between the squares of two odd numbers is always divisible by?',
        choice1: 'sum of the numbers',
        choice2: 'difference of the numbers',
        choice3: 'both the above',
        choice4: 'none of the above',
        answer: 3,
    },
    {
        question: 'How many meters will I be away from my home if I travel 5 metres towards north, take a right and travel 4 metres and travel 5 metres towards south?',
        choice1: '5',
        choice2: '4',
        choice3: '10',
        choice4: '14',
        answer: 2,
    },
    {
        question: 'What is the one thing Biswajit loves the most?',
        choice1: 'Food',
        choice2: 'Money',
        choice3: 'Cricket',
        choice4: 'Friends',
        answer: 3,
    }

]
const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')

    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    ProgressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText =currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}
startGame()