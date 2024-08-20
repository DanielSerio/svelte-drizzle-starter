import type { ZodSchema } from 'zod';
import type { Shape, ShapeKey } from '../record-shape';

export type ShapeValidator<
	Keys extends ShapeKey,
	RecordType extends Shape<Keys>
> = ZodSchema<RecordType>;
