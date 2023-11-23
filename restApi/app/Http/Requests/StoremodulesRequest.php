<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoremodulesRequest extends FormRequest
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
            'name' => ['required'],
            'section'=> ['required'],
            'location'=> ['required'],
            'description'=> ['required'],
            'course_id'=> ['required'],
        ];
    }
    protected function prepareForValidation(){
        $jsondata = json_decode($this->payload, false,JSON_THROW_ON_ERROR);
        $this->merge([
            'name' => $jsondata->name,
            'course_id' => $jsondata->course_id,
            'section' => $jsondata->section,
            'description' => $jsondata->description,
            'location' => $this->file('location'),
        ]);
    }
}
