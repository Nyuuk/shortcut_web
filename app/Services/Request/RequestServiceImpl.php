<?php

namespace App\Services\Request;

use App\Repositories\Request\RequestRepositorie;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


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
        if (isset($anu['search'])) {
            $data = $this->getByPageWithSearch($anu['page'], $anu['perPage'] ?? null, $anu['search']);
            // Log::info('anu getByPageWithSearch');
        } else if (isset($anu['searchBy'])) {
            // parse json
            // $anu['searchBy'] = json_decode($anu['searchBy']);
            // string to array
            $anu['searchBy'] = explode(',', $anu['searchBy']);
            $data = $this->searchBy($anu['value'] ?? "", $anu['searchBy'], $anu['page'] ?? 1, $anu['perPage'] ?? 10);
        } else {
            $data = $this->getByPage($anu['page'] ?? 1, $anu['perPage'] ?? null);
        }

        $this->msgResult['data'] = $data;
        $this->msgResult['code'] = 200;
        return $this->msgResult;
    }

    private function searchBy(string $searchValue, array $searchTable, $page = 1, $perPage = 10)
    {
        $result = \App\Models\Request::orderBy('id', 'desc')->where(function ($query) use ($searchValue, $searchTable) {
            foreach ($searchTable as $key => $value) {
                if ($value == 'payment_method_name') {
                    $query->orWhereHas('invoice.paymentMethod', function ($q) use ($searchValue) {
                        $q->where('name', 'like', '%' . $searchValue . '%');
                    });
                    continue;
                } else if ($value == 'invoice_status') {
                    $query->orWhereHas('invoice', function ($q) use ($searchValue) {
                        $q->where('status', $searchValue);
                    });
                    continue;
                } else if ($value == 'programs_name') {
                    $nameProgram = \App\Models\Program::where('username', $searchValue)->select('id')->first();
                    if ($nameProgram) {
                        $query->orWhere('programs', 'LIKE', '%' . $nameProgram?->id . '%');
                        continue;
                    }
                } else if ($value == 'programs_acc_name') {
                    $namesProgram = \App\Models\Program::where('username', $searchValue)->select('id')->first();
                    if ($namesProgram) {
                        $query->orWhere('programs_acc', 'LIKE', '%' . $namesProgram?->id . '%');
                        continue;
                    }
                } else {
                    $query->orWhere($value, 'like', '%' . $searchValue . '%');
                }
            }
        })
            ->with('invoice.paymentMethod')
            ->paginate($perPage, ['*'], 'page', $page);

        $modifiedResult = $result->getCollection()->map(function ($request) use ($searchTable) {
            $data = ["id" => $request->id];
            foreach ($searchTable as $key => $value) {
                if ($value == 'payment_method_name') {
                    $data[$value] = $request->invoice->paymentMethod->name;
                    continue;
                }
                if ($value == 'invoice_status') {
                    $data[$value] = $request->invoice->status;
                    continue;
                }
                if ($value == 'programs_name') {
                    $data['programs_name'] = $this->getProgramNames($request->programs);
                    $data['programs_id'] = $request->programs;
                    continue;
                }
                if ($value == 'programs_acc_name') {
                    $data['programs_acc_name'] = $request->programs_acc !== null ? $this->getProgramNames($request->programs_acc) : [];

                    $data['programs_acc_id'] = $request->programs_acc !== null ? $request->programs_acc : [];
                    continue;
                }
                $data[$value] = $request->$value;
            }

            return $data;
        });

        $modifiedPaginator = new LengthAwarePaginator(
            $modifiedResult,
            $result->total(),
            $perPage, // Ganti dengan jumlah item per halaman yang diinginkan
            $result->currentPage(),
            ['path' => LengthAwarePaginator::resolveCurrentPath()]
        );
        return $modifiedPaginator;

        // return $result;
    }

    private function getByPage($page, $perPage)
    {
        $data = $this->repository->getByPage($page, $perPage);
        return $data;
    }

    private function getByPageWithSearch($page, $perPage, $search)
    {
        $data = $this->repository->getByPageWithSearch($page, $perPage, $search);
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
        $validatorFormat = [
            'invoice_number' => 'required|string|regex:/^INV\d{10}$/|unique:invoices,invoice_number',
            'payment_method_id' => 'required|exists:payment_methods,id',
            ...$this->validatorFormat
        ];
        $validateData = Validator::make($dataRequest, $validatorFormat);

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
            $dataValue = [
                'nama' => $dataRequest['nama'],
                'email' => $dataRequest['email'],
                'no_wa' => $dataRequest['no_wa'],
                'period' => $dataRequest['period'],
                'programs' => $dataRequest['programs'],
            ];
            if (!empty($dataRequest['catatan'])) {
                $dataValue['catatan'] = $dataRequest['catatan'];
            }
            if (!empty($dataRequest['alamat_st'])) {
                $dataValue['alamat_st'] = $dataRequest['alamat_st'];
            }
            if (!empty($dataRequest['alamat_ht'])) {
                $dataValue['alamat_ht'] = $dataRequest['alamat_ht'];
            }
            $newData = $this->repository->create($dataValue);
            $valueInvoice = [
                'request_id' => $newData->id,
                'invoice_number' => $dataRequest['invoice_number'],
                'payment_method_id' => $dataRequest['payment_method_id'],
            ];
            $invoiceRepo = new \App\Repositories\Invoice\InvoiceRepositoryImp;
            $invoice = $invoiceRepo->create($valueInvoice);

            $this->msgResult['data'] = ['newData' => $newData, 'invoice' => $invoice];
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
