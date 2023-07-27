import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  constructor(public quiz: QuizService) { }

  get showSubmitButton() {
    return this.quiz.questions.every(question => !!question.chosenAnswer)
  }

  onSubmit(): void {
    this.quiz.checkAnswers()
  }
}
