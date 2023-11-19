<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StorecourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // $user = $this->user();
        // print_r($this->user()->role);
        // if($this->user()->role === 'Instructor'){
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
    public function rules(): array{
        return [
                
                'name'=>['required'], 
                'day'=>['required'], 
                'timeStart'=>['required'],
                'timeEnd'=>['required'],
                'startDate'=>['required'], 
                'endDate'=>['required'],
                'location' => ['required'],
                'mode'=>['required', Rule::in(['IN-PERSON','HYBRID','ONLINE'])],
                'domain' => ['required'],
                'credit' => ['required'],
                'textbook' => ['required'],
                'syllabus' => ['required', 'file'],
                'customer_id' => ['required'],
                'program_id' => ['required'],
        ];
    }
    protected function prepareForValidation(){
        $jsondata = json_decode($this->payload, false,JSON_THROW_ON_ERROR);
        $this->merge([
            'name' => $jsondata->name,
            'customer_id' => $jsondata->customer_id,
            'day' => is_array($jsondata->day) ? implode(',', $jsondata->day) : $jsondata->day,
            'timeStart' => $jsondata->timeStart,
            'timeEnd' => $jsondata->timeEnd,
            'startDate' => $jsondata->startDate,
            'endDate' => $jsondata->endDate,
            'location' => $jsondata->location,
            'mode' => $jsondata->mode,
            'credit' => $jsondata->credit,
            'domain' => $jsondata->domain,
            'textbook' => $jsondata->textbook,
            'program_id' => $jsondata->program_id,
            'syllabus' => $this->file('syllabus'),
        ]);
    }
}
