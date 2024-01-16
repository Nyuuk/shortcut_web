<?php

namespace App\Providers;

use App\Repositories\Member\MemberRepository;
use App\Repositories\Member\MemberRepositoryImpl;
use App\Repositories\Program\ProgramRepository;
use App\Repositories\Program\ProgramRepositoryImpl;
use App\Repositories\Request\RequestRepositorie;
use App\Repositories\Request\RequestRepositorieImpl;
use App\Services\Member\MemberService;
use App\Services\Member\MemberServiceImpl;
use App\Services\Program\ProgramService;
use App\Services\Program\ProgramServiceImpl;
use App\Services\Request\RequestService;
use App\Services\Request\RequestServiceImpl;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(RequestRepositorie::class, RequestRepositorieImpl::class);
        $this->app->bind(RequestService::class, RequestServiceImpl::class);

        $this->app->bind(ProgramRepository::class, ProgramRepositoryImpl::class);
        $this->app->bind(ProgramService::class, ProgramServiceImpl::class);

        $this->app->bind(MemberRepository::class, MemberRepositoryImpl::class);
        $this->app->bind(MemberService::class, MemberServiceImpl::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
