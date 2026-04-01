export interface ValidatorInterface<ValidatedData> {
    parse(data: unknown): ValidatedData;
    safeParse?(data: unknown): { success: boolean; data?: ValidatedData };
}
