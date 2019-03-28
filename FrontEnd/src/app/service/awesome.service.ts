import {Injectable} from '@angular/core';
import {Awesomes} from '../awesome.model';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AwesomeService {
  formData: Awesomes;
  list: Awesomes[];
  private readonly API_URL = 'http://localhost:3000/awesomes/';

  constructor(private http: HttpClient) {
  }

  postAwesomes(formData: Awesomes) {
    return this.http.post(this.API_URL, formData);
  }

  refreshList() {
    this.http.get(this.API_URL).toPromise().then(res => this.list = res as Awesomes[]);
  }

  putAwesomes(formData: Awesomes) {
    return this.http.put(this.API_URL + formData.id, formData);
  }

  deleteAwesomes(id: number) {
    return this.http.delete(this.API_URL + id);
  }
}
