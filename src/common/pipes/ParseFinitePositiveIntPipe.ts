import {
  Injectable,
  PipeTransform,
  NotAcceptableException,
} from '@nestjs/common';
import { isStringFinitePositiveInteger } from '../utils/number.util';

@Injectable()
export class ParseFinitePositiveIntPipe
  implements PipeTransform<string, number>
{
  transform(value: string) {
    if (!isStringFinitePositiveInteger(value)) {
      throw new NotAcceptableException(
        'Please provide a valid positive integer value for the ID',
      );
    }

    return Number(value);
  }
}
