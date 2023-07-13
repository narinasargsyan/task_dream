import { validate } from 'express-validation';
import validationSchema from './validationSchema';

export default  (name: string | number) => validate(validationSchema[name], validationSchema.config, {});
