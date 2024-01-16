<?php

namespace App\Repositories\Request;

interface RequestRepositorie
{
    public function create(array $data);
    public function update(array $data);
    public function delete($id);
    public function find($id);
    public function all();
    public function filter($col, $data);
    public function getByPage($page, $perPage);
    public function getByPageWithSearch($page = 1, $perPage = 10, $search);
}
