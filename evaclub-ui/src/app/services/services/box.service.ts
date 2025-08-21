/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BoxResponse } from '../models/box-response';
import { findAllBoxes } from '../fn/box/find-all-boxes';
import { FindAllBoxes$Params } from '../fn/box/find-all-boxes';
import { getBoxesByZonaAndEvento } from '../fn/box/get-boxes-by-zona-and-evento';
import { GetBoxesByZonaAndEvento$Params } from '../fn/box/get-boxes-by-zona-and-evento';
import { PageResponseBoxResponse } from '../models/page-response-box-response';
import { saveBox } from '../fn/box/save-box';
import { SaveBox$Params } from '../fn/box/save-box';

@Injectable({ providedIn: 'root' })
export class BoxService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllBoxes()` */
  static readonly FindAllBoxesPath = '/boxes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBoxes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBoxes$Response(params?: FindAllBoxes$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBoxResponse>> {
    return findAllBoxes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllBoxes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBoxes(params?: FindAllBoxes$Params, context?: HttpContext): Observable<PageResponseBoxResponse> {
    return this.findAllBoxes$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBoxResponse>): PageResponseBoxResponse => r.body)
    );
  }

  /** Path part for operation `saveBox()` */
  static readonly SaveBoxPath = '/boxes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveBox()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBox$Response(params: SaveBox$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveBox(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveBox$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBox(params: SaveBox$Params, context?: HttpContext): Observable<number> {
    return this.saveBox$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getBoxesByZonaAndEvento()` */
  static readonly GetBoxesByZonaAndEventoPath = '/boxes/zone/{zonaId}/event/{eventoId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBoxesByZonaAndEvento()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBoxesByZonaAndEvento$Response(params: GetBoxesByZonaAndEvento$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BoxResponse>>> {
    return getBoxesByZonaAndEvento(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBoxesByZonaAndEvento$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBoxesByZonaAndEvento(params: GetBoxesByZonaAndEvento$Params, context?: HttpContext): Observable<Array<BoxResponse>> {
    return this.getBoxesByZonaAndEvento$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BoxResponse>>): Array<BoxResponse> => r.body)
    );
  }

}
