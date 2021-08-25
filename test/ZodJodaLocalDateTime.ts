import {DateTimeFormatter, LocalDateTime} from '@js-joda/core';
import {expect} from 'chai';
import 'mocha';
import {zj} from '../src';

describe('ZodJodaLocalDateTime', () => {
    it('should allow LocalDateTime value', () => {
        const schema = zj.localDateTime();
        const localDateTime = LocalDateTime.now();
        const result = schema.parse(localDateTime);
        expect(result).to.equal(localDateTime);
    });

    it('should allow ISO date value', () => {
        const schema = zj.localDateTime();
        const localDateTime = LocalDateTime.of(2021, 1, 1, 20, 0, 0);
        const result = schema.parse('2021-01-01T20:00:00');
        expect(result).to.eql(localDateTime);
    });

    it('should allow custom date value', () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern('dd.MM.yyyy HHmm');
        const schema = zj.localDateTime({dateTimeFormatter});
        const localDateTime = LocalDateTime.of(2021, 1, 1, 20, 0, 0);
        const result = schema.parse('01.01.2021 2000');
        expect(result).to.eql(localDateTime);
    });

    it('should report invalid date', () => {
        const schema = zj.localDateTime();
        expect(() => schema.parse('foo')).to.throw();
    });

    it('should report invalid type', () => {
        const schema = zj.localDateTime();
        expect(() => schema.parse(1)).to.throw();
    });
});
