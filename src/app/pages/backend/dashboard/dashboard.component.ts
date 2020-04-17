import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // สร้างตัวแปรมารับค่าจาก API
  dataProduct:any = []

  constructor(public api: ProductService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe((data: {}) => {
      // console.log(data);
      this.dataProduct = data;
    })
  }


  viewProduct(id){
    alert(id)
  }

}
