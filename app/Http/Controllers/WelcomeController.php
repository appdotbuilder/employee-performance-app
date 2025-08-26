<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Job;
use App\Models\KpiIndicator;
use App\Models\PerformanceAssessment;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page with app statistics.
     */
    public function index()
    {
        $stats = [
            'employees_count' => Employee::count(),
            'kpi_indicators_count' => KpiIndicator::count(),
            'assessments_count' => PerformanceAssessment::count(),
            'jobs_count' => Job::count(),
        ];

        return Inertia::render('welcome', [
            'stats' => $stats
        ]);
    }
}