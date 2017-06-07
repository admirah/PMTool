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
var router_1 = require("@angular/router");
var member_service_1 = require("../services/member.service");
var auth_service_1 = require("../services/auth.service");
var reports_service_1 = require("../services/reports.service");
var ReportsComponent = (function () {
    function ReportsComponent(router, reportsService, route, memberService, auth) {
        this.router = router;
        this.reportsService = reportsService;
        this.route = route;
        this.memberService = memberService;
        this.auth = auth;
        this.data = [
            {
                key: "Cumulative Return",
                values: []
            }
        ];
        this.data2 = [
            {
                key: "Description",
                values: []
            }
        ];
    }
    ReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.auth.loggedIn()) {
            this.router.navigate(['login']);
        }
        else {
            var taskStatuses_1 = ["Backlog", "Sprint", "In progress", "QA", "Done"];
            [1, 2, 3, 4, 5].forEach(function (key, value) {
                _this.reportsService.getFinishedGrouped(value).subscribe(function (res) {
                    console.log(value);
                    var x = { 'label': taskStatuses_1[value], 'value': res.totalWeight + 1 };
                    _this.data2[0]['values'].push(x);
                    if (_this.data2[0].values.length === 5) {
                        _this.dataAvailable2 = true;
                    }
                });
            });
            this.route.params.subscribe(function (params) {
                _this.projectId = +params['id'];
                _this.reportsService.getFinished(_this.projectId).subscribe(function (res) {
                    _this.finished = res;
                });
                _this.memberService.get(_this.projectId).subscribe(function (members) {
                    console.log(members);
                    _this.members = members;
                    _this.members.forEach(function (member) {
                        _this.reportsService.getFinishedByUser(_this.projectId, member.id).subscribe(function (res) {
                            var x = { 'label': member.name, 'value': res };
                            _this.data[0]['values'].push(x);
                            if (_this.data[0].values.length === _this.members.length) {
                                _this.dataAvailable = true;
                            }
                        });
                    });
                });
                _this.options = {
                    chart: {
                        type: 'discreteBarChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 50,
                            left: 55
                        },
                        x: function (d) {
                            return d.label;
                        },
                        y: function (d) {
                            return d.value;
                        },
                        showValues: true,
                        valueFormat: function (d) {
                            return d3.format(',.4f')(d);
                        },
                        duration: 500,
                        xAxis: {
                            axisLabel: 'X Axis',
                        },
                        yAxis: {
                            axisLabel: 'Y Axis',
                            axisLabelDistance: -10
                        }
                    }
                };
            });
        }
    };
    return ReportsComponent;
}());
ReportsComponent = __decorate([
    core_1.Component({
        selector: 'reports',
        templateUrl: "./reports.component.html",
    }),
    __metadata("design:paramtypes", [router_1.Router, reports_service_1.ReportsService, router_1.ActivatedRoute, member_service_1.MemberService, auth_service_1.AuthService])
], ReportsComponent);
exports.ReportsComponent = ReportsComponent;
/**
 * Created by Admira on 28.05.2017..
 */
//# sourceMappingURL=reports.component.js.map