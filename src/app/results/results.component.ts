import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  constructor(public quiz: QuizService) { }

  get score() {
    return this.quiz.questions.filter(question => question.correct_answer === question.chosenAnswer).length
  }

  get maxScore() {
    return this.quiz.questions.length
  }
}
