import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudentRecord {
    studentEmail: string;
    collegeName: string;
    rollNumber: string;
    address: string;
    timestamp: Time;
    phoneNumber: string;
    courseDetails: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllRecords(): Promise<Array<StudentRecord>>;
    submitRecord(rollNumber: string, collegeName: string, courseDetails: string, address: string, phoneNumber: string, studentEmail: string): Promise<void>;
}
