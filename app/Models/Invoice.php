<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'invoice_number',
        'payment_method_id',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean'
    ];

    public function request()
    {
        return $this->belongsTo(Request::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}
