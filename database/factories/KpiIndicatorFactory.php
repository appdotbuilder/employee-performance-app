<?php

namespace Database\Factories;

use App\Models\KpiIndicator;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KpiIndicator>
 */
class KpiIndicatorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $indicators = [
            ['name' => 'Kedisiplinan', 'weight' => 20.00],
            ['name' => 'Pelayanan', 'weight' => 25.00],
            ['name' => 'Kualitas Kerja', 'weight' => 30.00],
            ['name' => 'Inisiatif', 'weight' => 15.00],
            ['name' => 'Kerja Sama Tim', 'weight' => 10.00],
        ];

        $indicator = fake()->randomElement($indicators);

        return [
            'name' => $indicator['name'],
            'weight' => $indicator['weight'],
        ];
    }
}