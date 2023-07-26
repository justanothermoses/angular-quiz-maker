import { Injectable } from '@angular/core';
import { Question } from './question';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private origin = 'https://opentdb.com'
  private questionsAmount = '5'
  private questionsType = 'multiple'

  public questions: Question[] = []
  public categories: Category[] = [];

  constructor(private http: HttpClient) {
    this.fetchCategories()
  }

  fetchCategories(): void {
    const url = `${this.origin}/api_category.php`
    const categories$ = this.http.get<{ trivia_categories: Category[] }>(url)
    lastValueFrom(categories$).then(response => this.categories = response.trivia_categories)
  }

  fetchQuestions(category: string, difficulty: string): void {
    const url = `${this.origin}/api.php?amount=${this.questionsAmount}&category=${category}&difficulty=${difficulty}&type=${this.questionsType}`
    const questions$ = this.http.get<any>(url)
    lastValueFrom(questions$).then(response => this.questions = response.results)
  }
}
