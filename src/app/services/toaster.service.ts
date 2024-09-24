import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export type ToastLevel = "success" | "info" | "warning" | "danger";

interface ToastState {
  visible?: boolean;
  title?: string;
  level?: ToastLevel;
  body?: string;
}

@Injectable({providedIn: 'root'})
export class ToasterService {

  public readonly state$ = new BehaviorSubject<ToastState>({visible: false});

  show(title: string, body: string,level: ToastLevel='info') {
    this.state$.next({
      visible: true,
      title,
      level,
      body
    });

    setTimeout(() => {
      this.state$.next({visible: false});
    }, 4000);
  }

}
