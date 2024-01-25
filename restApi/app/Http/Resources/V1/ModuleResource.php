<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
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
            'section'=> $this->section,
            'location' => $this->location,
            'course_id' => $this->course_id,
        ];
    }
}
