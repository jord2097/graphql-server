/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

import {readFile} from 'fs/promises'
const spaceCentersArray = JSON.parse(await readFile(new URL('../../space-centers.json', import.meta.url)))


export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('space_centers').del()
  await knex('space_centers').insert(
    spaceCentersArray
  );
};
