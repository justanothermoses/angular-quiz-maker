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

  get scoreStyle() {
    let backgroundColor = 'yellow'

    if (this.score <= 1) backgroundColor = 'red'
    if (this.score > this.maxScore - 2) backgroundColor = 'green'

    return {
      backgroundColor,
    }
  }
  createNewQuiz() {
    this.quiz.createNewQuiz()
  }
}
