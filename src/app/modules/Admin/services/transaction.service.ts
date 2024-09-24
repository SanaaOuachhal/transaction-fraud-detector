import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import Transaction, {TransactionState} from "../interfaces/transaction";
import {Page} from "../interfaces/page";
import TransactionStats from "../interfaces/transactionStats";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url: string = 'http://localhost:9005/api/transactions/';

  constructor(private http: HttpClient) {
  }

  create(tx: Transaction): Observable<any> {
    return this.http.post(this.url, tx);
  }
 /* sendTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(this.url, transaction);
  }*/

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url);
  }

  findById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(this.url + id)
  }

  update(tx: Transaction): Observable<any> {
    return this.http.put(this.url + tx.id, tx);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  getPaginatedData(pageSize: number, pageNumber: number): Observable<Page<Transaction>> {
    return this.http.get<any>(this.url + '?size=' + pageSize + '&page=' + pageNumber + '&sort=id,desc');
  }

  getSuspiciousTransactions(pageSize: number, pageNumber: number): Observable<Page<Transaction>> {
    return this.http.get<Page<Transaction>>(this.url + 'Suspicious' + '?size=' + pageSize + '&page=' + pageNumber + '&sort=id,desc');
  }

  getStats(): Observable<TransactionStats> {
    return this.http.get<TransactionStats>(`${this.url}stats`);
  }
}
