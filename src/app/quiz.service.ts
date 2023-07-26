import { Injectable } from '@angular/core';
import { Question } from './question';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { Observable, catchError, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private url = 'https://opentdb.com'
  public questions: Question[] = []
  public categories$: Observable<{ trivia_categories: Category[]}> | null = null;

  constructor(private http: HttpClient) {
    this.fetchCategories()
  }

  async fetchCategories(): Promise<void> {
    this.categories$ = this.http.get<{ trivia_categories: Category[]}>(`${this.url}/api_category.php`)
  }

  fetchQuestions(category: string, difficulty: string): void {
    console.log(category, difficulty)
  }
}
