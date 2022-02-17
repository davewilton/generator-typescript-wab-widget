import declare = require("dojo/_base/declare");

/**
 * A decorator that converts a TypeScript class into a declare constructor.
 * This allows declare constructors to be defined as classes, which nicely
 * hides away the `declare([], {})` boilerplate.
 */
export = function (... mixins: any[]): any {
	return function (target: any): any {
		return declare(mixins, target.prototype);
	};
};