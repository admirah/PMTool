/**
 * Created by Admira on 09-May-17.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {nvD3} from 'ng2-nvd3'
import {MemberService} from "../services/member.service";
import {AuthService} from "../services/auth.service";
import {ReportsService} from "../services/reports.service";
declare let d3: any;
declare let nv: any;
@Component({
    selector: 'reports',
    templateUrl: `./reports.component.html`,
    //  styleUrls: ['./projects.css']
})

export class ReportsComponent implements OnInit {

    options: any;
    data: any;
    projectId: number;
    members: any;
    dataAvailable: boolean;
    finished: Array<any>;

    constructor(private router: Router, private reportsService: ReportsService, private route: ActivatedRoute, private memberService: MemberService, private auth: AuthService) {
        this.data = [
            {
                key: "Cumulative Return",
                values: []
            }
        ];

    }

    ngOnInit() {


        if (!this.auth.loggedIn()) {
            this.router.navigate(['login']);
        } else {


            this.route.params.subscribe(params => {
                this.projectId = +params['id'];
                this.reportsService.getFinished(this.projectId).subscribe((res: any) =>{
                this.finished = res;});


                this.memberService.get(this.projectId).subscribe(members => {
                    console.log(members);
                    this.members = members;
                    this.members.forEach((member: any) => {
                        this.reportsService.getFinishedByUser(this.projectId, member.id).subscribe(res => {
                                let x = {'label': member.name, 'value': res};
                                 this.data[0]['values'].push(x);
                                if (this.data[0].values.length === this.members.length ) {
                                    this.dataAvailable = true;
                                }
                            }
                        )


                    })


                });

                this.options = {
                    chart: {
                        type: 'discreteBarChart',
                        height: 450,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 50,
                            left: 55
                        },
                        x: function (d: any) {
                            return d.label;
                        },
                        y: function (d: any) {
                            return d.value;
                        },
                        showValues: true,
                        valueFormat: function (d: any) {
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
                }

            });
        }
    }
}
/**
 * Created by Admira on 28.05.2017..
 */
