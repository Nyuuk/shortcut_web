<?php

use App\Http\Controllers\MembersController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\RequestsController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('requests', RequestsController::class);
Route::apiResource('programs', ProgramsController::class);
Route::apiResource('members', MembersController::class);


Route::get('/test', function () {
    $value = 'paid' == 'paid' ? 1 : 0;
    $data = \App\Models\Request::whereHas('invoice', function ($e) use ($value) {
        $e->where('status', $value);
    })->with('invoice')->get();
    return response()->json($data);
})->name('test');
