<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=> $this->name,
            'description' => $this->description,
            'startDate'=> $this->startDate,
            'duration'=> $this->duration,
            'department'=> $this->department,
            'type'=> $this->type,
            'creditsRequired'=> $this->creditRequired,
            'overview'=> $this->overview,
            'vision'=> $this->vision,
            'mission'=> $this->mission,
            'careerOpportunities'=> $this->careeOpportunities,
            'location'=> $this->location,
        ];
    }
}
