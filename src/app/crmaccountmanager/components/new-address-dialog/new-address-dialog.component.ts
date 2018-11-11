import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Address } from '../../models/address';
import { FormControl, Validators  } from '@angular/forms';
import { CrmaccountserviceService } from '../../services/crmaccountservice.service';

@Component({
  selector: 'app-new-address-dialog',
  templateUrl: './new-address-dialog.component.html',
  styleUrls: ['./new-address-dialog.component.scss']
})
export class NewAddressDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NewAddressDialogComponent>,
    private crmAccountManagementService: CrmaccountserviceService) {}

  address: Address;

  validStreet1 = new FormControl('', [Validators.required]);
  validPostCode = new FormControl('', [Validators.required]);
  validDescription = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.address = new Address();
  }

  save(): void {

/*       this.crmAccountManagementService.addAddress(this.address).then(address => {
      this.dialogRef.close(this.address);
    }); */
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  getStreet1ErrorMessage() {
    return this.validStreet1.hasError('required') ? 'You must enter a value' : '';
  }

  getPostCodeErrorMessage() {
    return this.validPostCode.hasError('required') ? 'You must enter a value' : '';
  }

  getDescriptionErrorMessage() {
    return this.validDescription.hasError('required') ? 'You must enter a value' : '';
  }

}
