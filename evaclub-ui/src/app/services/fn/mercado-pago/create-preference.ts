/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreatePreferenceRequest } from '../../models/create-preference-request';
import { CreatePreferenceResponse } from '../../models/create-preference-response';

export interface CreatePreference$Params {
      body: CreatePreferenceRequest
}

export function createPreference(http: HttpClient, rootUrl: string, params: CreatePreference$Params, context?: HttpContext): Observable<StrictHttpResponse<CreatePreferenceResponse>> {
  const rb = new RequestBuilder(rootUrl, createPreference.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CreatePreferenceResponse>;
    })
  );
}

createPreference.PATH = '/mp/create-preference';
