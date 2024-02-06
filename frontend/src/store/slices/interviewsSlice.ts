import {UnknownAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IInterview} from '../../types/IInterviews';
import InterviewsService from '../../API/InterviewsService';

export const fetchInterviews = createAsyncThunk<IInterview[]>(
    'interviews/fetchInterviews',
    async (_, {rejectWithValue}) => {
        try {
            const response = await InterviewsService.getInterviews();
            return response.interviews as IInterview[];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createInterview = createAsyncThunk<IInterview, IInterview>(
    'interviews/createInterview',
    async (newInterview, {rejectWithValue}) => {
        try {
            const response = await InterviewsService.createInterview(newInterview);
            const data = response.interview as IInterview;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateInterview = createAsyncThunk<IInterview, IInterview>(
    'interviews/updateInterview',
    async (updatedInterview, {rejectWithValue}) => {
        try {
            const response = await InterviewsService.updateInterview(updatedInterview);
            const data = response.interview as IInterview;
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteInterview = createAsyncThunk<number, number>(
    'Interviews/deleteInterview',
    async (interview_id, {rejectWithValue, dispatch}) => {
        try {
            await InterviewsService.deleteInterview(interview_id);
            return interview_id;
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

interface interviewsState {
    interviews: IInterview[];
    errorMessage: string;
    status: Status;
}

const initialState: interviewsState = {
    interviews: [],
    errorMessage: '',
    status: Status.LOADING
};

const interviewsSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInterviews.fulfilled, (state, action) => {
                state.interviews = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchInterviews.pending, (state) => {
                state.status = Status.LOADING;
                state.interviews = [];
            })

            .addCase(createInterview.fulfilled, (state, action) => {
                state.interviews = [...state.interviews, action.payload];
                state.status = Status.SUCCESS;
            })
            .addCase(createInterview.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(updateInterview.fulfilled, (state, action) => {
                state.interviews = state.interviews.map((skill) =>
                    skill.interview_id === action.payload.interview_id ? action.payload : skill
                );
                state.status = Status.SUCCESS;
            })
            .addCase(updateInterview.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(deleteInterview.fulfilled, (state, action) => {
                state.interviews = state.interviews.filter((skill) => skill.interview_id !== action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(deleteInterview.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addMatcher(isError, (state, action: UnknownAction) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.interviews = [];
            });
    }
});

const isError = (action: UnknownAction) => {
    return action.type.endsWith('rejected');
};

export default interviewsSlice.reducer;
