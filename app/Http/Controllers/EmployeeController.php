<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use App\Models\User;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::with('user')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('employees/index', [
            'employees' => $employees
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::whereNull('id')
            ->orWhereDoesntHave('employee')
            ->where('role', 'employee')
            ->get();

        return Inertia::render('employees/create', [
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $employee = Employee::create($request->validated());

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Karyawan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $employee->load(['user', 'jobs', 'performanceAssessments.kpiIndicator']);

        return Inertia::render('employees/show', [
            'employee' => $employee,
            'totalKpiScore' => round($employee->getTotalKpiScore(), 2),
            'averageJobProgress' => round($employee->getAverageJobProgress(), 2),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        $users = User::whereNull('id')
            ->orWhereDoesntHave('employee')
            ->orWhere('id', $employee->user_id)
            ->where('role', 'employee')
            ->get();

        return Inertia::render('employees/edit', [
            'employee' => $employee,
            'users' => $users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $employee->update($request->validated());

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Data karyawan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Karyawan berhasil dihapus.');
    }
}