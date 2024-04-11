export enum RoleName {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

export enum RoleId {
  ADMIN = 5150,
  EDITOR = 1984,
  USER = 2001,
}

export class Role {
  constructor(
    readonly id: number,
    readonly rolename: RoleName,
    readonly roleId: RoleId,
    readonly userId: number
  ) {}
}
