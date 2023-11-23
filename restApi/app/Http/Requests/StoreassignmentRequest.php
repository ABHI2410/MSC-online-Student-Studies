<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreassignmentRequest extends FormRequest
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
            'dueDate'=> ['required'],
            'gradePoints'=> ['required'],
            'description'=> ['required'],
            'availableFrom'=> ['required'],
            'availableUntill'=> ['required'],
            'files'=> ['sometimes'],
            'attemptsAllowed' => ['sometimes'],
            'course_id'=> ['required'],
        ];
    }
    protected function prepareForValidation(){
        $jsondata = json_decode($this->payload, false,JSON_THROW_ON_ERROR);
        $this->merge([
            'name' => $jsondata->name,
            'course_id' => $jsondata->course_id,
            'dueDate' => $jsondata->dueDate,
            'description' => $jsondata->description,
            'gradePoints' => $jsondata->gradePoints,
            'availableFrom'=> $jsondata->availableFrom,
            'availableUntill'=> $jsondata->availableUntill,
            'files' => $this->file('files'),
        ]);
    }
}
