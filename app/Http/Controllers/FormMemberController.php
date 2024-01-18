<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormMemberController extends Controller
{
    public function index(\App\Services\Program\ProgramServiceImpl $programsService)
    {
        $data = $programsService->index(null, true);
        $payment_methods = \App\Models\PaymentMethod::orderBy('id', 'desc')->get();
        return Inertia::render('FormMember', ['programs' => $data['data'], 'payment_methods' => $payment_methods]);
    }
    public function getInvoiceValue()
    {
        $invcService = new \App\Services\Invoice\InvoiceServiceImpl;
        $value = $invcService->newValueInvoive();
        return response()->json(['value' => $value], 200);
    }

    private function getProgramData($programIds)
    {
        // Mendapatkan data program berdasarkan IDs
        $programs = \App\Models\Program::whereIn('id', $programIds)->get();

        // Mengambil data yang dibutuhkan dari setiap program dan menyusunnya ke dalam array
        $programData = $programs->map(function ($program) {
            return [
                // 'id' => $program->id,
                'username' => $program->username,
                'nama' => $program->nama,
                'harga' => $program->harga,
                'deskripsi' => $program->deskripsi,
                // Tambahkan kolom lain yang kamu butuhkan di sini
            ];
        })->toArray();

        return $programData;
    }


    public function indexInvoice($inv)
    {
        $data = [];

        $inv = \App\Models\Invoice::where('invoice_number', $inv)->with('paymentMethod')->first();
        if (!$inv) {
            abort(404);
        }
        $data['invoice'] = $inv;

        $request = $inv->request;
        // $data['request'] = $request;

        // $programs = $request->programs->map(function ($req) {
        //     $req->programs = $this->getProgramData($req->programs);
        //     return $req->programs;
        // });
        $paymeth = $inv->paymentMethod();
        $data['payment_method'] = $paymeth;

        $programs = $this->getProgramData($request->programs);
        $programs_acc = $request->programs_acc !== null ? $this->getProgramData($request->programs_acc) : [];
        $data['programs_acc'] = $programs_acc;
        $data['programs'] = $programs;


        return Inertia::render('Invoice', [
            'data' => $data
        ]);
    }
}
