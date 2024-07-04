
/* TO-Doجزئية ال*/

function addTask() {
    // الحصول على حقل الإدخال وقيمته
    var taskInput = document.getElementById("task");
    var taskValue = taskInput.value;
  
    // إنشاء عنصر قائمة جديد ومربع اختيار
    var li = document.createElement("li");
    li.classList.add('task');
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.appendChild(checkbox);
  
    // إضافة نص المهمة إلى عنصر القائمة
    var textNode = document.createTextNode(taskValue);
    var taskSpan = document.createElement("span");
    taskSpan.classList.add('task-text');
    taskSpan.appendChild(textNode);
    li.appendChild(taskSpan);
  
    // إنشاء زر التحرير وزر الحذف وإضافتهما إلى عنصر القائمة
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add('edit-btn');
    li.appendChild(editButton);
  
    var deleteButton = document.createElement("button");
    var deleteIcon = document.createElement("img");
    deleteIcon.src = "bicon2.png"; 
    deleteIcon.alt = "Delete";
    deleteIcon.classList.add('delete-icon');
    deleteButton.appendChild(deleteIcon);
    deleteButton.classList.add('delete-btn');
    li.appendChild(deleteButton);
  
    // إضافة عنصر القائمة إلى قائمة المهام
    var ul = document.getElementById("task-list");
    ul.appendChild(li);
  
    // مسح حقل الإدخال
    taskInput.value = "";
    //نهاية التغييرات

    // إضافة محدث حدث لمربع الاختيار
    checkbox.addEventListener('change', function() {
      li.classList.toggle('completed');
    });
  
    // إضافة محدث حدث لزر الحذف
    deleteButton.addEventListener('click', function() {
      ul.removeChild(li);
    });
  
    // إضافة محدث حدث لزر التحرير
    editButton.addEventListener('click', function() {
      if (editButton.innerText === "Edit") {
        // تغيير النص إلى حقل إدخال
        var input = document.createElement("input");
        input.type = "text";
        input.value = taskSpan.textContent;
        li.insertBefore(input, taskSpan);
        li.removeChild(taskSpan);
        editButton.innerText = "Save";
      } else {
        // حفظ التعديلات
        var newText = li.querySelector("input[type='text']").value;
        taskSpan.textContent = newText;
        li.insertBefore(taskSpan, li.querySelector("input[type='text']"));
        li.removeChild(li.querySelector("input[type='text']"));
        editButton.innerText = "Edit";
      }
    });
  }

  //حذف الكل

  function deleteAllTasks() {
    var ul = document.getElementById("task-list");
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }

  // الحصول على جميع المهام الحالية
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      task.classList.toggle('completed');
    });
  
    const deleteButton = task.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      task.parentElement.removeChild(task);
    });
  
    const editButton = task.querySelector('.edit-btn');
    editButton.addEventListener('click', () => {
      const taskSpan = task.querySelector('.task-text');
      if (editButton.innerText === "Edit") {
        // تغيير النص إلى حقل إدخال
        var input = document.createElement("input");
        input.type = "text";
        input.value = taskSpan.textContent;
        task.insertBefore(input, taskSpan);
        task.removeChild(taskSpan);
        editButton.innerText = "Save";
      } else {
        // حفظ التعديلات
        var newText = task.querySelector("input[type='text']").value;
        taskSpan.textContent = newText;
        task.insertBefore(taskSpan, task.querySelector("input[type='text']"));
        task.removeChild(task.querySelector("input[type='text']"));
        editButton.innerText = "Edit";
      }
    });
  });



  //جزئية الكويز
  
  const questions = [/* الأسئلة */
    {
        question:"What does HTML stand for?",
        answers: [
            { text: "a) Hyper Text Markup Language", correct: true },
            { text: "b) Hyperlinks and Text Markup Language", correct: false },
            { text: "c) Home Tool Markup Language", correct: false },
            { text: "d) Hyperlinks and Text Modeling Language", correct: false }
        ]
    },
    {
        question: "Which of the following is a JavaScript framework?",
        answers: [
            { text: "a) Laravel", correct: false },
            { text: "b) React", correct: true },
            { text: "c) Django", correct: false },
            { text: "d) Flask", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        answers: [
            { text: "a) font-color", correct: false },
            { text: "b) text-color", correct: false },
            { text: "c) color", correct: true },
            { text: "d) background-color", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "a) Computer Style Sheets", correct: false },
            { text: "b) Creative Style Sheets", correct: false },
            { text: "c) Colorful Style Sheets", correct: false },
            { text: "d) Cascading Style Sheets", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

/*نهاية جزئية الكويز */

  