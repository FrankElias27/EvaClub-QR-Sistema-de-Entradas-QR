/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseEventResponse } from '../../models/page-response-event-response';

export interface FindAllEvents$Params {
  page?: number;
  size?: number;
}

export function findAllEvents(http: HttpClient, rootUrl: string, params?: FindAllEvents$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseEventResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllEvents.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseEventResponse>;
    })
  );
}

findAllEvents.PATH = '/events';
