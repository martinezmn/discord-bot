export abstract class Entity<T> {
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(props: Omit<T, 'createdAt' | 'updatedAt'>) {
    return Object.assign(this, props);
  }
}
