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
        'is_ebook'
    ];

    protected $casts = [
        "is_active" => "boolean",
        'is_ebook' => 'boolean'
    ];
}
