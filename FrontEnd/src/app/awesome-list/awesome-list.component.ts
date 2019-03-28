import {Component, OnInit} from '@angular/core';
import {AwesomeService} from '../service/awesome.service';
import {Awesomes} from '../awesome.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-awesome-list',
  templateUrl: './awesome-list.component.html',
  styleUrls: ['./awesome-list.component.css']
})
export class AwesomeListComponent implements OnInit {

  constructor(private service: AwesomeService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(emp: Awesomes) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to do delete this record')) {
      this.service.deleteAwesomes(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }
  }
}
