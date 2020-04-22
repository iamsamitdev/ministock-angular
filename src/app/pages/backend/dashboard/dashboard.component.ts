import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // สร้างตัวแปรมารับค่าจาก API
  // เก็บรายการสินค้าทั้งหมด
  dataProduct:any = []
  
  // เก็บรายการสินค้าตามไอดี
  dataProductByID = {
    "product_name":"",
    "product_barcode":"",
    "product_detail":"",
    "product_price":"",
    "product_qty":"",
    "product_category":"",
    "product_date":"",
  }

  // สร้างตัวแปรกำหนดค่าบนฟอร์มเพิ่มสินค้า
  dataProductAdd = {
    "product_name":"",
    "product_barcode":"",
    "product_detail":"",
    "product_price":"",
    "product_qty":""
  }

  // สร้างตัวแปรสำหรับดึงข้อมูลสินค้าแสดงบนฟอร์มเพื่อแก้ไข
  dataProductEdit = {
    "product_id":"",
    "product_name":"",
    "product_barcode":"",
    "product_detail":"",
    "product_price":"",
    "product_qty":""
  }

  constructor(public api: ProductService) { }

  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct(){
    this.api.getProducts().subscribe((data: {}) => {
      // console.log(data);
      this.dataProduct = data;
    })
  }

  viewProduct(id){
    this.api.getProduct(id).subscribe((data: {}) => {
      this.dataProductByID.product_name = data[0].product_name;
      this.dataProductByID.product_barcode = data[0].product_barcode;
      this.dataProductByID.product_detail = data[0].product_detail;
      this.dataProductByID.product_price = data[0].product_price;
      this.dataProductByID.product_qty = data[0].product_qty;
      this.dataProductByID.product_category = data[0].product_category;
      this.dataProductByID.product_date = data[0].product_date;
      $("#modalDetail").modal('show');
    })
  }


  submitAddProduct(){
    this.api.createProduct(this.dataProductAdd).subscribe((data: {}) => {
        alert("บันทึกรายการสินค้าเรียบร้อย");
        $("#modalAdd").modal('hide');
        // โหลดรายการสินค้า
        this.fetchProduct();
        // เคลียร์ค่าในฟอร์ม
        this.dataProductAdd = {
          "product_name":"",
          "product_barcode":"",
          "product_detail":"",
          "product_price":"",
          "product_qty":""
        }
    })
  }

  editProduct(id){
    this.api.getProduct(id).subscribe((data: {}) => {
      this.dataProductEdit.product_id = data[0].id;
      this.dataProductEdit.product_name = data[0].product_name;
      this.dataProductEdit.product_barcode = data[0].product_barcode;
      this.dataProductEdit.product_detail = data[0].product_detail;
      this.dataProductEdit.product_price = data[0].product_price;
      this.dataProductEdit.product_qty = data[0].product_qty;
      $("#modalEdit").modal('show');
    })
  }

  submitEditProduct(){
    //alert(this.dataProductEdit.product_id);
    this.api.updateProduct((this.dataProductEdit.product_id), this.dataProductEdit).subscribe((data: {}) => {
      alert("แก้ไขรายการสินค้าเรียบร้อย");
      $("#modalEdit").modal('hide');
      // โหลดรายการสินค้า
      this.fetchProduct();
      // เคลียร์ค่าในฟอร์ม
      this.dataProductEdit = {
        "product_id":"",
        "product_name":"",
        "product_barcode":"",
        "product_detail":"",
        "product_price":"",
        "product_qty":""
      }
    });
  }


  deleteProduct(id){
    if(window.confirm('Are you sure, to delete this record?')){
      this.api.deleteProduct(id).subscribe((data: {})=>{
        this.fetchProduct();
      });
    }
  }
}
