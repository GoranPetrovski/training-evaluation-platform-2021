import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-header-title',
    templateUrl: './header-title.component.html',
    styleUrls: ['./header-title.component.css']
})
export class HeaderTitleComponent implements OnInit {

    @Input() icon: string;
    @Input() title: string;
    constructor() { }

    ngOnInit() {
        console.log("Icon", this.icon);
    }
}