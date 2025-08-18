/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { EventResponse } from '../models/event-response';
import { findAllEvents } from '../fn/events/find-all-events';
import { FindAllEvents$Params } from '../fn/events/find-all-events';
import { PageResponseEventResponse } from '../models/page-response-event-response';
import { saveEvent } from '../fn/events/save-event';
import { SaveEvent$Params } from '../fn/events/save-event';
import { saveEventDefault } from '../fn/events/save-event-default';
import { SaveEventDefault$Params } from '../fn/events/save-event-default';

@Injectable({ providedIn: 'root' })
export class EventsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllEvents()` */
  static readonly FindAllEventsPath = '/events';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllEvents()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllEvents$Response(params?: FindAllEvents$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseEventResponse>> {
    return findAllEvents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllEvents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllEvents(params?: FindAllEvents$Params, context?: HttpContext): Observable<PageResponseEventResponse> {
    return this.findAllEvents$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseEventResponse>): PageResponseEventResponse => r.body)
    );
  }

  /** Path part for operation `saveEvent()` */
  static readonly SaveEventPath = '/events';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveEvent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveEvent$Response(params: SaveEvent$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveEvent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveEvent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveEvent(params: SaveEvent$Params, context?: HttpContext): Observable<number> {
    return this.saveEvent$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `saveEventDefault()` */
  static readonly SaveEventDefaultPath = '/events/default';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveEventDefault()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveEventDefault$Response(params: SaveEventDefault$Params, context?: HttpContext): Observable<StrictHttpResponse<EventResponse>> {
    return saveEventDefault(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveEventDefault$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveEventDefault(params: SaveEventDefault$Params, context?: HttpContext): Observable<EventResponse> {
    return this.saveEventDefault$Response(params, context).pipe(
      map((r: StrictHttpResponse<EventResponse>): EventResponse => r.body)
    );
  }

}
