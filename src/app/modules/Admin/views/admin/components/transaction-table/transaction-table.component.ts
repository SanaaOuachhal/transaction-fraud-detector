import {Component, OnInit} from '@angular/core';

import {
  AlignDirective,
  BadgeComponent,
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  RowComponent,
  TableActiveDirective,
  TableColorDirective,
  TableDirective
} from "@coreui/angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {TransactionService} from "../../../../services/transaction.service";
import {Transaction, TransactionState} from "../../../../interfaces/transaction";
import {NgForOf, NgIf} from "@angular/common";
import {FormMode, TransactionFormComponent} from "../transaction-form/transaction-form.component";
import {ToasterService} from "../../../../../../services/toaster.service";
import {RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";


@Component({
  selector: 'admin-transaction-management',
  standalone: true,
  imports: [
    AlignDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    DocsExampleComponent,
    RowComponent,
    TableActiveDirective,
    TableColorDirective,
    TableDirective,
    NgForOf,
    ButtonDirective,
    DropdownComponent,
    DropdownDividerDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    TransactionFormComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalComponent,
    ButtonCloseDirective,
    ModalTitleDirective,
    RouterLink,
    PageLinkDirective,
    PageItemDirective,
    PaginationComponent,
    NgIf,
    IconDirective,
    BadgeComponent
  ],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss'
})
export class TransactionTableComponent implements OnInit {
  transactions: Transaction[] = [];
  public visible = false;
  tx: Transaction = {};
  displayForm: boolean = false;
  mode: FormMode = 'CREATE';
  isPreview = false;
  color: string = "";

  pageSize = 2;
  pageNumber = 1;
  totalPages = 0;


  //private cachedData: any[];

  constructor(private service: TransactionService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.fetchData();
  }


  addNew() {
    this.displayForm = true;
    this.mode = 'CREATE';
    this.tx = {};
    this.isPreview = false;
  }

  openUpdate(tx: Transaction) {
    this.displayForm = true;
    this.mode = 'UPDATE';
    this.tx = tx;
    this.isPreview = false;
  }


  showDetails(tx: Transaction) {
    console.log("Preview of ", tx.id, "is clicked");
    this.displayForm = true;
    this.mode = 'UPDATE'; // Assuming you're reusing the form in UPDATE mode
    this.tx = tx;
    this.isPreview = true; // Set preview mod
  }

  handleSave() {
    this.fetchData();
    this.toasterService.show('Transactions', this.mode === "CREATE" ? "Transaction is created." : "Transaction is updated.")
  }

  openDeletePopUp(tx: Transaction) {
    this.tx = tx;
    this.dialogDeletionConfirmation();
  }

  delete() {
    this.service.delete(this.tx.id!).subscribe((next) => {
      this.fetchData();
      this.dialogDeletionConfirmation();
      this.toasterService.show("Transaction", "Transaction is deleted successfully.");
    })
  }

  dialogDeletionConfirmation() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  cancelDeletion() {
    this.tx = {};
    this.dialogDeletionConfirmation();
  }

  fetchData(): void {
    this.service.getPaginatedData(this.pageSize!, this.pageNumber!).subscribe(
      (data) => {
        this.transactions = data.content;
        this.totalPages = data.totalPages;
      }
    );
  }

  goToPage(page: number) {
    this.pageNumber = page;
    this.fetchData();
  }

  getBadgeColor(state: TransactionState | undefined) :string{
    switch (state) {
      case 'Suspicious':
        return 'warning';
      case 'Normal':
        return 'success';
      case 'Fraudulent':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}



