import {
  BaseEntity,
  Column,
  Entity,
} from "typeorm";

@Entity("food_truck")
export class FoodTruck extends BaseEntity {
    @Column("int", { primary: true, generated: "increment", name: "id" })
    id: number;

    @Column("int", { nullable: true, name: "objectId" })
    objectId: number;

    @Column("varchar", { nullable: true, name: "applicant", length: 255 })
    applicant: string;

    @Column("varchar", { nullable: true, name: "facility_type", length: 100 })
    facilityType: string;

    @Column("int", { nullable: true, name: "cnn" })
    cnn: number;

    @Column("varchar", { nullable: true, name: "location_description", length: 255 })
    locationDescription: string;

    @Column("varchar", { nullable: true, name: "address", length: 255 })
    address: string;

    @Column("varchar", { nullable: true, name: "block_lot", length: 20 })
    blockLot: string;

    @Column("varchar", { nullable: true, name: "block", length: 20 })
    block: string;

    @Column("varchar", { nullable: true, name: "permit", length: 20 })
    permit: string;

    @Column("varchar", { nullable: true, name: "status", length: 20 })
    status: string;

    @Column("text", { nullable: true, name: "food_items" })
    foodItems: string;

    @Column("double", { nullable: true, name: "latitude" })
    latitude: number;

    @Column("double", { nullable: true, name: "longitude" })
    longitude: number;

    @Column("varchar", { nullable: true, name: "received", length: 20 })
    received: string;

    @Column("datetime", { nullable: true, name: "expirationdate" })
    expirationdate: string;

    constructor(partial: Partial<FoodTruck>) {
        super();
        Object.assign(this, partial);
    }
}
