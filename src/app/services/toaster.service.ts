import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


interface ToastState {
  visible?: boolean;
  title?: string;
  body?: string;
}

@Injectable({providedIn: 'root'})
export class ToasterService {

  public readonly state$ = new BehaviorSubject<ToastState>({visible: false});

  show(title: string, body: string) {
    this.state$.next({
      visible: true,
      title,
      body
    });

    setTimeout(() => {
      this.state$.next({visible: false});
    }, 4000);
  }

}
