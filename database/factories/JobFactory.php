<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jobNames = [
            'Develop Customer Portal',
            'Update Marketing Materials',
            'Quarterly Financial Report',
            'Employee Training Program',
            'Product Quality Assessment',
            'Sales Campaign Analysis',
            'System Security Audit',
            'Client Relationship Management',
            'Process Improvement Initiative',
            'Market Research Study',
        ];

        $startDate = fake()->dateTimeBetween('-2 months', 'now');
        $dueDate = fake()->dateTimeBetween($startDate, '+2 months');

        return [
            'name' => fake()->randomElement($jobNames),
            'employee_id' => Employee::factory(),
            'progress' => fake()->numberBetween(0, 100),
            'description' => fake()->optional(0.7)->paragraph(),
            'start_date' => $startDate,
            'due_date' => $dueDate,
        ];
    }
}