<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
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
            'division' => 'required|string|max:255',
            'user_id' => 'nullable|exists:users,id',
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
            'name.required' => 'Nama karyawan wajib diisi.',
            'name.max' => 'Nama karyawan tidak boleh lebih dari 255 karakter.',
            'division.required' => 'Divisi wajib diisi.',
            'division.max' => 'Divisi tidak boleh lebih dari 255 karakter.',
            'user_id.exists' => 'User yang dipilih tidak valid.',
        ];
    }
}