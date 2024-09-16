import { Component } from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../interfaces/transaction";
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  DropdownComponent,
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
  PaginationComponent, RowComponent, TableDirective
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {NgForOf} from "@angular/common";
import {TransactionFormComponent} from "./components/transaction-form/transaction-form.component";
import {TransactionTableComponent} from "./components/transaction-table/transaction-table.component";

@Component({
  selector: 'app-responsible',
  standalone: true,
  imports: [TransactionTableComponent, ButtonCloseDirective, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, IconDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, NgForOf, PageItemDirective, PageLinkDirective, PaginationComponent, RowComponent, TableDirective, TransactionFormComponent, TransactionTableComponent, TransactionTableComponent],
  templateUrl: './responsible.component.html',
  styleUrl: './responsible.component.scss'
})
export class ResponsibleComponent {





}
