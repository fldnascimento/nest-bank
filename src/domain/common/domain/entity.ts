export abstract class Entity<T> {
  protected readonly _id: string;
  protected _props: T;

  constructor(props: T, id?: string) {
    this._id = id;
    this._props = props;
  }

  toJSON() {
    return {
      id: this._id,
      ...this._props,
    };
  }
}
