<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerformanceReportController extends Controller
{
    /**
     * Display the performance report.
     */
    public function index(Request $request)
    {
        $query = Employee::with(['jobs', 'performanceAssessments.kpiIndicator']);
        
        // Filter by division if provided
        if ($request->filled('division')) {
            $query->where('division', $request->division);
        }

        $employees = $query->get();

        // Calculate KPI scores and job progress for each employee
        $reportData = $employees->map(function ($employee) {
            return [
                'id' => $employee->id,
                'name' => $employee->name,
                'division' => $employee->division,
                'total_kpi_score' => round($employee->getTotalKpiScore(), 2),
                'average_job_progress' => round($employee->getAverageJobProgress(), 2),
                'jobs_count' => $employee->jobs->count(),
                'assessments_count' => $employee->performanceAssessments->count(),
            ];
        });

        // Get unique divisions for filter
        $divisions = Employee::distinct()->pluck('division')->filter()->sort()->values();

        return Inertia::render('performance-reports/index', [
            'reportData' => $reportData,
            'divisions' => $divisions,
            'filters' => $request->only(['division'])
        ]);
    }

    /**
     * Display employee's own performance report.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        
        if (!$user->employee) {
            abort(404, 'Employee record not found');
        }

        $employee = $user->employee;
        $employee->load(['jobs', 'performanceAssessments.kpiIndicator']);

        $performanceData = [
            'id' => $employee->id,
            'name' => $employee->name,
            'division' => $employee->division,
            'total_kpi_score' => round($employee->getTotalKpiScore(), 2),
            'average_job_progress' => round($employee->getAverageJobProgress(), 2),
            'jobs' => $employee->jobs,
            'assessments' => $employee->performanceAssessments,
            'jobs_count' => $employee->jobs->count(),
            'assessments_count' => $employee->performanceAssessments->count(),
        ];

        return Inertia::render('performance-reports/show', [
            'performanceData' => $performanceData
        ]);
    }
}