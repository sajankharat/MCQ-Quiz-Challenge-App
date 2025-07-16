# 🧠 MCQ Quiz App

A comprehensive Multiple Choice Question (MCQ) quiz application with scoring, timer, results analysis, and custom question support via JSON files.

## ✨ Features

### Core Features
- **Interactive MCQ Interface**: Clean, responsive design with smooth animations
- **Timer System**: Configurable time limits per question with visual warnings
- **Scoring System**: Real-time score tracking with detailed performance metrics
- **Results Analysis**: Comprehensive results screen with statistics and performance feedback
- **Answer Review**: Detailed review of all questions with explanations
- **Progress Tracking**: Visual progress bar and question counter

### Advanced Features
- **Custom Questions**: Upload your own quiz questions via JSON files
- **Keyboard Shortcuts**: Quick navigation using keyboard (A-D for options, Enter for next, Space to skip)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Performance Analytics**: Time tracking, accuracy metrics, and personalized feedback
- **Multiple Quiz Types**: Switch between default and custom quizzes seamlessly

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in your web browser
2. Choose "Default Quiz" to start with pre-loaded questions
3. Or upload a custom JSON file with your own questions
4. Answer questions within the time limit
5. Review your results and performance

### Custom Quiz Setup
1. Create a JSON file following the format shown below
2. Click "Upload Questions" on the welcome screen
3. Select your JSON file
4. The quiz will automatically load your custom questions

## 📋 Custom Quiz JSON Format

```json
{
  "title": "My Custom Quiz",
  "timePerQuestion": 30,
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "correct": 2,
      "explanation": "Paris is the capital and largest city of France."
    },
    {
      "question": "Which planet is known as the Red Planet?",
      "options": ["Venus", "Mars", "Jupiter", "Saturn"],
      "correct": 1,
      "explanation": "Mars is called the Red Planet due to iron oxide on its surface."
    }
  ]
}
```

### JSON Structure Explanation
- **title** (optional): Name of your quiz
- **timePerQuestion** (optional): Time limit per question in seconds (default: 30)
- **questions** (required): Array of question objects
  - **question** (required): The question text
  - **options** (required): Array of answer choices (minimum 2, maximum 6)
  - **correct** (required): Index of correct answer (0-based)
  - **explanation** (optional): Explanation shown in review

## 🎮 How to Play

### During the Quiz
1. **Read the Question**: Each question is displayed with multiple choice options
2. **Select an Answer**: Click on your chosen option (A, B, C, or D)
3. **Watch the Timer**: Keep an eye on the countdown timer
4. **Navigate**: Use "Next Question" to proceed or "Skip" to skip
5. **Keyboard Shortcuts**: 
   - Press A-D keys to select options
   - Press Enter to go to next question
   - Press Space to skip question

### Scoring System
- **Correct Answer**: +1 point
- **Wrong Answer**: 0 points
- **Skipped Question**: 0 points
- **Time Bonus**: No additional points for speed (focus on accuracy)

## 📊 Results & Analytics

### Performance Metrics
- **Final Score**: Total correct answers out of total questions
- **Percentage**: Your accuracy percentage
- **Correct Answers**: Number of questions answered correctly
- **Wrong Answers**: Number of incorrect responses
- **Skipped Questions**: Number of questions skipped
- **Total Time**: Time taken to complete the quiz

### Performance Feedback
- **90%+**: Outstanding! You're a quiz master! 🏆
- **80-89%**: Excellent work! Great knowledge! 🎉
- **70-79%**: Good job! Keep it up! 👍
- **60-69%**: Not bad! Room for improvement! 📚
- **Below 60%**: Keep studying and try again! 💪

### Answer Review
- View all questions with your answers
- See correct answers for missed questions
- Read explanations for better understanding
- Identify areas for improvement

## 🛠️ Technical Features

### Responsive Design
- **Desktop**: Full-featured experience with keyboard shortcuts
- **Tablet**: Touch-optimized interface with larger buttons
- **Mobile**: Streamlined layout for small screens

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

### Performance
- Lightweight and fast loading
- Smooth animations and transitions
- Efficient memory usage
- No external dependencies (except Google Fonts)

## 📁 File Structure

```
quiz-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── sample-quiz.json    # Example custom quiz
└── README.md          # Documentation
```

## 🎨 Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- CSS variables make it easy to customize the theme
- Responsive breakpoints can be adjusted for different devices

### Functionality
- Edit `script.js` to add new features
- Modify default questions in the `loadDefaultQuestions()` method
- Adjust timer settings and scoring logic

### Questions
- Create multiple JSON files for different quiz topics
- Share quiz files with others
- Build a library of custom quizzes

## 🔧 Advanced Usage

### Creating Quiz Collections
1. Create multiple JSON files for different topics
2. Organize them in folders by subject
3. Load different quizzes for varied practice

### Educational Use
- Perfect for classroom assessments
- Create subject-specific quizzes
- Track student progress over time
- Use explanations for learning reinforcement

### Training and Certification
- Corporate training assessments
- Certification practice tests
- Skill evaluation tools
- Knowledge retention testing

## 🐛 Troubleshooting

### Common Issues
1. **JSON Upload Fails**: Check JSON syntax and format
2. **Timer Not Working**: Ensure JavaScript is enabled
3. **Mobile Display Issues**: Try refreshing the page
4. **Keyboard Shortcuts Not Working**: Click on the quiz area first

### JSON Validation
- Use online JSON validators to check file format
- Ensure all required fields are present
- Check that answer indices are within range
- Verify that options array has at least 2 items

## 🚀 Future Enhancements

### Planned Features
- [ ] Question categories and difficulty levels
- [ ] Multiplayer quiz competitions
- [ ] Progress tracking across sessions
- [ ] Export results to PDF
- [ ] Audio questions support
- [ ] Image-based questions
- [ ] Timed quiz modes (entire quiz timer)
- [ ] Leaderboard system

### Contributing
Feel free to suggest improvements or report issues. The app is designed to be easily extensible for additional features.

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy your quiz experience! 🎯**