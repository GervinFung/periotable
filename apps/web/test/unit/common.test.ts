import { describe, expect, it } from 'vitest';

import { spaceToDash } from '../../src/common/string';

describe('Test string utils in common directory', () => {
	it('should convert space in string to underscore', () => {
		expect(spaceToDash('I Am Vege ance')).toBe('I-Am-Vege-ance');
	});
});
