import {DateTimeFormatter, ZonedDateTime, ZoneId} from '@js-joda/core';
import {expect} from 'chai';
import 'mocha';
import {zj} from '../src';

describe('ZodJodaZonedDateTime', () => {
    it('should allow ZonedDateTime value', () => {
        const schema = zj.zonedDateTime();
        const zonedDateTime = ZonedDateTime.now();
        const result = schema.parse(zonedDateTime);
        expect(result).to.equal(zonedDateTime);
    });

    it('should allow ISO date value', () => {
        const schema = zj.zonedDateTime();
        const zonedDateTime = ZonedDateTime.of(2021, 1, 1, 20, 0, 0, 0, ZoneId.UTC);
        const result = schema.parse('2021-01-01T20:00:00Z');
        expect(result).to.eql(zonedDateTime);
    });

    it('should allow custom date value', () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern('dd.MM.yyyy HHmm VV');
        const schema = zj.zonedDateTime({dateTimeFormatter});
        const zonedDateTime = ZonedDateTime.of(2021, 1, 1, 20, 0, 0, 0, ZoneId.UTC);
        const result = schema.parse('01.01.2021 2000 Z');
        expect(result).to.eql(zonedDateTime);
    });

    it('should report invalid date', () => {
        const schema = zj.zonedDateTime();
        expect(() => schema.parse('foo')).to.throw();
    });

    it('should report invalid type', () => {
        const schema = zj.zonedDateTime();
        expect(() => schema.parse(1)).to.throw();
    });
});
