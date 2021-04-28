<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('/test', function() {
   return "..";
});
Route::get('/박병익', function() {
    return "올때 페미콘";
});
Route::get('/한석희', function() {
    return "..";
});
Route::get('/김정윤', function() {
    return "..";
});
Route::get('/최재영', function() {
    return "..";
});

