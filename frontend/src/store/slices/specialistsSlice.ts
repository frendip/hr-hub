import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ISpecialist} from '../../types/ISpecialist';
import SpecialistsService from '../../API/SpecialistsService';

export const fetchSpecialists = createAsyncThunk<ISpecialist[]>(
    'specialists/fetchSpecialists',
    async (_, {rejectWithValue}) => {
        try {
            const response = await SpecialistsService.getSpecialists();
            const data = response.specialists as ISpecialist[];
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateSpecialist = createAsyncThunk<ISpecialist, ISpecialist>(
    'specialists/updateSpecialist',
    async (updatedSpecialist, {rejectWithValue}) => {
        try {
            const response = await SpecialistsService.updateSpecialist(updatedSpecialist);
            const data = response.specialist as ISpecialist;
            return data;
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

interface specialistsState {
    specialists: ISpecialist[];
    errorMessage: string;
    status: Status;
}

const initialState: specialistsState = {
    specialists: [],
    errorMessage: '',
    status: Status.LOADING
};

const specialistsSlice = createSlice({
    name: 'specialists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecialists.fulfilled, (state, action) => {
                state.specialists = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchSpecialists.pending, (state) => {
                state.status = Status.LOADING;
                state.specialists = [];
            })
            .addCase(fetchSpecialists.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.specialists = [];
            })
            .addCase(updateSpecialist.fulfilled, (state, action) => {
                state.specialists = state.specialists.map((specialist) =>
                    specialist.specialist_id === action.payload.specialist_id ? action.payload : specialist
                );

                state.status = Status.SUCCESS;
            })
            .addCase(updateSpecialist.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(updateSpecialist.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.specialists = [];
            });
    }
});

export default specialistsSlice.reducer;
