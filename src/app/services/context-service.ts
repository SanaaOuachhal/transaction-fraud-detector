import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  public $: Context = {
    authUser: new BehaviorSubject<AuthUser>({})
  };

  private static instance: ContextService;

  public static getInstance(): ContextService {
    if(ContextService.instance == null){
      ContextService.instance = new ContextService();
    }
    return  ContextService.instance;
  }
}

export interface AuthUser {
  id?: string;
  username?: string;
  token?: string;
  refreshToken?: string;
  authorities?: string[];
  unauthorizedFields?: any;
}


export interface Context {
  authUser?: BehaviorSubject<AuthUser>
}
