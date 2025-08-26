<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePerformanceAssessmentRequest;
use App\Models\Employee;
use App\Models\KpiIndicator;
use App\Models\PerformanceAssessment;
use Inertia\Inertia;

class PerformanceAssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assessments = PerformanceAssessment::with(['employee', 'kpiIndicator'])
            ->latest('assessment_date')
            ->paginate(10);
        
        return Inertia::render('performance-assessments/index', [
            'assessments' => $assessments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $employees = Employee::all();
        $indicators = KpiIndicator::all();

        return Inertia::render('performance-assessments/create', [
            'employees' => $employees,
            'indicators' => $indicators
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePerformanceAssessmentRequest $request)
    {
        $assessment = PerformanceAssessment::create($request->validated());

        return redirect()->route('performance-assessments.index')
            ->with('success', 'Penilaian kinerja berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PerformanceAssessment $performanceAssessment)
    {
        $performanceAssessment->load(['employee', 'kpiIndicator']);

        return Inertia::render('performance-assessments/show', [
            'assessment' => $performanceAssessment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PerformanceAssessment $performanceAssessment)
    {
        $employees = Employee::all();
        $indicators = KpiIndicator::all();

        return Inertia::render('performance-assessments/edit', [
            'assessment' => $performanceAssessment,
            'employees' => $employees,
            'indicators' => $indicators
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePerformanceAssessmentRequest $request, PerformanceAssessment $performanceAssessment)
    {
        $performanceAssessment->update($request->validated());

        return redirect()->route('performance-assessments.index')
            ->with('success', 'Penilaian kinerja berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PerformanceAssessment $performanceAssessment)
    {
        $performanceAssessment->delete();

        return redirect()->route('performance-assessments.index')
            ->with('success', 'Penilaian kinerja berhasil dihapus.');
    }
}