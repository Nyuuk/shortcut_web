<?php

namespace App\Repositories\Invoice;

interface InvoiceRepository
{
    public function create(array $data);
    public function update(array $data, $id);
    public function delete($id);
    public function find($id);
    public function all();
    public function filter($col, $data);
}
