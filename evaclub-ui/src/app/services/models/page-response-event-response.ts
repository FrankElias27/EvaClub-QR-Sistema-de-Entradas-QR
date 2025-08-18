/* tslint:disable */
/* eslint-disable */
import { EventResponse } from '../models/event-response';
export interface PageResponseEventResponse {
  content?: Array<EventResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
