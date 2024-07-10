<?php

namespace Dhtml\FlarumGender\Listeners;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveGenderToDatabase
{

    public function handle(Saving $event): void
    {
        //Allow admins to create users from the admin panel
        if ($event->actor->isAdmin()) {
            //return;
        }

        $user = $event->user;
        $data = $event->data;
        $actor = $event->actor;

        $data = $event->data;

        /**
         * User is registering from Auth Provider
         */
        //if (isset($data['attributes']['token'])) {
        //    return;
        //}

        $isSelf = $actor->id === $user->id;
        $canEdit = $actor->can('edit', $user);
        $attributes = Arr::get($data, 'attributes', []);

        if (isset($attributes['gender'])) {
            $user->gender = $attributes['gender'] === '' ? '' : $attributes['gender'];
            //$user->save();
        }
    }
}
