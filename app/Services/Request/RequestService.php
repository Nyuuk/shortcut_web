<?php

namespace App\Services\Request;

interface RequestService
{
    public function index();
    public function allData();
    public function getById($id);
    public function searchByColumn($dataRequest);
    public function create($dataRequest);
    public function update($dataRequest, $id);
    public function delete($id);
}
