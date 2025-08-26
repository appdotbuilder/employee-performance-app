<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use App\Models\Employee;
use App\Models\Job;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = Job::with('employee')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('jobs/index', [
            'jobs' => $jobs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $employees = Employee::all();

        return Inertia::render('jobs/create', [
            'employees' => $employees
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobRequest $request)
    {
        $job = Job::create($request->validated());

        return redirect()->route('jobs.show', $job)
            ->with('success', 'Pekerjaan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job)
    {
        $job->load('employee');

        return Inertia::render('jobs/show', [
            'job' => $job
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        $employees = Employee::all();

        return Inertia::render('jobs/edit', [
            'job' => $job,
            'employees' => $employees
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreJobRequest $request, Job $job)
    {
        $job->update($request->validated());

        return redirect()->route('jobs.show', $job)
            ->with('success', 'Pekerjaan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        $job->delete();

        return redirect()->route('jobs.index')
            ->with('success', 'Pekerjaan berhasil dihapus.');
    }
}