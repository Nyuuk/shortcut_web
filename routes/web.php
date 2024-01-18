<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/register-member', [\App\Http\Controllers\FormMemberController::class, 'index'])->name('register-member');
Route::post('/register-member', [\App\Http\Controllers\RequestsController::class, 'store'])->name('register-member.store');
Route::get('get-value-invoice', [\App\Http\Controllers\FormMemberController::class, 'getInvoiceValue'])->name('get-value-invoice');
Route::get('inv/{inv}', [\App\Http\Controllers\FormMemberController::class, 'indexInvoice'])->name('invoice');

// Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [\App\Http\Controllers\Dashboard\IndexController::class, 'dashboard'])->name('dashboard');
    Route::get('new-members', [\App\Http\Controllers\Dashboard\IndexController::class, 'newMembers'])->name('dashboard.new-member');
    Route::get('programs', [\App\Http\Controllers\Dashboard\IndexController::class, 'programs'])->name('dashboard.programs');

    Route::get('edit-member/{id}', [\App\Http\Controllers\Dashboard\IndexController::class, 'editMember'])->name('dashboard.edit-member');
    Route::get('my-profile', [\App\Http\Controllers\Dashboard\IndexController::class, 'myProfile'])->name('dashboard.my-profile');
    Route::get('members', [\App\Http\Controllers\Dashboard\IndexController::class, 'members'])->name('dashboard.members');

    // API
    Route::prefix('api')->group(function () {
        Route::get('layout', [\App\Http\Controllers\Dashboard\ApiController::class, 'layoutApi'])->name('dashboard.api.layout');
        // program
        Route::post('program', [\App\Http\Controllers\Dashboard\ApiController::class, 'newProgram'])->name('dashboard.api.new-program');
        Route::get('programs', [\App\Http\Controllers\Dashboard\ApiController::class, 'getProgram'])->name('dashboard.api.get-programs');
        Route::delete('program/{id}', [\App\Http\Controllers\Dashboard\ApiController::class, 'deletePorgram'])->name('dashboard.api.delete-program');
        Route::put('program', [\App\Http\Controllers\Dashboard\ApiController::class, 'updateProgram'])->name('dashboard.api.update-program');
        // request
        Route::delete('request/{id}', [\App\Http\Controllers\Dashboard\ApiController::class, 'deleteRequest'])->name('dashboard.api.delete-request');
        Route::get('requests', [\App\Http\Controllers\Dashboard\ApiController::class, 'getRequests'])->name('dashboard.api.get-requests');
        Route::put('request/{id}', [\App\Http\Controllers\Dashboard\ApiController::class, 'updateRequest'])->name('dashboard.api.put-request');
        // payment methods
        Route::get('payment-methods', [\App\Http\Controllers\Dashboard\ApiController::class, 'getPaymentMethods'])->name('dashboard.api.get-payment-methods');
    });
});

Route::prefix('test')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Test/Context/AtasIndex');
    });
    Route::get('signals', function () {
        return Inertia::render('Test/preact_signals/Index');
    });
    Route::get('state', function () {
        return Inertia::render('Test/State/Index');
    });
    Route::get('object', function () {
        return Inertia::render('Test/preact_signals/ObjectTest');
    });
});

require __DIR__ . '/auth.php';
