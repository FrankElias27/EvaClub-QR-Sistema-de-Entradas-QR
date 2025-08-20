/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllZones } from '../fn/zone/find-all-zones';
import { FindAllZones$Params } from '../fn/zone/find-all-zones';
import { getZonesByEventId } from '../fn/zone/get-zones-by-event-id';
import { GetZonesByEventId$Params } from '../fn/zone/get-zones-by-event-id';
import { PageResponseZoneResponse } from '../models/page-response-zone-response';
import { saveZone } from '../fn/zone/save-zone';
import { SaveZone$Params } from '../fn/zone/save-zone';
import { ZoneResponse } from '../models/zone-response';

@Injectable({ providedIn: 'root' })
export class ZoneService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllZones()` */
  static readonly FindAllZonesPath = '/zones';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllZones()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllZones$Response(params?: FindAllZones$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseZoneResponse>> {
    return findAllZones(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllZones$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllZones(params?: FindAllZones$Params, context?: HttpContext): Observable<PageResponseZoneResponse> {
    return this.findAllZones$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseZoneResponse>): PageResponseZoneResponse => r.body)
    );
  }

  /** Path part for operation `saveZone()` */
  static readonly SaveZonePath = '/zones';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveZone()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveZone$Response(params: SaveZone$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveZone(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveZone$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveZone(params: SaveZone$Params, context?: HttpContext): Observable<number> {
    return this.saveZone$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getZonesByEventId()` */
  static readonly GetZonesByEventIdPath = '/zones/event/{eventId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getZonesByEventId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getZonesByEventId$Response(params: GetZonesByEventId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ZoneResponse>>> {
    return getZonesByEventId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getZonesByEventId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getZonesByEventId(params: GetZonesByEventId$Params, context?: HttpContext): Observable<Array<ZoneResponse>> {
    return this.getZonesByEventId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ZoneResponse>>): Array<ZoneResponse> => r.body)
    );
  }

}
