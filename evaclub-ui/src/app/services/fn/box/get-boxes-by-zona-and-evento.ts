/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BoxResponse } from '../../models/box-response';

export interface GetBoxesByZonaAndEvento$Params {
  zonaId: number;
  eventoId: number;
}

export function getBoxesByZonaAndEvento(http: HttpClient, rootUrl: string, params: GetBoxesByZonaAndEvento$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BoxResponse>>> {
  const rb = new RequestBuilder(rootUrl, getBoxesByZonaAndEvento.PATH, 'get');
  if (params) {
    rb.path('zonaId', params.zonaId, {});
    rb.path('eventoId', params.eventoId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BoxResponse>>;
    })
  );
}

getBoxesByZonaAndEvento.PATH = '/boxes/zone/{zonaId}/event/{eventoId}';
