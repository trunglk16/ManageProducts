import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private service: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.resetForm();
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
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    if (confirm('Are you sure to do update this record')) {
      this.service.putProduct(form.value).subscribe(res => {
        this.toastr.info('Updated successfully', 'EMP. Register');
        this.resetForm(form);
        this.service.refreshList();
      });
    }
  }

}
