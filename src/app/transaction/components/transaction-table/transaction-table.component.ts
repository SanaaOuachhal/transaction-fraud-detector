import {Component, OnInit} from '@angular/core';

import {
  AlignDirective,
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
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../model/transaction";
import {NgForOf, NgIf} from "@angular/common";
import {FormMode, TransactionFormComponent} from "../transaction-form/transaction-form.component";
import {ToasterService} from "../../../services/toaster.service";
import {RouterLink} from "@angular/router";
import {color} from "chart.js/helpers";
import {IconDirective} from "@coreui/icons-angular";


@Component({
  selector: 'app-transaction',
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
    IconDirective
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
  }

  openUpdate(tx: Transaction) {
    this.displayForm = true;
    this.mode = 'UPDATE';
    this.tx = tx;
  }


  showDetails(tx: Transaction) {
    console.log("Preview of ", tx.id, "is clicked");
  }

  handleSave() {
    this.fetchData();
    this.toasterService.show('Transactions', this.mode === "CREATE" ? "Transaction is created." : "Transaction is update.")
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
        // this.totalItems = data.totalItems;
      }
    );
  }

  goToPage(page: number) {
    this.pageNumber = page;
    this.fetchData();
  }

}



