<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique(); // Ensure it's unsigned big integer and unique for one-to-one
            $table->string('first_name',50)->default('Prenume');
            $table->string('last_name',50)->default('Nume');
            $table->string('back_photo')->default('http://127.0.0.1:8000/storage/default/defBack.jpg');
            $table->string('profile_photo')->default('http://127.0.0.1:8000/storage/default/default.png');
            $table->string('occupation',100)->default('-');
            $table->string('location',100)->default('-');
            $table->string('education',100)->default('-');
            $table->string('person',100)->default('-');
            $table->integer('follows')->default(0);
            $table->integer('is_followed')->default(0);
            $table->text('resume')->default('');
            $table->string('gender')->default('A');
            $table->timestamp('birth_date')->nullable();
            $table->timestamps();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
