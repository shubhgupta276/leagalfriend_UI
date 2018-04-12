declare var require: any;
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Http,
  Headers,
  RequestOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import { ApiGateway } from '../../shared/services/api-gateway';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
const featureConfig = require('./master.config');

@Injectable()
export class MasterService {

  constructor(public apiGateWay: ApiGateway) { }
    
  createInvoice(invoiceData): Observable<any> {
    return this.apiGateWay.post<any>(
      featureConfig.createInvoiceTemplate,
      JSON.stringify(invoiceData)
    );
  }
}
