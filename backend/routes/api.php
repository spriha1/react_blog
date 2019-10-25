<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/user/{user}', 'UserController@get_user');

// Route::group(['middleware' => ['json.response']], function () {

    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });

    // public routes
    Route::post('/login', 'Api\AuthController@login');
    Route::post('/register', 'Api\AuthController@register');
    Route::get('/articles', 'ArticleController@getArticles');
    Route::post('/upload', 'ArticleController@upload');
    
    // private routes
    Route::middleware('auth:api')->group(function () {
        Route::post('/articles', 'ArticleController@addArticle');
        Route::put('/articles', 'ArticleController@updateArticle');
        Route::delete('/articles/{id}', 'ArticleController@deleteArticle');
        Route::get('/logout', 'Api\AuthController@logout');
    });

// });
