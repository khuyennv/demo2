import { BaseService } from "src/base/base.service";
import { Setting } from "src/entities/Setting";
import { LoggerService } from "src/logger/custom.logger";
import { FindOptionsWhere } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateSettingDto } from "./dto/create-setting.dto";
import { SettingRepository } from "./setting-repository";

@Injectable()
export class SettingsService extends BaseService<Setting, SettingRepository> {

  constructor(
    @InjectRepository(Setting) repository: SettingRepository,
    protected readonly logger: LoggerService,
  ) {
    super(repository, logger);

    // this.redis = redis
  }

  create(createSettingDto: CreateSettingDto) {
    return this.repository.save(createSettingDto);
  }

  findAll() {
    return this.repository.find();
  }

  /**
   * @param {EntityId} id
   * @param {any} data
   */
  async updateSetting(
    conditions: FindOptionsWhere<Setting>,
    data: any,
  ): Promise<number> {
    const update = await this.repository.update(conditions, data);

    return update.affected;
  }

  /**
   * @param {FjobSetting} model
   * @returns
   */
  getSettingByObject(model: Setting): {
    name: string;
    value: string | number | object;
  } {
    switch (model.type) {
      case "string":
        return { name: model.name, value: model.value };
      case "int":
        return { name: model.name, value: parseInt(model.value, 10) };
      case "json":
        return { name: model.name, value: JSON.parse(model.value) };
      default:
        model.name;
    }
  }

  /**
   * @param {setting} name
   * @returns
   */
  async getSetting(
    name: string,
    defaultValue: null | string | number | object = null,
  ): Promise<null | string | number | object> {
    const setting = await this.getOne({ name });

    if (!setting) return defaultValue;

    const result = this.getSettingByObject(setting);

    return result.value;
  }

  // /**
  //  * @param {setting} name
  //  * @returns
  //  */
  // async getSettingViaCache<T>(name: string, defaultValue: null | string | number | object = null): Promise<T | null> {
  //     let value = await this.redis.get(name)

  //     if (!value) {
  //         const val = await this.getSetting(name, defaultValue)

  //         if (val) {
  //             await this.redis.set(name, val as string | Buffer | number, DefaultSetting.DEFAULT_CACHE_SETTING)

  //             return val as unknown as T
  //         }

  //         return null
  //     }

  //     return value as unknown as T
  // }
}
