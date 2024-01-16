<?php

namespace App\Repositories\Program;

use App\Models\Program;

class ProgramRepositoryImpl implements ProgramRepository
{
    private $pgDB;

    public function __construct(Program $pg)
    {
        $this->pgDB = $pg;
    }

    public function create(array $data)
    {
        return $this->pgDB->create($data);
    }

    public function update($data, $id)
    {
        $user = $this->pgDB->find($id);
        $user->update($data);
        return $data;
    }

    public function delete($id)
    {
        $data = $this->pgDB->find($id);
        return $data->delete();
    }

    public function find($id)
    {
        return $this->pgDB->find($id);
    }

    public function all($oldest = false)
    {
        if ($oldest) {
            return $this->pgDB->all();
        }
        return $this->pgDB->orderBy('id', 'desc')->get();
    }

    public function filter($col, $data)
    {
        return $this->pgDB->where($col, 'like', '%' . $data . '%')->get();
    }
}
