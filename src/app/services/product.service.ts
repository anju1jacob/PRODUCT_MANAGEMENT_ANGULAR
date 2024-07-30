import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://product-management-e52b6-default-rtdb.firebaseio.com/products';  // Ensure this URL is correct

  constructor(private http: HttpClient) { }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}.json`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ [key: string]: Product }>(`${this.apiUrl}.json`).pipe(
      map(responseData => {
        const productsArray: Product[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            productsArray.push({ ...responseData[key], id: key });
          }
        }
        return productsArray;
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}.json`);
  }

  updateProduct(id: string, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}.json`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}.json`);
  }
}
