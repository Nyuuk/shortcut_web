<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'programs',
        'request_id'
    ];

    protected $casts = [
        'programs' => 'array'
    ];

    public function requests()
    {
        return $this->belongsTo(Request::class, 'request_id');
    }
}
