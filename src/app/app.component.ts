// @ts-ignore
// @ts-ignore

import {APP_INITIALIZER, Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './icons/icon-subset';
import {BgColorDirective, ButtonCloseDirective, ToastComponent, ToasterComponent, ToastModule} from "@coreui/angular";
import {ToasterService} from "./services/toaster.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,

  imports: [RouterOutlet, ToastModule, ButtonCloseDirective, AsyncPipe, NgIf, BgColorDirective]
})
export class AppComponent implements OnInit {
  title = 'Bank Fraud Detector';

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  toastState$ = this.toastService.state$;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private toastService: ToasterService
  ) {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = {...iconSubset};
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.toaster.addToast(ToastComponent, {})
    }, 2000)
  }
}
