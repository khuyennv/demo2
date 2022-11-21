import { Setting } from "src/entities/Setting";
import {
  DataSource,
  Repository,
} from "typeorm";

import { Injectable } from "@nestjs/common";

@Injectable()
export class SettingRepository extends Repository<Setting>{
	constructor(private dataSource: DataSource) {
		super(Setting, dataSource.createEntityManager())
	}

}