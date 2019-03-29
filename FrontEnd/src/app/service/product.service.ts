import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../shared/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData: Product;
  list: Product[];
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  postProduct(formData: Product) {
    return this.http.post(this.API_URL + '/products', formData);
  }

  getProduct(page: number) {
    return this.http.get(this.API_URL + '/products?page=' + page);
  }

  refreshList(page: number) {
    this.http.get(this.API_URL  + '/products?page=' + page).toPromise().then(res => this.list = res as Product[]);
  }

  putProduct(formData: Product) {
    return this.http.put(this.API_URL + "/products/" + formData.id, formData);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.API_URL + "/products/" + id);
  }
}
