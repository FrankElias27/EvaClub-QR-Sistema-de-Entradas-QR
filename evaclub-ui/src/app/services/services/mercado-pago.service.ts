/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createPreference } from '../fn/mercado-pago/create-preference';
import { CreatePreference$Params } from '../fn/mercado-pago/create-preference';
import { CreatePreferenceResponse } from '../models/create-preference-response';

@Injectable({ providedIn: 'root' })
export class MercadoPagoService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createPreference()` */
  static readonly CreatePreferencePath = '/mp/create-preference';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPreference()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPreference$Response(params: CreatePreference$Params, context?: HttpContext): Observable<StrictHttpResponse<CreatePreferenceResponse>> {
    return createPreference(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createPreference$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPreference(params: CreatePreference$Params, context?: HttpContext): Observable<CreatePreferenceResponse> {
    return this.createPreference$Response(params, context).pipe(
      map((r: StrictHttpResponse<CreatePreferenceResponse>): CreatePreferenceResponse => r.body)
    );
  }

}
