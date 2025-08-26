<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\KpiIndicator;
use App\Models\PerformanceAssessment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PerformanceAssessment>
 */
class PerformanceAssessmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'kpi_indicator_id' => KpiIndicator::factory(),
            'score' => fake()->numberBetween(60, 95), // Random score between 60-95
            'assessment_date' => fake()->dateTimeBetween('-3 months', 'now'),
            'notes' => fake()->optional(0.6)->sentence(10),
        ];
    }
}