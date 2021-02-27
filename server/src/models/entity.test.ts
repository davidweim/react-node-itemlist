import chai from "chai";
import { Entity, nextId } from "./entity";

const expect = chai.expect;

it("should return id in string", () => {
  const entity: Entity = { id: "2" };
  expect(entity.id).to.be.equal("2");
});

it("should return largest+1 number as id in string", () => {
  const entities: Entity[] = [{ id: "1" }, { id: "2" }];
  const newId = nextId(entities);
  expect(newId).to.be.equal("3");
});
