<?php

namespace App\Repositories\Invoice;

use App\Models\Invoice;

class InvoiceRepositoryImp implements InvoiceRepository
{
    public function create(array $data)
    {
        return Invoice::create($data);
    }

    public function update(array $data, $id)
    {
        $invoice = $this->find($id);
        return $invoice->update($data);
    }

    public function delete($id)
    {
        return Invoice::destroy($id);
    }

    public function find($id)
    {
        return Invoice::find($id);
    }

    public function all()
    {
        return Invoice::orderBy('id', 'desc')->get();
    }

    public function filter($col, $data)
    {
        return Invoice::where($col, 'like', '%' . $data . '%')->get();
    }
}
