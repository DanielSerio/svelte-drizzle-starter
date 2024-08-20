export type ShapeKey = string;
export type Shape<Key extends ShapeKey> = Record<Key, any>;
export type StampedShapeKeys<Key extends ShapeKey> = Key | 'createdAt' | 'updatedAt';
export type UserOwnedKeys<Key extends ShapeKey> = Key | 'userId';
export type StampedUserOwnedKeys<Key extends ShapeKey> = StampedShapeKeys<UserOwnedKeys<Key>>;

export type StampedShape<Key extends ShapeKey> = Shape<StampedShapeKeys<Key>>;
export type UserOwnedShape<Key extends ShapeKey> = Shape<UserOwnedKeys<Key>>;
export type StampedUserOwnedShape<Key extends ShapeKey> = Shape<StampedUserOwnedKeys<Key>>;
