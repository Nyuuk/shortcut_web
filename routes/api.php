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
    $value = 'anus';
    $idProgram = \App\Models\Program::where('username', $value)->select('id')->first();
    // $idProgram = \App\Models\Program::where('username', 'LIKE', '%' . $value . '%')->pluck('id');
    // $request = \App\Models\Request::whereRow('json_extract(programs, "$[*]") LIKE ?', ['%"' . $idProgram . '"%']);
    if ($idProgram) {
        $request = \App\Models\Request::where('programs', 'LIKE', '%' . $idProgram->id . '%')->get();
        return response()->json($request);
    } else {
        return response()->json($idProgram);
    }
    // $request = \App\Models\Request::where('programs', 'LIKE', '%' . $idProgram?->id . '%')->get();
    // return response()->json($request);
})->name('test');
