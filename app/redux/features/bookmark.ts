import { createSlice, PayloadAction, current } from "@reduxjs/toolkit"

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

const initialState: InitialState[] = [
  {
    id: "",
    accountId: "",
    puuid: "",
    gameName: "",
    tagLine: "",
    profileIconId: 0,
    revisionDate: 0,
    summonerLevel: 0
  }
]

export const bookmark = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    deleteBookmark: (state, action: PayloadAction<InitialState | string>) => {
      const newState = current(state)
      const point = action.payload
      for (let i = 0; i < newState.length; i++) {
        if (point === newState[i].id) {
          state.splice(i, 1)
          break
        }
      }
      return state
    },
    setBookmark: (state, action: PayloadAction<InitialState>) => {
      const newState = current(state)
      if (newState.length > 1) {
        const point = action.payload.id
        let check_num = 0

        for (let i = 0; i < newState.length; i++) {
          if (point === newState[i].id) {
            check_num++
            break
          }
        }

        if (check_num === 0) state.push(action.payload)
      } else {
        state.push(action.payload)
      }

      return state
    }
  }
})

export const { deleteBookmark, setBookmark } = bookmark.actions

export default bookmark.reducer
