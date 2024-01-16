<?php

namespace App\Services\Program;

interface ProgramService
{
    public function index();
    public function allData($oldest);
    public function getById($id);
    public function searchByColumn($dataRequest);
    public function create($dataRequest);
    public function update($dataRequest);
    public function delete($id);
}
