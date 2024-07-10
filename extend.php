<?php

/*
 * This file is part of dhtml/flarum-gender.
 *
 * Copyright (c) 2024 Anthony Ogundipe.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Dhtml\FlarumGender;

use Dhtml\FlarumGender\Listeners\AddGenderAttributes;
use Dhtml\FlarumGender\Listeners\SaveGenderToDatabase;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\User\Event\Saving;
use Flarum\User\UserValidator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->serializeToForum('dhtml-gender.showGendersOnPosts', 'dhtml-gender.showGendersOnPosts', 'boolval', false)
        ->serializeToForum('dhtml-gender.showGendersOnPosts_text', 'dhtml-gender.showGendersOnPosts_text', 'boolval', false)
        ->serializeToForum('dhtml-gender.setGenderOnRegistration', 'dhtml-gender.set_on_registration', 'boolval')
        ->serializeToForum('dhtml-gender.setGenderBindLogin', 'dhtml-gender.bind_login', 'boolval'),

    (new Extend\Event())
        ->listen(Saving::class, SaveGenderToDatabase::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(AddGenderAttributes::class),

    (new Extend\Validator(UserValidator::class))
        ->configure(GenderValidation::class),
];
