/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBoxResponse } from '../../models/page-response-box-response';

export interface FindAllBoxes$Params {
  page?: number;
  size?: number;
}

export function findAllBoxes(http: HttpClient, rootUrl: string, params?: FindAllBoxes$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBoxResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllBoxes.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBoxResponse>;
    })
  );
}

findAllBoxes.PATH = '/boxes';
