<?php

/*
 * This file is part of datlechin/flarum-birthdays.
 *
 * Copyright (c) 2022 Ngo Quoc Dat.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Dhtml\FlarumGender;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\UserValidator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Symfony\Contracts\Translation\TranslatorInterface;

class GenderValidation
{
    public function __construct(
        protected TranslatorInterface $translator,
        protected SettingsRepositoryInterface $settings
    ) {

    }

    public function __invoke(UserValidator $flarumValidator, Validator $validator): void
    {
        $rules = $validator->getRules();

        $isRequired = $this->settings->get('dhtml-gender.required')
            && $this->settings->get('dhtml-gender.set_on_registration');

        $rules['gender'] = [
            //Rule::requiredIf($isRequired && ! $flarumValidator->getUser()),
            'sometimes',
            Rule::when($isRequired && ! $flarumValidator->getUser(), 'required', 'nullable'),
        ];

        $validator->setRules($rules);
    }
}
