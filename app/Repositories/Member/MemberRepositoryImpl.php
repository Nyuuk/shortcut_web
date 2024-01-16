<?php

namespace App\Repositories\Member;

use App\Models\Member;

class MemberRepositoryImpl implements MemberRepository
{
    //
    private $memberMD;

    public function __construct(Member $mem)
    {
        $this->memberMD = $mem;
    }

    public function create(array $data)
    {
        return $this->memberMD->create($data);
    }

    public function update(array $data, $id)
    {
        $user = $this->find($id);
        return $user->update($data);
    }

    public function delete($id)
    {
        return $this->memberMD->delete($id);
    }

    public function find($id)
    {
        return $this->memberMD->find($id);
    }

    public function all()
    {
        return $this->memberMD->orderBy('id', 'desc')->get();
    }

    public function filter($col, $data)
    {
        return $this->memberMD->where($col, 'like', '%' . $data . '%')->get();
    }
}
