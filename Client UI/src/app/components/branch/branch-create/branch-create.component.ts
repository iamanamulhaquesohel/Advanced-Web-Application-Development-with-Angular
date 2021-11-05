import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Branch } from 'src/app/models/maping/branch';
import { AppNotifyService } from 'src/app/services/common/app-notify.service';
import { AppDataService } from 'src/app/services/data/app-data.service';

@Component({
  selector: 'app-branch-create',
  templateUrl: './branch-create.component.html',
  styleUrls: ['./branch-create.component.css']
})
export class BranchCreateComponent implements OnInit {

  //Define Branch
  Branch: Branch = new Branch();

  constructor(
    private dataServie: AppDataService,
    private notifyService: AppNotifyService
  ) { }

  create(Form: NgForm): void{
    this.dataServie.createBranch(this.Branch)
    .subscribe( s=> {
      this.Branch = new Branch();
      Form.form.markAsUntouched();
      Form.form.reset({});
      this.notifyService.success("Succeeded to Create Branch", "DISMISS");
    }, Error => {
      this.notifyService.fail("Failed to Create Branch", "DISMISS");
    });
  }

  ngOnInit(): void {
  }

}
