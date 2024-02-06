import {UnknownAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ISkill} from '../../types/ISkill';
import SkillsService from '../../API/SkillsService';
import {fetchSpecialists} from './specialistsSlice';
import {fetchInterviews} from './interviewsSlice';

export const fetchSkills = createAsyncThunk<ISkill[]>('skills/fetchSkills', async (_, {rejectWithValue}) => {
    try {
        const response = await SkillsService.getSkills();
        return response.skills as ISkill[];
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const createSkill = createAsyncThunk<ISkill, ISkill>(
    'skills/createSkill',
    async (newSkill, {rejectWithValue, dispatch}) => {
        try {
            const response = await SkillsService.createSkill(newSkill);
            const data = response.skill as ISkill;
            dispatch(fetchSpecialists());
            dispatch(fetchInterviews());
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateSkill = createAsyncThunk<ISkill, ISkill>(
    'skills/updateSkill',
    async (updatedSkill, {rejectWithValue, dispatch}) => {
        try {
            const response = await SkillsService.updateSkill(updatedSkill);
            const data = response.skill as ISkill;
            dispatch(fetchSpecialists());
            dispatch(fetchInterviews());
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteSkill = createAsyncThunk<number, number>(
    'skills/deleteSkill',
    async (skill_id, {rejectWithValue, dispatch}) => {
        try {
            await SkillsService.deleteSkill(skill_id);
            dispatch(fetchSpecialists());
            dispatch(fetchInterviews());
            return skill_id;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

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

            .addCase(createSkill.fulfilled, (state, action) => {
                state.skills = [...state.skills, action.payload];
                state.status = Status.SUCCESS;
            })
            .addCase(createSkill.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(updateSkill.fulfilled, (state, action) => {
                state.skills = state.skills.map((skill) =>
                    skill.skill_id === action.payload.skill_id ? action.payload : skill
                );
                state.status = Status.SUCCESS;
            })
            .addCase(updateSkill.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(deleteSkill.fulfilled, (state, action) => {
                state.skills = state.skills.filter((skill) => skill.skill_id !== action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(deleteSkill.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addMatcher(isError, (state, action: UnknownAction) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.skills = [];
            });
    }
});

const isError = (action: UnknownAction) => {
    return action.type.endsWith('rejected');
};

export default skillsSlice.reducer;
