<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'deskripsi',
        'username',
        'harga',
        'is_active',
    ];

    protected $casts = [
        "is_active" => "boolean"
    ];
}
