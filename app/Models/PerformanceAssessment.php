<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PerformanceAssessment
 *
 * @property int $id
 * @property int $employee_id
 * @property int $kpi_indicator_id
 * @property string $score
 * @property \Illuminate\Support\Carbon $assessment_date
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Employee $employee
 * @property-read \App\Models\KpiIndicator $kpiIndicator
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment query()
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment whereAssessmentDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment whereKpiIndicatorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceAssessment whereUpdatedAt($value)
 * @method static \Database\Factories\PerformanceAssessmentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PerformanceAssessment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'kpi_indicator_id',
        'score',
        'assessment_date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'score' => 'decimal:2',
        'assessment_date' => 'date',
    ];

    /**
     * Get the employee that owns the performance assessment.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Get the KPI indicator that owns the performance assessment.
     */
    public function kpiIndicator(): BelongsTo
    {
        return $this->belongsTo(KpiIndicator::class);
    }
}