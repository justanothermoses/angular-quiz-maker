import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Question } from '../question';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
  @Input() question: Question | null = null;

  constructor(public quiz: QuizService) { }

  get isRight() {
    return this.question?.chosenAnswer === this.question?.correct_answer
  }

  get showResults() {
    return window.location.pathname === '/results'
  }

  getButtonStyle(option: string) {
    let backgroundColor, color

    if (this.question?.chosenAnswer === option) {
      backgroundColor = 'red'
      color = 'white', color
    }

    if (this.question?.correct_answer === option) {
      backgroundColor = 'green'
      color = 'white'
    }

    return {
      backgroundColor,
      color
    }
  }
}
