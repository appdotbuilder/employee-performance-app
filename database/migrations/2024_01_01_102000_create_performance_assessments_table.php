<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('performance_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->foreignId('kpi_indicator_id')->constrained()->onDelete('cascade');
            $table->decimal('score', 5, 2)->comment('Score given for this KPI indicator (0-100)');
            $table->date('assessment_date');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index(['employee_id', 'kpi_indicator_id']);
            $table->index('assessment_date');
            $table->unique(['employee_id', 'kpi_indicator_id', 'assessment_date'], 'unique_employee_kpi_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performance_assessments');
    }
};