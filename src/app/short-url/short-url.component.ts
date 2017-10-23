import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShortCodeService } from '../shared';
import { DatabaseService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit, OnDestroy {
	query: string;
	nickname: string;
	result: string;
  warning: string;

  private key: string;
  private sub: any;

	constructor(
    private shortCodeService: ShortCodeService,
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

	ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.key = params['key'];
      if(this.key){
        this.databaseService.getUsedKey(this.key).subscribe(
          data => { 
            if(data && data.length>0) window.location.href = data[0].original_url;
          },
          err => {}
        );
      }
    });
	}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

	submit(): void {
    this.warning = '';
    this.result  = '';

		if(!this.nickname || this.nickname.trim() === ''){
      this.shortCodeService.getShortCode().subscribe(
        data => {
          if(data){
            this.result = environment.domainName + data.newKey;
            this.databaseService.createKey(data.newKey, this.query);
          }
          else{
            this.warning = `Something wrong, please try again.`;
          }
        },
        err => {
          // operations for errors.
          // Options: 1) log file 2) Action on page
        }
      );
    }
		else{
      this.databaseService.getUsedKey(this.nickname).subscribe(
        data => { 
          if(data && data.length <= 0){
            this.result = environment.domainName + this.nickname;
            this.databaseService.createKey(this.nickname, this.query);
          }
          else{
            this.warning = `The "${this.nickname}" has been used, please try another name.`;
          }
        },
        err => {
          // operations for errors.
          // Options: 1) log file 2) Action on page
        }
      );
    }
	}
}
