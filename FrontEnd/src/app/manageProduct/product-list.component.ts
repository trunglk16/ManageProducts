import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../shared/product.model';
import {ToastrService} from 'ngx-toastr';
import {forEach} from "@angular/router/src/utils/collection";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private page = 0;
  private products: Array<any>;
  private pages: Array<number>
  private searchedProduct: Array<any>;

  @ViewChild('productName') productName: ElementRef;


  constructor(private service: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getProduct();


    // @ts-ignore
    this.resetForm();
  }

  getProduct() {
    this.service.getProduct(this.page).subscribe(
      data => {
        this.products = data['content'];
        console.log(data['content']);
        this.pages = new Array(data['totalPages']);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }



  populateForm(emp: Product) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to do delete this record')) {
      this.service.deleteProduct(id)
        .subscribe(res => {
        this.getProduct();
        this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }
  }

  setPage(i: number, $event: MouseEvent) {
    event.preventDefault();
    this.page = i;
    this.getProduct();
  }

  findProduct() {
    this.searchedProduct = [];
    const productName = this.productName.nativeElement.value
    console.log(this.service.list);
    for (let i = 0; i < this.products.length; i++) {
      if( this.products[i].name.search(productName) >= 0 ){
        console.log(this.searchedProduct);
        this.searchedProduct.push(this.products[i]);

      }
    }

    this.products = this.searchedProduct;

  }


  resetForm(form: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      name: '',
      descriptions: '',
      type: '',
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postProduct(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      this.getProduct();
    });
  }

  updateRecord(form: NgForm) {
    if (confirm('Are you sure to do update this record')) {
      this.service.putProduct(form.value).subscribe(res => {

        this.resetForm(form);
        this.getProduct();
        this.toastr.info('Updated successfully', 'EMP. Register');
      });
    }
  }


}
