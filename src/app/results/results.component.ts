import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  constructor(public quiz: QuizService) { }

  ngOnInit(): void {
    if (!this.quiz.resultsAllowed) this.createNewQuiz()
  }

  get score() {
    return this.quiz.questions.filter(question => question.correct_answer === question.chosenAnswer).length
  }

  get maxScore() {
    return this.quiz.questions.length
  }

  get scoreClass() {
    let color = 'yellow'

    if (this.score <= 1) color = 'red'
    if (this.score > this.maxScore - 2) color = 'green'

    return `score-class-${color}`
  }
  createNewQuiz() {
    this.quiz.createNewQuiz()
  }
}
