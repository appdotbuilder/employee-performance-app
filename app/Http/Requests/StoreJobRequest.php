<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'employee_id' => 'required|exists:employees,id',
            'progress' => 'required|numeric|min:0|max:100',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date|after_or_equal:start_date',
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
            'name.required' => 'Nama pekerjaan wajib diisi.',
            'name.max' => 'Nama pekerjaan tidak boleh lebih dari 255 karakter.',
            'employee_id.required' => 'Karyawan wajib dipilih.',
            'employee_id.exists' => 'Karyawan yang dipilih tidak valid.',
            'progress.required' => 'Progress wajib diisi.',
            'progress.numeric' => 'Progress harus berupa angka.',
            'progress.min' => 'Progress tidak boleh kurang dari 0.',
            'progress.max' => 'Progress tidak boleh lebih dari 100.',
            'start_date.date' => 'Tanggal mulai harus berupa tanggal yang valid.',
            'due_date.date' => 'Tanggal selesai harus berupa tanggal yang valid.',
            'due_date.after_or_equal' => 'Tanggal selesai tidak boleh sebelum tanggal mulai.',
        ];
    }
}