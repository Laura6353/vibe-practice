// 퀴즈 문제 데이터 (선생님께서 원하시는 대로 수정/추가 가능합니다!)
const quizData = [
    {
        question: "다음 중 '방울토마토'를 뜻하는 올바른 영어 단어는 무엇일까요?",
        options: ["Tomato", "Cherry Tomato", "Bubble Tomato", "Tiny Red Pumpkin"],
        answer: 1 // options 배열의 인덱스 (0 = 첫 번째)
    },
    {
        question: "빈칸에 들어갈 알맞은 be동사를 고르세요.\n'He ____ a middle school student.'",
        options: ["am", "are", "is", "be"],
        answer: 2 // 2 = 세 번째 ('is')
    },
    {
        question: "주말에 만난 친구에게 '좋은 주말 보내!'라고 인사하고 싶을 때 알맞은 표현은?",
        options: ["Good morning!", "Have a nice weekend!", "Happy birthday!", "Thank you."],
        answer: 1 // 1 = 두 번째
    }
];

let currentQuestionIndex = 0;
let score = 0;

// HTML 요소 가져오기
const questionNumEl = document.getElementById("question-num");
const questionTextEl = document.getElementById("question-text");
const optionsBoxEl = document.getElementById("options-box");
const quizBoxEl = document.getElementById("quiz-box");
const resultBoxEl = document.getElementById("result-box");
const scoreTextEl = document.getElementById("score-text");

// 퀴즈 시작 함수
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBoxEl.classList.remove("hide");
    resultBoxEl.classList.add("hide");
    showQuestion();
}

// 문제를 화면에 표시하는 함수
function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    
    // 문제 번호 및 문제 내용 변경
    questionNumEl.innerText = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
    questionTextEl.innerText = currentQuestion.question;

    // 보기 버튼 생성
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(index));
        optionsBoxEl.appendChild(button);
    });
}

// 이전 보기 버튼들을 지우는 함수
function resetState() {
    while (optionsBoxEl.firstChild) {
        optionsBoxEl.removeChild(optionsBoxEl.firstChild);
    }
}

// 사용자가 답을 선택했을 때 실행되는 함수
function selectAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // 정답 체크 (알림창으로 피드백 제공 후 다음 문제로)
    if (selectedIndex === currentQuestion.answer) {
        alert("정답입니다! 🎉");
        score++;
    } else {
        alert(`아쉬워요! 정답은 '${currentQuestion.options[currentQuestion.answer]}' 입니다. 🥲`);
    }

    currentQuestionIndex++;

    // 다음 문제가 있으면 보여주고, 없으면 결과 화면으로
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 결과 화면을 보여주는 함수
function showResult() {
    quizBoxEl.classList.add("hide");
    resultBoxEl.classList.remove("hide");
    scoreTextEl.innerText = `${quizData.length}문제 중 ${score}문제를 맞췄어요!`;
}

// 다시 하기 기능
function restartQuiz() {
    startQuiz();
}

// 웹사이트가 로드되면 자동으로 퀴즈 시작
startQuiz();
