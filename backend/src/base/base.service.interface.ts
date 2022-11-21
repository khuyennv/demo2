export interface BaseServiceInterface<T> {
    index(): Promise<T[]>

    // findById(id: EntityId): Promise<T>

    // findByIds(id: number[]): Promise<T[]>

    // delete(id: EntityId): Promise<DeleteResult>
}
