export { useForm } from "./use-form";
import { InitialForm } from "./types";
export type InitialFormType<T extends keyof any> = InitialForm<T>;
