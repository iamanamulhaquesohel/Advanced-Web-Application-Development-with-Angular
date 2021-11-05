import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/models/maping/branch';
import { AppNotifyService } from 'src/app/services/common/app-notify.service';
import { AppDataService } from 'src/app/services/data/app-data.service';

@Component({
  selector: 'app-branch-update',
  templateUrl: './branch-update.component.html',
  styleUrls: ['./branch-update.component.css']
})
export class BranchUpdateComponent implements OnInit {
  //Define Branch
  Branch: Branch = new Branch();

  constructor(
    private dataService: AppDataService,
    private notifyService: AppNotifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  update(Form: NgForm): void {
    this.dataService.updateBranch(this.Branch)
    .subscribe(s => {
      Form.form.markAsUntouched();
      this.notifyService.success("Succeeded to Update Branch", "DISMISS");
    }, error => {
      this.notifyService.fail("Failed to Update Branch", "DISMISS");
    });
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.dataService.getBranchById(id)
    .subscribe( s =>{
      this.Branch = s;
    }, error => {
      this.notifyService.fail("Failed to load Branch", "DISMISS");
    })
}

}
