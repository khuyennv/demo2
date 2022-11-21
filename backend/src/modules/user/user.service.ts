import { BaseService } from "src/base/base.service";
import { PaginationDto } from "src/base/pagination.dto";
import { ErrorCodes } from "src/constants/error-code.const";
import { User } from "src/entities/User";
import { DatabaseError } from "src/exceptions/errors/database.error";
import { LoggerService } from "src/logger/custom.logger";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import {
  DeleteResult,
  InsertResult,
  QueryFailedError,
} from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { GetUserDto } from "./dto/get-user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
    constructor(
		@InjectRepository(User)
        repository: UserRepository,
        logger: LoggerService
    ) {
        super(repository, logger)
    }

    /**
     * @param {string} code
     * @param {boolean} getFullInfo
     * @param {string} fields
     *
     * @returns Promise<GetUserDto | User>
     */
    async getUser(
        code: string,
        getFullInfo: boolean = false,
        fields?: string[]
    ): Promise<GetUserDto | User> {
        const user = new GetUserDto()
        if (fields) {
            fields = fields.filter(field => {
                return user.hasProperty(field)
            })

            if (!fields.includes("code")) fields.push("code")
            if (!fields.includes("id")) fields.push("id")
        }

        const result = await this.getOne(
            { code },
            (!getFullInfo && fields) ? fields : null
        )

        if (!result) throw new DatabaseError(
            "USER_NOT_EXIST",
            "User doesn't exist",
            ErrorCodes.USER_NOT_EXIST)

        if (!getFullInfo) {
            user.setAttributes(result)

            return user
        }

        return result
    }

    /**
     * @param {CreateUserDto} userData
     *
     * @returns Promise<User>
     */
    async createUser(userData: CreateUserDto): Promise<User> {
        userData.isPersonal = userData.isPersonal ?? 1

        const isDuplicated = await this.repository.findOne(
            {
                where: [
                    { code: userData.code },
                    { phoneNumber: userData.phoneNumber ? userData.phoneNumber : "-" },
                    { email: userData.email ? userData.email : "-" }
                ]
            }
        )

        if (isDuplicated) {
            throw (isDuplicated.code == userData.code)
                ? new DatabaseError(
                    "USER_CODE_ALREADY_EXISTS",
                    "Duplicated User Code",
                    ErrorCodes.USER_CODE_ALREADY_EXISTS)
                : new DatabaseError(
                    "USER_PHONE_NUMBER_ALREADY_EXISTS",
                    "Duplicated Phone Number",
                    ErrorCodes.USER_PHONE_NUMBER_ALREADY_EXISTS)
        }

        let result: InsertResult
        try {
            result = await this.repository.createQueryBuilder()
                .insert()
                .values(userData)
                .execute()
        } catch (error: unknown) {
            if (error instanceof QueryFailedError) {
                throw new DatabaseError("INSERT_ERROR",
                    error as unknown as Record<string, unknown>,
                    ErrorCodes.INSERT_ERROR)
            }


            throw new DatabaseError("DATABASE_CONNECTION_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.DATABASE_CONNECTION_ERROR)
        }

        return new User(result.generatedMaps[0])
    }

    /**
     * @param {string} code
     * @param {UpdateUserDto} userData
     *
     * @returns Promise<User>
     */
    async updateUser(
        code: string,
        userData: Record<string, unknown>
    ): Promise<User> {
        try {
            //Update Record in User Table
            await this.repository.createQueryBuilder()
                .update()
                .set(userData)
                .where("code = :code", { code: code })
                .execute()

        } catch (error: unknown) {
            if (error instanceof QueryFailedError) {
                throw new DatabaseError(
                    "UPDATE_ERROR",
                    error as unknown as Record<string, unknown>,
                    ErrorCodes.UPDATE_ERROR)
            }
            throw new DatabaseError(
                "DATABASE_CONNECTION_ERROR",
                error as Record<string, unknown>,
                ErrorCodes.DATABASE_CONNECTION_ERROR)
        }

        return await this.repository.findOne({ where: { code: code } })
    }

    /**
     * @param {string} code
     *
     * @returns Promise<DeleteResult>
     */
    async deleteUser(code: string): Promise<DeleteResult> {
        return this.repository.delete({ code: code })
    }

    /**
     * @param {number} page
     * @param {number} limit
     * @param {string[]} fields
     * @returns
     */
    async paginateUser(page: number, limit: number, fields?: string[]): Promise<PaginationDto<GetUserDto>> {
        if (fields) {
            const user = new GetUserDto()
            fields = fields.filter(field => {
                return user.hasProperty(field)
            })
            fields.push("code")
        }

        const rawPagination = (await this.paginate(page, limit, fields))
        const rawData = rawPagination.data

        const userPagination = new PaginationDto<GetUserDto>()

        const newData: GetUserDto[] = []
        rawData.forEach((user: User) => {
            newData.push(new GetUserDto(user))
        })

        userPagination.data = newData
        userPagination.meta = rawPagination.meta

        return userPagination
    }
}
