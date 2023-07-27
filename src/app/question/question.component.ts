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
    if (!this.quiz.showResults) return null
    return this.question?.chosenAnswer === this.question?.correct_answer
  }
}
