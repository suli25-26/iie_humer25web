import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  
  url = 'http://localhost:8000/api/positions'

  constructor(private http: HttpClient) { }

  getPositions() {
    return this.http.get(this.url)
  }

  createPositon(postion: any) {
    return this.http.post(this.url, postion)  
  }

  updatePositon(postion: any) {
    return this.http.put(this.url + '/' + postion.id, postion)  
  }

  deletePositon(id: any) {
    return this.http.delete(this.url + '/' + id)  
  }


}
