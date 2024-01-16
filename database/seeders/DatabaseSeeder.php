<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function PHPSTORM_META\map;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@shortcut.id',
            'password' => bcrypt('mudah_bangat'),
        ]);

        \App\Models\Program::create([
            'username' => 'sg1',
            'nama' => 'super grammar 1',
            'harga' => '75000',
            'deskripsi' => 'ini deskripsi program 1',
        ]);
        \App\Models\Program::create([
            'username' => 'sg2',
            'nama' => 'super grammar 2',
            'harga' => '75000',
            'deskripsi' => 'ini deskripsi program 2',
        ]);
        \App\Models\Program::create([
            'username' => 'sg3',
            'nama' => 'super grammar 3',
            'harga' => '75000',
            'deskripsi' => 'ini deskripsi program 3',
        ]);
        \App\Models\Program::create([
            'username' => 'vc1',
            'nama' => 'vocabularies 1',
            'harga' => '75000',
            'deskripsi' => 'ini deskripsi program 1',
        ]);
    }
}
