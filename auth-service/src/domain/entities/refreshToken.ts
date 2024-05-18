export class RefreshToken {
  constructor(
    readonly id: number,
    readonly token: string,
    readonly createdAt: Date,
    readonly userId: number
  ) {}
}
