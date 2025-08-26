<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePerformanceAssessmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|exists:employees,id',
            'kpi_indicator_id' => 'required|exists:kpi_indicators,id',
            'score' => 'required|numeric|min:0|max:100',
            'assessment_date' => 'required|date',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'employee_id.required' => 'Karyawan wajib dipilih.',
            'employee_id.exists' => 'Karyawan yang dipilih tidak valid.',
            'kpi_indicator_id.required' => 'Indikator KPI wajib dipilih.',
            'kpi_indicator_id.exists' => 'Indikator KPI yang dipilih tidak valid.',
            'score.required' => 'Nilai wajib diisi.',
            'score.numeric' => 'Nilai harus berupa angka.',
            'score.min' => 'Nilai tidak boleh kurang dari 0.',
            'score.max' => 'Nilai tidak boleh lebih dari 100.',
            'assessment_date.required' => 'Tanggal penilaian wajib diisi.',
            'assessment_date.date' => 'Tanggal penilaian harus berupa tanggal yang valid.',
        ];
    }
}