import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
  id?: string
  accountId?: string
  puuid?: string
  gameName?: string
  tagLine?: string
  profileIconId?: number
  revisionDate?: number
  summonerLevel?: number
}

const initialState: InitialState = {
  id: "",
  accountId: "",
  puuid: "",
  tagLine: "",
  gameName: "",
  profileIconId: 0,
  revisionDate: 0,
  summonerLevel: 0
}

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action: PayloadAction<InitialState>) => {
      return (state = { ...action.payload })
    }
  }
})

export const { reset, setUser } = user.actions

export default user.reducer
