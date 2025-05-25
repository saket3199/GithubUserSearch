import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitHubUser } from 'src/app/models/github-user.model';
import { GithubApiService } from 'src/app/services/github-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user?: GitHubUser;
  loading = true;
  error?: string;

  constructor(private route: ActivatedRoute, private githubApi: GithubApiService) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.githubApi.searchUser(username).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
