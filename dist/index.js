(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.scratch = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fusc = function fusc(element) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var nodes = [];
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    opts = Object.assign({
        char: '*',
        transform: function transform(char) {
            return opts.char;
        },
        timeout: null
    }, opts);

    if (element.dataset['fuscFuscing'] === 'true') return;
    element.dataset['fuscFuscing'] = 'true';

    // create node data structure for text

    var _loop = function _loop() {
        var textNode = walker.currentNode;
        textNode.origText = textNode.origText || textNode.textContent;
        var textParts = textNode.textContent.split(' ');
        var tokenNodes = textParts.map(function (text, index) {
            return { textNode: textNode, text: text, index: index,
                origText: textNode.origText.split(' ')[index] };
        });
        nodes.push.apply(nodes, _toConsumableArray(tokenNodes));
    };

    while (walker.nextNode()) {
        _loop();
    }

    // iterate each node and apply transform
    nodes.forEach(function (node, i) {

        var fusced = function fusced(isFusced) {
            if (i < nodes.length - 1) return;
            element.dataset['fuscFuscing'] = false;
            element.dataset['fuscDefusc'] = isFusced;
        };

        var defusc = function defusc(node) {
            var parts = node.textNode.textContent.split(' ');
            parts[node.index] = node.origText;
            node.textNode.textContent = parts.join(' ');
            fusced(false);
        };

        var fusc = function fusc(node) {
            if (node.text === '\n') return fusced(true);
            node.text = node.text.trim();
            var parts = node.textNode.textContent.split(' ');
            parts[node.index] = node.text.split('').map(opts.transform).join('');
            node.textNode.textContent = parts.join(' ');
            fusced(true);
        };

        if (element.dataset['fuscDefusc'] === 'true') {
            if (opts.timeout) {
                setTimeout(function () {
                    defusc(node);
                }, opts.timeout(i));
            } else {
                defusc(node);
            }
        } else {
            if (opts.timeout) {
                setTimeout(function () {
                    fusc(node);
                }, opts.timeout(i));
            } else {
                fusc(node);
            }
        }
    });
};

exports.default = fusc;

},{}]},{},[1])(1)
});
