import { User } from "src/entities/User";
import {
  DataSource,
  Repository,
} from "typeorm";

import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {
	constructor(private dataSource: DataSource) {
		super(User, dataSource.createEntityManager())
	}
}
