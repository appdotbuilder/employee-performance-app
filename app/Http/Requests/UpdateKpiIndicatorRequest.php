<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKpiIndicatorRequest extends FormRequest
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
            'weight' => 'required|numeric|min:0|max:100',
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
            'name.required' => 'Nama indikator KPI wajib diisi.',
            'name.max' => 'Nama indikator KPI tidak boleh lebih dari 255 karakter.',
            'weight.required' => 'Bobot wajib diisi.',
            'weight.numeric' => 'Bobot harus berupa angka.',
            'weight.min' => 'Bobot tidak boleh kurang dari 0.',
            'weight.max' => 'Bobot tidak boleh lebih dari 100.',
        ];
    }
}