import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuizService } from '../quiz.service';
import { Difficulty } from '../difficulty';

@Component({
  selector: 'app-quiz-generator',
  templateUrl: './quiz-generator.component.html',
  styleUrls: ['./quiz-generator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuizGeneratorComponent {
  public difficulties = Difficulty;
  public quizSettings = new FormGroup({
    category: new FormControl(''),
    difficulty: new FormControl('')
  });

  constructor(public quiz: QuizService) { }

  onSubmit(): void {
    const { category, difficulty } = this.quizSettings.value
    if (!category || !difficulty) return

    this.quiz.fetchQuestions(category, difficulty)
  }
}
