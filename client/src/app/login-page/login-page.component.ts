import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {


  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private  route: ActivatedRoute) {

  }

  ngOnDestroy() {
        if (this.aSub) this.aSub.unsubscribe()
    }

  ngOnInit()  {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      } else if (params['accessDenied']) {

      }
    })
  }

  onSubmit() {
    this.form.disable()
  this.aSub = this.auth.login(this.form.value).subscribe(
    () => this.router.navigate(['/overview']),
    error => {
      console.warn(error)
      this.form.enable()
    }
  )
  }

}
