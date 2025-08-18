/* tslint:disable */
/* eslint-disable */
import { ZoneResponse } from '../models/zone-response';
export interface PageResponseZoneResponse {
  content?: Array<ZoneResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
