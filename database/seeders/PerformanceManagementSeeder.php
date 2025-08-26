<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Job;
use App\Models\KpiIndicator;
use App\Models\PerformanceAssessment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PerformanceManagementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create employee users
        $employeeUser1 = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
            'role' => 'employee',
            'email_verified_at' => now(),
        ]);

        $employeeUser2 = User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => bcrypt('password'),
            'role' => 'employee',
            'email_verified_at' => now(),
        ]);

        // Create KPI indicators with specific weights that sum to 100%
        $indicators = [
            ['name' => 'Kedisiplinan', 'weight' => 20.00],
            ['name' => 'Pelayanan', 'weight' => 25.00],
            ['name' => 'Kualitas Kerja', 'weight' => 30.00],
            ['name' => 'Inisiatif', 'weight' => 15.00],
            ['name' => 'Kerja Sama Tim', 'weight' => 10.00],
        ];

        foreach ($indicators as $indicator) {
            KpiIndicator::create($indicator);
        }

        // Create employees (some linked to users, some standalone)
        $employee1 = Employee::create([
            'name' => 'John Doe',
            'division' => 'Information Technology',
            'user_id' => $employeeUser1->id,
        ]);

        $employee2 = Employee::create([
            'name' => 'Jane Smith',
            'division' => 'Marketing',
            'user_id' => $employeeUser2->id,
        ]);

        // Create additional employees without user accounts
        Employee::factory(8)->create();

        // Get all employees and KPI indicators
        $employees = Employee::all();
        $kpiIndicators = KpiIndicator::all();

        // Create performance assessments for each employee and each KPI indicator
        foreach ($employees as $employee) {
            foreach ($kpiIndicators as $indicator) {
                PerformanceAssessment::create([
                    'employee_id' => $employee->id,
                    'kpi_indicator_id' => $indicator->id,
                    'score' => fake()->numberBetween(70, 95),
                    'assessment_date' => fake()->dateTimeBetween('-1 month', 'now'),
                    'notes' => fake()->optional(0.5)->sentence(),
                ]);
            }
        }

        // Create jobs for employees
        foreach ($employees as $employee) {
            Job::factory(random_int(1, 3))->create([
                'employee_id' => $employee->id,
            ]);
        }
    }
}