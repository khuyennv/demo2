import { BaseController } from "src/base/base.controller";
import { MessageComponent } from "src/components/message.component";
import { ErrorCodes } from "src/constants/error-code.const";
import { Token } from "src/decorators/token.decorator";
import { TokenDto } from "src/dtos/token.dto";
import { DatabaseError } from "src/exceptions/errors/database.error";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";

import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { SettingsService } from "./settings.service";

@ApiBearerAuth()
@ApiTags('Settings')
@Controller('settings')
export class SettingsController extends BaseController {
    constructor(private readonly settingsService: SettingsService, private readonly i18n: MessageComponent) {
        super(i18n);
    }

   
    /**
     * @param  {TokenDto} token
     * @param  {CreateSettingDto} createSettingDto
     */
     @Post()
    async create(@Token() token: TokenDto, @Body() createSettingDto: CreateSettingDto) {
        try {
            return {
                data: await this.settingsService.create(createSettingDto),
                message: this.i18n.lang("INSERT_SUCCESS", token.lang)
            }
        } catch (error) {
            this.throwErrorProcess(error, token)
        }
        return;
    }

    
    /**
     * Get all settings
     */
    @Get()
    async findAll() {
        const settings = await this.settingsService.findAll()
        let result = {}

        settings.forEach(setting => {
            const sett = this.settingsService.getSettingByObject(setting)

            result[sett.name] = sett.value
        })

        return {
            data: result
        }
    }
    
    /**
     * @param  {string} name
     */
     @Get(':name')
     async findOne(@Param('name') name: string) {
        return {
            data: await this.settingsService.getSetting(name)
        }
    }

    @Patch(':name')
    async update(@Token() token: TokenDto, @Param('name') name: string, @Body() updateSettingDto: UpdateSettingDto) {
        try {
            await this.settingsService.updateSetting({ name }, updateSettingDto)

            return {
                message: this.i18n.lang("UPDATE_SUCCESS", token.lang)
            }
        } catch (error) {
            this.throwErrorProcess(error, token)
        }
    }

    @Delete(':id')
    async remove(@Token() token: TokenDto, @Param('id') id: string) {
        try {
            if ((await this.settingsService.remove(+id)).affected) {
                return {
                    message: this.i18n.lang("DELETE_SUCCESS", token.lang)
                }
            } else {
                throw new DatabaseError(
                    "JOB_CATEGORY_NOT_EXIST",
                    "Category not exist",
                    ErrorCodes.JOB_CATEGORY_NOT_EXIST)
            }

        } catch (error) {
            this.throwErrorProcess(error, token)
        }
    }
}
