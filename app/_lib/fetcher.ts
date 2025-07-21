import { apiBase } from '@/lib/api/api-base'
import { MasterDataType } from '@/lib/types/master-data'

export async function fetchMasterData(): Promise<MasterDataType> {
  try {
    const masterData = await apiBase.get<MasterDataType>('/api/master-data')
    return masterData
  } catch {
    return {
      genders: [],
    }
  }
}
