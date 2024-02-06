import {UnknownAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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

export const createSpecialist = createAsyncThunk<ISpecialist, ISpecialist>(
    'specialists/createSpecialist',
    async (newSpecialist, {rejectWithValue}) => {
        try {
            const response = await SpecialistsService.createSpecialist(newSpecialist);
            const data = response.specialist as ISpecialist;
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

export const deleteSpecialist = createAsyncThunk<number, number>(
    'specialists/deleteSpecialist',
    async (specialist_id, {rejectWithValue}) => {
        try {
            await SpecialistsService.deleteSpecialist(specialist_id);
            return specialist_id;
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

            .addCase(createSpecialist.fulfilled, (state, action) => {
                state.specialists = [...state.specialists, action.payload];
                state.status = Status.SUCCESS;
            })
            .addCase(createSpecialist.pending, (state) => {
                state.status = Status.LOADING;
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

            .addCase(deleteSpecialist.fulfilled, (state, action) => {
                state.specialists = state.specialists.filter(
                    (specialist) => specialist.specialist_id !== action.payload
                );
                state.status = Status.SUCCESS;
            })
            .addCase(deleteSpecialist.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addMatcher(isError, (state, action: UnknownAction) => {
                state.status = Status.ERROR;
                state.errorMessage = action.payload as string;
                state.specialists = [];
            });
    }
});

const isError = (action: UnknownAction) => {
    return action.type.endsWith('rejected');
};

export default specialistsSlice.reducer;
