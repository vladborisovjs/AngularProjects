"use strict";
var Measurer = (function () {
    function Measurer() {
    }
    Measurer.measureTextWidth = function (text, font) {
        var canvas = Measurer.canvas || (Measurer.canvas = document.createElement('canvas'));
        var context = canvas.getContext('2d');
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    };
    Measurer.measureRoundedTextWidth = function (text, font) {
        var width = Measurer.measureTextWidth(text, font);
        return Math.floor(width) + 1;
    };
    return Measurer;
}());
exports.Measurer = Measurer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Measurer;
//# sourceMappingURL=Measurer.js.map