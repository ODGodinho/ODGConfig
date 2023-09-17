export interface ValidatorInterface<ValidatedData> {
    parse(data: unknown): ValidatedData;
}
