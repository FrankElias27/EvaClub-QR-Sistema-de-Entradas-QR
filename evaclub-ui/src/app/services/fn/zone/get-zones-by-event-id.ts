/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ZoneResponse } from '../../models/zone-response';

export interface GetZonesByEventId$Params {
  eventId: number;
}

export function getZonesByEventId(http: HttpClient, rootUrl: string, params: GetZonesByEventId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ZoneResponse>>> {
  const rb = new RequestBuilder(rootUrl, getZonesByEventId.PATH, 'get');
  if (params) {
    rb.path('eventId', params.eventId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ZoneResponse>>;
    })
  );
}

getZonesByEventId.PATH = '/zones/event/{eventId}';
