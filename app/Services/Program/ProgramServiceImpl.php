<?php

namespace App\Services\Program;

use App\Models\Program;
use App\Repositories\Program\ProgramRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ProgramServiceImpl implements ProgramService
{
    private $repository;
    private $validatorFormat;
    private $msgResult;

    public function __construct(ProgramRepository $repository)
    {
        $this->repository = $repository;
        $this->validatorFormat = [
            'username' => 'required|string|unique:programs',
            'nama' => 'required|string',
            'deskripsi' => 'required|string',
            'is_active' => 'required|boolean',
            'harga' => 'required|numeric',
        ];
        $this->msgResult = [
            'data' => 'data not found',
            'code' => 404,
            'message' => 'i hope you will be success everytime'
        ];
    }

    public function index($anu = null, $oldest = false)
    {
        if ($anu == null) {
            return $this->allData($oldest);
        } else if (is_array($anu)) {
            if (isset($anu['id'])) {
                return $this->getById($anu['id']);
            }
            return $this->searchByColumn($anu);
        }
        $this->msgResult['data'] = 'has an error in your request';
        $this->msgResult['code'] = 500;
        return $this->msgResult;
    }
    public function allData($oldest)
    {
        try {
            $data = $this->repository->orderBy('id', $oldest ? 'asc' : 'desc');
            $this->msgResult['data'] = $data;
            $this->msgResult['code'] = 200;
        } catch (\Throwable $th) {
            Log::info($th->getMessage());
            $this->msgResult['data'] = 'has an error in sistem, please contact administrator';
            $this->msgResult['code'] = 500;
        }
        return $this->msgResult;
    }

    public function getById($id)
    {
        if (is_numeric($id) == false) {
            $this->msgResult['data'] = 'has an error in your request';
            $this->msgResult['code'] = 500;
        }
        try {
            $data = $this->repository->find($id);
            $this->msgResult['data'] = $data ?? "not found";
            $this->msgResult['code'] = $data ? 200 : 404;
        } catch (\Throwable $th) {
            $this->msgResult['data'] = 'has an error in sistem, please contact administrator';
            $this->msgResult['code'] = 500;
        }
        return $this->msgResult;
    }

    public function searchByColumn($dataRequest)
    {
        if (!$dataRequest['column']) {
            $this->msgResult['data'] = 'has an error in your request';
            $this->msgResult['code'] = 404;
        }
        if (!$dataRequest['data']) {
            $this->msgResult['data'] = 'has an error in your request';
            $this->msgResult['code'] = 404;
        }
        try {
            $data = $this->repository->filter($dataRequest['column'], $dataRequest['data']);
            $this->msgResult['data'] = $data;
            $this->msgResult['code'] = 200;
            // $result = ['code'=>200, 'data'=>$data, 'message'=>'i hope you will be success everytime'];
        } catch (\Throwable $th) {
            $msgError = $th->getMessage();

            if (strpos($msgError, "Unknown column") !== false) {
                // $result = ['message'=>'unknown column', 'code'=>404];
                $this->msgResult['data'] = 'unknown column';
                $this->msgResult['code'] = 404;
                // throw new InvalidArgumentException($msgError);
            } else {
                $this->msgResult['data'] = 'has an error in sistem, please contact administrator';
                $this->msgResult['code'] = 500;
                // $result = ['message'=>'have an error in sistem, please contact administrator', 'code'=>500];
            }
            // throw new InvalidArgumentException($th->getMessage());
        }
        return $this->msgResult;
    }

    public function create($dataRequest)
    {
        $validateData = Validator::make($dataRequest, $this->validatorFormat);

        if ($validateData->fails()) {
            $this->msgResult['data'] = $validateData->errors()->first();
            $this->msgResult['code'] = 500;
            return $this->msgResult;
        }

        DB::beginTransaction();

        try {
            $this->msgResult['data'] = $this->repository->create($dataRequest);
            $this->msgResult['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::info($th->getMessage());
            $this->msgResult['data'] = $th->getMessage();
            $this->msgResult['code'] = 500;
            // throw new InvalidArgumentException('data is not success to add');
        }
        DB::commit();
        return $this->msgResult;
    }

    public function update($dataRequest)
    {
        // make new validator format
        $newValidator = $this->validatorFormat;
        unset($newValidator['username']);
        // validate
        $validateData = Validator::make($dataRequest, $newValidator);

        if ($validateData->fails()) {
            $this->msgResult['data'] = $validateData->errors()->first();
            $this->msgResult['code'] = 500;
            return $this->msgResult;
        }

        DB::beginTransaction();

        try {
            $this->msgResult['data'] = $this->repository->update($dataRequest, $dataRequest['id']);
            $this->msgResult['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::info($th->getMessage());
            $this->msgResult['data'] = ['error' => $th->getMessage(), 'requestData' => $dataRequest];
            $this->msgResult['code'] = 500;
        }
        DB::commit();

        return $this->msgResult;
    }

    public function delete($id)
    {
        $this->msgResult['data'] = $this->repository->find($id);

        if (!$this->msgResult['data']) {
            $this->msgResult['data'] = 'not found';
            $this->msgResult['code'] = 404;
            return $this->msgResult;
        }

        DB::beginTransaction();

        try {
            $this->repository->delete($id);
            $this->msgResult['data'] = '';
            $this->msgResult['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::info($th->getMessage());
            $this->msgResult['data'] = $th->getMessage();
            $this->msgResult['code'] = 500;
        }
        DB::commit();

        return $this->msgResult;
    }
}
