import { MongoParams } from "../../types/mongo_params.types";

export interface Auth extends MongoParams {
  identification: number;
  email: string;
  id_doctor?: string;
  id_hospital?: string;
  phone: number;
  password: string;
  name: string;
  address: string;
  createdAt: string;
  data_birth?: Date;
  medical_provided?: string;
  first_login?: boolean;
  rol: 'Hospital' | 'Doctor' | 'Patient';
}
