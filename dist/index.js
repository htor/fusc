(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.scratch = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fusc = function fusc(elem) {
    var fillChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '@';

    if (elem.dataset.animating === 'true') return;
    elem.dataset.animating = 'true';

    // find all text nodes
    var n = void 0;
    var textNodes = [];
    var walk = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) {
        n.origText = n.origText ? n.origText : n.textContent;
        n.origStyle = n.origStyle ? n.origStyle : n.parentNode.style;
        textNodes.push(n);
    }

    // iterate over them and replace values

    var _loop = function _loop(i) {
        var node = textNodes[i];
        var parent = node.parentNode;
        var tokens = node.textContent.split(' ');
        var origTokens = node.origText.split(' ');
        if (elem.dataset.back === 'true') {
            var _loop2 = function _loop2(_i) {
                setTimeout(function () {
                    tokens[_i] = origTokens[_i];
                    node.textContent = tokens.join(' ');
                    if (_i === tokens.length - 1) {
                        elem.dataset.animating = 'false';
                        elem.dataset.back = 'false';
                        if (parent.nodeName === 'A') parent.style = node.origStyle;
                    }
                }, 600 + random(1, 20) * _i);
            };

            // restore original text
            for (var _i = 0; _i < tokens.length; _i++) {
                _loop2(_i);
            }
        } else {
            var _loop3 = function _loop3(_i2) {
                setTimeout(function () {
                    parent.style.textDecoration = 'none';
                    var token = tokens[_i2].trim();
                    tokens[_i2] = token === '\n' ? token : fillChar.repeat(token.length);
                    node.textContent = tokens.join(' ');
                    if (_i2 === tokens.length - 1) {
                        elem.dataset.animating = 'false';
                        elem.dataset.back = 'true';
                    }
                }, 600 + random(1, 20) * _i2);
            };

            // fill in characters
            for (var _i2 = 0; _i2 < tokens.length; _i2++) {
                _loop3(_i2);
            }
        }
    };

    for (var i = 0; i < textNodes.length; i++) {
        _loop(i);
    }
};

var random = function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.default = fusc;

},{}]},{},[1])(1)
});
