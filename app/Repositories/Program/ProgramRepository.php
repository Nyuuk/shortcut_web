<?php

namespace App\Repositories\Program;

interface ProgramRepository
{
    public function create(array $data);
    public function update($data, $id);
    public function delete($id);
    public function find($id);
    public function all();
    public function filter($col, $data);
    public function orderBy($col, $type);
}
