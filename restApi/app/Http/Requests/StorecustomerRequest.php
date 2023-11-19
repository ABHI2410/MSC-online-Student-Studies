<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorecustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                'emailID'=>['required'],
                'firstName'=>['required'], 
                'lastName'=>['required'], 
                'role'=>['required', Rule::in(['Student', 'Instructor', 'QA', 'Program Coordinator', 'Admin'])],
                'dateOfBirth'=>['required'],
                'phoneNo'=>['required'], 
        ];
    }

    protected function prepareForValidation(){
        $this->merge([
            "emailID"=>$this->EmailID,
            "passowrd"=>$this->Password,
            "firstName"=>$this->FirstName,
            "lastName"=>$this->LastName,
            "phoneNo"=>$this->PhoneNo,
            "role"=>$this->Role,
            "registrationCode"=>$this->RegistrationCode,
            "dateOfBirth"=>$this->DateOfBirth,
        ]);
    }

}
