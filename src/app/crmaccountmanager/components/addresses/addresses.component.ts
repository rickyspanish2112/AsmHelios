import { Component, OnInit, ViewChild } from '@angular/core';
import { CrmaccountserviceService } from '../../services/crmaccountservice.service';
import { Address } from '../../models/address';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'street1',
    'street2',
    'street3',
    'county',
    'postCode',
    'country'
  ];
  dataSource: MatTableDataSource<Address>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private crmService: CrmaccountserviceService) {  }

  ngOnInit() {
    let addresses = new Array<Address>();

    this.crmService.getAllAddresses().subscribe(data => {
      addresses = data;
      this.dataSource = new MatTableDataSource(addresses);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
