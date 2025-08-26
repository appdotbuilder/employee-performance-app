<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $divisions = [
            'Human Resources',
            'Information Technology',
            'Marketing',
            'Finance',
            'Operations',
            'Sales',
            'Customer Service',
            'Research and Development',
        ];

        return [
            'name' => fake()->name(),
            'division' => fake()->randomElement($divisions),
            'user_id' => null, // We'll set this in the seeder if needed
        ];
    }
}