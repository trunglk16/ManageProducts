import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../shared/product.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private page = 0;
  private products: Array<any>;
  private pages: Array<number>



  constructor(private service: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.service.getProduct(this.page).subscribe(
      data => {
        this.products = data['content'];
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
      this.service.deleteProduct(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }
  }

  setPage(i: number, $event: MouseEvent) {
    event.preventDefault();
    this.page = i;
    this.getProduct();
  }
}
