import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private datamap = {} as any;
  private dataURL = 'http://localhost:3000/budget';

  constructor(private http: HttpClient) {
    const savedData = localStorage.getItem('datamap');
    if (savedData) {
      this.datamap = JSON.parse(savedData);
    }
  }

  async getBudgetData(): Promise<any> {
    console.log('Current datamap:', this.datamap);
    if (Object.keys(this.datamap).length !== 0) {
      return Promise.resolve(this.datamap);
    } else {
      const res = await this.http.get<any>(this.dataURL).toPromise();
      for (var i = 0; i < res.myBudget.length; i++) {
        this.datamap[res.myBudget[i].title] = res.myBudget[i].budget;
      }
      localStorage.setItem('datamap', JSON.stringify(this.datamap));
      console.log(this.datamap);
      return this.datamap;
    }
  }
}