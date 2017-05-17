"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Admira on 09-May-17.
 */
var core_1 = require("@angular/core");
var auth_service_1 = require("./../services/auth.service");
var router_1 = require("@angular/router");
var Credentials = (function () {
    function Credentials() {
    }
    return Credentials;
}());
var LoginComponent = (function () {
    function LoginComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.credentials = { username: '', password: '' };
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.auth.loggedIn()) {
            this.router.navigate(['projects']);
        }
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        console.log(this.credentials);
        this.auth.login(this.credentials);
        this.auth.login(this.credentials).then(function (response) {
            if (!response['Error']) {
                _this.router.navigate(['projects']);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: "./login.component.html",
        styleUrls: ['./login.css'],
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map