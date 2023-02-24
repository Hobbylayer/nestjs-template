import { Types } from "mongoose";

export interface JwtPayload {
  _id: string;
  roles: string[];
  companyId: string | Types.ObjectId
}
