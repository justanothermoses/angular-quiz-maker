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

  getButtonClass(option: string) {
    if (this.question?.correct_answer === option) return 'mat-button-toggle-is-right'
    
    if (this.question?.chosenAnswer === option) return 'mat-button-toggle-is-wrong'

    return ''
  }
}
