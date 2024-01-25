<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreprogramRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {   
        
        // if($this->user()->role === 'Program Coordinator'){
        //     return true;
        // } else {
        //     return false;
        // }
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
            'name'=> ['required'],
            'description' => ['required'],
            'startDate'=> ['required'],
            'duration'=> ['required'],
            'department'=> ['required', Rule::in(['CSE', 'ASE', 'ME', 'CE', 'BME', 'DM'])],
            'type'=> ['required', Rule::in(['Bachelor', 'Master', 'Ph.D.'])],
            'creditsRequired'=> ['required'],
            'overview'=> ['required'],
            'vision'=> ['required'],
            'mission'=> ['required'],
            'careerOpportunities'=> ['required'],
            'location'=> ['required'],
        ];
    }

    protected function prepareForValidation(){
        $this->merge([
            'name'=> $this->name,
            'description' => $this->description,
            'startDate'=> $this->startDate,
            'duration'=> $this->duration,
            'department'=> $this->department,
            'type'=> $this->type,
            'creditsRequired'=> $this->creditsRequired,
            'overview'=> $this->overview,
            'vision'=> $this->vision,
            'mission'=> $this->mission,
            'careerOpportunities'=> $this->careerOpportunities,
            'location'=> $this->location,
        ]);
    }
}
