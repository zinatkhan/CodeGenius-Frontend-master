import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  listData: any;
  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUsers().subscribe(
      (data) => {
        this.listData = data;
      },
      (error) => {
        console.log('Error fetching table data:', error);
      }
    );
  }

  addFriend(f: any) {
    console.log("F", f._id)
    console.log("USER_____", sessionStorage.getItem("user_id"))
    let currentUser = sessionStorage.getItem("user_id") || ''
    this._userService.getChat(currentUser, f._id).subscribe(
      (chat: any) => {
        console.log("CHAT..", chat)
        alert("Friend Already Exists!")

      }, err => {
        console.log("NT asdas", err)
        if (err.error.message == 'Chat not found!') {
          this.createChat(currentUser, f._id)
        }
      })
  }

  createChat(logggedUser: string, friend: string) {
    const chatData = {
      user_id: logggedUser,
      user_id_friend: friend,
      group_id: -1,
      is_active: true
    };

    this._userService.createChat(chatData).subscribe(
      (data) => {

        alert("Chat Created Succesfully....")

        this._router.navigate(['/chat',{'friend':friend}])      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  // searchText:string=''
  // phoneNum:any=[{
  //   name:'user1',
  //   num:'21312312312312',
  //   adress:'lll,asdasda'
  // },
  // {
  //   name:'user2',
  //   num:'21312312312312',
  //   adress:'lll,asdasda'
  // },
  // {
  //   name:'user3',
  //   num:'21312312312312',
  //   adress:'lll,asdasda'
  // },
  // {
  //   name:'user4',
  //   num:'21312312312312',
  //   adress:'lll,asdasda'
  // }]

}
