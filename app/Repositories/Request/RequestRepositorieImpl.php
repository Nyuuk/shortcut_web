<?php

namespace App\Repositories\Request;

use App\Models\Request;

class RequestRepositorieImpl implements RequestRepositorie
{
    //
    private $requestMD;

    public function __construct(Request $req)
    {
        $this->requestMD = $req;
    }

    public function create(array $data)
    {
        return $this->requestMD->create($data);
    }

    public function update(array $data)
    {
        return $this->requestMD->update($data);
    }

    public function delete($id)
    {
        $uss = $this->find($id);
        return $uss->delete($id);
    }

    public function find($id)
    {
        return $this->requestMD->where('id', '=', $id)->first();
    }

    public function all()
    {
        return $this->requestMD->orderBy('id', 'desc')->get();
    }

    public function filter($col, $data)
    {
        return $this->requestMD->where($col, 'like', '%' . $data . '%')->get();
    }
    public function getByPage($page, $perPage)
    {
        return $this->requestMD->orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
    }

    public function getByPageWithSearch($page = 1, $perPage = 10, $search)
    {
        return $this->requestMD->where(function ($query) use ($search) {
            $query->where('nama', 'like', '%' . $search . '%')
                // ->orWhere('email', 'like', '%', $search, '%')
                ->orWhere('no_wa', 'like', '%' . $search . '%')
                // ->orWhere('catatan', 'like', '%' . $search . '%')
                ->orWhere('alamat_st', 'like', '%' . $search . '%');
        })->orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
    }
}
