<?php

namespace App\Http\Resources\V1;

use App\Models\program;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationCodeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'code' => $this->code,
            'role' => $this->role,
            'validFrom' => $this->validFrom,
            'validUntil' => $this->validUntil,
            'name' => $this->name,
            'type' =>$this->type,
        ];
    }
}
