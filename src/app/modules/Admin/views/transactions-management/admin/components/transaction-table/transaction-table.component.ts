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
import {TransactionService} from "../../../../../services/transaction.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormMode, TransactionFormComponent} from "../transaction-form/transaction-form.component";
import {ToasterService} from "../../../../../../../services/toaster.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import Transaction from "../../../../../interfaces/transaction";


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
  tx: Transaction = {
    state: "Pending"
  };
  transactionPreviewId: number = 0;

  displayForm: boolean = false;
  mode: FormMode = 'CREATE';
  isPreview = false;
  color: string = "";
  badgeColor: any = {
    Suspicious: 'warning',
    Normal: 'success',
    Fraudulent: 'danger',
    Pending: 'secondary',
  }

  pageSize = 5;
  pageNumber = 0;
  totalPages = 0;


  //private cachedData: any[];

  constructor(private service: TransactionService,
              private toasterService: ToasterService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchData();
    this.route.queryParams.subscribe(params => {
      if(params && params['mode'] == 'preview'){
        this.showDetails(params['id'])
      }
    })
  }

  fetchData(): void {
    this.service.getPaginatedData(this.pageSize!, this.pageNumber!).subscribe(
      (data) => {
        this.transactions = data.content;
        this.totalPages = data.totalPages;
      }
    );
  }

  addNew() {
    this.displayForm = true;
    this.mode = 'CREATE';
    this.tx = {
      state: "Pending"
    };
    this.isPreview = false;
    this.fetchData()
  }

  openUpdate(txId: number) {
    this.displayForm = true;
    this.mode = 'UPDATE';
    this.transactionPreviewId = txId;
    this.isPreview = false;
    this.fetchData()
  }


  showDetails(txId: number) {
    this.displayForm = true;
    this.mode = 'UPDATE';
    this.transactionPreviewId = txId;
    this.isPreview = true;
  }

  handleSave() {
    this.fetchData();
    this.toasterService.show('Transactions', this.mode === "CREATE" ? "Transaction is created." : "Transaction is updated.",
      'success')
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
    this.tx = {
      state: "Pending"
    };
    this.dialogDeletionConfirmation();
  }


  goToPage(page: number) {
    this.pageNumber = page;
    this.fetchData();
  }
}



