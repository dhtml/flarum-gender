import app from 'flarum/forum/app';
import {extend, override} from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';
import UserCard from 'flarum/forum/components/UserCard';
import EditUserModal from 'flarum/forum/components/EditUserModal';
//import Stream from 'flarum/utils/Stream';
import CommentPost from 'flarum/forum/components/CommentPost';

import Stream from "flarum/common/utils/Stream";
import SignUpModal from "flarum/forum/components/SignUpModal";

import WelcomeHero from 'flarum/forum/components/WelcomeHero';
import AddGenderField from "./components/AddGenderField";

app.initializers.add('dhtml/flarum-gender', () => {


  User.prototype.gender = Model.attribute('gender');

  //Binding Login
  override(WelcomeHero.prototype, 'view', function (original) {
    if (app.session.user && app.session.user.isEmailConfirmed()) {
      if (app.session.user.data.attributes.gender != null && app.session.user.data.attributes.gender != '') {
        return original();
      }
      if (app.forum.attribute('dhtml-gender.setGenderBindLogin') === true) {
        return m("div.Alert", [m("div.container", [m("span.alert-danger", app.translator.trans('dhtml-gender.forum.binding_gender')), m("a.bind.Button--primary[href=" + app.forum.attribute('baseUrl') + "/settings]", app.translator.trans('dhtml-gender.forum.binding_gender_click'))])]);
      }
    }
    return original();
  });

  //Info Items
  extend(SettingsPage.prototype, 'settingsItems', function (items) {
    items.add('gender', <AddGenderField/>);
  });
  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.attrs.user;
    let gender = user.gender();
    if (gender === '') return;
    if (gender === undefined) return;
    if (gender === null) return;

    if (gender == "male") {
      items.add('gender', <div className="ipinfo gender-v2" id="gender">
        <strong><i class="fa fa-mars"></i> m</strong>
      </div>);
    } else if (gender == "female") {
      items.add('gender', <div className="ipinfo gender-v2" id="gender">
        <strong><i class="fa fa-venus"></i> f</strong>
      </div>);
    }

  });
  extend(EditUserModal.prototype, 'oninit', function () {
    this.gender = Stream(this.attrs.user.gender());
  });
  extend(EditUserModal.prototype, 'fields', function (items) {
    items.add('gender', <div className="Form-group">
      <label>{app.translator.trans('dhtml-gender.forum.inputGender')}</label>
      <input className="FormControl" bidi={this.gender}/>
    </div>, 1);
  });
  extend(EditUserModal.prototype, 'data', function (data) {
    const user = this.attrs.user;
    if (this.gender() !== user.gender()) {
      data.gender = this.gender();
    }
  });

  //Header Items
  extend(CommentPost.prototype, 'headerItems', function (items) {
    if (app.forum.attribute('dhtml-gender.showGendersOnPosts') === true) {
      if (app.forum.attribute('dhtml-gender.showGendersOnPosts_text') === true) {

        const user = this.attrs.post.user();
        if (!user) return;
        let gender = user.gender();
        if (gender === '') return;
        if (gender === undefined) return;
        if (gender === null) return;
        if (!user) return;


        if (gender == "male") {
          items.add('gender', <div className="ipinfo gender-v2" id="gender">
            <strong><i class="fa fa-mars"></i> m</strong>
          </div>, 11);
        } else if (gender == "female") {
          items.add('gender', <div className="ipinfo gender-v2" id="gender">
            <strong><i class="fa fa-venus"></i> f</strong>
          </div>, 11);
        }


      } else {

        const user = this.attrs.post.user();
        if (!user) return;
        let gender = user.gender();
        if (gender === '') return;
        if (gender === undefined) return;
        if (gender === null) return;
        if (!user) return;

        if (gender == "male") {
          items.add('gender', <div className="ipinfo gender-v2" id="gender">
            <strong><i class="fa fa-mars"></i> m</strong>
          </div>);
        } else if (gender == "female") {
          items.add('gender', <div className="ipinfo gender-v2" id="gender">
            <strong><i class="fa fa-venus"></i> f</strong>
          </div>);
        }

      }
    }
  });

  /////////////////////////////////////////////////////
  extend(SignUpModal.prototype, 'oninit', function () {
    if (app.forum.attribute('dhtml-gender.setGenderOnRegistration')) {
      this.gender = Stream("");
    }
  });

  extend(SignUpModal.prototype, 'fields', function (items) {
    if (app.forum.attribute('dhtml-gender.setGenderOnRegistration')) {
      items.add("gender", <div className="Form-group">
        <select style="width: 100%; margin: 0 auto; text-align: center; height: 50px;" className="FormControl gender"
                id="gender" name="gender" placeholder="Gender" aria-invalid="false">
          <option value="" disabled selected>
            {app.translator.trans("dhtml-gender.forum.clickToSelectGender")}
          </option>
          <option value="male">{app.translator.trans("dhtml-gender.forum.male")}
          </option>
          <option value="female">{app.translator.trans("dhtml-gender.forum.female")}
          </option>
          <option value="other">{app.translator.trans("dhtml-gender.forum.other")}
          </option>
        </select>
      </div>, 20);
    }
  });

  extend(SignUpModal.prototype, 'submitData', function (data) {
    if (app.forum.attribute('dhtml-gender.setGenderOnRegistration')) {
      const inputValue = document.querySelector('.FormControl.gender')
      var value = inputValue.options[inputValue.selectedIndex].value; // Get value
      data.gender = value;
    }
  });

});
