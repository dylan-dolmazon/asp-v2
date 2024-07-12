import { Championnat } from '#types/club_types.js'

export const transformChampionnat = (data: any): Championnat => {
  const pools = data.phases[0].groups.map((pool: any) => ({
    name: pool.name,
    number: pool.stage_number,
  }))
  return {
    label: data.name,
    code: data.cp_no,
    pools: pools,
  }
}
