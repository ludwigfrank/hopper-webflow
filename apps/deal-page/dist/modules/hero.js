"use strict";
exports.__esModule = true;
var ui_1 = require("ui");
var LOCATION_ASSET_CDN_BASE_URL = 'https://res.cloudinary.com/podocu/image/upload/hopper-destinations';
function getHeroImageUrl(locationCode) {
    return "".concat(LOCATION_ASSET_CDN_BASE_URL, "/").concat(locationCode, "_5x.jpg");
}
function hero() {
    var locationCode = (0, ui_1.getUrlParam)('location');
    if (!locationCode)
        throw Error('No "location" parameter is set.');
    var heroImageUrl = getHeroImageUrl(locationCode);
    var heroImage = (document.querySelector('[bun-ref="hero-img"]'));
    heroImage.src = heroImageUrl;
}
exports["default"] = hero;
