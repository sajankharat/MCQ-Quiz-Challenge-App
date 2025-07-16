// Quiz App JavaScript
class QuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.timer = null;
        this.questions = [];
        this.userAnswers = [];
        this.quizStartTime = null;
        this.quizEndTime = null;
        this.timePerQuestion = 30;
        
        this.initializeApp();
    }

    initializeApp() {
        this.loadDefaultQuestions();
        this.bindEvents();
        this.showScreen('welcome-screen');
    }

    loadDefaultQuestions() {
        this.questions = [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                correct: 2,
                explanation: "Paris is the capital and largest city of France, located in the north-central part of the country."
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct: 1,
                explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface, giving it a reddish appearance."
            },
            {
                question: "What is the largest mammal in the world?",
                options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                correct: 1,
                explanation: "The Blue Whale is the largest animal ever known to have lived on Earth, reaching lengths of up to 100 feet."
            },
            {
                question: "In which year did World War II end?",
                options: ["1944", "1945", "1946", "1947"],
                correct: 1,
                explanation: "World War II ended in 1945 with the surrender of Japan on September 2, 1945."
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                correct: 2,
                explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum' meaning gold."
            },
            {
                question: "Which is the longest river in the world?",
                options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
                correct: 1,
                explanation: "The Nile River is traditionally considered the longest river in the world at approximately 4,135 miles."
            },
            {
                question: "What is the smallest country in the world?",
                options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
                correct: 2,
                explanation: "Vatican City is the smallest sovereign state in the world, with an area of approximately 0.17 square miles."
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                correct: 2,
                explanation: "The Mona Lisa was painted by Leonardo da Vinci between 1503 and 1519, and is housed in the Louvre Museum."
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Iron", "Diamond", "Platinum"],
                correct: 2,
                explanation: "Diamond is the hardest naturally occurring substance, rating 10 on the Mohs scale of mineral hardness."
            },
            {
                question: "Which gas makes up about 78% of Earth's atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                correct: 2,
                explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere, with oxygen comprising about 21%."
            }
        ];
    }

    bindEvents() {
        // Welcome screen events
        document.getElementById('start-default-quiz').addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('upload-custom-quiz').addEventListener('click', () => {
            document.getElementById('custom-quiz-file').click();
        });

        document.getElementById('custom-quiz-file').addEventListener('change', (e) => {
            this.handleCustomQuizUpload(e);
        });

        // Quiz screen events
        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('skip-question').addEventListener('click', () => {
            this.skipQuestion();
        });

        // Results screen events
        document.getElementById('restart-quiz').addEventListener('click', () => {
            this.restartQuiz();
        });

        document.getElementById('new-quiz').addEventListener('click', () => {
            this.newQuiz();
        });

        document.getElementById('review-answers').addEventListener('click', () => {
            this.showReview();
        });

        // Review screen events
        document.getElementById('back-to-results').addEventListener('click', () => {
            this.showScreen('results-screen');
        });

        // Modal events
        document.querySelector('.close').addEventListener('click', () => {
            this.hideModal();
        });

        // Show custom quiz instructions
        document.getElementById('upload-custom-quiz').addEventListener('mouseenter', () => {
            this.showModal();
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('custom-quiz-modal');
            if (e.target === modal) {
                this.hideModal();
            }
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    showModal() {
        document.getElementById('custom-quiz-modal').classList.add('active');
    }

    hideModal() {
        document.getElementById('custom-quiz-modal').classList.remove('active');
    }

    showLoading() {
        document.getElementById('loading-overlay').classList.add('active');
    }

    hideLoading() {
        document.getElementById('loading-overlay').classList.remove('active');
    }

    async handleCustomQuizUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.showLoading();

        try {
            const text = await file.text();
            const customQuiz = JSON.parse(text);
            
            if (this.validateCustomQuiz(customQuiz)) {
                this.questions = customQuiz.questions;
                this.timePerQuestion = customQuiz.timePerQuestion || 30;
                
                setTimeout(() => {
                    this.hideLoading();
                    this.startQuiz();
                }, 1000);
            } else {
                throw new Error('Invalid quiz format');
            }
        } catch (error) {
            this.hideLoading();
            alert('Error loading custom quiz: ' + error.message + '\n\nPlease check the JSON format and try again.');
        }

        // Reset file input
        event.target.value = '';
    }

    validateCustomQuiz(quiz) {
        if (!quiz.questions || !Array.isArray(quiz.questions)) {
            return false;
        }

        for (let q of quiz.questions) {
            if (!q.question || !q.options || !Array.isArray(q.options) || 
                q.options.length < 2 || typeof q.correct !== 'number' ||
                q.correct < 0 || q.correct >= q.options.length) {
                return false;
            }
        }

        return true;
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizStartTime = new Date();
        this.timeLeft = this.timePerQuestion;
        
        this.showScreen('quiz-screen');
        this.displayQuestion();
        this.startTimer();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update question counter and progress
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
        
        const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        
        // Display question
        document.getElementById('question-text').textContent = question.question;
        
        // Display options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            `;
            
            optionElement.addEventListener('click', () => {
                this.selectOption(index);
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Reset controls
        document.getElementById('next-question').disabled = true;
        this.timeLeft = this.timePerQuestion;
        this.updateTimerDisplay();
    }

    selectOption(selectedIndex) {
        // Remove previous selections
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Mark selected option
        document.querySelectorAll('.option')[selectedIndex].classList.add('selected');
        
        // Enable next button
        document.getElementById('next-question').disabled = false;
        
        // Store user answer
        this.userAnswers[this.currentQuestionIndex] = {
            selected: selectedIndex,
            correct: this.questions[this.currentQuestionIndex].correct,
            isCorrect: selectedIndex === this.questions[this.currentQuestionIndex].correct,
            timeSpent: this.timePerQuestion - this.timeLeft
        };
        
        if (selectedIndex === this.questions[this.currentQuestionIndex].correct) {
            this.score++;
        }
    }

    skipQuestion() {
        this.userAnswers[this.currentQuestionIndex] = {
            selected: null,
            correct: this.questions[this.currentQuestionIndex].correct,
            isCorrect: false,
            skipped: true,
            timeSpent: this.timePerQuestion - this.timeLeft
        };
        
        this.nextQuestion();
    }

    nextQuestion() {
        this.stopTimer();
        
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.startTimer();
        } else {
            this.endQuiz();
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 10) {
                document.querySelector('.timer').classList.add('warning');
            }
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        document.querySelector('.timer').classList.remove('warning');
    }

    updateTimerDisplay() {
        document.getElementById('time-left').textContent = this.timeLeft;
    }

    timeUp() {
        this.stopTimer();
        
        // Auto-skip if no answer selected
        if (!this.userAnswers[this.currentQuestionIndex]) {
            this.skipQuestion();
        } else {
            this.nextQuestion();
        }
    }

    endQuiz() {
        this.quizEndTime = new Date();
        this.showResults();
    }

    showResults() {
        this.showScreen('results-screen');
        
        const correctAnswers = this.userAnswers.filter(answer => answer.isCorrect).length;
        const wrongAnswers = this.userAnswers.filter(answer => !answer.isCorrect && !answer.skipped).length;
        const skippedAnswers = this.userAnswers.filter(answer => answer.skipped).length;
        const percentage = Math.round((correctAnswers / this.questions.length) * 100);
        
        // Calculate total time taken
        const timeTaken = Math.floor((this.quizEndTime - this.quizStartTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update results display
        document.getElementById('final-score').textContent = correctAnswers;
        document.getElementById('total-score').textContent = this.questions.length;
        document.getElementById('score-percentage').textContent = percentage + '%';
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('wrong-answers').textContent = wrongAnswers;
        document.getElementById('skipped-answers').textContent = skippedAnswers;
        document.getElementById('time-taken').textContent = timeString;
        
        // Performance message
        let message = '';
        if (percentage >= 90) {
            message = '🏆 Outstanding! You\'re a quiz master!';
        } else if (percentage >= 80) {
            message = '🎉 Excellent work! Great knowledge!';
        } else if (percentage >= 70) {
            message = '👍 Good job! Keep it up!';
        } else if (percentage >= 60) {
            message = '📚 Not bad! Room for improvement!';
        } else {
            message = '💪 Keep studying and try again!';
        }
        
        document.getElementById('performance-message').textContent = message;
        
        // Animate score circle
        this.animateScore(percentage);
    }

    animateScore(percentage) {
        const circle = document.querySelector('.score-circle');
        circle.style.background = `conic-gradient(#667eea 0deg, #667eea ${percentage * 3.6}deg, #e9ecef ${percentage * 3.6}deg, #e9ecef 360deg)`;
        
        // Animate the score number
        let currentScore = 0;
        const targetScore = parseInt(document.getElementById('final-score').textContent);
        const increment = targetScore / 30; // Animate over 30 frames
        
        const scoreAnimation = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(scoreAnimation);
            }
            document.getElementById('final-score').textContent = Math.floor(currentScore);
        }, 50);
    }

    showReview() {
        this.showScreen('review-screen');
        
        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const reviewItem = document.createElement('div');
            reviewItem.className = `review-item ${userAnswer.skipped ? 'skipped' : (userAnswer.isCorrect ? 'correct' : 'incorrect')}`;
            
            let statusIcon = '';
            let statusText = '';
            
            if (userAnswer.skipped) {
                statusIcon = '⏭️';
                statusText = 'Skipped';
            } else if (userAnswer.isCorrect) {
                statusIcon = '✅';
                statusText = 'Correct';
            } else {
                statusIcon = '❌';
                statusText = 'Incorrect';
            }
            
            let reviewHTML = `
                <div class="review-question">
                    ${statusIcon} Question ${index + 1}: ${question.question}
                </div>
                <div class="review-options">
            `;
            
            if (!userAnswer.skipped) {
                reviewHTML += `
                    <div class="review-option user-answer">${question.options[userAnswer.selected]}</div>
                `;
            }
            
            if (!userAnswer.isCorrect) {
                reviewHTML += `
                    <div class="review-option correct-answer">${question.options[userAnswer.correct]}</div>
                `;
            }
            
            reviewHTML += '</div>';
            
            if (question.explanation) {
                reviewHTML += `
                    <div class="review-explanation">
                        💡 ${question.explanation}
                    </div>
                `;
            }
            
            reviewItem.innerHTML = reviewHTML;
            reviewList.appendChild(reviewItem);
        });
    }

    restartQuiz() {
        this.startQuiz();
    }

    newQuiz() {
        this.loadDefaultQuestions();
        this.timePerQuestion = 30;
        this.showScreen('welcome-screen');
    }
}

// Initialize the quiz app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Add some utility functions for enhanced user experience
document.addEventListener('keydown', (e) => {
    const currentScreen = document.querySelector('.screen.active').id;
    
    if (currentScreen === 'quiz-screen') {
        // Allow A, B, C, D keys to select options
        const keyCode = e.key.toLowerCase();
        if (['a', 'b', 'c', 'd'].includes(keyCode)) {
            const optionIndex = keyCode.charCodeAt(0) - 97; // Convert to 0-3
            const options = document.querySelectorAll('.option');
            if (options[optionIndex]) {
                options[optionIndex].click();
            }
        }
        
        // Enter key to go to next question
        if (e.key === 'Enter' && !document.getElementById('next-question').disabled) {
            document.getElementById('next-question').click();
        }
        
        // Space key to skip
        if (e.key === ' ') {
            e.preventDefault();
            document.getElementById('skip-question').click();
        }
    }
});

// Add visual feedback for keyboard shortcuts
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-hint {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .keyboard-hint.show {
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .keyboard-hint {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show keyboard hints during quiz
    const showKeyboardHints = () => {
        if (document.querySelector('.screen.active').id === 'quiz-screen') {
            const hint = document.createElement('div');
            hint.className = 'keyboard-hint';
            hint.innerHTML = 'Shortcuts: A-D to select • Enter for next • Space to skip';
            document.body.appendChild(hint);
            
            setTimeout(() => hint.classList.add('show'), 100);
            
            setTimeout(() => {
                hint.classList.remove('show');
                setTimeout(() => hint.remove(), 300);
            }, 3000);
        }
    };
    
    // Show hints when quiz starts
    document.getElementById('start-default-quiz').addEventListener('click', () => {
        setTimeout(showKeyboardHints, 1000);
    });
});