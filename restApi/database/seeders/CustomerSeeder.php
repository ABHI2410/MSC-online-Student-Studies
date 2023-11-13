<?php

namespace Database\Seeders;
use App\Models\customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        customer::factory()
            ->count(100)
            ->create();
    }
}
