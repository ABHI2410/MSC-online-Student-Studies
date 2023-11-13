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
            'User ID' => $this->userID,
            'First Name' => $this->firstName,
            'Last Name' => $this->lastName,
            'Role' => $this->role,
            'Date Of Birth' => $this->dateOfBirth,
            'Age' => $this->age,
            'Term' => $this->term,
            'Enroll Year' => $this->enrollYear,
            'Phone No' => $this->phoneNo,
            'Address' => $this->address,
            'About Me' => $this->aboutme,
            'LinkedIn' => $this->linkedIn,
            'Github' => $this->github,
            'Instagram' => $this->instagram,
            'Twitter' => $this->twitter,
            'Facebook' => $this->facebook,
        ];
    }
}
