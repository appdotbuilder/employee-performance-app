<?php

namespace Tests\Feature;

use App\Models\Employee;
use App\Models\Job;
use App\Models\KpiIndicator;
use App\Models\PerformanceAssessment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PerformanceManagementTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected User $admin;
    protected User $employee;
    protected Employee $employeeRecord;

    protected function setUp(): void
    {
        parent::setUp();

        // Create admin user
        $this->admin = User::factory()->create([
            'role' => 'admin',
            'email' => 'admin@test.com',
        ]);

        // Create employee user
        $this->employee = User::factory()->create([
            'role' => 'employee',
            'email' => 'employee@test.com',
        ]);

        // Create employee record
        $this->employeeRecord = Employee::factory()->create([
            'user_id' => $this->employee->id,
        ]);
    }

    public function test_welcome_page_displays_correctly()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert
            ->component('welcome')
            ->has('stats')
        );
    }

    public function test_admin_can_access_employee_management()
    {
        $response = $this->actingAs($this->admin)->get('/employees');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert
            ->component('employees/index')
            ->has('employees')
        );
    }

    public function test_employee_cannot_access_admin_features()
    {
        $response = $this->actingAs($this->employee)->get('/employees');

        $response->assertStatus(403);
    }

    public function test_admin_can_create_kpi_indicator()
    {
        $kpiData = [
            'name' => 'Test KPI',
            'weight' => 25.0,
        ];

        $response = $this->actingAs($this->admin)
            ->post('/kpi-indicators', $kpiData);

        $response->assertRedirect();
        $this->assertDatabaseHas('kpi_indicators', $kpiData);
    }

    public function test_admin_can_create_performance_assessment()
    {
        $kpi = KpiIndicator::factory()->create();

        $assessmentData = [
            'employee_id' => $this->employeeRecord->id,
            'kpi_indicator_id' => $kpi->id,
            'score' => 85.5,
            'assessment_date' => now()->format('Y-m-d'),
            'notes' => 'Good performance',
        ];

        $response = $this->actingAs($this->admin)
            ->post('/performance-assessments', $assessmentData);

        $response->assertRedirect();
        $this->assertDatabaseHas('performance_assessments', [
            'employee_id' => $this->employeeRecord->id,
            'kpi_indicator_id' => $kpi->id,
            'score' => 85.5,
        ]);
    }

    public function test_admin_can_create_job()
    {
        $jobData = [
            'name' => 'Test Job',
            'employee_id' => $this->employeeRecord->id,
            'progress' => 50.0,
            'description' => 'Test job description',
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addDays(30)->format('Y-m-d'),
        ];

        $response = $this->actingAs($this->admin)
            ->post('/jobs', $jobData);

        $response->assertRedirect();
        $this->assertDatabaseHas('employee_jobs', [
            'name' => 'Test Job',
            'employee_id' => $this->employeeRecord->id,
            'progress' => 50.0,
        ]);
    }

    public function test_employee_can_view_own_performance()
    {
        // Create KPI and assessment for the employee
        $kpi = KpiIndicator::factory()->create(['weight' => 100]);
        PerformanceAssessment::factory()->create([
            'employee_id' => $this->employeeRecord->id,
            'kpi_indicator_id' => $kpi->id,
            'score' => 80,
        ]);

        // Create a job for the employee
        Job::factory()->create([
            'employee_id' => $this->employeeRecord->id,
            'progress' => 75,
        ]);

        $response = $this->actingAs($this->employee)->get('/my-performance');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert
            ->component('performance-reports/show')
            ->has('performanceData')
            ->where('performanceData.name', $this->employeeRecord->name)
        );
    }

    public function test_admin_can_view_performance_reports()
    {
        // Create some test data
        $kpi = KpiIndicator::factory()->create(['weight' => 100]);
        PerformanceAssessment::factory()->create([
            'employee_id' => $this->employeeRecord->id,
            'kpi_indicator_id' => $kpi->id,
            'score' => 85,
        ]);

        $response = $this->actingAs($this->admin)->get('/reports/performance');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert
            ->component('performance-reports/index')
            ->has('reportData')
            ->has('divisions')
        );
    }

    public function test_employee_kpi_score_calculation()
    {
        // Create KPI indicators
        $kpi1 = KpiIndicator::factory()->create(['weight' => 60]);
        $kpi2 = KpiIndicator::factory()->create(['weight' => 40]);

        // Create assessments
        PerformanceAssessment::factory()->create([
            'employee_id' => $this->employeeRecord->id,
            'kpi_indicator_id' => $kpi1->id,
            'score' => 80, // 80 * 60% = 48
        ]);

        PerformanceAssessment::factory()->create([
            'employee_id' => $this->employeeRecord->id,
            'kpi_indicator_id' => $kpi2->id,
            'score' => 90, // 90 * 40% = 36
        ]);

        $this->employeeRecord->load('performanceAssessments.kpiIndicator');
        $totalScore = $this->employeeRecord->getTotalKpiScore();

        // Expected: (48 + 36) = 84
        $this->assertEquals(84, $totalScore);
    }

    public function test_employee_job_progress_calculation()
    {
        // Create jobs with different progress
        Job::factory()->create([
            'employee_id' => $this->employeeRecord->id,
            'progress' => 60,
        ]);

        Job::factory()->create([
            'employee_id' => $this->employeeRecord->id,
            'progress' => 80,
        ]);

        Job::factory()->create([
            'employee_id' => $this->employeeRecord->id,
            'progress' => 100,
        ]);

        $averageProgress = $this->employeeRecord->getAverageJobProgress();

        // Expected: (60 + 80 + 100) / 3 = 80
        $this->assertEquals(80, $averageProgress);
    }

    public function test_dashboard_displays_correctly_for_admin()
    {
        $response = $this->actingAs($this->admin)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert
            ->component('dashboard')
            ->where('auth.user.role', 'admin')
        );
    }

    public function test_dashboard_displays_correctly_for_employee()
    {
        $response = $this->actingAs($this->employee)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert
            ->component('dashboard')
            ->where('auth.user.role', 'employee')
        );
    }
}