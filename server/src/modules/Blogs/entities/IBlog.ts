import { ObjectId, Types } from "mongoose";
interface IBlog {
  title: string;
  body: string;
  user: Types.ObjectId;
  userName: string;
  imageUrl: string;
  likes: Types.ObjectId[];
}

export { IBlog };
