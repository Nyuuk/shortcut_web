<?php

namespace App\Services\Request;

use App\Repositories\Request\RequestRepositorie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

use function PHPSTORM_META\map;

class RequestServiceImpl implements RequestService
{
    private $repository;
    private $validatorFormat;
    private $msgResult;

    public function __construct(RequestRepositorie $repository)
    {
        $this->repository = $repository;
        $this->validatorFormat = [
            'nama' => 'required|string',
            'email' => 'required|email',
            'no_wa' => 'required|numeric',
            'alamat_ht' => 'string',
            'alamat_st' => 'string',
            'period' => 'string',
            'catatan' => 'string',
            'programs' => 'required|array',
            'programs.*' => 'exists:programs,id',
        ];
        $this->msgResult = [
            'data' => 'data not found',
            'code' => 404,
            'message' => 'i hope you will be success everytime'
        ];
    }

    // Helper function untuk mendapatkan nama program dari IDs
    private function getProgramNames($programIds)
    {
        // Mendapatkan data program berdasarkan IDs
        $programs = \App\Models\Program::whereIn('id', $programIds)->get();

        // Mengambil nama program dan menyusunnya ke dalam array
        $programNames = $programs->pluck('username')->toArray();

        return $programNames;
    }

    public function index($anu = null)
    {
        $data = array();
        if ($anu == null) {
            $data = $this->getByPage(1, 10);
            // Log::info('anu null');
        } else if (is_array($anu)) {
            if (isset($anu['id'])) {
                $data = $this->getById($anu['id']);
                // Log::info('anu getById');
            } else if (isset($anu['page'])) {
                // Log::info('anu page');
                if (isset($anu['search'])) {
                    $data = $this->getByPageWithSearch($anu['page'], $anu['perPage'] ?? null, $anu['search']);
                    // Log::info('anu getByPageWithSearch');
                } else {
                    $data = $this->getByPage($anu['page'], $anu['perPage'] ?? null);
                    // Log::info('anu getByPage');
                }
            } else if (isset($anu['allData'])) {
                $data = $this->allData();
                // Log::info('anu allData');
            } else if (isset($anu['search'])) {
                $data = $this->getByPageWithSearch(1, 10, $anu['search']);
                // Log::info('anu getByPageWithSearch only search');
            } else {
                $data = $this->searchByColumn($anu);
                // Log::info('anu searchByColumn');
            }
        }
        $data->map(function ($request) {
            $request->programs = $this->getProgramNames($request->programs);
            $request->programs_acc = $request->programs_acc !== null ? $this->getProgramNames($request->programs_acc) : $request->programs_acc;
            return $request;
        });

        $this->msgResult['data'] = $data;
        $this->msgResult['code'] = 200;
        return $this->msgResult;
    }

    private function getByPage($page, $perPage)
    {
        $data = $this->repository->getByPage($page, $perPage);
        // $this->msgResult['data'] = $data;
        // $this->msgResult['code'] = 200;
        // return $this->msgResult;
        return $data;
    }

    private function getByPageWithSearch($page, $perPage, $search)
    {
        $data = $this->repository->getByPageWithSearch($page, $perPage, $search);
        // $dataWillReturn = $data->map(function ($request) {
        //     $request->programs = $this->getProgramNames($request->programs);
        //     $request->programs_acc = $request->programs_acc !== null ? $this->getProgramNames($request->programs_acc) : $request->programs_acc;
        //     return $request;
        // });
        // $this->msgResult['data'] = $dataWillReturn;
        // $this->msgResult['code'] = 200;
        return $data;
    }

    public function allData()
    {
        try {
            $data = $this->repository->all();
            $this->msgResult['data'] = $data;
            $this->msgResult['code'] = 200;
        } catch (\Throwable $th) {
            Log::info($th->getMessage());
            $this->msgResult['data'] = 'has an error in sistem, please contact administrator';
            $this->msgResult['code'] = 500;
        }
        return $this->msgResult['data'];
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
        return $this->msgResult['data'];
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
        return $this->msgResult['data'];
    }

    public function create($dataRequest)
    {
        $validateData = Validator::make($dataRequest, $this->validatorFormat);

        if ($validateData->fails()) {
            $this->msgResult['data'] = ['errors' => $validateData->errors()];
            $this->msgResult['code'] = 500;
            return $this->msgResult;
        }

        $existingEmailOrName = \App\Models\Request::where('email', $dataRequest['email'])
            ->where('nama', $dataRequest['nama'])
            ->get();

        if ($existingEmailOrName->count() > 0) {
            for ($i = 0; $i < $existingEmailOrName->count(); $i++) {
                if ($existingEmailOrName[$i]->period == $dataRequest['period'] && $existingEmailOrName[$i]->programs == $dataRequest['programs']) {
                    // $existingData[] = $existingEmailOrName[$i];
                    $this->msgResult['data'] = 'Your data is already exist';
                    $this->msgResult['code'] = 400;
                    return $this->msgResult;
                }
            }
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

    public function update($dataRequest, $id)
    {
        // $validateData = Validator::make($dataRequest, $this->validatorFormat);

        // if ($validateData->fails())
        // {
        //     $this->msgResult['data'] = $validateData->errors()->first();
        //     $this->msgResult['code'] = 500;
        //     return $this->msgResult;
        // }

        // DB::beginTransaction();

        // try {
        //     $this->msgResult['data'] = $this->repository->update($dataRequest, $id);
        //     $this->msgResult['code'] = 200;
        // } catch (\Throwable $th) {
        //     DB::rollBack();
        //     Log::info($th->getMessage());
        //     $this->msgResult['data'] = $th->getMessage();
        //     $this->msgResult['code'] = 500;
        // }
        // DB::commit();

        // return $this->msgResult;
        $this->msgResult['data'] = "update isn't allowed";
        $this->msgResult['code'] = 500;
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
            $this->msgResult['data'] = $this->repository->delete($id);
            $this->msgResult['code'] = 200;
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::info($th->getMessage());
            $this->msgResult['data'] = $th->getMessage();
            $this->msgResult['code'] = 500;
        }
        DB::commit();

        return $this->msgResult;
        // $this->msgResult['data'] = "delete isn't allowed";
        // $this->msgResult['code'] = 500;
        // return $this->msgResult;
    }
}
