<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            'userID' => $this->userID,
            'emailID' => $this->emailID,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'role' => $this->role,
            'dateOfBirth' => $this->dateOfBirth,
            'age' => $this->age,
            'term' => $this->term,
            'enrollYear' => $this->enrollYear,
            'phoneNo' => $this->phoneNo,
            'address' => $this->address,
            'aboutMe' => $this->aboutme,
            'linkedIn' => $this->linkedIn,
            'github' => $this->github,
            'instagram' => $this->instagram,
            'twitter' => $this->twitter,
            'facebook' => $this->facebook,
        ];
    }
}
