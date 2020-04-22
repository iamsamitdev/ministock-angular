import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   // API URL

   apiURL = "http://localhost:4200/api";
  // apiURL = "https://www.itgenius.co.th/sandbox_api/ministockapi/public/api/";
   // apiURL = "http://localhost/ministockapi/public/api/";
  // apiURL = "https://www.itgenius.co.th/sandbox_api/combindrestapi/test_http_method.php"; // for test mehod

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  // Test Method
  
  getMethod(){
    return this.http.get(this.apiURL)
  }

  // Test Method
  postMethod(product){
    return this.http.post(this.apiURL, JSON.stringify(product), this.httpOptions)
  }
  

  /*
  getMethod(){
    return this.http.get(this.apiURL + 'testget', this.httpOptions)
  }

  postMethod(product){
    return this.http.post(this.apiURL + 'testpost', JSON.stringify(product), this.httpOptions)
  }
*/

   // อ่านข้อมูล Product (Method GET)
   getProducts(): Observable<ProductModel>{
    return this.http.get<ProductModel>(this.apiURL)
  }

  // อ่านข้อมูล Product By ID (Method GET)
  getProduct(id): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.apiURL + 'product/'+id)
  }

  // เพิ่มข้อมูลสินค้าใหม่  (Method POST)
  createProduct(product): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiURL + "products", JSON.stringify(product), this.httpOptions)
  }

  // แก้ไขข้อมุล Product (Method PUT)
  updateProduct(id, product): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.apiURL + "product/"+id, JSON.stringify(product), this.httpOptions) 
  }

  // ลบรายการ Product  (Method DELETE)
  deleteProduct(id){
    return this.http.delete<ProductModel>(this.apiURL + "product/"+id,  this.httpOptions)
  }

}
