import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../shared/product.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-awesome-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private service: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.service.refreshList();
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
}
