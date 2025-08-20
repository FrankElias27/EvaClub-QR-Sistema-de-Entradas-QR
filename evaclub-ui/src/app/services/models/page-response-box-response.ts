/* tslint:disable */
/* eslint-disable */
import { BoxResponse } from '../models/box-response';
export interface PageResponseBoxResponse {
  content?: Array<BoxResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
