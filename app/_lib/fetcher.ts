'server-only'

import { apiServer } from '@/lib/api/api-server'
import { MasterDataType } from '@/types/master-data'

export async function fetchMasterData(): Promise<MasterDataType> {
  const masterData = await apiServer.get<MasterDataType>('/api/master-data')

  if (masterData.success && masterData.data) {
    return {
      genders: masterData.data.genders || [],
    }
  }

  throw new Error(`マスターデータの取得に失敗しました。`)
}
