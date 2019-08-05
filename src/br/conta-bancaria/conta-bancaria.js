'use strict';

var StringMask  = require('string-mask');
var maskFactory = require('../../helpers/mask-factory');

var bankAccountPattern = {};

module.exports = maskFactory({
	clearValue: function(rawValue) {
		var rawValueAux = rawValue.replace(/[^\d]/g, '');
		if (rawValueAux.length === 1) {
			bankAccountPattern = new StringMask('0');
		} else {
			bankAccountPattern = new StringMask(''.padStart(rawValueAux.length-1, '0') + '-0');
		}
		return rawValue.replace(/[^\d]/g, '').slice(0, (rawValueAux.length));
	},
	format: function(cleanValue) {
		return (bankAccountPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '');
	},
	validations: {}
});
