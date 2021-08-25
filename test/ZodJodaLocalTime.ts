import {DateTimeFormatter, LocalTime} from '@js-joda/core';
import {expect} from 'chai';
import 'mocha';
import {zj} from '../src';

describe('ZodJodaLocalTime', () => {
    it('should allow LocalTime value', () => {
        const schema = zj.localTime();
        const localTime = LocalTime.now();
        const result = schema.parse(localTime);
        expect(result).to.equal(localTime);
    });

    it('should allow ISO time value', () => {
        const schema = zj.localTime();
        const localTime = LocalTime.of(20, 0, 0);
        const result = schema.parse('20:00:00');
        expect(result).to.eql(localTime);
    });

    it('should allow custom time value', () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern('HHmm');
        const schema = zj.localTime({dateTimeFormatter});
        const localTime = LocalTime.of(20, 0, 0);
        const result = schema.parse('2000');
        expect(result).to.eql(localTime);
    });

    it('should report invalid time', () => {
        const schema = zj.localTime();
        expect(() => schema.parse('foo')).to.throw();
    });

    it('should report invalid type', () => {
        const schema = zj.localTime();
        expect(() => schema.parse(1)).to.throw();
    });
});
