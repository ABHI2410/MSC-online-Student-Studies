<?php

namespace Database\Factories;

use DateTime;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-30 years', '-18 years');
        $age = $date->diff(new DateTime('today'))->y;
        $term = $this->faker->randomElement(['Fall', 'Spring', 'Summer']);
        $role = $this->faker->randomElement(['Student', 'Instructor', 'QA', 'Program Coordinator', 'Admin']);

        return [
            'user_id' => User::factory(),
            'userID' => $this->faker->numberBetween(202300000, 202399999),
            'firstName' => $this->faker->firstName(),
            'lastName' => $this->faker->lastName(),
            'role' => $role,
            'dateOfBirth' => $date,
            'age' => $age,
            'term' => $term,
            'enrollYear' => (string)date('Y'),
            'phoneNo' => $this->faker->phoneNumber(),
            'address' => $this->faker->streetAddress().' '.$this->faker->city().' '.$this->faker->postcode(),
            'aboutme' => $this->faker->text(),
            'linkedIn' => $this->faker->userName(),
            'github' => $this->faker->userName(),
            'instagram' => $this->faker->userName(),
            'twitter' => $this->faker->userName(),
            'facebook' => $this->faker->userName(),
            'deleted' => 0,
        ];
    }
}
