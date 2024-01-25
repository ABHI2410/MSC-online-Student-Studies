<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'dueDate'=> $this->dueDate,
            'gradePoints'=> $this->gradePoints,
            'description'=> $this->description,
            'availableFrom'=> $this->availableFrom,
            'availableUntill'=> $this->availableUntill,
            'files'=> $this->files,
            'attemptsAllowed' => $this->attemptsAllowed,
            'course_id'=> $this->course_id,
            'maxScore' => $this->maxScore,
            'highestScore' => $this->heighestScore,
            'lowestScore' => $this->lowestScore,
            'meanScore' => $this->meanScore,
            'medianScore' => $this->medianScore,
            'upperQuantileScore' => $this->upperQuantileScore,
            'lowerQuantileScore'=> $this->lowerQuantileScore,
            'course' => CourseResource::collection($this->whenLoaded('course')),
        ];
    }   
}
