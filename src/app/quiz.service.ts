import { Injectable } from '@angular/core';
import { Question } from './question';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Difficulty } from './difficulty';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private origin = 'https://opentdb.com'
  private questionsAmount = '5'
  private questionsType = 'multiple'

  public questions: Question[] = []
  public categories: Category[] = [];
  public difficulties: Difficulty[] = [
    {
      value: 'easy',
      label: 'Easy'
    },
    {
      value: 'medium',
      label: 'Medium'
    },
    {
      value: 'hard',
      label: 'Hard'
    }
  ]

  constructor(private http: HttpClient, private router: Router) {
    this.fetchCategories()
  }

  get resultsAllowed() {
    if (this.questions.length === 0) return false
    return this.questions.every(question => !!question.chosenAnswer)
  }

  fetchCategories(): void {
    const url = `${this.origin}/api_category.php`
    const categories$ = this.http.get<{ trivia_categories: Category[] }>(url)
    lastValueFrom(categories$).then(response => this.categories = response.trivia_categories)
  }

  async fetchQuestions(category: string, difficulty: string): Promise<void> {
    const url = `${this.origin}/api.php?amount=${this.questionsAmount}&category=${category}&difficulty=${difficulty}&type=${this.questionsType}`
    const questions$ = this.http.get<{ results: Question[] }>(url)
    const response = await lastValueFrom(questions$).catch(console.error)

    const questions = response?.results.map(question => {
      const answers = [
        question.correct_answer,
        ...question.incorrect_answers
      ]
      question.options = answers.sort(() => Math.random() - 0.5)
      question.chosenAnswer = null
      return question
    }) ?? null

    if (!questions) return

    this.questions = questions
  }

  checkAnswers(): void {
    this.router.navigate(['results'])
  }

  createNewQuiz() {
    this.router.navigate([''])
    this.questions = []
  }
}
