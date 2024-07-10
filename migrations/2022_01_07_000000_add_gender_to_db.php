<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;
use Illuminate\Support\Facades\Schema;
use Flarum\Database\Migration;


return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('users')) {
            if ($schema->hasColumn('users', 'gender')) {
                return;
            }

            $schema->table('users', function (Blueprint $table) {
                $table->string('gender', 50)->nullable();
            });

        }
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
        });
    }

];


