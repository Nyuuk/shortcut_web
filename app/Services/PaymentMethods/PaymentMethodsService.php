<?php

namespace App\Services\PaymentMethods;

use App\Models\PaymentMethod as ModelsPaymentMethod;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PaymentMethodsService
{
    private $msgResult;
    public function __construct()
    {
        $this->msgResult = [
            'data' => 'data not found',
            'code' => 404,
            'message' => 'i hope you will be success everytime'
        ];
    }
    public function all()
    {
        $this->msgResult['data'] = ModelsPaymentMethod::orderBy('id', 'desc')->get();
        $this->msgResult['code'] = 200;
        return $this->msgResult;
    }
    public function update($id, $req)
    {
        $validateData = Validator::make($req->all(), [
            'programs' => 'required|array',
            'programs.*' => 'exists:programs,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'status_invoice' => 'required|boolean'
        ]);
        if ($validateData->fails()) {
            $this->msgResult['data'] = $validateData->errors();
            $this->msgResult['code'] = 400;
            return $this->msgResult;
        }
        DB::beginTransaction();
        try {
            $request = \App\Models\Request::find($id);
            $request->programs_acc = $req->programs;

            $request->invoice->status = $req->status_invoice;
            $request->invoice->payment_method_id = $req->payment_method_id;

            $request->save();
            $request->invoice->save();

            $this->msgResult['data'] = $request;
            $this->msgResult['code'] = 200;
        } catch (\Throwable $err) {
            DB::rollBack();
            Log::info($err->getMessage());
            $this->msgResult['data'] = $err->getMessage();
            $this->msgResult['code'] = 500;
        }
        DB::commit();
        return $this->msgResult;
    }
}
