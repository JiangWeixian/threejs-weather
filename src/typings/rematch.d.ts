import models from '@/store/models'
import { RematchStore, RematchDispatch, RematchRootState } from '@rematch/core'

type Models = typeof models

export type Store = RematchStore<Models>
export type Dispatch = RematchDispatch<Models>
export type RootState = RematchRootState<Models>
