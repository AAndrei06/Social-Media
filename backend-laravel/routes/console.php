<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::call(function () {
    $timeThreshold = Carbon::now()->subMinute();

    $oldStories = DB::table('stories')->where('created_at', '<', $timeThreshold)->get();

    foreach ($oldStories as $story) {

        if ($story->file) {
            $filename = basename($story->file);
            $storagePath = 'storyFiles/' . $filename;

            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);
            }
        }

        if ($story->image) {
            $filename = basename($story->image);
            $storagePath = 'storyFiles/' . $filename;

            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);
            }
        }

        DB::table('stories')->where('id', $story->id)->delete();
        info("Deleted story with ID {$story->uuid}");
    }

    info('Old stories cleanup completed.');
})->everyMinute();