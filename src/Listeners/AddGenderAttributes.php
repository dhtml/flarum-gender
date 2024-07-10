<?php

namespace Dhtml\FlarumGender\Listeners;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class AddGenderAttributes
{
    public function __invoke(UserSerializer $serializer, User $user, array $attributes): array
    {
        $actor = $serializer->getActor();

        $attributes['gender'] = $user->gender;

        return $attributes;
    }
}
