/**
 * Created by abc on 23-Jan-16.
 */

requirejs.config({
    baseUrl: './js',
    paths: {
        jquery: "vendor/jquery"
    }
});

define(['jquery'], function ($) {
    console.log('jquery version : ' + $.fn.jquery);
});

