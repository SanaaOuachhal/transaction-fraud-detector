import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransactionService} from "../../../../services/transaction.service";
import {Transaction} from "../../../../interfaces/transaction";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ButtonCloseDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  RowComponent
} from "@coreui/angular";
import {DocsExampleComponent} from "@docs-components/docs-example/docs-example.component";
import {CommonModule} from "@angular/common";

export type FormMode = 'CREATE' | 'UPDATE';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    DocsExampleComponent,
    FormControlDirective,
    FormDirective,
    FormLabelDirective,
    CommonModule,
    FormsModule,
    RowComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormSelectDirective,
    ButtonDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalToggleDirective
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent implements OnInit {

  @Input()
  display = false;

  @Input()
  mode: FormMode = 'CREATE';

  @Input()
  tx: Transaction = {};

  @Output()
  displayChange: EventEmitter<boolean> = new EventEmitter();

  @Output()
  onSave = new EventEmitter<Transaction>();
  @Input() isPreview = false;


  constructor(private service: TransactionService) {

  }

  ngOnInit(): void {
  }


  create(tx: Transaction) {
    this.service.create(tx).subscribe((tx) => {
      this.notifyAndClose(tx);
    });
  }

  update(tx: Transaction): void {
    this.service.update(tx).subscribe((tx) => {
      this.notifyAndClose(tx);
    })
  }

  onSaveChanges(): void {
    if (!this.isPreview) {
      return this.mode === "CREATE" ? this.create(this.tx) : this.update(this.tx);
    }
  }


  closeModal() {
    this.display = !this.display;
    this.displayChange.emit(this.display);
  }

  private notifyAndClose(tx: Transaction) {
    this.onSave.next(tx)
    this.closeModal();
  }
}
