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

  createNewQuiz() {
    this.quiz.createNewQuiz()
  }
}
