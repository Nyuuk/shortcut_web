<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'atas_nama',
        'type',
        'no_rek'
    ];

    public function invoice()
    {
        return $this->hasMany(Invoice::class, 'payment_method_id');
    }
}
