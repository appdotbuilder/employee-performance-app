<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\KpiIndicatorController;
use App\Http\Controllers\PerformanceAssessmentController;
use App\Http\Controllers\PerformanceReportController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page
Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin-only routes
    Route::group(['middleware' => function ($request, $next) {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Access denied. Admin privileges required.');
        }
        return $next($request);
    }], function () {
        Route::resource('employees', EmployeeController::class);
        Route::resource('kpi-indicators', KpiIndicatorController::class);
        Route::resource('performance-assessments', PerformanceAssessmentController::class);
        Route::resource('jobs', JobController::class);
        Route::get('/reports/performance', [PerformanceReportController::class, 'index'])
            ->name('reports.performance');
    });

    // Employee self-report (accessible by employees)
    Route::get('/my-performance', [PerformanceReportController::class, 'show'])
        ->name('my-performance');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
