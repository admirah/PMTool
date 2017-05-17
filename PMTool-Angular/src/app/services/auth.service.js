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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        this.headers = new http_1.Headers();
        var cred = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
        this.headers.append('Authorization', cred);
        this.headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.get('http://localhost:7010/login', { headers: _this.headers })
                .map(function (res) {
                {
                    console.log(res);
                    return res.json();
                }
            })
                .subscribe(function (data) {
                if (!data.Error) {
                    console.log(data);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('id', data.id);
                    localStorage.setItem('user', data.username);
                    resolve(data);
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthService.prototype.getId = function () {
        return localStorage.getItem('id');
    };
    AuthService.prototype.loggedIn = function () {
        return localStorage.getItem('token') != null;
    };
    AuthService.prototype.getUser = function () {
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Token', this.getToken());
        return this.http.get('http://localhost:7010/users/users/' + this.getId(), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getUserData = function () {
        return localStorage.getItem('user');
    };
    AuthService.prototype.register = function (userData) {
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:7010/users/users/register', userData, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('user');
    };
    AuthService.prototype.editUserStorage = function (user) {
        localStorage.setItem('user', JSON.stringify(user));
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map