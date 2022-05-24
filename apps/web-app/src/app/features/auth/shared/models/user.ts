import { User as FirebaseUser } from '@firebase/auth';

export interface IUser {
  displayName: string | null;
  phoneNumber: string;
  uid: string;
}

export class User implements IUser {
  displayName: string | null;
  phoneNumber: string;
  uid: string;

  constructor(user: FirebaseUser) {
    this.displayName = user.displayName;
    this.phoneNumber = user.phoneNumber!;
    this.uid = user.uid;
  }

  get(): IUser {
    return {
      displayName: this.displayName,
      phoneNumber: this.phoneNumber,
      uid: this.uid,
    };
  }
}
