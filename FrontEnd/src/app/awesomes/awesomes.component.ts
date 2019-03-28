import { Component, OnInit } from '@angular/core';
import {AwesomeService} from '../service/awesome.service';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-awesomes',
  templateUrl: './awesomes.component.html',
  styleUrls: ['./awesomes.component.css']
})
export class AwesomesComponent implements OnInit {
  constructor(private service: AwesomeService,
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
      url: '',
      descriptions: '',
      tag: '',
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
    this.service.postAwesomes(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    if (confirm('Are you sure to do update this record')) {
      this.service.putAwesomes(form.value).subscribe(res => {
        this.toastr.info('Updated successfully', 'EMP. Register');
        this.resetForm(form);
        this.service.refreshList();
      });
    }
  }

}
