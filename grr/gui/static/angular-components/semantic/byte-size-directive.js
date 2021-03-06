'use strict';

goog.provide('grrUi.semantic.byteSizeDirective.ByteSizeController');
goog.provide('grrUi.semantic.byteSizeDirective.ByteSizeDirective');
goog.provide('grrUi.semantic.byteSizeDirective.stringifyByteSize');

goog.scope(function() {


/** @const {number} */
var KB_UNIT = 1024;

/** @const {number} */
var MB_UNIT = KB_UNIT * 1024;

/** @const {number} */
var GB_UNIT = MB_UNIT * 1024;


/**
 * Returns string representation of a given byte size value.
 *
 * @param {number} value Value in bytes to be stringified.
 * @return {Array<number|string>} Array with a number and size token.
 */
grrUi.semantic.byteSizeDirective.stringifyByteSize = function(value) {
  if (value == 0) {
    return [0, ''];
  }

  if (value > GB_UNIT) {
    return [value / GB_UNIT, 'Gb'];
  } else if (value > MB_UNIT) {
    return [value / MB_UNIT, 'Mb'];
  } else if (value > KB_UNIT) {
    return [value / KB_UNIT, 'Kb'];
  } else {
    return [value, 'b'];
  }
};
var stringifyByteSize = grrUi.semantic.byteSizeDirective.stringifyByteSize;


/**
 * Controller for ByteSizeDirective.
 *
 * @param {!angular.Scope} $scope
 * @constructor
 * @ngInject
 */
grrUi.semantic.byteSizeDirective.ByteSizeController = function($scope) {
  /** @private {!angular.Scope} */
  this.scope_ = $scope;

  /** @type {string} */
  this.stringifiedByteSize;

  this.scope_.$watch('::value', this.onValueChange.bind(this));
};

var ByteSizeController =
    grrUi.semantic.byteSizeDirective.ByteSizeController;


/**
 * Handles changes of scope.value attribute.
 *
 * @param {number} newValue Timestamp value in microseconds.
 * @suppress {missingProperties} as value can be anything.
 */
ByteSizeController.prototype.onValueChange = function(newValue) {
  var byteSize = newValue.value;
  if (angular.isNumber(byteSize)) {
    var stringified = stringifyByteSize(byteSize);
    var size = stringified[0];
    var sizeToken = stringified[1];

    var result = [Math.floor(size).toString()];
    var decimalPart = Math.round((size % 1) * 10).toString();
    if (decimalPart !== '0') {
      result.push('.', decimalPart);
    }
    result.push(sizeToken);

    this.stringifiedByteSize = result.join('');
  } else {
    this.stringifiedByteSize = '-';
  }
};



/**
 * Directive that displays ByteSize values.
 *
 * @return {angular.Directive} Directive definition object.
 * @ngInject
 * @export
 */
grrUi.semantic.byteSizeDirective.ByteSizeDirective = function() {
  return {
    scope: {
      value: '='
    },
    restrict: 'E',
    templateUrl: '/static/angular-components/semantic/byte-size.html',
    controller: ByteSizeController,
    controllerAs: 'controller'
  };
};


/**
 * Name of the directive in Angular.
 *
 * @const
 * @export
 */
grrUi.semantic.byteSizeDirective.ByteSizeDirective.directive_name =
    'grrByteSize';

/**
 * Semantic type corresponding to this directive.
 *
 * @const
 * @export
 */
grrUi.semantic.byteSizeDirective.ByteSizeDirective.semantic_type =
    'ByteSize';


});  // goog.scope
