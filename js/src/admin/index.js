import app from 'flarum/admin/app';
import { extend } from 'flarum/common/extend';
import UserListPage from 'flarum/admin/components/UserListPage';

app.initializers.add('dhtml/flarum-gender', () => {
  app.extensionData
    .for('dhtml-gender')
    .registerSetting({
      setting: 'dhtml-gender.showGendersOnPosts',
      label: app.translator.trans('dhtml-gender.admin.showGendersOnPosts'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'dhtml-gender.showGendersOnPosts_text',
      label: app.translator.trans('dhtml-gender.admin.showGendersOnPosts_text'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'dhtml-gender.set_on_registration',
      type: 'boolean',
      label: app.translator.trans('dhtml-gender.admin.set_on_registration_label'),
    })
    .registerSetting({
      setting: 'dhtml-gender.required',
      type: 'boolean',
      label: app.translator.trans('dhtml-gender.admin.required_label'),
      help: app.translator.trans('dhtml-gender.admin.required_help'),
    })
    .registerSetting({
      setting: 'dhtml-gender.bind_login',
      type: 'boolean',
      label: app.translator.trans('dhtml-gender.admin.bind_label'),
      help: app.translator.trans('dhtml-gender.admin.bind_help'),
    })
  extend(UserListPage.prototype, 'columns', function (items) {
    items.add(
      'gender',
      {
        name: app.translator.trans('dhtml-gender.admin.genderColumn'),
        content: (user) => {
          const gender = user.data.attributes.gender;

          if (gender === '') return ' ';

          return (
            <div>
              <div className="adminGender">{gender}</div>
            </div>
          );
        },
      },
      -50
    );
  });
});
