import { humanizeDateTimeForFilters } from '../util.js';

export const generateFilter = (points) => points.filter((point) => humanizeDateTimeForFilters(point.dateFrom) > new Date().toISOString().split('T')[0]);
