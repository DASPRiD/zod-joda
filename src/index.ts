import * as localDate from './ZodJodaLocalDate';
import * as localDateTime from './ZodJodaLocalDateTime';
import * as localTime from './ZodJodaLocalTime';
import * as zonedDateTime from './ZodJodaZonedDateTime';

const all = {
    ...localDate,
    ...localDateTime,
    ...localTime,
    ...zonedDateTime,
};

export const zj = all;
export default all;
