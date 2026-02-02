import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/products';

  constructor(private http: HttpClient) { }

  
  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }
  getProducts(category?: string, search?: string): Observable<any[]> {
    let params = new HttpParams();
    
    if (category) {
      params = params.set('category', category);
    }

    // НОВО: Ако има дума за търсене, я добавяме в параметрите
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }
  
  getProductById(id: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

  updateProduct(id: string, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData);
  }
  
  
  deleteProduct(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
