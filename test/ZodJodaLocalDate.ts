import {DateTimeFormatter, LocalDate} from '@js-joda/core';
import {expect} from 'chai';
import 'mocha';
import {zj} from '../src';

describe('ZodJodaLocalDate', () => {
    it('should allow LocalDate value', () => {
        const schema = zj.localDate();
        const localDate = LocalDate.now();
        const result = schema.parse(localDate);
        expect(result).to.equal(localDate);
    });

    it('should allow ISO date value', () => {
        const schema = zj.localDate();
        const localDate = LocalDate.of(2021, 1, 1);
        const result = schema.parse('2021-01-01');
        expect(result).to.eql(localDate);
    });

    it('should allow custom date value', () => {
        const dateTimeFormatter = DateTimeFormatter.ofPattern('dd.MM.yyyy');
        const schema = zj.localDate({dateTimeFormatter});
        const localDate = LocalDate.of(2021, 1, 1);
        const result = schema.parse('01.01.2021');
        expect(result).to.eql(localDate);
    });

    it('should report invalid date', () => {
        const schema = zj.localDate();
        expect(() => schema.parse('foo')).to.throw();
    });

    it('should report invalid type', () => {
        const schema = zj.localDate();
        expect(() => schema.parse(1)).to.throw();
    });
});
