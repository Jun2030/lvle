type AssemblySizeType = 'large' | 'default' | 'small'

type LocateType = 'en' | 'zh-cn' | null

interface AppState {
  locale: LocateType
}
