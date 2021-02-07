import { HttpRequest, HttpResponse } from "@angular/common/http";
import { User } from "../models/user";
import { of, throwError } from "rxjs";


export class BackendMethots {
    private users: User[];
    constructor(private request: HttpRequest<any>) {
        this.users = this.getUsers();
    };

    public authenticate() {
        let filteredUsers = this.users.filter(user => {
            return user.username === this.request.body.username && user.password === this.request.body.password;
        });

        if (filteredUsers.length) {
            let user = filteredUsers[0];
            const { id, username, firstname, lastname } = user;
            let body = {
                id, username, firstname, lastname, token: 'fake-jwt-token'
            };
            return of(new HttpResponse({ status: 200, body }));
        } else {
            return throwError({ message: 'Username or password is incorreect!' });
        }
    };

    public registerUser() {
        let newUser = this.request.body;
        // validation
        if (this.checkIsDuplicateUser(this.users, newUser)) {
            return throwError({ message: 'Username "' + newUser.username + '" is already taken' });
        }
        this.registerNewUser(this.users, newUser);
        // respond 200 OK
        return of(new HttpResponse({ status: 200 }));
    }

    public getAllUsers() {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (!this.checkAuthorizationHeader(this.request)) {
            // return 401 not authorised if token is null or invalid
            return throwError({ error: { message: 'Unauthorised' } });
        }
        return of(new HttpResponse({ status: 200, body: this.users }));
    }

    public getUserById() {
        if (!this.checkAuthorizationHeader(this.request)) {
            // return 401 not authorised if token is null or invalid
            return throwError({ error: { message: 'Unauthorised' } });
        }
        // find user by id in users array
        let urlParts = this.request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedUsers = this.users.filter(user => { return user.id === id; });
        let user = matchedUsers.length ? matchedUsers[0] : null;

        return of(new HttpResponse({ status: 200, body: user }));
    }

    private getUsers(): User[] {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    private checkIsDuplicateUser(users: User[], newUser: User) {
        return users.filter(user => { return user.username === newUser.username; }).length;
    }

    private registerNewUser(users: User[], newUser: User) {
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    private checkAuthorizationHeader(req: HttpRequest<any>): boolean {
        return req.headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
}