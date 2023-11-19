<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'courseID'=>$this->courseID,
            'name'=>$this->name, 
            'day'=>$this->day, 
            'timeStart'=>$this->timeStart, 
            'timeEnd'=>$this->timeEnd,
            'startDate'=>$this->startDate, 
            'endDate'=>$this->endDate,
            'location' => $this->location,
            'mode'=>$this->mode,
            'domain' => $this->domain,
            'credit' => $this->credit,
            'textbook' => $this->textbook,
            'syllabus' => $this->syllabus,
            'customer_id' => $this->customer_id,
            
        ];
    }
}
