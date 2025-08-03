import { apiBase } from '@/lib/api/api-base'
import { MasterDataType } from '@/lib/types/master-data'

export async function fetchMasterData(): Promise<MasterDataType> {
  const masterData = await apiBase.get<MasterDataType>('/api/master-data')

  if (masterData.success && masterData.data) {
    return {
      genders: masterData.data.genders || [],
    }
  }

  throw new Error(`マスターデータの取得に失敗しました。`)
}
