/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EventRequest } from '../../models/event-request';
import { EventResponse } from '../../models/event-response';

export interface SaveEventDefault$Params {
      body: EventRequest
}

export function saveEventDefault(http: HttpClient, rootUrl: string, params: SaveEventDefault$Params, context?: HttpContext): Observable<StrictHttpResponse<EventResponse>> {
  const rb = new RequestBuilder(rootUrl, saveEventDefault.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EventResponse>;
    })
  );
}

saveEventDefault.PATH = '/events/default';
