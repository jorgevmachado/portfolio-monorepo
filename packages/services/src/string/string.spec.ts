import { formatUrl, isUUID, uuid } from './string';

import { describe, expect, it } from '@jest/globals';

describe('String functions', () => {
  describe('formatUrl', () => {
    const url = 'http://localhost:3000';
    it('should return formatted url when received url, path and params', () => {
      expect(formatUrl(url, 'user', { name: 'your_name' })).toEqual(
        'http://localhost:3000/user?name=your_name',
      );
    });

    it('should return formatted url when do not received params', () => {
      expect(formatUrl(url, 'user')).toEqual('http://localhost:3000/user');
    });
  });

  describe('uuid', () => {
    it('should return uuid based on the date it receives', () => {
      expect(uuid(new Date('1990-01-01'))).toEqual(
        '00c3793f-2900-4000-8000-000000000000',
      );
    });
  });

  describe('isUUID', () => {
    it('Must validate if it is a uuid', () => {
      expect(isUUID('981553ee-e275-4f0a-8d88-5bf778ff772d')).toBeTruthy();
    });
  });
});
