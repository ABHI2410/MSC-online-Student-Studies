<?php

use App\Http\Controllers\Api\V1\AssignmentController;
use App\Http\Controllers\Api\V1\CourseController;
use App\Http\Controllers\Api\V1\CustomerController;
use App\Http\Controllers\Api\V1\ModulesController;
use App\Http\Controllers\Api\V1\RegistrationcodeController;
use App\Http\Controllers\Api\V1\UserCourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//api/v1
Route::group([
    'prefix' => 'v1',
    'namespace' => 'App\Http\Controllers\Api\V1',
    'middleware' => 'auth:sanctum',
    ], function () {
    Route::apiResources([
        'customer' => CustomerController::class,
        'courses' => CourseController::class,
        'program' => ProgramController::class,
        'codes' => RegistrationcodeController::class,
        'usercourse' => UserCourseController::class,
        'modules' => ModulesController::class,
        'assignment' => AssignmentController::class,
    ]);
    Route::get('/files/{filePath}', 'FileController@getFile')->where('filePath', '.*');

});

Route::post('/v1/customer', 'App\Http\Controllers\Api\V1\CustomerController@store')->withoutMiddleware(['auth:sanctum']);
Route::post('/login', 'App\Http\Controllers\AuthController@login')->withoutMiddleware(['auth:sanctum']);