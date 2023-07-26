import { Component, Input } from '@angular/core';
import { Question } from '../question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question: Question | null = null;

  constructor() { }

  answers(question: Question): string[] {
    const answers = [
      question.correct_answer,
      ...question.incorrect_answers
    ]
    return answers.sort(() => Math.random() - 0.5)
  }
}
