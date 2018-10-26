import { Iaccount } from '../contracts/iaccount';
import {Iaddress} from '../contracts/iaddress';

export class Account implements Iaccount {
  id: number;  shortCode: string;
  accountNumber: string;
  externalId: string;
  accountName: string;
  mainTelephone: string;
  fax: string;
  accountType: string;
  relationship: string;
  country: string;
  defaultCurrencyCode: string;
  tin: string;
  website: string;
  createdBy: string;
  expiryDate: Date;
  addresses: Iaddress[];
}
