import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Branch } from 'src/app/models/maping/branch';
import { AppNotifyService } from 'src/app/services/common/app-notify.service';
import { AppDataService } from 'src/app/services/data/app-data.service';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-branch-view',
  templateUrl: './branch-view.component.html',
  styleUrls: ['./branch-view.component.css']
})
export class BranchViewComponent implements OnInit {
 //define blank branch Array
 Branches: Branch[] = [];
 //data pass in Table
 dataSource: MatTableDataSource<Branch> = new MatTableDataSource(this.Branches);
 //make a table column
 columnList = ["branchName", "branchAddress", "branchEmail", "actions"]
 //short and paging
 @ViewChild(MatSort, { static: false }) sort!: MatSort;
 @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
 constructor(
   private dataService: AppDataService,
   private notifyService: AppNotifyService,
   private matDialog: MatDialog
 ) { }

 //Delete Branch Method
 confirmDelete(item: Branch): void {
   this.matDialog.open(DeleteDialogComponent, {
     width: '450px'
   }).afterClosed()
     .subscribe(s => {
       if (s) {
         this.dataService.deleteBranch(Number(item.branchId))
           .subscribe(s => {
             this.dataSource.data = this.dataSource.data.filter(b => b.branchId != item.branchId);
             this.notifyService.success("Branch has been Deleted", "DISMISS")
           }, Error => {
             this.notifyService.fail("Failed to Delete Branch", "DISMISS")
           });
       }
     })
 }

 ngOnInit(): void {
   this.dataService.getBranches()
     .subscribe(s => {
       this.Branches = s;
       this.dataSource.data = this.Branches;
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     }, Error => {
       this.notifyService.fail("Failed to load Branches", "DISMISS")
     });
 }

}
