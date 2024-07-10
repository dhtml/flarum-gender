import app from 'flarum/forum/app';
import Component from 'flarum/Component';

export default class AddGenderField extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    //const user = app.session.user;
    //console.log(user);
    this.gender = app.session.user.gender();
  }
  //onblur to onchange
  view(vnode) {
    return (
      <fieldset className="Settings-theme">
        <legend>{app.translator.trans('dhtml-gender.forum.inputGender')}</legend>
        <select className="FormControl gender" id="gender" name="gender" value={this.gender}
                onblur={this.saveValue.bind(this)}>
          <option value="" disabled selected>
            {app.translator.trans(
              "dhtml-gender.forum.clickToSelectGender"
            )}
          </option>
          <option value="male">{app.translator.trans(
            "dhtml-gender.forum.male"
          )}
          </option>
          <option value="female">{app.translator.trans(
            "dhtml-gender.forum.female"
          )}
          </option>
          <option value="other">{app.translator.trans(
            "dhtml-gender.forum.other"
          )}
          </option>
        </select>
      </fieldset>
    );
  }

  saveValue(e) {
    const user = app.session.user;
    user
      .save({
        gender: e.target.value,
      })
      .then(app.alerts.show({type: 'success'}, app.translator.trans('dhtml-gender.forum.genderSaved')));
  }
}
