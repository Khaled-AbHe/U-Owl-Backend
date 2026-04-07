import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * Validates a Quebec licence plate format (ex: "ABC 123").
 *
 * Rules:
 * - Must be 7 characters long
 * - Must have a space at index 3
 * - All letters are in uppercase
 * - Must not contain the letter "O"
 */
export function IsLicencePlateValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLicencePlateValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const isLengthValid = value.length === 7;
          const isSeperationValid =
            value[3] === ' ' && value.split(' ').length === 2;
          const isUpperCase = value === value.toUpperCase();
          const areCharsValid = !value.includes('O');

          return (
            isLengthValid && isSeperationValid && isUpperCase && areCharsValid
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} is invalid`;
        },
      },
    });
  };
}
