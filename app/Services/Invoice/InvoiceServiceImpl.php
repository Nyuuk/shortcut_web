<?php

namespace App\Services\Invoice;

class InvoiceServiceImpl implements InvoiceService
{
    public function newValueInvoive()
    {
        // make new string INVxxxxxxxxxxx
        $newString = 'INV' . str_pad(mt_rand(1, 9999999999), 10, '0', STR_PAD_LEFT);
        // continue with the rest of your code...
        // check to database
        $check = \App\Models\Invoice::where('invoice_number', $newString)->first();
        if ($check) {
            $this->newValueInvoive();
        } else {
            return $newString;
        }
    }
}
