<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\KpiIndicator
 *
 * @property int $id
 * @property string $name
 * @property string $weight
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PerformanceAssessment> $performanceAssessments
 * @property-read int|null $performance_assessments_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|KpiIndicator newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KpiIndicator newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KpiIndicator query()
 * @method static \Illuminate\Database\Eloquent\Builder|KpiIndicator whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KpiIndicator whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KpiIndicator whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KpiIndicator whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KpiIndicator whereWeight($value)
 * @method static \Database\Factories\KpiIndicatorFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class KpiIndicator extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'weight',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'weight' => 'decimal:2',
    ];

    /**
     * Get the performance assessments for the KPI indicator.
     */
    public function performanceAssessments(): HasMany
    {
        return $this->hasMany(PerformanceAssessment::class);
    }
}