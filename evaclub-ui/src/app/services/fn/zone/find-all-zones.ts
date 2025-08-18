/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseZoneResponse } from '../../models/page-response-zone-response';

export interface FindAllZones$Params {
  page?: number;
  size?: number;
}

export function findAllZones(http: HttpClient, rootUrl: string, params?: FindAllZones$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseZoneResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllZones.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseZoneResponse>;
    })
  );
}

findAllZones.PATH = '/zones';
