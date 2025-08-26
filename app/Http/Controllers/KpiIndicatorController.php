<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKpiIndicatorRequest;
use App\Http\Requests\UpdateKpiIndicatorRequest;
use App\Models\KpiIndicator;
use Inertia\Inertia;

class KpiIndicatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $indicators = KpiIndicator::latest()->paginate(10);
        
        return Inertia::render('kpi-indicators/index', [
            'indicators' => $indicators
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('kpi-indicators/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKpiIndicatorRequest $request)
    {
        $indicator = KpiIndicator::create($request->validated());

        return redirect()->route('kpi-indicators.index')
            ->with('success', 'Indikator KPI berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(KpiIndicator $kpiIndicator)
    {
        $kpiIndicator->load('performanceAssessments.employee');

        return Inertia::render('kpi-indicators/show', [
            'indicator' => $kpiIndicator
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KpiIndicator $kpiIndicator)
    {
        return Inertia::render('kpi-indicators/edit', [
            'indicator' => $kpiIndicator
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreKpiIndicatorRequest $request, KpiIndicator $kpiIndicator)
    {
        $kpiIndicator->update($request->validated());

        return redirect()->route('kpi-indicators.index')
            ->with('success', 'Indikator KPI berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KpiIndicator $kpiIndicator)
    {
        $kpiIndicator->delete();

        return redirect()->route('kpi-indicators.index')
            ->with('success', 'Indikator KPI berhasil dihapus.');
    }
}