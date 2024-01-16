<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'email',
        'no_wa',
        'alamat_ht',
        'alamat_st',
        'period',
        'catatan',
        'programs',
        'is_member',
        'programs_acc'
    ];

    protected $casts = [
        "programs" => "array",
        'programs_acc' => "array",
        'is_member' => "boolean"
    ];

    public function members()
    {
        return $this->hasOne(Member::class, 'request_id');
    }
}
