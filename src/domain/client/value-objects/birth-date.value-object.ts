export class BirthDateValueObject extends Date {
  toJSON(): string {
    return this.toISOString().split('T')[0];
  }
}
