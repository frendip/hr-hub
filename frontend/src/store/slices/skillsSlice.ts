import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ISkill} from '../../types/ISkill';
import SkillsService from '../../API/SkillsService';

export const fetchSkills = createAsyncThunk<ISkill[]>('skills/fetchSkills', async (_, {rejectWithValue}) => {
    try {
        const response = await SkillsService.getSkills();
        return response.skills as ISkill[];
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface skillsState {
    skills: ISkill[];
    errorMessage: string;
    status: Status;
}

const initialState: skillsState = {
    skills: [],
    errorMessage: '',
    status: Status.LOADING
};

const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.skills = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchSkills.pending, (state) => {
                state.status = Status.LOADING;
                state.skills = [];
            })
            .addCase(fetchSkills.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.skills = [];
            });
    }
});

export default skillsSlice.reducer;
