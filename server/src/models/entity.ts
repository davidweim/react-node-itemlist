import { maxBy } from 'lodash';

/**
 * Represents a storable object in a database
 */
export interface Entity {
    id: string;
}

/**
 * Returns the next Id available given an array of entities
 * @param entities The array of entities
 */
export function nextId(entities: Entity[]): string {
    const entity = maxBy(entities, (entity) => parseInt(entity.id, 10));
    if (entity) {
        return (parseInt(entity.id, 10) + 1).toString();
    } else {
        return '1';
    }
}
